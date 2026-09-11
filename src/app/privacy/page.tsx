import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy (Zero Database) | CVMake',
  description:
    'Our transparent privacy architecture: Your resume data remains strictly inside your browser. No remote database, no server tracking, no data selling.',
  alternates: {
    canonical: 'https://cvmake.dev/privacy/',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-12 pb-14 bg-gradient-to-b from-emerald-50/50 via-white to-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-xs font-bold mb-4 shadow-sm">
            <Lock className="w-4 h-4 text-emerald-700" />
            Zero Server Database Architecture
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Privacy Policy & Architecture
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            "Your resume stays in your browser. We don't store your resume or personal information on our servers."
          </p>
          <div className="mt-4 text-xs text-slate-700 font-medium">
            Last Updated: September 2026 • Effective Immediately
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 w-full flex-1 space-y-10 text-slate-800 text-sm sm:text-base leading-relaxed">
        {/* Core Manifesto Box */}
        <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
          <h2 className="text-lg font-bold text-emerald-950 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
            Our Core Privacy Commitment
          </h2>
          <p className="text-xs sm:text-sm text-emerald-900">
            Most online resume builders treat candidate data as a commodity: they store your name, phone number, salary history, and career details in remote databases, and some sell aggregated resumes to recruiters or data brokers.
          </p>
          <p className="text-xs sm:text-sm text-emerald-900 font-semibold">
            CVMake was founded on the fundamental principle that your career history belongs to you alone. We designed our entire platform from day one to operate with zero persistent application database.
          </p>
        </div>

        {/* Technical Architecture */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">
            1. How the Browser-Based System Works
          </h2>
          <p>
            When you enter your details into CVMake, the data is held in <strong>in-memory React state</strong> on your local device. If you enable autosave, it is synchronized to your local browser storage (<code className="px-1.5 py-0.5 bg-slate-100 rounded text-xs">window.localStorage</code>).
          </p>
          <div className="space-y-2">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-1" />
              <span>
                <strong>No Remote Database:</strong> We do not run PostgreSQL, MongoDB, Firebase, Supabase, Redis, or any server-side database storing user resumes.
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-1" />
              <span>
                <strong>No Mandatory Accounts:</strong> You are not forced to register an email, create a password, or authenticate with Google or Facebook.
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-1" />
              <span>
                <strong>Client-Side PDF Generation:</strong> Resumes and cover letters are rendered using client-side vector print formatting. No documents are uploaded to third-party PDF rendering microservices.
              </span>
            </div>
          </div>
        </section>

        {/* What We Do NOT Store */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">
            2. Data We Do NOT Permanently Store
          </h2>
          <p>Our servers never permanently store or record:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700">
              ❌ Full Name
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700">
              ❌ Email Address
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700">
              ❌ Phone Number
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700">
              ❌ Home Address / Location
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700">
              ❌ Employment History
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700">
              ❌ Education Records
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700">
              ❌ Generated Cover Letters
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700">
              ❌ Uploaded Documents
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700">
              ❌ Recruiter Search Logs
            </div>
          </div>
        </section>

        {/* AI Processing Details */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">
            3. How AI Features Operate
          </h2>
          <p>
            The majority of AI features in CVMake (including action verb scoring, Google XYZ bullet formulation, ATS diagnostics, and skill recommendations) run completely offline inside your browser using deterministic algorithms.
          </p>
          <p>
            When optional serverless AI completion endpoints are invoked to rewrite text, requests are processed statelessly in memory with <strong>zero logging of candidate resume content</strong>. We never train public AI models on your submitted text.
          </p>
        </section>

        {/* Cookie & Client-Side Storage Policy */}
        <section id="cookies" className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">
            4. Cookie & Client-Side Storage Policy
          </h2>
          <p>
            CVMake complies fully with GDPR, the EU ePrivacy Directive, and California privacy standards through a simple approach: <strong>we do not use non-essential or tracking cookies</strong>.
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 text-xs">
            <div className="font-bold text-slate-800">Summary of Client-Side Storage:</div>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>cvmake_resume_draft_v1:</strong> Essential local storage key used strictly to preserve your in-progress resume text across page reloads. Kept only on your device.</li>
              <li><strong>cvmake_cover_letter_draft_v1:</strong> Essential local storage key used to preserve your drafted cover letter on your device.</li>
              <li><strong>cvmake_cookie_consent_v1:</strong> Remembers your acknowledgment of this notice so you aren’t shown redundant prompts.</li>
            </ul>
          </div>
          <p className="text-xs text-slate-600">
            Because we use zero tracking, marketing, or behavioral profiling cookies, you will never see intrusive third-party cookie walls or pay-for-privacy mechanisms on CVMake.
          </p>
        </section>

        {/* Tracking & Analytics */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">
            5. No Invasive Analytics & No Advertising Trackers
          </h2>
          <p>
            We do not install invasive session replay tools (such as Hotjar or FullStory), ad remarketing pixels (Meta Pixel, Google Ads), or data broker SDKs. We do not sell, rent, or monetize your resume data under any circumstance.
          </p>
        </section>

        {/* Clearing Your Data */}
        <section className="space-y-4 border-t border-slate-200 pt-8">
          <h2 className="text-xl font-bold text-slate-900">
            6. How to Clear Locally Stored Data
          </h2>
          <p>
            Because your resume drafts reside in your browser’s local storage, you have total control over them at all times. You can delete your saved resume with one click inside the builder toolbar, or by clearing your browser cache and cookies for <code className="px-1.5 py-0.5 bg-slate-100 rounded text-xs">cvmake.dev</code>.
          </p>
          <div className="pt-2">
            <Link
              href="/builder"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors"
            >
              Open Builder to Manage Local Data &rarr;
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
