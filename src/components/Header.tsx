'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Menu, X, Sparkles, FileText, ChevronRight } from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-200 group-hover:bg-indigo-700 transition-colors">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black tracking-tight text-slate-900">
                    CV<span className="text-indigo-600">Make</span>
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <ShieldCheck className="w-3 h-3" />
                    Private
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium leading-none hidden sm:block">
                  Privacy-First AI Builder
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-700">
            <Link
              href="/ai-resume-builder"
              className="hover:text-indigo-600 transition-colors"
            >
              AI Resume Builder
            </Link>
            <Link
              href="/ai-cv-maker"
              className="hover:text-indigo-600 transition-colors"
            >
              AI CV Maker
            </Link>
            <Link
              href="/resume-templates"
              className="hover:text-indigo-600 transition-colors"
            >
              Templates
            </Link>
            <Link
              href="/ats-resume-builder"
              className="hover:text-indigo-600 transition-colors"
            >
              ATS Resume
            </Link>
            <Link
              href="/ai-resume-writer"
              className="hover:text-indigo-600 transition-colors"
            >
              AI Writer
            </Link>
            <Link
              href="/cover-letter-builder"
              className="hover:text-indigo-600 transition-colors"
            >
              Cover Letter
            </Link>
            <Link
              href="/tools"
              className="hover:text-indigo-600 transition-colors"
            >
              Tools
            </Link>
            <Link
              href="/blog"
              className="hover:text-indigo-600 transition-colors"
            >
              Blog
            </Link>
          </nav>

          {/* Right Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/builder"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold text-sm shadow-sm hover:bg-indigo-700 active:scale-[0.98] transition-all"
            >
              <Sparkles className="w-4 h-4" />
              Create Resume
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/builder"
              className="inline-flex items-center px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold"
            >
              Build
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3">
          <div className="px-2 py-1.5 bg-emerald-50 rounded-lg text-xs font-medium text-emerald-800 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            100% Client-Side. Zero server database.
          </div>
          <div className="grid grid-cols-1 gap-1 pt-1 text-base font-medium text-slate-800">
            <Link
              href="/ai-resume-builder"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-100"
            >
              AI Resume Builder
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/ai-cv-maker"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-100"
            >
              AI CV Maker
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/resume-templates"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-100"
            >
              Resume Templates
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/ats-resume-builder"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-100"
            >
              ATS Resume Builder
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/ai-resume-writer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-100"
            >
              AI Resume Writer
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/cover-letter-builder"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-100"
            >
              Cover Letter Generator
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/tools"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-100"
            >
              Free Career Tools
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-100"
            >
              Career & Resume Guides
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>
          <div className="pt-2">
            <Link
              href="/builder"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 text-white font-bold text-base shadow"
            >
              <Sparkles className="w-5 h-5" />
              Launch Resume Builder
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
