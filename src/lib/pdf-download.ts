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
  // Positioned at top: 0, left: 0 with opacity: 0 to ensure full font rasterization,
  // subpixel rendering, and CSS styles are calculated cleanly by the browser.
  const stagingContainer = document.createElement('div');
  stagingContainer.id = 'pdf-staging-container';
  stagingContainer.style.position = 'fixed';
  stagingContainer.style.left = '0';
  stagingContainer.style.top = '0';
  stagingContainer.style.width = `${targetWidthPx}px`;
  stagingContainer.style.zIndex = '-9999';
  stagingContainer.style.opacity = '0';
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
  clonedNode.style.display = 'block';
  clonedNode.style.visibility = 'visible';

  stagingContainer.appendChild(clonedNode);
  document.body.appendChild(stagingContainer);

  try {
    // Brief settle time to allow cloned DOM, font metrics, and layout to evaluate
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
