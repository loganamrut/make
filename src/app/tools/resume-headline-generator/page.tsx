'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FaqSection } from '@/components/seo/FaqSection';
import { generateHeadlines } from '@/lib/ai-engine';
import { Copy, Check, ShieldCheck, Wand2, Compass } from 'lucide-react';

const HEADLINE_FAQS = [
  {
    question: 'What is a resume headline?',
    answer:
      'A resume headline (or tagline) is a one-sentence summary placed directly under your name and contact details that states your professional identity and core value proposition.',
  },
  {
    question: 'Why should I include a headline on my resume?',
    answer:
      'A sharp headline immediately clarifies your career level and specialty to both ATS keyword indexers and human recruiters scanning within seconds.',
  },
];

export default function ResumeHeadlineGeneratorPage() {
  const [title, setTitle] = useState('Senior Product Designer');
  const [focus, setFocus] = useState('Design Systems & Mobile UX');
  const [headlines, setHeadlines] = useState(
    generateHeadlines('Senior Product Designer', 'Design Systems & Mobile UX')
  );
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setHeadlines(generateHeadlines(title, focus));
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2000);
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <section className="pt-12 pb-12 bg-white border-b border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-3">
            <Compass className="w-3.5 h-3.5" />
            First Impressions Matter
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            AI Resume Headline Generator
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Craft punchy, memorable resume headlines that capture attention at first glance.
          </p>
          <div className="mt-3 flex items-center justify-center gap-1 text-xs text-emerald-700 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Runs client-side in browser • 100% Free
          </div>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
              Headline Parameters
            </h2>
            <form onSubmit={handleGenerate} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Professional Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  placeholder="e.g. Lead DevOps Engineer"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Specialty / Core Focus Area
                </label>
                <input
                  type="text"
                  value={focus}
                  onChange={e => setFocus(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  placeholder="e.g. Kubernetes, AWS & 99.99% Reliability"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-2 shadow transition-all"
              >
                <Wand2 className="w-4 h-4" />
                Generate Headlines
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-base font-bold text-slate-900">
              Generated Headline Options
            </h2>
            <div className="space-y-3">
              {headlines.map((hl, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between gap-3 hover:border-indigo-300 transition-colors"
                >
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">
                    {hl}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(hl, idx)}
                    className="flex-shrink-0 inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 px-2.5 py-1 rounded-md"
                  >
                    {copiedIdx === idx ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedIdx === idx ? 'Copied' : 'Copy'}
                  </button>
                </div>
              ))}
            </div>

            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-900">
                Want to build your complete resume?
              </span>
              <Link
                href="/builder"
                className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors shadow-sm"
              >
                Launch Builder &rarr;
              </Link>
            </div>
          </div>
        </div>
      </main>

      <FaqSection
        title="Resume Headline FAQs"
        faqs={HEADLINE_FAQS}
      />

      <Footer />
    </div>
  );
}
