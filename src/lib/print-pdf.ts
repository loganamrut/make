/**
 * Triggers the browser's native print dialog for the resume document.
 * 
 * Uses an isolated, off-screen print iframe:
 * 1. Clones the resume element into a clean iframe containing only the resume.
 * 2. Injects all stylesheets and font links from document.head.
 * 3. Sets strict @page { size: letter portrait; margin: 0; } rules.
 * 4. Invokes iframe.contentWindow.print() with zero interference from parent
 *    layout (no flex containers, no hidden breakpoints, no zoom transforms).
 */
export function triggerPrintResume(fullName: string = 'Resume'): void {
  if (typeof window === 'undefined') return;

  const target = document.getElementById('resume-print-area');
  if (!target) {
    console.warn('Element #resume-print-area not found, falling back to window.print()');
    window.print();
    return;
  }

  const originalTitle = document.title;
  const cleanName = fullName.trim() ? fullName.trim().replace(/\s+/g, '_') : 'My';
  const printTitle = `${cleanName}_Resume`;

  // Remove any previously created print iframe
  const existingIframe = document.getElementById('resume-print-iframe');
  if (existingIframe && existingIframe.parentNode) {
    existingIframe.parentNode.removeChild(existingIframe);
  }

  const iframe = document.createElement('iframe');
  iframe.id = 'resume-print-iframe';
  iframe.style.position = 'fixed';
  iframe.style.left = '0';
  iframe.style.top = '0';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.zIndex = '-99999';
  iframe.style.border = 'none';
  iframe.style.opacity = '0';
  iframe.style.pointerEvents = 'none';
  iframe.setAttribute('aria-hidden', 'true');
  document.body.appendChild(iframe);

  const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
  if (!iframeDoc || !iframe.contentWindow) {
    console.warn('Print iframe unavailable, falling back to window.print()');
    window.print();
    return;
  }

  // Collect all stylesheets, style tags, and font links from parent document
  let stylesHtml = '';
  document.head.querySelectorAll('link[rel="stylesheet"], link[rel="preconnect"], style').forEach((node) => {
    stylesHtml += node.outerHTML + '\n';
  });

  // Inject standard print rules inside the iframe
  stylesHtml += `
    <style>
      @page {
        size: letter portrait;
        margin: 0;
      }
      *, *::before, *::after {
        box-sizing: border-box;
      }
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        background: #ffffff !important;
        color: #0f172a !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      body {
        display: flex !important;
        justify-content: center !important;
        align-items: flex-start !important;
        width: 100% !important;
        min-height: 100% !important;
      }
      .resume-paper {
        margin: 0 auto !important;
        box-shadow: none !important;
        border: none !important;
        width: 8.5in !important;
        min-height: 11in !important;
        page-break-after: avoid !important;
        break-after: avoid !important;
        background: #ffffff !important;
      }
    </style>
  `;

  // Clone the resume target node
  const clonedTarget = target.cloneNode(true) as HTMLElement;
  clonedTarget.id = 'resume-print-area-print';
  clonedTarget.style.boxShadow = 'none';
  clonedTarget.style.border = 'none';
  clonedTarget.style.margin = '0 auto';
  clonedTarget.style.transform = 'none';

  iframeDoc.open();
  iframeDoc.write(`<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>${printTitle}</title>
    ${stylesHtml}
  </head>
  <body>
    ${clonedTarget.outerHTML}
  </body>
</html>`);
  iframeDoc.close();

  const printAction = () => {
    try {
      const iframeWin = iframe.contentWindow;
      if (!iframeWin) throw new Error('Iframe window closed');

      // Set document title temporarily for PDF filename in print dialog
      document.title = printTitle;

      iframeWin.focus();
      iframeWin.print();
    } catch (err) {
      console.error('Iframe print error, falling back to window.print():', err);
      window.print();
    } finally {
      // Clean up after print finishes and restore original page title
      setTimeout(() => {
        document.title = originalTitle;
        if (iframe.parentNode) {
          iframe.parentNode.removeChild(iframe);
        }
      }, 3000);
    }
  };

  // Wait for fonts and styles to be ready
  if (iframeDoc.fonts && 'ready' in iframeDoc.fonts) {
    iframeDoc.fonts.ready.then(() => {
      setTimeout(printAction, 150);
    }).catch(() => {
      setTimeout(printAction, 250);
    });
  } else {
    setTimeout(printAction, 250);
  }
}
