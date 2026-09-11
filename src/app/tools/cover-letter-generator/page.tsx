'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FaqSection } from '@/components/seo/FaqSection';
import { Sparkles, Copy, Check, ShieldCheck } from 'lucide-react';

const COVER_LETTER_FAQS = [
  {
    question: 'How long should a standard cover letter be?',
    answer:
      'A standard cover letter should be 3 to 4 paragraphs (between 250 and 380 words). It should fit cleanly on one page with standard margins and professional font sizing.',
  },
  {
    question: 'Should I customize my cover letter for every single job application?',
    answer:
      'Yes. Tailoring the company name, specific job title, and 1 or 2 relevant projects or skills proves to the hiring manager that you took time to understand their team and mission.',
  },
];

export default function CoverLetterToolPage() {
  const [name, setName] = useState('Alex Morgan');
  const [role, setRole] = useState('Senior Product Designer');
  const [company, setCompany] = useState('Starlight Tech');
  const [strengths, setStrengths] = useState('scaling design systems and improving conversion by 34%');
  const [copied, setCopied] = useState(false);

  const letterText = `Dear ${company} Hiring Team,

I am writing to express my enthusiastic interest in the ${role} position at ${company}. With a proven track record of ${strengths}, I am eager to contribute to your team's ongoing innovation and product excellence.

Throughout my career, I have focused on combining rigorous user research with rapid execution. At my previous positions, I spearheaded initiatives that aligned design architecture directly with measurable business KPIs, increasing user retention and developer velocity. What excites me most about ${company} is your commitment to high-impact products and customer-centric design.

I welcome the opportunity to discuss how my design leadership and strategic execution can deliver immediate value to ${company}. Thank you for your consideration, and I look forward to hearing from you.

Sincerely,
${name}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(letterText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <section className="pt-12 pb-12 bg-white border-b border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Instant Cover Letter Generator
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Quick AI Cover Letter Generator
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Draft a tailored, persuasive cover letter customized to your target company and role in seconds.
          </p>
          <div className="mt-3 flex items-center justify-center gap-1 text-xs text-emerald-700 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            100% Client-Side In Browser • Zero Server Storage
          </div>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
              Application Details
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Company Name
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Job Title
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Key Strengths / Measurable Wins
                </label>
                <textarea
                  rows={3}
                  value={strengths}
                  onChange={e => setStrengths(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">
                Generated Cover Letter
              </h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 px-3 py-1.5 rounded-lg bg-white shadow-sm"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy Text'}
                </button>
                <Link
                  href="/cover-letter-builder"
                  className="inline-flex items-center gap-1 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-3.5 py-1.5 rounded-lg shadow-sm"
                >
                  Full Builder &rarr;
                </Link>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm text-xs sm:text-sm text-slate-800 leading-relaxed font-sans whitespace-pre-line">
              {letterText}
            </div>
          </div>
        </div>
      </main>

      <FaqSection
        title="Cover Letter FAQs"
        faqs={COVER_LETTER_FAQS}
      />

      <Footer />
    </div>
  );
}
