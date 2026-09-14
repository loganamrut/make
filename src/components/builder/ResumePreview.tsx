'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ResumeData, TemplateId } from '@/lib/types';
import { ResumeDocument } from './ResumeDocument';
import { triggerPrintResume } from '@/lib/print-pdf';
import { downloadDocumentAsPdf } from '@/lib/pdf-download';
import {
  Download,
  Printer,
  ZoomIn,
  ZoomOut,
  Loader2,
  Check,
  Maximize2,
  Minimize2,
} from 'lucide-react';

interface ResumePreviewProps {
  resume: ResumeData;
  onTemplateChange?: (tpl: TemplateId) => void;
  onOpenDownloadModal?: () => void;
}

export function ResumePreview({ resume, onTemplateChange, onOpenDownloadModal }: ResumePreviewProps) {
  const [zoom, setZoom] = useState<number>(100);
  const [fitZoom, setFitZoom] = useState<number>(100);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState<boolean>(false);
  const [downloaded, setDownloaded] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-calculate best-fit scale for mobile & tablet viewports
  useEffect(() => {
    const calculateFit = () => {
      if (containerRef.current) {
        const availableWidth = containerRef.current.clientWidth;
        if (availableWidth < 860) {
          // Leave 24px padding on mobile
          const computed = Math.max(30, Math.min(100, Math.floor(((availableWidth - 24) / 816) * 100)));
          setFitZoom(computed);
          // Auto-apply fit on mobile screens if zoom was at 100%
          setZoom(prev => (prev === 100 ? computed : prev));
        } else {
          setFitZoom(100);
        }
      }
    };

    calculateFit();
    window.addEventListener('resize', calculateFit);
    return () => window.removeEventListener('resize', calculateFit);
  }, []);

  const handleZoomIn = () => setZoom(prev => Math.min(140, prev + 10));
  const handleZoomOut = () => setZoom(prev => Math.max(30, prev - 10));

  const handleToggleFit = () => {
    if (zoom === fitZoom) {
      setZoom(100);
    } else {
      setZoom(fitZoom);
    }
  };

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

  const isFitActive = zoom === fitZoom && fitZoom < 100;

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Action Toolbar */}
      <div className="sticky top-0 z-30 p-2.5 sm:p-3 bg-white/95 backdrop-blur-sm border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 sm:gap-3 no-print">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          {/* Zoom In / Out / Fit Controls */}
          <div className="flex items-center gap-0.5 sm:gap-1 bg-slate-100 p-1 rounded-lg">
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-1 sm:p-1.5 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
              title="Zoom out"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <span className="text-[11px] sm:text-xs font-bold text-slate-700 w-8 sm:w-10 text-center select-none">
              {zoom}%
            </span>
            <button
              type="button"
              onClick={handleZoomIn}
              className="p-1 sm:p-1.5 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
              title="Zoom in"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* Quick Fit Toggle */}
          {fitZoom < 100 && (
            <button
              type="button"
              onClick={handleToggleFit}
              className={`inline-flex items-center gap-1 px-2 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-bold border transition-colors ${
                isFitActive
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
              title={isFitActive ? 'Switch to 100% full scale' : 'Fit document width to screen'}
            >
              {isFitActive ? (
                <>
                  <Minimize2 className="w-3 h-3" />
                  <span>100%</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3 h-3" />
                  <span>Fit</span>
                </>
              )}
            </button>
          )}

          {/* Template Selector */}
          {onTemplateChange && (
            <select
              value={resume.style.template}
              onChange={e => onTemplateChange(e.target.value as TemplateId)}
              className="max-w-[130px] sm:max-w-[190px] px-2 sm:px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 bg-white text-slate-800 focus:ring-2 focus:ring-indigo-600 focus:outline-none truncate"
            >
              <option value="ats">ATS Standard (100% Safe)</option>
              <option value="modern">Modern Accent</option>
              <option value="banner">Vibrant Banner</option>
              <option value="infographic">Infographic Modern</option>
              <option value="timeline">Career Timeline</option>
              <option value="metro">Metro Modular</option>
              <option value="tech">Tech &amp; Software Engineer</option>
              <option value="hybrid">Two-Column Hybrid</option>
              <option value="compact">Compact 1-Page Pro</option>
              <option value="executive">Executive Leadership</option>
              <option value="elegant">Elegant Executive</option>
              <option value="professional">Corporate Professional</option>
              <option value="simple">Simple Classic</option>
              <option value="minimal">Minimal Clean</option>
              <option value="student">Student &amp; Academic</option>
              <option value="graduate">Career Pivot / Graduate</option>
              <option value="creative">Creative Portfolio</option>
              <option value="academic">Academic CV</option>
            </select>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Print button */}
          <button
            type="button"
            onClick={() => triggerPrintResume(resume.personalInfo.fullName)}
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-xs transition-colors cursor-pointer"
            title="Open browser print dialog"
          >
            <Printer className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Print</span>
          </button>

          {/* More Formats / Options */}
          {onOpenDownloadModal && (
            <button
              type="button"
              onClick={onOpenDownloadModal}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-xs transition-colors cursor-pointer"
              title="More export options (TXT, JSON backup)"
            >
              <span className="hidden sm:inline">Export Options</span>
              <span className="sm:hidden">Options</span>
            </button>
          )}

          {/* DIRECT 1-CLICK DOWNLOAD PDF */}
          <button
            type="button"
            disabled={isDownloadingPdf}
            onClick={handleDownloadPdf}
            className="inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm shadow-indigo-200 active:scale-95 transition-all disabled:opacity-75 cursor-pointer whitespace-nowrap"
            title="Directly download PDF file to your device"
          >
            {isDownloadingPdf ? (
              <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
            ) : downloaded ? (
              <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-300" />
            ) : (
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
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

      {/* Live Canvas Area with Zero Mobile Overflow */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto p-2 sm:p-6 lg:p-8 bg-slate-100/90 flex justify-center items-start print-container"
      >
        <div
          style={{
            width: zoom < 100 ? `${Math.round(816 * (zoom / 100))}px` : '816px',
            minWidth: zoom < 100 ? `${Math.round(816 * (zoom / 100))}px` : '816px',
            height: zoom < 100 ? `${Math.round(1056 * (zoom / 100))}px` : undefined,
            position: 'relative',
            transition: 'width 0.15s ease-out, height 0.15s ease-out',
            marginBottom: zoom > 100 ? `${Math.round((zoom - 100) * 10.56)}px` : undefined,
          }}
          className="flex justify-center flex-shrink-0"
        >
          <div
            style={{
              width: '816px',
              minWidth: '816px',
              transform: `scale(${zoom / 100})`,
              transformOrigin: zoom < 100 ? 'top left' : 'top center',
              transition: 'transform 0.15s ease-out',
            }}
          >
            <ResumeDocument resume={resume} />
          </div>
        </div>
      </div>
    </div>
  );
}
