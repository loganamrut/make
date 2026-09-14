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

  // Await web fonts to guarantee font metrics match preview 100%
  if (typeof document !== 'undefined' && 'fonts' in document) {
    try {
      await (document as unknown as { fonts: { ready: Promise<unknown> } }).fonts.ready;
    } catch {
      // Ignore font readiness timeout
    }
  }

  // Give a brief rendering frame for any layout recalculations
  await new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve, 60)));

  try {
    const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
      import('html2canvas'),
      import('jspdf'),
    ]);

    // Save live target's parent transform if zoomed in editor
    const parent = target.parentElement;
    const originalParentTransform = parent ? parent.style.transform : '';
    const originalParentTransition = parent ? parent.style.transition : '';

    // Temporarily reset parent scale so html2canvas renders the true base document
    if (parent) {
      parent.style.transition = 'none';
      parent.style.transform = 'none';
    }

    let canvas: HTMLCanvasElement;
    try {
      canvas = await html2canvas(target, {
        scale: 2.8, // Ultra-sharp 270+ DPI print quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        windowWidth: targetWidthPx,
        onclone: (clonedDoc) => {
          const el = clonedDoc.getElementById(elementId);
          if (!el) return;

          // Strip preview shadow & border so the PDF canvas is pure paper
          el.style.boxShadow = 'none';
          el.style.border = 'none';
          el.style.transform = 'none';
          el.style.margin = '0 auto';
          el.style.width = `${targetWidthPx}px`;

          // Ensure Lucide SVGs have explicit XML attributes matching computed size
          el.querySelectorAll('svg').forEach((svg) => {
            const isTiny = svg.classList.contains('w-3') || svg.classList.contains('h-3');
            const size = isTiny ? '12' : '13';
            svg.setAttribute('width', size);
            svg.setAttribute('height', size);
            svg.style.width = `${size}px`;
            svg.style.height = `${size}px`;
            svg.style.display = 'inline-block';
            svg.style.verticalAlign = 'middle';
          });

          // Lock badge and pill bounding boxes (Metro section headers, skill pills)
          el.querySelectorAll('h2 span, span.rounded-md').forEach((badge) => {
            const h = badge as HTMLElement;
            if (h.style.backgroundColor && h.style.backgroundColor !== 'transparent') {
              h.style.display = 'inline-block';
              h.style.verticalAlign = 'middle';
              h.style.boxSizing = 'border-box';
              h.style.whiteSpace = 'nowrap';
            }
          });
        },
      });
    } finally {
      // Restore parent zoom transform immediately after canvas capture
      if (parent) {
        parent.style.transform = originalParentTransform;
        parent.style.transition = originalParentTransition;
      }
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
          // Slight overflow: proportionally scale to fit the single sheet perfectly
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
  }
}
