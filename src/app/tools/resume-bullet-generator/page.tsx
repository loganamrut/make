'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FaqSection } from '@/components/seo/FaqSection';
import { generateAchievementBullets } from '@/lib/ai-engine';
import {
  Copy,
  Check,
  ShieldCheck,
  Wand2,
  TrendingUp,
} from 'lucide-react';

const BULLET_FAQS = [
  {
    question: 'What is the Google XYZ formula for resume bullet points?',
    answer:
      'The Google XYZ formula is: "Accomplished [X] as measured by [Y] by doing [Z]". It was popularized by Laszlo Bock, former SVP of People Operations at Google, as the most compelling way to articulate career achievements.',
  },
  {
    question: 'What if I don’t have exact metric numbers?',
    answer:
      'Estimate reasonable scopes. For example: "streamlined report generation, saving approximately 4 hours per week" or "managed a team of 5 engineers" or "improved client satisfaction across 20+ corporate accounts".',
  },
  {
    question: 'Why avoid "Responsible for" on a resume?',
    answer:
      '"Responsible for" denotes a task assignment rather than an outcome. Starting bullet points with strong action verbs like "Spearheaded", "Architected", or "Automated" demonstrates initiative and leadership.',
  },
];

export default function ResumeBulletGeneratorPage() {
  const [role, setRole] = useState('Software Engineer');
  const [task, setTask] = useState('responsible for database performance and query optimization');
  const [metric, setMetric] = useState('reducing p95 latency by 38%');
  const [bullets, setBullets] = useState(
    generateAchievementBullets('Software Engineer', 'responsible for database performance and query optimization', 'reducing p95 latency by 38%')
  );
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setBullets(generateAchievementBullets(role, task, metric));
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
            <TrendingUp className="w-3.5 h-3.5" />
            Google XYZ Formula Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            AI Resume Bullet Point Generator
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Transform ordinary task descriptions into high-impact, quantified achievement bullet points that impress recruiters.
          </p>
          <div className="mt-3 flex items-center justify-center gap-1 text-xs text-emerald-800 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            Runs client-side in browser • Zero server database
          </div>
        </div>
      </section>

      {/* Main Tool */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
              Input Task Description
            </h2>
            <form onSubmit={handleGenerate} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Role / Title
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  placeholder="e.g. Operations Specialist"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  What did you do? (Basic task/duty)
                </label>
                <textarea
                  rows={3}
                  value={task}
                  onChange={e => setTask(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  placeholder="e.g. helped with client onboarding and fixed errors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Measurable Impact or Metric (Optional)
                </label>
                <input
                  type="text"
                  value={metric}
                  onChange={e => setMetric(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  placeholder="e.g. saving 5 hours/week, 30% increase"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-2 shadow transition-all"
              >
                <Wand2 className="w-4 h-4" />
                Generate Quantified Bullets
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-base font-bold text-slate-900">
              Enhanced Achievement Bullets
            </h2>
            <div className="space-y-3">
              {bullets.map((b, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between gap-3 hover:border-indigo-300 transition-colors"
                >
                  <p className="text-xs sm:text-sm text-slate-800 leading-snug">
                    • {b}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleCopy(b, idx)}
                    className="flex-shrink-0 inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-slate-900 border border-slate-300 px-2.5 py-1 rounded-md"
                  >
                    {copiedIdx === idx ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedIdx === idx ? 'Copied' : 'Copy'}
                  </button>
                </div>
              ))}
            </div>

            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-900">
                Ready to assemble your full resume?
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

      {/* SEO content */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4 text-slate-700 text-sm leading-relaxed">
          <h2 className="text-xl font-bold text-slate-900">
            The Psychology of Quantified Resume Bullets
          </h2>
          <p>
            When hiring managers review hundreds of applications for a single opening, paragraphs of text blend together. Clear, scannable bullet points anchored by dynamic action verbs and numeric indicators instantly stand out.
          </p>
          <p>
            By showing the exact percentage, dollar amount, or efficiency gains you produced, you provide concrete proof of your competence.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <FaqSection
        title="Bullet Generator FAQs"
        faqs={BULLET_FAQS}
      />

      <Footer />
    </div>
  );
}
