'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ResumeData, TemplateId } from '@/lib/types';
import { SAMPLE_RESUME, BLANK_RESUME } from '@/lib/sample-data';
import { loadSavedResume, saveResumeToLocal } from '@/lib/storage';
import { ResumeEditor } from '@/components/builder/ResumeEditor';
import { ResumePreview } from '@/components/builder/ResumePreview';
import { ATSScoreCard } from '@/components/builder/ATSScoreCard';
import { AIUploadStep } from '@/components/builder/AIUploadStep';
import { TemplateSelectorStep } from '@/components/builder/TemplateSelectorStep';
import { SaveDownloadModal } from '@/components/builder/SaveDownloadModal';
import { Header } from '@/components/Header';
import { downloadDocumentAsPdf } from '@/lib/pdf-download';
import {
  ShieldCheck,
  Edit3,
  Eye,
  Sparkles,
  Upload,
  LayoutTemplate,
  Download,
  ChevronRight,
  Loader2,
  Check,
  MoreHorizontal,
  PenTool,
} from 'lucide-react';

type StudioStep = 'upload' | 'templates' | 'edit';

function BuilderContent() {
  const searchParams = useSearchParams();
  const templateParam = searchParams.get('template') as TemplateId | null;
  const stepParam = searchParams.get('step') as StudioStep | null;
  const modeParam = searchParams.get('mode');
  const blankParam = searchParams.get('blank');

  const [resume, setResume] = useState<ResumeData>(SAMPLE_RESUME);
  const [currentStep, setCurrentStep] = useState<StudioStep>(
    stepParam || (modeParam === 'manual' ? 'edit' : 'upload')
  );
  const [mobileTab, setMobileTab] = useState<'edit' | 'preview'>('edit');
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [downloadedPdf, setDownloadedPdf] = useState(false);
  const [mounted, setMounted] = useState(false);

  const handleStartBlank = () => {
    setResume(BLANK_RESUME);
    saveResumeToLocal(BLANK_RESUME);
    setCurrentStep('edit');
  };

  const handleStartSample = () => {
    setResume(SAMPLE_RESUME);
    saveResumeToLocal(SAMPLE_RESUME);
    setCurrentStep('edit');
  };

  const handleDirectDownloadPdf = async () => {
    setIsDownloadingPdf(true);
    setDownloadedPdf(false);
    try {
      const ok = await downloadDocumentAsPdf({
        fullName: resume.personalInfo.fullName,
        elementId: 'resume-print-area',
      });
      if (ok) {
        setDownloadedPdf(true);
        setTimeout(() => setDownloadedPdf(false), 3500);
      }
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  // Load from local storage on mount
  useEffect(() => {
    let saved = loadSavedResume();
    if (blankParam === 'true') {
      saved = { ...BLANK_RESUME };
    }
    if (templateParam) {
      saved.style.template = templateParam;
    }
    setResume(saved);
    if (stepParam) {
      setCurrentStep(stepParam);
    } else if (modeParam === 'manual') {
      setCurrentStep('edit');
    }
    setMounted(true);
  }, [templateParam, stepParam, modeParam, blankParam]);

  // Autosave to client-side localStorage on change
  const handleResumeChange = (updated: ResumeData) => {
    setResume(updated);
    saveResumeToLocal(updated);
  };

  const handleTemplateChange = (tpl: TemplateId) => {
    handleResumeChange({
      ...resume,
      style: {
        ...resume.style,
        template: tpl,
      },
    });
  };

  const handleUploadSuccess = (extractedResume: ResumeData) => {
    handleResumeChange(extractedResume);
    setCurrentStep('templates');
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm">
          <Sparkles className="w-5 h-5 animate-spin" />
          Loading private AI resume studio...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      {/* Studio Flow Navigation Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
          {/* Step Breadcrumbs */}
          <div className="flex items-center gap-1 sm:gap-2 text-xs font-bold overflow-x-auto py-1">
            {/* Step 1: Upload */}
            <button
              type="button"
              onClick={() => setCurrentStep('upload')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                currentStep === 'upload'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>1. Upload &amp; AI Parse</span>
            </button>

            <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />

            {/* Step 2: Templates */}
            <button
              type="button"
              onClick={() => setCurrentStep('templates')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex-shrink-0 ${
                currentStep === 'templates'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <LayoutTemplate className="w-3.5 h-3.5" />
              <span>2. Templates (17)</span>
            </button>

            <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />

            {/* Step 3: Edit & Modify */}
            <button
              type="button"
              onClick={() => setCurrentStep('edit')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                currentStep === 'edit'
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>3. Edit &amp; Refine</span>
            </button>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2">
            {currentStep === 'upload' && (
              <button
                type="button"
                onClick={handleStartBlank}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 hover:border-indigo-400 bg-white hover:bg-slate-50 text-slate-700 hover:text-indigo-600 text-xs font-bold transition-all shadow-xs cursor-pointer"
                title="Skip upload and build resume manually from scratch"
              >
                <PenTool className="w-3.5 h-3.5 text-indigo-600" />
                <span>Build Manually</span>
              </button>
            )}

            {/* 1-Click Direct Download PDF */}
            <button
              type="button"
              onClick={handleDirectDownloadPdf}
              disabled={isDownloadingPdf}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm shadow-indigo-200 active:scale-95 transition-all disabled:opacity-75 cursor-pointer"
              title="Directly download PDF file to your device"
            >
              {isDownloadingPdf ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : downloadedPdf ? (
                <Check className="w-3.5 h-3.5 text-emerald-300" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              <span>
                {isDownloadingPdf
                  ? 'Downloading...'
                  : downloadedPdf
                  ? 'Downloaded!'
                  : '4. Download PDF'}
              </span>
            </button>

            {/* More Export Options Modal */}
            <button
              type="button"
              onClick={() => setIsDownloadModalOpen(true)}
              className="p-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 text-xs font-bold transition-colors cursor-pointer"
              title="More export options (Plain text, JSON backup, Print)"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Notice Banner */}
      <div className="bg-emerald-50 border-b border-emerald-200 py-1.5 px-4 text-center text-xs font-semibold text-emerald-950 flex items-center justify-center gap-1.5 no-print">
        <ShieldCheck className="w-4 h-4 text-emerald-700" />
        <span>
          Private by design — Powered by in-browser AI. Zero server database storage.
        </span>
      </div>

      {/* STEP 1: UPLOAD DOCUMENTS (MAX 3) */}
      {currentStep === 'upload' && (
        <AIUploadStep
          onSuccess={handleUploadSuccess}
          onSkip={() => setCurrentStep('templates')}
          onStartBlank={handleStartBlank}
          onStartSample={handleStartSample}
        />
      )}

      {/* STEP 2: TEMPLATE SELECTOR (14 TEMPLATES) */}
      {currentStep === 'templates' && (
        <TemplateSelectorStep
          resume={resume}
          onSelectTemplate={handleResumeChange}
          onBack={() => setCurrentStep('upload')}
          onNext={() => setCurrentStep('edit')}
        />
      )}

      {/* STEP 3: INTERACTIVE EDIT & MODIFY SPLIT-SCREEN WORKSPACE */}
      {currentStep === 'edit' && (
        <div className="flex-1 flex flex-col min-h-0">
          {/* Mobile Tab Switcher */}
          <div className="lg:hidden flex border-b border-slate-200 bg-white sticky top-0 z-20 no-print">
            <button
              type="button"
              onClick={() => setMobileTab('edit')}
              className={`flex-1 min-h-[44px] py-2.5 text-center text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
                mobileTab === 'edit'
                  ? 'border-indigo-700 text-indigo-700 bg-indigo-50/40'
                  : 'border-transparent text-slate-700 hover:text-slate-900'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              Editor &amp; AI Content
            </button>
            <button
              type="button"
              onClick={() => setMobileTab('preview')}
              className={`flex-1 min-h-[44px] py-2.5 text-center text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
                mobileTab === 'preview'
                  ? 'border-indigo-700 text-indigo-700 bg-indigo-50/40'
                  : 'border-transparent text-slate-700 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Live Preview &amp; Export
            </button>
          </div>

          {/* Main Split-Screen Workspace */}
          <main className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden">
            {/* Left Column: Form Controls & ATS Diagnostics */}
            <div
              className={`w-full lg:w-[48%] xl:w-[45%] h-full overflow-y-auto p-4 sm:p-6 lg:border-r border-slate-200 space-y-6 ${
                mobileTab === 'edit' ? 'block' : 'hidden lg:block'
              } no-print`}
            >
              {/* ATS Scorecard widget */}
              <ATSScoreCard resume={resume} />

              {/* Form sections editor */}
              <ResumeEditor resume={resume} onChange={handleResumeChange} />
            </div>

            {/* Right Column: Live Resume Preview */}
            <div
              className={`w-full lg:w-[52%] xl:w-[55%] h-full overflow-y-auto preview-column-container print:!block print:!w-full print:!h-auto print:!overflow-visible ${
                mobileTab === 'preview' ? 'block' : 'hidden lg:block'
              }`}
            >
              <ResumePreview
                resume={resume}
                onTemplateChange={handleTemplateChange}
                onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
              />
            </div>
          </main>
        </div>
      )}

      {/* STEP 4: SAVE & DOWNLOAD MODAL */}
      <SaveDownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        resume={resume}
      />
    </div>
  );
}

export default function BuilderPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-slate-600 text-sm font-semibold">
            Loading CVMake Studio...
          </div>
        </div>
      }
    >
      <BuilderContent />
    </Suspense>
  );
}
