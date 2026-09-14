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
 * Renders an unscaled clone of the target document to ensure zoom level,
 * mobile responsive tab states, or screen dimensions do not distort the output.
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

  // Create an off-screen staging wrapper attached to document.body
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

  const clonedNode = target.cloneNode(true) as HTMLElement;
  clonedNode.id = `${elementId}-export-clone`;
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
  clonedNode.querySelectorAll('span.rounded-md').forEach((el) => {
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
      h.style.paddingBottom = '5px';
      h.style.marginBottom = '12px';
    }
  });

  // 4. Multi-line text line-height enforcement
  clonedNode.querySelectorAll('p').forEach((p) => {
    const el = p as HTMLElement;
    const computed = window.getComputedStyle(el);
    if (computed.lineHeight === 'normal' || parseInt(computed.lineHeight) < 18) {
      el.style.lineHeight = '19px';
    }
  });

  stagingContainer.appendChild(clonedNode);
  document.body.appendChild(stagingContainer);

  try {
    // Wait for all web fonts and styles to be 100% rendered
    if (typeof document !== 'undefined' && 'fonts' in document) {
      try {
        await (document as unknown as { fonts: { ready: Promise<unknown> } }).fonts.ready;
      } catch {
        // Fallback to timeout
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 150));

    // Dynamically import html2canvas and jsPDF to preserve SSR and zero initial bundle overhead
    const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
      import('html2canvas'),
      import('jspdf'),
    ]);

    // Render with 2.5x scale for retina 240+ DPI print quality
    const canvas = await html2canvas(clonedNode, {
      scale: 2.5,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      windowWidth: targetWidthPx,
    });

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: isA4 ? 'a4' : 'letter',
      compress: true,
    });

    // Calculate height of one standard page in canvas pixels
    const pageCanvasHeight = Math.round(canvas.width * (pdfHeightMm / pdfWidthMm));
    const totalHeight = canvas.height;

    // Single-page document:
    // If total content fits within one page, fill the full page so page background and
    // layout proportions look identical to standard printed sheets.
    if (totalHeight <= pageCanvasHeight + 40) {
      const pageCanvas = document.createElement('canvas');
      pageCanvas.width = canvas.width;
      pageCanvas.height = pageCanvasHeight;

      const pageCtx = pageCanvas.getContext('2d');
      if (pageCtx) {
        pageCtx.fillStyle = '#ffffff';
        pageCtx.fillRect(0, 0, pageCanvas.width, pageCanvasHeight);
        pageCtx.drawImage(canvas, 0, 0);

        const pageData = pageCanvas.toDataURL('image/png');
        pdf.addImage(pageData, 'PNG', 0, 0, pdfWidthMm, pdfHeightMm, undefined, 'FAST');
      }
    } else {
      // Multi-page document: slice canvas page-by-page
      const totalPages = Math.ceil(totalHeight / pageCanvasHeight);

      for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
        if (pageIndex > 0) {
          pdf.addPage(isA4 ? 'a4' : 'letter', 'portrait');
        }

        const sourceY = pageIndex * pageCanvasHeight;
        const sourceHeight = Math.min(pageCanvasHeight, totalHeight - sourceY);

        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvas.width;
        pageCanvas.height = pageCanvasHeight;

        const pageCtx = pageCanvas.getContext('2d');
        if (pageCtx) {
          pageCtx.fillStyle = '#ffffff';
          pageCtx.fillRect(0, 0, pageCanvas.width, pageCanvasHeight);
          pageCtx.drawImage(
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

          const pageData = pageCanvas.toDataURL('image/png');
          pdf.addImage(pageData, 'PNG', 0, 0, pdfWidthMm, pdfHeightMm, undefined, 'FAST');
        }
      }
    }

    // Direct browser file download of the .pdf file
    pdf.save(fileName);
    return true;
  } catch (error) {
    console.error('In-browser PDF generation encountered an error:', error);
    // Graceful fallback: trigger native print dialog if canvas rendering fails
    triggerPrintResume(fullName);
    return false;
  } finally {
    // Clean up staging container
    if (stagingContainer.parentNode) {
      stagingContainer.parentNode.removeChild(stagingContainer);
    }
  }
}
