'use client';

import { triggerPrintResume } from './print-pdf';

interface GeneratePdfOptions {
  elementId?: string;
  fullName?: string;
  documentType?: 'resume' | 'cover-letter';
  format?: 'letter' | 'a4';
}

/**
 * Pixel-perfect PDF export that matches the on-screen preview 100%.
 *
 * Root cause of blank PDFs:
 *   The builder layout has `hidden lg:block` on the preview column.
 *   html2canvas evaluates CSS using its windowWidth parameter. When
 *   windowWidth < 1024px, Tailwind's lg: breakpoint does NOT fire, so
 *   getComputedStyle in the clone evaluates the column as display:none —
 *   producing a completely blank white canvas regardless of what the real
 *   browser viewport looks like.
 *
 * Solution:
 *   1. Use windowWidth >= 1024 so lg: fires inside html2canvas's clone.
 *   2. In onclone, ALSO force display:block with !important on every
 *      ancestor up to <body> — belt-and-suspenders guarantee.
 *   3. In onclone, strip the CSS scale transform from the zoom wrapper.
 *   4. Apply cosmetic PDF-only tweaks (no shadow, crisp SVG sizes, pill locks).
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
    console.warn(`[PDF] #${elementId} not found — falling back to print dialog.`);
    triggerPrintResume(fullName);
    return false;
  }

  // -- 1. Filename -------------------------------------------------------
  const cleanName = fullName.trim()
    ? fullName.trim().replace(/[^a-zA-Z0-9_-]/g, '_')
    : 'My';
  const suffix = documentType === 'cover-letter' ? 'Cover_Letter' : 'Resume';
  const fileName = `${cleanName}_${suffix}.pdf`;

  // -- 2. Paper dimensions -----------------------------------------------
  const isA4 = format === 'a4';
  const pdfWidthMm  = isA4 ? 210   : 215.9;
  const pdfHeightMm = isA4 ? 297   : 279.4;
  const targetWidthPx = isA4 ? 794 : 816;

  // -- 3. Wait for fonts -------------------------------------------------
  try {
    await (document as unknown as { fonts: { ready: Promise<unknown> } }).fonts.ready;
  } catch { /* ignore */ }

  // -- 4. Reset live-DOM zoom transform (restore in finally) ------------
  // This prevents the captured canvas being zoomed if user has e.g. 80% zoom.
  interface SavedStyle { el: HTMLElement; prop: string; value: string }
  const saved: SavedStyle[] = [];
  const save = (el: HTMLElement, prop: string) =>
    saved.push({ el, prop, value: el.style.getPropertyValue(prop) });

  let walker: HTMLElement | null = target.parentElement;
  while (walker && walker !== document.body) {
    const tr = window.getComputedStyle(walker).transform;
    if (tr && tr !== 'none' && tr !== '') {
      save(walker, 'transform');
      save(walker, 'transition');
      walker.style.setProperty('transform', 'none', 'important');
      walker.style.setProperty('transition', 'none', 'important');
    }
    walker = walker.parentElement;
  }

  // One paint to let transform removal settle
  await new Promise(r => requestAnimationFrame(() => setTimeout(r, 50)));

  try {
    const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
      import('html2canvas'),
      import('jspdf'),
    ]);

    const canvas = await html2canvas(target, {
      // CRITICAL: use 1280px so Tailwind lg: (1024px) fires inside the clone.
      // This means the preview column (hidden lg:block) evaluates as block,
      // making #resume-print-area visible for capture.
      windowWidth: 1280,
      scale: 2.5,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,

      onclone: (clonedDoc: Document, clonedEl: HTMLElement) => {
        // A. Force every ancestor visible with !important — guarantees no
        //    display:none ancestor even if a media query still evaluates wrong.
        let ancestor = clonedEl.parentElement;
        while (ancestor && ancestor !== clonedDoc.body) {
          ancestor.style.setProperty('display', 'block', 'important');
          ancestor.style.setProperty('visibility', 'visible', 'important');
          ancestor.style.setProperty('opacity', '1', 'important');
          ancestor.style.setProperty('transform', 'none', 'important');
          ancestor.style.setProperty('overflow', 'visible', 'important');
          ancestor.style.setProperty('height', 'auto', 'important');
          ancestor.style.setProperty('min-height', '0', 'important');
          ancestor = ancestor.parentElement;
        }

        // B. Strip PDF-irrelevant visuals from the resume document itself
        clonedEl.style.setProperty('box-shadow', 'none', 'important');
        clonedEl.style.setProperty('border', 'none', 'important');
        clonedEl.style.setProperty('transform', 'none', 'important');
        clonedEl.style.setProperty('margin', '0', 'important');
        clonedEl.style.setProperty('width', `${targetWidthPx}px`, 'important');
        clonedEl.style.setProperty('min-width', `${targetWidthPx}px`, 'important');
        clonedEl.style.setProperty('max-width', `${targetWidthPx}px`, 'important');

        // C. Fix Lucide SVG sizes (default 24x24 is too large)
        clonedEl.querySelectorAll('svg').forEach(svgEl => {
          const svg = svgEl as HTMLElement;
          const tiny = svg.classList.contains('w-3') || svg.classList.contains('h-3');
          const sz = tiny ? '12' : '14';
          svg.setAttribute('width', sz);
          svg.setAttribute('height', sz);
          svg.style.cssText += `;width:${sz}px;height:${sz}px;display:inline-block;vertical-align:middle;flex-shrink:0;`;
        });

        // D. Lock pill / badge bounding boxes so text never escapes background
        clonedEl.querySelectorAll<HTMLElement>(
          'span.rounded-md,span.rounded,span.rounded-full,span.rounded-lg,span.rounded-xl'
        ).forEach(h => {
          h.style.display = 'inline-block';
          h.style.lineHeight = '1.4';
          h.style.verticalAlign = 'middle';
          h.style.boxSizing = 'border-box';
          h.style.whiteSpace = 'nowrap';
        });

        // E. Metro template badge spans
        clonedEl.querySelectorAll<HTMLElement>('h2 span').forEach(h => {
          const bg = h.style.backgroundColor;
          if (bg && bg !== 'transparent' && bg !== '') {
            h.style.display = 'inline-block';
            h.style.lineHeight = '16px';
            h.style.padding = '3px 9px';
            h.style.verticalAlign = 'middle';
            h.style.boxSizing = 'border-box';
            h.style.whiteSpace = 'nowrap';
          }
        });

        // F. Section h2 border stabilisation
        clonedEl.querySelectorAll<HTMLElement>('h2').forEach(h => {
          if (
            h.classList.contains('border-b-2') ||
            h.classList.contains('border-b') ||
            (h.style.borderBottomWidth && h.style.borderBottomWidth !== '0px')
          ) {
            h.style.paddingBottom = '4px';
            h.style.marginBottom = '10px';
          }
        });

        // G. Remove animations so elements render in their final state
        clonedEl.querySelectorAll<HTMLElement>('.animate-pulse,.animate-spin').forEach(h => {
          h.style.animation = 'none';
        });
      },
    });

    if (!canvas || canvas.width === 0 || canvas.height === 0) {
      throw new Error('[PDF] html2canvas produced an empty canvas.');
    }

    // -- 5. Build PDF pages ------------------------------------------------
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: isA4 ? 'a4' : 'letter',
      compress: true,
    });

    const pageCanvasH = Math.round(canvas.width * (pdfHeightMm / pdfWidthMm));
    const totalH = canvas.height;

    // If content fits in 1 page +-15%, force onto exactly 1 page to avoid
    // accidental near-empty second pages.
    if (totalH <= Math.round(pageCanvasH * 1.15)) {
      const pg = document.createElement('canvas');
      pg.width  = canvas.width;
      pg.height = pageCanvasH;
      const ctx = pg.getContext('2d')!;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, pg.width, pg.height);
      if (totalH <= pageCanvasH) {
        ctx.drawImage(canvas, 0, 0);
      } else {
        const sf = pageCanvasH / totalH;
        const sw = canvas.width * sf;
        ctx.drawImage(canvas, (canvas.width - sw) / 2, 0, sw, pageCanvasH);
      }
      pdf.addImage(pg.toDataURL('image/png', 1.0), 'PNG', 0, 0, pdfWidthMm, pdfHeightMm, undefined, 'FAST');
    } else {
      const totalPages = Math.ceil(totalH / pageCanvasH);
      for (let p = 0; p < totalPages; p++) {
        if (p > 0) pdf.addPage(isA4 ? 'a4' : 'letter', 'portrait');
        const sy = p * pageCanvasH;
        const sh = Math.min(pageCanvasH, totalH - sy);
        const pg = document.createElement('canvas');
        pg.width  = canvas.width;
        pg.height = pageCanvasH;
        const ctx = pg.getContext('2d')!;
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, pg.width, pg.height);
        ctx.drawImage(canvas, 0, sy, canvas.width, sh, 0, 0, canvas.width, sh);
        pdf.addImage(pg.toDataURL('image/png', 1.0), 'PNG', 0, 0, pdfWidthMm, pdfHeightMm, undefined, 'FAST');
      }
    }

    pdf.save(fileName);
    return true;

  } catch (err) {
    console.error('[PDF] Export error:', err);
    triggerPrintResume(fullName);
    return false;

  } finally {
    // Restore live-DOM styles we mutated
    for (const { el, prop, value } of saved) {
      if (value) {
        el.style.setProperty(prop, value);
      } else {
        el.style.removeProperty(prop);
      }
    }
  }
}
