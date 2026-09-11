'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SAMPLE_COVER_LETTER } from '@/lib/sample-data';
import { CoverLetterData } from '@/lib/types';
import { triggerPrintResume } from '@/lib/print-pdf';
import { generateCoverLetterFromResume } from '@/lib/ai-engine';
import { SAMPLE_RESUME } from '@/lib/sample-data';
import {
  Sparkles,
  Printer,
  Copy,
  Check,
  ShieldCheck,
} from 'lucide-react';

export default function CoverLetterBuilderPage() {
  const [data, setData] = useState<CoverLetterData>(SAMPLE_COVER_LETTER);
  const [copied, setCopied] = useState(false);
  const [targetCompany, setTargetCompany] = useState(data.recipient.companyName);
  const [targetRole, setTargetRole] = useState(data.recipient.jobTitle);

  const handleGenerate = () => {
    const generated = generateCoverLetterFromResume(
      SAMPLE_RESUME,
      targetRole,
      targetCompany,
      'professional'
    );
    setData(generated);
  };

  const copyToClipboard = () => {
    const fullText = [
      data.personalInfo.fullName,
      data.personalInfo.email,
      data.personalInfo.phone,
      data.personalInfo.location,
      '',
      data.date,
      '',
      data.recipient.hiringManager,
      data.recipient.companyName,
      data.recipient.companyAddress || '',
      '',
      data.greeting,
      '',
      data.openingParagraph,
      '',
      ...data.bodyParagraphs,
      '',
      data.closingParagraph,
      '',
      data.signoff,
      data.personalInfo.fullName,
    ].join('\n');

    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      {/* Top Banner */}
      <div className="bg-emerald-50 border-b border-emerald-100 py-2 px-4 text-center text-xs font-medium text-emerald-800 flex items-center justify-center gap-1.5 no-print">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>Private AI Cover Letter Generator — Created locally in your browser.</span>
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left: Input & AI Controls */}
          <div className="w-full lg:w-1/2 space-y-6 no-print">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-slate-900">
                    AI Cover Letter Generator
                  </h1>
                  <p className="text-xs text-slate-500">
                    Tailor your letter to match the specific job and company
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Target Company
                  </label>
                  <input
                    type="text"
                    value={targetCompany}
                    onChange={e => setTargetCompany(e.target.value)}
                    placeholder="e.g. Google, Stripe, Starlight Tech"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={targetRole}
                    onChange={e => setTargetRole(e.target.value)}
                    placeholder="e.g. Staff Backend Engineer"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleGenerate}
                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99]"
              >
                <Sparkles className="w-4 h-4" />
                Generate Tailored Letter With AI
              </button>
            </div>

            {/* Content Field Editor */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
              <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                Edit Letter Paragraphs
              </h2>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Salutation
                </label>
                <input
                  type="text"
                  value={data.greeting}
                  onChange={e => setData({ ...data, greeting: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Opening Hook
                </label>
                <textarea
                  rows={3}
                  value={data.openingParagraph}
                  onChange={e => setData({ ...data, openingParagraph: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                />
              </div>

              {data.bodyParagraphs.map((para, idx) => (
                <div key={idx}>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Body Paragraph {idx + 1} (Evidence & Outcomes)
                  </label>
                  <textarea
                    rows={4}
                    value={para}
                    onChange={e => {
                      const updated = [...data.bodyParagraphs];
                      updated[idx] = e.target.value;
                      setData({ ...data, bodyParagraphs: updated });
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  />
                </div>
              ))}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Closing Call to Action
                </label>
                <textarea
                  rows={2}
                  value={data.closingParagraph}
                  onChange={e => setData({ ...data, closingParagraph: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Right: Live Formatted Letter Document */}
          <div className="w-full lg:w-1/2 space-y-4">
            <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-between no-print">
              <span className="text-xs font-bold text-slate-700">Cover Letter Preview</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy Text'}
                </button>
                <button
                  type="button"
                  onClick={() => triggerPrintResume(`${data.personalInfo.fullName}_Cover_Letter`)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 text-xs font-bold shadow-sm"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print / Save PDF
                </button>
              </div>
            </div>

            {/* Letter Paper Document */}
            <div
              id="cover-letter-paper"
              className="bg-white border border-slate-200 rounded-sm shadow-lg p-8 sm:p-12 text-slate-800 text-sm leading-relaxed space-y-5 font-sans min-h-[900px]"
            >
              {/* Sender Header */}
              <div className="border-b border-slate-200 pb-4">
                <h3 className="text-xl font-bold text-slate-900 uppercase tracking-wide">
                  {data.personalInfo.fullName}
                </h3>
                <div className="flex flex-wrap gap-x-4 text-xs text-slate-600 mt-1">
                  <span>{data.personalInfo.email}</span>
                  <span>{data.personalInfo.phone}</span>
                  <span>{data.personalInfo.location}</span>
                </div>
              </div>

              {/* Date & Recipient */}
              <div className="space-y-1 text-xs text-slate-600">
                <p className="font-semibold text-slate-800">{data.date}</p>
                <div className="pt-2">
                  <p className="font-bold text-slate-900">{data.recipient.hiringManager}</p>
                  <p className="font-semibold text-slate-800">{data.recipient.companyName}</p>
                  {data.recipient.companyAddress && <p>{data.recipient.companyAddress}</p>}
                </div>
              </div>

              {/* Body */}
              <div className="space-y-4 pt-2 text-slate-800">
                <p className="font-semibold">{data.greeting}</p>
                <p>{data.openingParagraph}</p>
                {data.bodyParagraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
                <p>{data.closingParagraph}</p>
              </div>

              {/* Signoff */}
              <div className="pt-4 space-y-3">
                <p>{data.signoff}</p>
                <p className="font-bold text-slate-900">{data.personalInfo.fullName}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
