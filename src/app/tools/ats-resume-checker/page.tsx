'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FaqSection } from '@/components/seo/FaqSection';
import { evaluateATS } from '@/lib/ats-evaluator';
import { SAMPLE_RESUME } from '@/lib/sample-data';
import { ResumeData } from '@/lib/types';
import {
  FileCheck,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Sparkles,
  RotateCcw,
} from 'lucide-react';

const ATS_CHECKER_FAQS = [
  {
    question: 'How accurate is this ATS resume checker?',
    answer:
      'Our checker tests against the exact structural heuristics used by major ATS engines (Taleo, Workday, Greenhouse, Lever), evaluating contact completeness, semantic headings, single-column reading hierarchy, action verb frequency, and measurable achievement metrics.',
  },
  {
    question: 'What is a passing ATS score?',
    answer:
      'An ATS score of 80 or above indicates strong readiness for automated parsing. A score between 70 and 79 is acceptable but can be improved by adding quantifiable results and standardizing dates.',
  },
  {
    question: 'Does this tool store my personal resume data?',
    answer:
      'No. The evaluation runs 100% inside your browser memory using client-side JavaScript. No resume text is ever sent or stored on our servers.',
  },
];

export default function AtsResumeCheckerPage() {
  const [resume, setResume] = useState<ResumeData>(SAMPLE_RESUME);
  const result = evaluateATS(resume);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <section className="pt-12 pb-12 bg-white border-b border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-3">
            <FileCheck className="w-3.5 h-3.5" />
            Live ATS Diagnostic Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Free ATS Resume Checker & Scorer
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Get an instant 0-100 ATS score and prioritized diagnostic checklist before submitting your job application.
          </p>
          <div className="mt-3 flex items-center justify-center gap-1 text-xs text-emerald-700 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            100% Client-Side In Browser • Zero Server Database
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 w-full flex-1 space-y-8">
        {/* Scorecard Hero Banner */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div
              className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center font-black text-3xl border-2 ${
                result.score >= 85
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  : result.score >= 70
                  ? 'border-amber-500 bg-amber-50 text-amber-700'
                  : 'border-rose-500 bg-rose-50 text-rose-700'
              }`}
            >
              <span>{result.score}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider -mt-1">/ 100</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">
                  Overall ATS Grade: {result.grade}
                </h2>
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-slate-100 text-slate-700">
                  {result.score >= 85 ? 'Excellent' : result.score >= 70 ? 'Good' : 'Needs Work'}
                </span>
              </div>
              <p className="text-sm text-slate-600 mt-1 max-w-md">
                {result.summary}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setResume(SAMPLE_RESUME)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Sample
            </button>
            <Link
              href="/builder"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition-all"
            >
              <Sparkles className="w-4 h-4" />
              Edit in Full Builder
            </Link>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
            <span className="text-xs text-slate-500 font-medium">Total Word Count</span>
            <p className="text-xl font-black text-slate-900 mt-1">{result.metrics.wordCount}</p>
            <span className="text-[10px] text-slate-400">Target: 400-800 words</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
            <span className="text-xs text-slate-500 font-medium">Action Verbs Found</span>
            <p className="text-xl font-black text-slate-900 mt-1">{result.metrics.actionVerbCount}</p>
            <span className="text-[10px] text-slate-400">Target: 4+ strong verbs</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
            <span className="text-xs text-slate-500 font-medium">Quantified Metrics</span>
            <p className="text-xl font-black text-slate-900 mt-1">{result.metrics.quantifiableResultsCount}</p>
            <span className="text-[10px] text-slate-400">Target: 3+ with %, $ or figures</span>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
            <span className="text-xs text-slate-500 font-medium">Est. Recruiter Scan</span>
            <p className="text-xl font-black text-slate-900 mt-1">~{result.metrics.estimatedReadingMinutes} min</p>
            <span className="text-[10px] text-slate-400">Optimal reading pace</span>
          </div>
        </div>

        {/* Diagnostic Checklist */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
            <span>ATS Diagnostic Checklist</span>
            <span className="text-xs font-semibold text-slate-500">
              {result.issues.filter(i => i.passed).length} Passed / {result.issues.length} Checks
            </span>
          </h3>

          <div className="space-y-3">
            {result.issues.map(issue => (
              <div
                key={issue.id}
                className={`p-4 rounded-xl border flex items-start gap-3.5 ${
                  issue.passed
                    ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
                    : issue.severity === 'critical'
                    ? 'bg-rose-50/50 border-rose-200 text-rose-950'
                    : 'bg-amber-50/50 border-amber-200 text-amber-950'
                }`}
              >
                {issue.passed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                ) : issue.severity === 'critical' ? (
                  <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className="font-bold text-sm">{issue.title}</h4>
                  <p className="text-xs leading-relaxed mt-0.5 opacity-90">
                    {issue.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <FaqSection
        title="ATS Resume Checker FAQs"
        faqs={ATS_CHECKER_FAQS}
      />

      <Footer />
    </div>
  );
}
