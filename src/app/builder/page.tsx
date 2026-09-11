'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ResumeData, TemplateId } from '@/lib/types';
import { SAMPLE_RESUME } from '@/lib/sample-data';
import { loadSavedResume, saveResumeToLocal } from '@/lib/storage';
import { ResumeEditor } from '@/components/builder/ResumeEditor';
import { ResumePreview } from '@/components/builder/ResumePreview';
import { ATSScoreCard } from '@/components/builder/ATSScoreCard';
import { Header } from '@/components/Header';
import { ShieldCheck, Edit3, Eye, Sparkles } from 'lucide-react';
import { Suspense } from 'react';

function BuilderContent() {
  const searchParams = useSearchParams();
  const templateParam = searchParams.get('template') as TemplateId | null;

  const [resume, setResume] = useState<ResumeData>(SAMPLE_RESUME);
  const [mobileTab, setMobileTab] = useState<'edit' | 'preview'>('edit');
  const [mounted, setMounted] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const saved = loadSavedResume();
    if (templateParam) {
      saved.style.template = templateParam;
    }
    setResume(saved);
    setMounted(true);
  }, [templateParam]);

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

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm">
          <Sparkles className="w-5 h-5 animate-spin" />
          Loading private browser builder...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      {/* Privacy Callout Banner */}
      <div className="bg-emerald-50/90 border-b border-emerald-100 py-1.5 px-4 text-center text-xs font-medium text-emerald-800 flex items-center justify-center gap-1.5 no-print">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>
          Private by design — Your resume stays in your browser. We don’t store your data on any server.
        </span>
      </div>

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden flex border-b border-slate-200 bg-white sticky top-16 z-20 no-print">
        <button
          type="button"
          onClick={() => setMobileTab('edit')}
          className={`flex-1 py-3 text-center text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 ${
            mobileTab === 'edit'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          Editor & Content
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('preview')}
          className={`flex-1 py-3 text-center text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 ${
            mobileTab === 'preview'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          Live Preview & Download
        </button>
      </div>

      {/* Main Split-Screen Workspace */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
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
          className={`w-full lg:w-[52%] xl:w-[55%] h-full overflow-y-auto ${
            mobileTab === 'preview' ? 'block' : 'hidden lg:block'
          }`}
        >
          <ResumePreview
            resume={resume}
            onTemplateChange={handleTemplateChange}
          />
        </div>
      </main>
    </div>
  );
}

export default function BuilderPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-slate-600 text-sm font-semibold">
            Loading CVMake Builder...
          </div>
        </div>
      }
    >
      <BuilderContent />
    </Suspense>
  );
}
