'use client';

import { triggerPrintResume } from './print-pdf';

interface GeneratePdfOptions {
  elementId?: string;
  fullName?: string;
  documentType?: 'resume' | 'cover-letter';
  format?: 'letter' | 'a4';
}

/**
 * Downloads a pixel-perfect PDF that exactly matches the on-screen preview.
 *
 * Strategy: Capture the live DOM element directly (so html2canvas uses the real
 * browser stylesheet with all Tailwind classes, sm:/lg: breakpoints, and fonts
 * fully resolved). Before capture we:
 *   1. Temporarily make the preview pane visible if it is hidden (mobile tab).
 *   2. Reset any CSS zoom/scale transform on the parent wrapper.
 *   3. Use html2canvas `onclone` only for cosmetic PDF-specific tweaks
 *      (strip box-shadow, lock pill geometry, fix SVG sizes).
 *   4. Restore every mutated style in a finally block.
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
    console.warn(`[PDF] Element #${elementId} not found – falling back to print dialog.`);
    triggerPrintResume(fullName);
    return false;
  }

  // -- 1. Filename ----------
  const cleanName = fullName.trim()
    ? fullName.trim().replace(/[^a-zA-Z0-9_-]/g, '_')
    : 'My';
  const suffix = documentType === 'cover-letter' ? 'Cover_Letter' : 'Resume';
  const fileName = `${cleanName}_${suffix}.pdf`;

  // -- 2. Paper dimensions ----------
  const isA4 = format === 'a4';
  const pdfWidthMm  = isA4 ? 210     : 215.9;
  const pdfHeightMm = isA4 ? 297     : 279.4;
  const targetWidthPx = isA4 ? 794   : 816;   // at 96 DPI

  // -- 3. Wait for fonts ----------
  try {
    await (document as unknown as { fonts: { ready: Promise<unknown> } }).fonts.ready;
  } catch { /* ignore */ }

  // -- 4. Collect ancestors whose styles we need to temporarily mutate -------
  // We need to:
  //   a) Make the preview pane column visible if it is hidden.
  //   b) Reset the CSS transform (zoom) applied by ResumePreview.
  //   c) Make the document itself visible if somehow hidden.

  interface SavedStyle { el: HTMLElement; prop: string; value: string }
  const saved: SavedStyle[] = [];

  const save = (el: HTMLElement, prop: keyof CSSStyleDeclaration) => {
    saved.push({ el, prop: prop as string, value: el.style[prop as string] || '' });
  };

  // Walk up from target to find the preview pane column and scale wrapper.
  let el: HTMLElement | null = target.parentElement;
  while (el && el !== document.body) {
    const cs = window.getComputedStyle(el);
    // (a) Hidden columns: make them block so html2canvas can see the element.
    if (cs.display === 'none') {
      save(el, 'display');
      el.style.display = 'block';
    }
    // (b) CSS transform on the zoom wrapper (transform: scale(…)).
    if (cs.transform && cs.transform !== 'none') {
      save(el, 'transform');
      save(el, 'transition');
      save(el, 'transformOrigin');
      el.style.transform = 'none';
      el.style.transition = 'none';
      el.style.transformOrigin = 'top center';
    }
    el = el.parentElement;
  }

  // Wait one paint for style mutations to settle.
  await new Promise(resolve => requestAnimationFrame(() => setTimeout(resolve, 60)));

  try {
    const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
      import('html2canvas'),
      import('jspdf'),
    ]);

    const canvas = await html2canvas(target, {
      // -- Capture config ----------
      scale: 2.5,               // 240 DPI — sharp without excessive file size
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,

      // Fix the virtual viewport to exactly paper width so html2canvas uses
      // sm: breakpoints correctly (816px ≥ 640px triggers sm:, ≥ 768px triggers md:).
      windowWidth: targetWidthPx,

      // -- onclone: cosmetic-only PDF tweaks ----------
      // These run inside html2canvas's own document clone, so they don't affect
      // what the user sees on screen.
      onclone: (_clonedDoc, clonedEl) => {
        // Strip preview drop-shadow and border
        clonedEl.style.boxShadow = 'none';
        clonedEl.style.border = 'none';
        clonedEl.style.width = `${targetWidthPx}px`;
        clonedEl.style.minWidth = `${targetWidthPx}px`;
        clonedEl.style.maxWidth = `${targetWidthPx}px`;

        // Fix Lucide SVG sizes (they default to 24×24 without explicit attrs)
        clonedEl.querySelectorAll('svg').forEach(svg => {
          const tiny = svg.classList.contains('w-3') || svg.classList.contains('h-3');
          const sz = tiny ? '12' : '14';
          svg.setAttribute('width', sz);
          svg.setAttribute('height', sz);
          (svg as HTMLElement).style.cssText += `;width:${sz}px;height:${sz}px;display:inline-block;vertical-align:middle;flex-shrink:0`;
        });

        // Lock pill / badge bounding boxes (prevents text escaping background)
        clonedEl.querySelectorAll<HTMLElement>('span.rounded-md,span.rounded,span.rounded-full,span.rounded-lg').forEach(h => {
          h.style.display     = 'inline-block';
          h.style.lineHeight  = '1.4';
          h.style.verticalAlign = 'middle';
          h.style.boxSizing   = 'border-box';
          h.style.whiteSpace  = 'nowrap';
        });

        // Stabilise section h2 borders
        clonedEl.querySelectorAll<HTMLElement>('h2').forEach(h => {
          if (h.style.borderBottomWidth || h.classList.contains('border-b-2') || h.classList.contains('border-b')) {
            h.style.paddingBottom = '4px';
            h.style.marginBottom  = '10px';
          }
        });

        // Metro badge spans
        clonedEl.querySelectorAll<HTMLElement>('h2 span').forEach(h => {
          if (h.style.backgroundColor && h.style.backgroundColor !== 'transparent' && h.style.backgroundColor !== '') {
            h.style.display      = 'inline-block';
            h.style.lineHeight   = '16px';
            h.style.padding      = '3px 9px';
            h.style.verticalAlign = 'middle';
            h.style.boxSizing    = 'border-box';
            h.style.whiteSpace   = 'nowrap';
          }
        });

        // Animate pulse: remove animation so it freezes in rendered state
        clonedEl.querySelectorAll<HTMLElement>('.animate-pulse,.animate-spin').forEach(h => {
          h.style.animation = 'none';
        });
      },
    });

    if (!canvas || canvas.width === 0 || canvas.height === 0) {
      throw new Error('[PDF] html2canvas produced an empty canvas.');
    }

    // -- 5. Build PDF pages ----------
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: isA4 ? 'a4' : 'letter',
      compress: true,
    });

    const pageCanvasHeight = Math.round(canvas.width * (pdfHeightMm / pdfWidthMm));
    const totalHeight = canvas.height;

    // Single-page protection: if content fits within 1 page ±15%, force it
    // onto exactly 1 page to avoid an accidental near-empty second page.
    const singlePageLimit = Math.round(pageCanvasHeight * 1.15);

    if (totalHeight <= singlePageLimit) {
      const pg = document.createElement('canvas');
      pg.width  = canvas.width;
      pg.height = pageCanvasHeight;
      const ctx = pg.getContext('2d')!;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, pg.width, pg.height);

      if (totalHeight <= pageCanvasHeight) {
        ctx.drawImage(canvas, 0, 0);
      } else {
        // Scale down slightly to fit the overflow onto one page
        const sf = pageCanvasHeight / totalHeight;
        const sw = canvas.width * sf;
        const ox = (canvas.width - sw) / 2;
        ctx.drawImage(canvas, ox, 0, sw, pageCanvasHeight);
      }
      pdf.addImage(pg.toDataURL('image/png', 1.0), 'PNG', 0, 0, pdfWidthMm, pdfHeightMm, undefined, 'FAST');
    } else {
      // Multi-page document: slice at exact page boundaries
      const totalPages = Math.ceil(totalHeight / pageCanvasHeight);
      for (let p = 0; p < totalPages; p++) {
        if (p > 0) pdf.addPage(isA4 ? 'a4' : 'letter', 'portrait');
        const sy = p * pageCanvasHeight;
        const sh = Math.min(pageCanvasHeight, totalHeight - sy);
        const pg = document.createElement('canvas');
        pg.width  = canvas.width;
        pg.height = pageCanvasHeight;
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
    // -- 6. Restore all mutated styles ----------
    for (const { el, prop, value } of saved) {
      (el.style as unknown as Record<string, string>)[prop] = value;
    }
  }
}
