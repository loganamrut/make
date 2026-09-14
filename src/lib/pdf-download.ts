'use client';

import { triggerPrintResume } from './print-pdf';

interface GeneratePdfOptions {
  elementId?: string;
  fullName?: string;
  documentType?: 'resume' | 'cover-letter';
  format?: 'letter' | 'a4';
}

/**
 * Downloads a pixel-perfect, high-resolution PDF directly to the user's browser.
 * Renders an unscaled clone of the target document inside an isolated staging wrapper
 * at (0, 0) to ensure responsive layouts, mobile tabs, or zoom levels never distort
 * or blank out the exported document.
 */
export async function downloadDocumentAsPdf({
  elementId = 'resume-print-area',
  fullName = 'Resume',
  documentType = 'resume',
  format = 'letter',
}: GeneratePdfOptions = {}): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  const target = document.getElementById(elementId);
  if (!target) {
    console.warn(`Element #${elementId} not found, falling back to print dialog.`);
    triggerPrintResume(fullName);
    return false;
  }

  // Sanitize filename: replace non-alphanumeric characters with underscores
  const cleanName = fullName.trim() ? fullName.trim().replace(/[^a-zA-Z0-9_-]/g, '_') : 'My';
  const suffix = documentType === 'cover-letter' ? 'Cover_Letter' : 'Resume';
  const fileName = `${cleanName}_${suffix}.pdf`;

  // Standard paper dimensions in mm
  // US Letter: 215.9mm x 279.4mm (8.5 x 11 in)
  // A4: 210mm x 297mm
  const isA4 = format === 'a4';
  const pdfWidthMm = isA4 ? 210 : 215.9;
  const pdfHeightMm = isA4 ? 297 : 279.4;
  const targetWidthPx = isA4 ? 794 : 816; // 96 DPI pixel equivalent
  const targetHeightPx = Math.round(targetWidthPx * (pdfHeightMm / pdfWidthMm)); // 1056px Letter, 1123px A4

  // Await web fonts to guarantee font metrics match preview 100%
  if (typeof document !== 'undefined' && 'fonts' in document) {
    try {
      await (document as unknown as { fonts: { ready: Promise<unknown> } }).fonts.ready;
    } catch {
      // Ignore font readiness timeout
    }
  }

  // Create an isolated staging wrapper attached to document.body
  // Positioned at top: 0, left: 0 behind page content (z-index: -9999) with full opacity: 1
  // to ensure 100% true font metrics, subpixel anti-aliasing, and complete CSS evaluation.
  const stagingContainer = document.createElement('div');
  stagingContainer.id = 'pdf-staging-container';
  stagingContainer.style.position = 'fixed';
  stagingContainer.style.left = '0';
  stagingContainer.style.top = '0';
  stagingContainer.style.width = `${targetWidthPx}px`;
  stagingContainer.style.zIndex = '-9999';
  stagingContainer.style.opacity = '1';
  stagingContainer.style.visibility = 'visible';
  stagingContainer.style.overflow = 'visible';
  stagingContainer.style.pointerEvents = 'none';
  stagingContainer.style.margin = '0';
  stagingContainer.style.padding = '0';
  stagingContainer.style.background = '#ffffff';

  const clonedNode = target.cloneNode(true) as HTMLElement;
  clonedNode.id = `${elementId}-export-clone`;
  clonedNode.style.position = 'relative';
  clonedNode.style.left = '0';
  clonedNode.style.top = '0';
  clonedNode.style.transform = 'none';
  clonedNode.style.width = `${targetWidthPx}px`;
  clonedNode.style.minWidth = `${targetWidthPx}px`;
  clonedNode.style.maxWidth = `${targetWidthPx}px`;
  clonedNode.style.minHeight = `${targetHeightPx}px`;
  clonedNode.style.margin = '0';
  clonedNode.style.boxShadow = 'none';
  clonedNode.style.border = 'none';
  clonedNode.style.boxSizing = 'border-box';
  clonedNode.style.backgroundColor = '#ffffff';
  clonedNode.style.display = 'flex';
  clonedNode.style.flexDirection = 'column';
  clonedNode.style.visibility = 'visible';
  clonedNode.style.opacity = '1';

  // Apply pixel-perfect normalizations to cloned DOM before html2canvas capture:
  // 1. SVG alignment: override Lucide 24x24 attributes and center relative to text
  clonedNode.querySelectorAll('svg').forEach((svg) => {
    const isTiny = svg.classList.contains('w-3') || svg.classList.contains('h-3');
    const size = isTiny ? '12' : '13';
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.style.width = `${size}px`;
    svg.style.height = `${size}px`;
    svg.style.display = 'inline-block';
    svg.style.verticalAlign = 'middle';
    svg.style.flexShrink = '0';
  });

  // Contact header icons: counteract html2canvas upward bias
  clonedNode.querySelectorAll('header .inline-flex svg, header .flex svg, .inline-flex svg').forEach((svg) => {
    const el = svg as HTMLElement;
    el.style.position = 'relative';
    el.style.top = '1px';
  });

  // 2. Lock pill badge bounding box (prevents "crm go outside box")
  clonedNode.querySelectorAll('span.rounded-md, span.rounded, span.rounded-full').forEach((el) => {
    const h = el as HTMLElement;
    h.style.display = 'inline-block';
    h.style.lineHeight = '15px';
    h.style.padding = '3px 8px';
    h.style.verticalAlign = 'middle';
    h.style.boxSizing = 'border-box';
    h.style.whiteSpace = 'nowrap';
  });

  // 3. Section headers: prevent border collisions with text descenders
  clonedNode.querySelectorAll('h2').forEach((el) => {
    const h = el as HTMLElement;
    h.style.lineHeight = '1.35';
    if (h.classList.contains('border-b-2') || h.style.borderBottomWidth) {
      h.style.paddingBottom = '4px';
      h.style.marginBottom = '10px';
    }
  });

  // Section badge spans (e.g. Metro template headers)
  clonedNode.querySelectorAll('h2 span').forEach((el) => {
    const h = el as HTMLElement;
    if (h.style.backgroundColor && h.style.backgroundColor !== 'transparent') {
      h.style.display = 'inline-block';
      h.style.lineHeight = '16px';
      h.style.padding = '3px 9px';
      h.style.verticalAlign = 'middle';
      h.style.boxSizing = 'border-box';
      h.style.whiteSpace = 'nowrap';
    }
  });

  // 4. Multi-line text line-height enforcement to prevent collapsing lines
  clonedNode.querySelectorAll('p, li').forEach((el) => {
    const h = el as HTMLElement;
    const computed = window.getComputedStyle(h);
    const lh = parseFloat(computed.lineHeight);
    if (isNaN(lh) || lh < 18) {
      h.style.lineHeight = '19px';
    }
  });

  stagingContainer.appendChild(clonedNode);
  document.body.appendChild(stagingContainer);

  // Give a brief rendering frame for staging container styles to compute
  await new Promise((resolve) => setTimeout(resolve, 120));

  try {
    const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
      import('html2canvas'),
      import('jspdf'),
    ]);

    const capturedHeight = Math.max(clonedNode.offsetHeight, clonedNode.scrollHeight, targetHeightPx);

    // Render with 2.5x scale for retina 240+ DPI print quality
    // Force coordinates to (0, 0) and exact target width
    const canvas = await html2canvas(clonedNode, {
      scale: 2.5,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: targetWidthPx,
      height: capturedHeight,
      windowWidth: targetWidthPx,
      windowHeight: capturedHeight,
      scrollX: 0,
      scrollY: 0,
      x: 0,
      y: 0,
    });

    if (!canvas || canvas.width === 0 || canvas.height === 0) {
      throw new Error('Canvas render produced an empty canvas');
    }

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: isA4 ? 'a4' : 'letter',
      compress: true,
    });

    // Height of one standard page in canvas coordinates
    const pageCanvasHeight = Math.round(canvas.width * (pdfHeightMm / pdfWidthMm));
    const totalHeight = canvas.height;

    // Single-page vs multi-page threshold:
    // If the document fits within 1 page OR has minor overflow (up to 15%),
    // fit it onto EXACTLY 1 page! Never cut lines in half or create an empty 2nd page!
    const singlePageLimit = Math.round(pageCanvasHeight * 1.15);

    if (totalHeight <= singlePageLimit) {
      const pageCanvas = document.createElement('canvas');
      pageCanvas.width = canvas.width;
      pageCanvas.height = pageCanvasHeight;

      const ctx = pageCanvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, pageCanvas.width, pageCanvasHeight);

        if (totalHeight <= pageCanvasHeight) {
          // 100% 1:1 unscaled print
          ctx.drawImage(canvas, 0, 0);
        } else {
          // Minor overflow: proportionally scale to fit the single sheet cleanly
          const scale = pageCanvasHeight / totalHeight;
          const scaledWidth = canvas.width * scale;
          const offsetX = (canvas.width - scaledWidth) / 2;
          ctx.drawImage(canvas, offsetX, 0, scaledWidth, pageCanvasHeight);
        }

        const imgData = pageCanvas.toDataURL('image/png', 1.0);
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidthMm, pdfHeightMm, undefined, 'FAST');
      }
    } else {
      // Genuinely multi-page document (e.g. 2 full pages):
      // Slice cleanly page-by-page
      const totalPages = Math.ceil(totalHeight / pageCanvasHeight);

      for (let page = 0; page < totalPages; page++) {
        if (page > 0) {
          pdf.addPage(isA4 ? 'a4' : 'letter', 'portrait');
        }

        const sourceY = page * pageCanvasHeight;
        const sourceHeight = Math.min(pageCanvasHeight, totalHeight - sourceY);

        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvas.width;
        pageCanvas.height = pageCanvasHeight;

        const ctx = pageCanvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, pageCanvas.width, pageCanvasHeight);
          ctx.drawImage(
            canvas,
            0,
            sourceY,
            canvas.width,
            sourceHeight,
            0,
            0,
            canvas.width,
            sourceHeight
          );

          const imgData = pageCanvas.toDataURL('image/png', 1.0);
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidthMm, pdfHeightMm, undefined, 'FAST');
        }
      }
    }

    pdf.save(fileName);
    return true;
  } catch (error) {
    console.error('PDF export engine encountered an error:', error);
    triggerPrintResume(fullName);
    return false;
  } finally {
    if (stagingContainer.parentNode) {
      stagingContainer.parentNode.removeChild(stagingContainer);
    }
  }
}
