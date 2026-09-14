'use client';

import React, { useState } from 'react';
import { ResumeData } from '@/lib/types';
import { triggerPrintResume } from '@/lib/print-pdf';
import { downloadDocumentAsPdf } from '@/lib/pdf-download';
import {
  Download,
  FileText,
  FileCode,
  Copy,
  Check,
  X,
  HardDrive,
  Sparkles,
  Loader2,
  Printer,
} from 'lucide-react';

interface SaveDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  resume: ResumeData;
}

export function SaveDownloadModal({ isOpen, onClose, resume }: SaveDownloadModalProps) {
  const [copied, setCopied] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [pdfDownloaded, setPdfDownloaded] = useState(false);

  if (!isOpen) return null;

  const candidateName = resume.personalInfo.fullName || 'Resume';
  const sanitizedName = candidateName.toLowerCase().replace(/[^a-z0-9]/g, '-');

  // 1. Plain Text ATS Export Generator
  const generatePlainTextATS = (): string => {
    let out = `${resume.personalInfo.fullName.toUpperCase()}\n`;
    out += `${resume.personalInfo.jobTitle}\n`;
    out += `${[
      resume.personalInfo.email,
      resume.personalInfo.phone,
      resume.personalInfo.location,
      resume.personalInfo.linkedin,
      resume.personalInfo.github,
    ]
      .filter(Boolean)
      .join(' | ')}\n\n`;

    if (resume.summary) {
      out += `===============================\nPROFESSIONAL SUMMARY\n===============================\n${resume.summary}\n\n`;
    }

    if (resume.workExperience.length > 0) {
      out += `===============================\nWORK EXPERIENCE\n===============================\n`;
      for (const exp of resume.workExperience) {
        out += `${exp.position.toUpperCase()} | ${exp.company}\n`;
        out += `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}${exp.location ? ` | ${exp.location}` : ''}\n`;
        for (const b of exp.bullets) {
          if (b.trim()) out += `• ${b}\n`;
        }
        out += `\n`;
      }
    }

    if (resume.education.length > 0) {
      out += `===============================\nEDUCATION\n===============================\n`;
      for (const edu of resume.education) {
        out += `${edu.degree} in ${edu.field} - ${edu.school}\n`;
        out += `${edu.startDate} - ${edu.endDate}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}\n\n`;
      }
    }

    const hasSkills =
      resume.skills.technical.length > 0 ||
      resume.skills.tools.length > 0 ||
      resume.skills.soft.length > 0;

    if (hasSkills) {
      out += `===============================\nSKILLS\n===============================\n`;
      if (resume.skills.technical.length > 0)
        out += `Technical Skills: ${resume.skills.technical.join(', ')}\n`;
      if (resume.skills.tools.length > 0)
        out += `Tools & Platforms: ${resume.skills.tools.join(', ')}\n`;
      if (resume.skills.soft.length > 0)
        out += `Core Competencies: ${resume.skills.soft.join(', ')}\n`;
      if (resume.skills.languages.length > 0)
        out += `Languages: ${resume.skills.languages.join(', ')}\n`;
      out += `\n`;
    }

    if (resume.projects.length > 0) {
      out += `===============================\nKEY PROJECTS\n===============================\n`;
      for (const p of resume.projects) {
        out += `${p.name} ${p.technologies ? `(${p.technologies})` : ''}\n`;
        if (p.description) out += `${p.description}\n`;
        for (const b of p.bullets) {
          if (b.trim()) out += `• ${b}\n`;
        }
        out += `\n`;
      }
    }

    return out;
  };

  const handleDownloadTxt = () => {
    const text = generatePlainTextATS();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${sanitizedName}-ats-resume.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    const jsonStr = JSON.stringify(resume, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${sanitizedName}-resume-backup.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPdf = async () => {
    setIsDownloadingPdf(true);
    setPdfDownloaded(false);
    try {
      const ok = await downloadDocumentAsPdf({
        fullName: resume.personalInfo.fullName,
        elementId: 'resume-print-area',
      });
      if (ok) {
        setPdfDownloaded(true);
        setTimeout(() => setPdfDownloaded(false), 4000);
      }
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const handleCopyText = async () => {
    const text = generatePlainTextATS();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200 no-print overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-xl w-full max-h-[92dvh] overflow-y-auto p-5 sm:p-8 space-y-5 sm:space-y-6 animate-in zoom-in-95 duration-200 my-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-[11px] font-bold mb-1.5">
              <Sparkles className="w-3 h-3 text-indigo-600" />
              100% Free &amp; Private
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Save &amp; Download Your Resume
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Directly download your pixel-perfect ATS PDF, or export text / JSON backup.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Download Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Option 1: Direct Download PDF */}
          <button
            type="button"
            disabled={isDownloadingPdf}
            onClick={handleDownloadPdf}
            className="p-4 rounded-2xl border-2 border-indigo-600 bg-indigo-50/50 hover:bg-indigo-100/60 text-left transition-all group flex flex-col justify-between cursor-pointer disabled:opacity-75"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-3 shadow-md shadow-indigo-200">
                {isDownloadingPdf ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : pdfDownloaded ? (
                  <Check className="w-5 h-5 text-emerald-300" />
                ) : (
                  <Download className="w-5 h-5" />
                )}
              </div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center gap-1.5">
                Download PDF
                <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-indigo-200/80 text-indigo-900">
                  Direct .PDF
                </span>
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Directly downloads high-resolution ATS PDF file to your device.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-700 mt-3">
              {isDownloadingPdf ? 'Generating PDF...' : pdfDownloaded ? '✓ Downloaded!' : 'Download PDF Now →'}
            </span>
          </button>

          {/* Option 2: Plain Text ATS */}
          <button
            type="button"
            onClick={handleDownloadTxt}
            className="p-4 rounded-2xl border border-slate-200 hover:border-indigo-400 bg-white hover:bg-slate-50/80 text-left transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-3">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                Plain Text (.TXT / ATS)
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Clean text for pasting into legacy text boxes in Workday, Taleo, Greenhouse.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 mt-3">
              Download .TXT &rarr;
            </span>
          </button>

          {/* Option 3: JSON Backup */}
          <button
            type="button"
            onClick={handleDownloadJson}
            className="p-4 rounded-2xl border border-slate-200 hover:border-indigo-400 bg-white hover:bg-slate-50/80 text-left transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                <FileCode className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                JSON Data Backup
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Export full structured data to restore, edit, or migrate anytime with 100% privacy.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 mt-3">
              Download JSON &rarr;
            </span>
          </button>

          {/* Option 4: Copy to Clipboard */}
          <button
            type="button"
            onClick={handleCopyText}
            className="p-4 rounded-2xl border border-slate-200 hover:border-indigo-400 bg-white hover:bg-slate-50/80 text-left transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center mb-3">
                {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
              </div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {copied ? 'Copied to Clipboard!' : 'Copy Formatted Text'}
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Copy plain text to clipboard for quick paste into application portals.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 mt-3">
              {copied ? 'Copied!' : 'Copy Text &rarr;'}
            </span>
          </button>
        </div>

        {/* Print Option & Local Storage Autosave Status */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>
              <strong>100% Private:</strong> Data stays in your browser memory.
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              triggerPrintResume(resume.personalInfo.fullName);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-indigo-600 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            Print / System Print Dialog
          </button>
        </div>

        {/* Close */}
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}
