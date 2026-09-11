'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FaqSection } from '@/components/seo/FaqSection';
import { generateProfessionalSummaries } from '@/lib/ai-engine';
import {
  Sparkles,
  Copy,
  Check,
  ShieldCheck,
  Wand2,
} from 'lucide-react';

const SUMMARY_FAQS = [
  {
    question: 'How long should a resume professional summary be?',
    answer:
      'The ideal professional summary is between 2 and 4 sentences (approximately 40 to 70 words). It should state your target role, years of experience, primary domain strengths, and a standout quantified achievement.',
  },
  {
    question: 'Should I write in first-person ("I") or third-person?',
    answer:
      'Resume summaries are conventionally written in implied first-person without pronouns. Instead of saying "I am an experienced engineer", write "Accomplished Senior Software Engineer with 7+ years of experience...".',
  },
  {
    question: 'Are these summaries ATS-friendly?',
    answer:
      'Yes. Our summaries feature industry-standard keywords, clear job titles, and standard terminology easily indexed by ATS parsers.',
  },
];

export default function ResumeSummaryGeneratorPage() {
  const [jobTitle, setJobTitle] = useState('Senior Software Engineer');
  const [experience, setExperience] = useState('6+');
  const [strengths, setStrengths] = useState('cloud infrastructure, microservices, and reducing latency');
  const [industry, setIndustry] = useState('technology & SaaS');
  const [results, setResults] = useState(
    generateProfessionalSummaries('Senior Software Engineer', '6+', 'cloud infrastructure, microservices, and reducing latency', 'technology & SaaS')
  );
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const generated = generateProfessionalSummaries(jobTitle, experience, strengths, industry);
    setResults(generated);
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

      {/* Hero */}
      <section className="pt-12 pb-12 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Free AI Resume Tool
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            AI Resume Summary Generator
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Generate 3 recruiter-approved professional summaries tailored to your title, years of experience, and key strengths in seconds.
          </p>
          <div className="mt-3 flex items-center justify-center gap-1 text-xs text-emerald-800 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            Runs 100% locally in your browser • Zero data stored
          </div>
        </div>
      </section>

      {/* Interactive Tool Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
              Your Professional Background
            </h2>
            <form onSubmit={handleGenerate} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Job Title
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={e => setJobTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  placeholder="e.g. Product Marketing Manager"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Years of Experience
                </label>
                <input
                  type="text"
                  value={experience}
                  onChange={e => setExperience(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  placeholder="e.g. 5+"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Primary Domain / Industry
                </label>
                <input
                  type="text"
                  value={industry}
                  onChange={e => setIndustry(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  placeholder="e.g. Fintech, Healthcare, E-Commerce"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Key Strengths & Notable Outcomes
                </label>
                <textarea
                  rows={3}
                  value={strengths}
                  onChange={e => setStrengths(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  placeholder="e.g. user acquisition, A/B testing, revenue expansion"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-2 shadow transition-all"
              >
                <Wand2 className="w-4 h-4" />
                Generate Summaries Now
              </button>
            </form>
          </div>

          {/* Results */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-base font-bold text-slate-900">
              Generated Summary Options
            </h2>
            <div className="space-y-4">
              {results.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 relative hover:border-indigo-300 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md">
                      {item.style}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(item.text, idx)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-slate-900 border border-slate-300 px-2.5 py-1 rounded-md"
                    >
                      {copiedIdx === idx ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedIdx === idx ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-900">
                Ready to insert this into a full ATS resume?
              </span>
              <Link
                href="/builder"
                className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors shadow-sm"
              >
                Open Full Builder &rarr;
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* SEO Explainer Content */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4 text-slate-700 text-sm leading-relaxed">
          <h2 className="text-xl font-bold text-slate-900">
            Why a Strong Professional Summary Matters in 2026
          </h2>
          <p>
            Recruiters typically review submitted resumes for an average of 6 to 7 seconds. An effective professional summary provides an immediate executive snapshot of who you are, what problems you solve, and what value you will deliver to the hiring organization.
          </p>
          <p>
            Avoid cliché phrasing like "hardworking team player looking for a challenging opportunity." Instead, frame your narrative around verifiable competencies, scope of responsibility, and measurable business outcomes.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <FaqSection
        title="Resume Summary FAQs"
        faqs={SUMMARY_FAQS}
      />

      <Footer />
    </div>
  );
}
