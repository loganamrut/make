'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FaqSection } from '@/components/seo/FaqSection';
import { ACTION_VERBS } from '@/lib/ai-engine';
import { ShieldCheck, CheckCircle2, AlertTriangle, Search } from 'lucide-react';

const CLICHE_WORDS = [
  'hardworking', 'team player', 'think outside the box', 'go-getter', 'self-motivated',
  'synergy', 'detail-oriented', 'fast-paced', 'dynamic', 'results-driven', 'proven track record',
  'responsible for', 'helped with', 'did', 'handled',
];

const KEYWORD_FAQS = [
  {
    question: 'Why do action verbs matter on a resume?',
    answer:
      'Action verbs convey leadership, autonomy, and execution capability. Resumes beginning bullets with strong verbs like Spearheaded or Engineered register higher recruiter engagement than passive descriptions.',
  },
  {
    question: 'What buzzwords should I eliminate from my resume?',
    answer:
      'Avoid vague buzzwords like "hardworking team player" or "outside the box thinker." Instead, let your verifiable achievements and quantifiable metrics demonstrate your competence.',
  },
];

export default function ResumeKeywordCheckerPage() {
  const [text, setText] = useState(
    'Spearheaded high-throughput microservices processing 45M+ daily transactions. Engineered responsive React dashboards for 120,000 users. Responsible for team player collaboration and handled system updates.'
  );

  const lowerText = text.toLowerCase();
  const detectedVerbs = ACTION_VERBS.filter(v => lowerText.includes(v.toLowerCase()));
  const detectedCliches = CLICHE_WORDS.filter(c => lowerText.includes(c));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <section className="pt-12 pb-12 bg-white border-b border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-3">
            <Search className="w-3.5 h-3.5" />
            Vocabulary & Impact Scanner
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Resume Keyword & Vocabulary Checker
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Scan your resume for high-impact executive action verbs and weed out overused passive clichés.
          </p>
          <div className="mt-3 flex items-center justify-center gap-1 text-xs text-emerald-700 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            100% Client-Side • Instant Analysis
          </div>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 w-full flex-1 space-y-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
            Paste Resume Bullet Points or Summary
          </label>
          <textarea
            rows={6}
            value={text}
            onChange={e => setText(e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none leading-relaxed"
            placeholder="Paste your resume content here..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Action verbs */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h2 className="text-sm font-bold text-emerald-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Power Action Verbs Found ({detectedVerbs.length})
              </h2>
            </div>
            {detectedVerbs.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {detectedVerbs.map((v, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200"
                  >
                    ✓ {v}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">
                No major power action verbs detected. Try starting bullets with Spearheaded, Engineered, or Automated.
              </p>
            )}
          </div>

          {/* Clichés */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h2 className="text-sm font-bold text-amber-900 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Overused Clichés & Passive Terms ({detectedCliches.length})
              </h2>
            </div>
            {detectedCliches.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {detectedCliches.map((c, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200"
                  >
                    ⚠️ {c}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-emerald-600 font-medium">
                Great job! No common weak clichés detected.
              </p>
            )}
          </div>
        </div>

        <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 flex items-center justify-between">
          <span className="text-xs font-bold text-indigo-900">
            Build a complete resume with audited action verbs
          </span>
          <Link
            href="/builder"
            className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors shadow-sm"
          >
            Launch Builder &rarr;
          </Link>
        </div>
      </main>

      <FaqSection
        title="Keyword Scanner FAQs"
        faqs={KEYWORD_FAQS}
      />

      <Footer />
    </div>
  );
}
