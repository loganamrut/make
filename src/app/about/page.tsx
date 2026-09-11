import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About CVMake | Private AI Resume & CV Builder',
  description:
    'Learn about CVMake, our mission to build transparent, privacy-first career software, and why we operate without databases.',
  alternates: {
    canonical: 'https://cvmake.dev/about/',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <section className="pt-12 pb-16 bg-slate-50 border-b border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Our Mission & Philosophy
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            About CVMake
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Building the next generation of career development tools — private, fast, and accessible to every job seeker.
          </p>
        </div>
      </section>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-14 w-full flex-1 space-y-10 text-slate-700 text-base leading-relaxed">
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900">
            Why We Built CVMake
          </h2>
          <p>
            The modern job application process is broken. Candidates spend hours polishing their career narratives only to encounter two frustrating barriers: predatory "free" resume builders that hold finished PDFs hostage behind subscription paywalls, and commercial platforms that aggregate and sell candidate employment histories.
          </p>
          <p>
            We created <strong>CVMake</strong> to provide an honest, powerful alternative: an AI-assisted resume and CV builder that runs entirely in your web browser with zero traditional backend database.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900">
            Our Core Principles
          </h2>
          <div className="space-y-4">
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50">
              <h3 className="font-bold text-slate-900 text-base mb-1">
                1. Privacy is a Right, Not an Upgrade
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Your resume contains your full name, home location, phone number, salary benchmarks, and intimate employment history. It should never be stored on a server where it can be breached or mined for ad targeting.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50">
              <h3 className="font-bold text-slate-900 text-base mb-1">
                2. Real Utility Over AI Gimmicks
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Rather than generating hallucinated career filler, our AI assistants are designed around proven recruiter frameworks like the Google XYZ formula, helping you quantify your real-world achievements.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50">
              <h3 className="font-bold text-slate-900 text-base mb-1">
                3. Technical Excellence & Speed
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Built with modern web standards, CVMake loads instantaneously, requires zero software installations, and produces pixel-perfect vector PDFs formatted for both US Letter and international A4 sheets.
              </p>
            </div>
          </div>
        </section>

        <div className="pt-6 text-center">
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all"
          >
            Start Building Your Resume With CVMake &rarr;
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
