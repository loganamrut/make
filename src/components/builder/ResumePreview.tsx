'use client';

import React, { useState } from 'react';
import { ResumeData, TemplateId } from '@/lib/types';
import { ResumeDocument } from './ResumeDocument';
import { triggerPrintResume } from '@/lib/print-pdf';
import { downloadDocumentAsPdf } from '@/lib/pdf-download';
import { Download, Printer, ZoomIn, ZoomOut, Loader2, Check } from 'lucide-react';

interface ResumePreviewProps {
  resume: ResumeData;
  onTemplateChange?: (tpl: TemplateId) => void;
  onOpenDownloadModal?: () => void;
}

export function ResumePreview({ resume, onTemplateChange, onOpenDownloadModal }: ResumePreviewProps) {
  const [zoom, setZoom] = useState<number>(100);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState<boolean>(false);
  const [downloaded, setDownloaded] = useState<boolean>(false);

  const handleZoomIn = () => setZoom(prev => Math.min(130, prev + 10));
  const handleZoomOut = () => setZoom(prev => Math.max(70, prev - 10));

  const handleDownloadPdf = async () => {
    setIsDownloadingPdf(true);
    setDownloaded(false);
    try {
      const ok = await downloadDocumentAsPdf({
        fullName: resume.personalInfo.fullName,
        elementId: 'resume-print-area',
      });
      if (ok) {
        setDownloaded(true);
        setTimeout(() => setDownloaded(false), 3500);
      }
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Action Toolbar */}
      <div className="sticky top-0 z-30 p-3 bg-white/95 backdrop-blur-sm border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 no-print">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-1.5 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-200"
              title="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-slate-700 w-10 text-center">
              {zoom}%
            </span>
            <button
              type="button"
              onClick={handleZoomIn}
              className="p-1.5 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-200"
              title="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {onTemplateChange && (
            <select
              value={resume.style.template}
              onChange={e => onTemplateChange(e.target.value as TemplateId)}
              className="px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 bg-white text-slate-800 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
            >
              <option value="ats">ATS Standard (100% Safe)</option>
              <option value="modern">Modern Accent</option>
              <option value="banner">Vibrant Banner (Colorful Header)</option>
              <option value="infographic">Infographic Modern (Designable Sidebar)</option>
              <option value="timeline">Career Timeline (Milestone Nodes)</option>
              <option value="metro">Metro Modular (Clean Card Grid)</option>
              <option value="tech">Tech & Software Engineer</option>
              <option value="hybrid">Two-Column Hybrid</option>
              <option value="compact">Compact 1-Page Pro</option>
              <option value="executive">Executive Leadership</option>
              <option value="elegant">Elegant Executive</option>
              <option value="professional">Corporate Professional</option>
              <option value="simple">Simple Classic</option>
              <option value="minimal">Minimal Clean</option>
              <option value="student">Student & Academic</option>
              <option value="graduate">Career Pivot / Graduate</option>
              <option value="creative">Creative Portfolio</option>
              <option value="academic">Academic CV</option>
            </select>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Print button */}
          <button
            type="button"
            onClick={() => triggerPrintResume(resume.personalInfo.fullName)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-sm transition-colors cursor-pointer"
            title="Open browser print dialog"
          >
            <Printer className="w-4 h-4" />
            Print
          </button>

          {/* More Formats / Options */}
          {onOpenDownloadModal && (
            <button
              type="button"
              onClick={onOpenDownloadModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-sm transition-colors cursor-pointer"
              title="More export options (TXT, JSON backup)"
            >
              Export Options
            </button>
          )}

          {/* DIRECT 1-CLICK DOWNLOAD PDF */}
          <button
            type="button"
            disabled={isDownloadingPdf}
            onClick={handleDownloadPdf}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm shadow-indigo-200 active:scale-95 transition-all disabled:opacity-75 cursor-pointer"
            title="Directly download PDF file to your device"
          >
            {isDownloadingPdf ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : downloaded ? (
              <Check className="w-4 h-4 text-emerald-300" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span>
              {isDownloadingPdf
                ? 'Downloading...'
                : downloaded
                ? 'Downloaded!'
                : 'Download PDF'}
            </span>
          </button>
        </div>
      </div>

      {/* Live Canvas Area */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 bg-slate-100 flex justify-center items-start print-container">
        <div
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out',
          }}
          className="w-full max-w-[850px]"
        >
          <ResumeDocument resume={resume} />
        </div>
      </div>
    </div>
  );
}
