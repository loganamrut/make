'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FaqSection } from '@/components/seo/FaqSection';
import { Sparkles, ShieldCheck, CheckCircle2, AlertCircle, FileSearch } from 'lucide-react';

const MATCHER_FAQS = [
  {
    question: 'How does the Job Description Matcher work?',
    answer:
      'The tool scans both texts using client-side natural language heuristics, strips common filler words (stop words), identifies critical technical keywords, methodologies, and tools, and computes the overlap percentage.',
  },
  {
    question: 'Does this tool upload my resume or job description to a server?',
    answer:
      'No. The text parsing is computed 100% locally in your browser memory via JavaScript. Nothing is sent across the internet.',
  },
  {
    question: 'What is a good match percentage for ATS?',
    answer:
      'Aim for a 65% to 80% keyword alignment. You do not need 100% match (which can look unnatural or keyword-stuffed). Incorporate the missing terms naturally into your work experience bullet points.',
  },
];

const STOP_WORDS = new Set([
  'the', 'and', 'to', 'of', 'a', 'in', 'for', 'is', 'on', 'that', 'by', 'this',
  'with', 'i', 'you', 'it', 'not', 'or', 'be', 'are', 'from', 'at', 'as', 'your',
  'all', 'have', 'new', 'more', 'an', 'was', 'we', 'will', 'my', 'can', 'us',
  'about', 'if', 'our', 'out', 'up', 'so', 'what', 'which', 'their', 'has', 'into',
  'job', 'work', 'experience', 'responsible', 'years', 'required', 'preferred',
]);

export default function JobDescriptionToResumePage() {
  const [jobDescription, setJobDescription] = useState(
    'We are seeking a Senior Full-Stack Engineer with strong TypeScript, React, Next.js, and Node.js expertise. Must have experience with PostgreSQL, Redis, Kubernetes, AWS cloud architectures, CI/CD pipelines, and agile scrums. The ideal candidate has demonstrated leadership in microservices migrations and system scalability.'
  );
  const [resumeText, setResumeText] = useState(
    'Senior Full-Stack Engineer with 7+ years designing scalable cloud applications. Proficient in TypeScript, React, Next.js, Node.js, and PostgreSQL. Experienced with Docker, Git, CI/CD automation, and agile team mentorship.'
  );

  const extractKeywords = (text: string): string[] => {
    const words = text
      .toLowerCase()
      .replace(/[^a-z0-9#+.]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 2 && !STOP_WORDS.has(w));

    // Deduplicate
    return Array.from(new Set(words));
  };

  const jobKeywords = extractKeywords(jobDescription);
  const resumeKeywords = extractKeywords(resumeText);

  const matched = jobKeywords.filter(k => resumeKeywords.includes(k));
  const missing = jobKeywords.filter(k => !resumeKeywords.includes(k));
  const matchPct = jobKeywords.length > 0 ? Math.round((matched.length / jobKeywords.length) * 100) : 0;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <section className="pt-12 pb-12 bg-white border-b border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-3">
            <FileSearch className="w-3.5 h-3.5" />
            ATS Keyword Alignment
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Job Description to Resume Matcher
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Paste a job description and your resume text to uncover missing keywords and boost your match rate.
          </p>
          <div className="mt-3 flex items-center justify-center gap-1 text-xs text-emerald-700 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            100% In-Browser Analysis • Zero Data Uploaded
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 w-full flex-1 space-y-8">
        {/* Input Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              1. Paste Target Job Description
            </label>
            <textarea
              rows={8}
              value={jobDescription}
              onChange={e => setJobDescription(e.target.value)}
              placeholder="Paste requirements, responsibilities, and qualifications..."
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none leading-relaxed"
            />
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              2. Paste Your Resume Content
            </label>
            <textarea
              rows={8}
              value={resumeText}
              onChange={e => setResumeText(e.target.value)}
              placeholder="Paste your summary, bullets, and skills section..."
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none leading-relaxed"
            />
          </div>
        </div>

        {/* Results Banner */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-4">
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black border-2 ${
                  matchPct >= 70
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : matchPct >= 50
                    ? 'border-amber-500 bg-amber-50 text-amber-700'
                    : 'border-rose-500 bg-rose-50 text-rose-700'
                }`}
              >
                {matchPct}%
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Target Keyword Match Score
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {matched.length} matched keywords out of {jobKeywords.length} identified requirements
                </p>
              </div>
            </div>

            <Link
              href="/builder"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-all"
            >
              <Sparkles className="w-4 h-4" />
              Optimize in Builder
            </Link>
          </div>

          {/* Missing Keywords */}
          <div>
            <h3 className="text-xs font-bold text-rose-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              Missing Keywords ({missing.length}) — Consider Adding These
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {missing.map((word, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200"
                >
                  + {word}
                </span>
              ))}
            </div>
          </div>

          {/* Matched Keywords */}
          <div className="pt-2">
            <h3 className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Matched Keywords ({matched.length}) — Already Present in Resume
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {matched.map((word, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200"
                >
                  ✓ {word}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>

      <FaqSection
        title="Job Description Matcher FAQs"
        faqs={MATCHER_FAQS}
      />

      <Footer />
    </div>
  );
}
