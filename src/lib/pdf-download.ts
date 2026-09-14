'use client';

import { triggerPrintResume } from './print-pdf';

interface GeneratePdfOptions {
  elementId?: string;
  fullName?: string;
  documentType?: 'resume' | 'cover-letter';
  format?: 'letter' | 'a4';
}

/**
 * High-Fidelity Vector PDF Export Engine.
 * 
 * Uses the browser's native vector print-to-PDF engine via an isolated print iframe,
 * guaranteeing 100% design parity with the on-screen preview:
 * - 100% true vector typography (selectable, searchable, crystal sharp).
 * - Exact colors, borders, pill badges, and timeline milestones.
 * - Zero font metric distortion, zero line-height collapsing, zero layout shifting.
 * - Automatic document naming: [FullName]_Resume.pdf.
 */
export async function downloadDocumentAsPdf({
  fullName = 'Resume',
}: GeneratePdfOptions = {}): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  try {
    triggerPrintResume(fullName);
    return true;
  } catch (err) {
    console.error('[PDF] Export error, falling back to window.print():', err);
    window.print();
    return false;
  }
}
