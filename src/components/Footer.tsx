import React from 'react';
import Link from 'next/link';
import { ShieldCheck, FileText, Lock } from 'lucide-react';
import { SocialIconBar } from '@/components/SocialIcons';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 no-print">
      {/* Privacy Banner */}
      <div className="bg-slate-950 border-b border-slate-800/80 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">
                Private by Design — Your Resume Stays in Your Browser
              </h3>
              <p className="text-xs text-slate-300 font-medium">
                Zero database. We do not store your name, email, work history, or documents on our servers.
              </p>
            </div>
          </div>
          <Link
            href="/privacy"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 underline underline-offset-4"
          >
            <ShieldCheck className="w-4 h-4" />
            Learn how client-side privacy works &rarr;
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="col-span-1 sm:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white font-bold">
                <FileText className="w-4 h-4" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                CV<span className="text-indigo-400">Make</span>
              </span>
            </Link>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              The privacy-first AI resume builder and AI CV maker. Create ATS-friendly resumes, optimize achievement bullet points, and export high-resolution PDFs without creating an account or storing data on remote servers.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Browser-only client storage active
            </div>

            {/* Official Social Media Channels */}
            <div className="pt-3 space-y-2">
              <span className="text-xs font-semibold text-slate-200 block">
                Official Channels &amp; Community:
              </span>
              <SocialIconBar />
            </div>
          </div>

          {/* Column 1: AI Builders */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              AI Builders
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/ai-resume-builder" className="hover:text-white transition-colors">
                  AI Resume Builder
                </Link>
              </li>
              <li>
                <Link href="/ai-cv-maker" className="hover:text-white transition-colors">
                  AI CV Maker
                </Link>
              </li>
              <li>
                <Link href="/resume-maker-ai" className="hover:text-white transition-colors">
                  Resume Maker AI
                </Link>
              </li>
              <li>
                <Link href="/free-ai-resume-builder" className="hover:text-white transition-colors">
                  Free AI Resume Builder
                </Link>
              </li>
              <li>
                <Link href="/free-ai-cv-maker" className="hover:text-white transition-colors">
                  Free AI CV Maker
                </Link>
              </li>
              <li>
                <Link href="/ats-resume-builder" className="hover:text-white transition-colors">
                  ATS Resume Builder
                </Link>
              </li>
              <li>
                <Link href="/ai-resume-writer" className="hover:text-white transition-colors">
                  AI Resume Writer
                </Link>
              </li>
              <li>
                <Link href="/cover-letter-builder" className="hover:text-white transition-colors">
                  AI Cover Letter Maker
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Resume Templates */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Templates
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/resume-templates" className="hover:text-white transition-colors">
                  All Resume Templates
                </Link>
              </li>
              <li>
                <Link href="/resume-templates/ats" className="hover:text-white transition-colors">
                  ATS Template
                </Link>
              </li>
              <li>
                <Link href="/resume-templates/modern" className="hover:text-white transition-colors">
                  Modern Template
                </Link>
              </li>
              <li>
                <Link href="/resume-templates/professional" className="hover:text-white transition-colors">
                  Professional Template
                </Link>
              </li>
              <li>
                <Link href="/resume-templates/student" className="hover:text-white transition-colors">
                  Student Template
                </Link>
              </li>
              <li>
                <Link href="/resume-templates/executive" className="hover:text-white transition-colors">
                  Executive Template
                </Link>
              </li>
              <li>
                <Link href="/cv-templates" className="hover:text-white transition-colors">
                  CV Templates
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Tools & Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Tools & Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/tools" className="hover:text-white transition-colors">
                  All Career Tools
                </Link>
              </li>
              <li>
                <Link href="/tools/ats-resume-checker" className="hover:text-white transition-colors">
                  ATS Resume Checker
                </Link>
              </li>
              <li>
                <Link href="/tools/resume-summary-generator" className="hover:text-white transition-colors">
                  Summary Generator
                </Link>
              </li>
              <li>
                <Link href="/tools/resume-bullet-generator" className="hover:text-white transition-colors">
                  Bullet Point Generator
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Career Guides & Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About CVMake
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors font-medium text-emerald-400">
                  Privacy Policy (No DB)
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300 font-medium">
          <p>© {new Date().getFullYear()} CVMake.dev. All rights reserved. Private AI Resume Builder & CV Maker.</p>
          <div className="flex items-center gap-4">
            <span>Privacy-First Analytics</span>
            <span>•</span>
            <span>No Ads</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1 text-slate-200">
              Made for job seekers everywhere
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
