import React from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service | CVMake',
  description: 'Terms of service for using CVMake.dev.',
  alternates: {
    canonical: 'https://cvmake.dev/terms/',
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <section className="pt-12 pb-12 bg-slate-50 border-b border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-2 text-slate-600 text-sm">
            Last Updated: September 2026
          </p>
        </div>
      </section>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 w-full flex-1 space-y-6 text-slate-700 text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing and using CVMake (cvmake.dev), you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use the service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">2. Service Description & Ownership</h2>
          <p>
            CVMake provides browser-based resume building, CV crafting, and document optimization tools. All intellectual property in generated resume and cover letter content belongs entirely to you. CVMake claims no ownership over your career records or finished documents.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">3. Disclaimers & Limitations</h2>
          <p>
            While CVMake is designed according to industry-standard ATS parsing heuristics and recruiter best practices, we do not and cannot guarantee employment offers, interview callbacks, or 100% acceptance by third-party proprietary software systems. The service is provided on an "as is" and "as available" basis without warranties of any kind.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">4. User Responsibility</h2>
          <p>
            You are solely responsible for ensuring the factual accuracy, honesty, and integrity of all career achievements, credentials, and contact details included in your resume.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
