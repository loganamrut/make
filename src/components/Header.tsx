'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Menu,
  X,
  Sparkles,
  FileText,
  ChevronDown,
  ChevronRight,
  PenTool,
  Cpu,
  FileCheck,
  Target,
  Wrench,
} from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  // Close dropdown on outside click or escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setToolsDropdownOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setToolsDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <header
      role="banner"
      className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs no-print"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3 lg:gap-4">
          
          {/* Left: Brand Logo + Trust Badge */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              href="/"
              title="CVMake – Free Privacy-First AI Resume Builder & CV Maker"
              className="flex items-center gap-2.5 group whitespace-nowrap"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <FileText className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight text-slate-900">
                  CV<span className="text-indigo-600">Make</span>
                </span>
                <span className="hidden xl:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/70 whitespace-nowrap">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  100% Free &amp; Private
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Semantic Desktop Navigation with Schema SiteNavigationElement */}
          <nav
            aria-label="Main Navigation"
            itemScope
            itemType="https://schema.org/SiteNavigationElement"
            className="hidden lg:flex items-center flex-1 justify-center max-w-2xl xl:max-w-3xl"
          >
            <ul role="menubar" className="flex items-center gap-1 xl:gap-1.5 list-none m-0 p-0">
              
              {/* 1. AI Resume Builder */}
              <li role="none">
                <Link
                  href="/ai-resume-builder/"
                  itemProp="url"
                  title="AI Resume Builder – ATS-Friendly Resume Maker with Live Scoring"
                  className="inline-flex items-center px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-100/80 transition-colors whitespace-nowrap"
                >
                  <span itemProp="name">AI Resume Builder</span>
                </Link>
              </li>

              {/* 2. AI CV Maker */}
              <li role="none">
                <Link
                  href="/ai-cv-maker/"
                  itemProp="url"
                  title="AI CV Maker – Free Professional Curriculum Vitae Generator"
                  className="inline-flex items-center px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-100/80 transition-colors whitespace-nowrap"
                >
                  <span itemProp="name">AI CV Maker</span>
                </Link>
              </li>

              {/* 3. Resume Templates */}
              <li role="none">
                <Link
                  href="/resume-templates/"
                  itemProp="url"
                  title="Resume Templates – 17+ ATS Tested Professional Templates"
                  className="inline-flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-100/80 transition-colors whitespace-nowrap"
                >
                  <span itemProp="name">Templates</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 leading-none">
                    17
                  </span>
                </Link>
              </li>

              {/* 4. Cover Letter Builder */}
              <li role="none">
                <Link
                  href="/cover-letter-builder/"
                  itemProp="url"
                  title="AI Cover Letter Builder – Tailored Job Application Letters"
                  className="inline-flex items-center px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-100/80 transition-colors whitespace-nowrap"
                >
                  <span itemProp="name">Cover Letter</span>
                </Link>
              </li>

              {/* 5. Crawlable AI Career Tools Dropdown */}
              <li
                ref={dropdownRef}
                role="none"
                className="relative"
                onMouseEnter={() => setToolsDropdownOpen(true)}
                onMouseLeave={() => setToolsDropdownOpen(false)}
              >
                <button
                  type="button"
                  aria-expanded={toolsDropdownOpen}
                  aria-haspopup="true"
                  onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                  className="inline-flex items-center gap-1 px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-100/80 transition-colors whitespace-nowrap"
                >
                  <span>Tools</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                      toolsDropdownOpen ? 'rotate-180 text-indigo-600' : ''
                    }`}
                  />
                </button>

                {/* Permanent DOM Dropdown for 100% Crawlability & SEO Link Equity */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 w-72 pt-2 z-50 transition-all duration-150 ${
                    toolsDropdownOpen
                      ? 'opacity-100 visible translate-y-0 pointer-events-auto'
                      : 'opacity-0 invisible -translate-y-1 pointer-events-none'
                  }`}
                >
                  <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 p-2 space-y-1">
                    <Link
                      href="/ats-resume-builder/"
                      onClick={() => setToolsDropdownOpen(false)}
                      title="ATS Resume Checker – Check Keywords & Pass Recruiter Filters"
                      className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-emerald-100 transition-colors">
                        <FileCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          ATS Resume Checker
                        </div>
                        <div className="text-[11px] text-slate-500 leading-tight mt-0.5">
                          Audit keyword density &amp; formatting compliance
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/ai-resume-writer/"
                      onClick={() => setToolsDropdownOpen(false)}
                      title="AI Resume Writer – Generate Bullet Points & Summaries"
                      className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-indigo-100 transition-colors">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          AI Resume Writer
                        </div>
                        <div className="text-[11px] text-slate-500 leading-tight mt-0.5">
                          Google XYZ formula achievement generator
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/tools/resume-summary-generator/"
                      onClick={() => setToolsDropdownOpen(false)}
                      title="Resume Summary Generator – Professional Career Summaries"
                      className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-violet-50 text-violet-700 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-violet-100 transition-colors">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          Summary Generator
                        </div>
                        <div className="text-[11px] text-slate-500 leading-tight mt-0.5">
                          High-converting 3-sentence career pitches
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/tools/job-description-to-resume/"
                      onClick={() => setToolsDropdownOpen(false)}
                      title="Job Description Matcher – Tailor Resume to Any Job"
                      className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-amber-100 transition-colors">
                        <Target className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          Job Spec Matcher
                        </div>
                        <div className="text-[11px] text-slate-500 leading-tight mt-0.5">
                          Extract missing skills from job descriptions
                        </div>
                      </div>
                    </Link>

                    <div className="h-px bg-slate-100 my-1" />

                    <Link
                      href="/tools/"
                      onClick={() => setToolsDropdownOpen(false)}
                      title="All Free AI Resume & Career Tools"
                      className="flex items-center justify-between p-2 rounded-xl text-xs font-bold text-indigo-600 hover:bg-indigo-50 transition-colors"
                    >
                      <span className="flex items-center gap-1.5">
                        <Wrench className="w-3.5 h-3.5" />
                        All 15+ Career Tools
                      </span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </li>

              {/* 6. Blog & Career Guides */}
              <li role="none">
                <Link
                  href="/blog/"
                  itemProp="url"
                  title="Resume Blog & Career Guides – Tips, Templates & ATS Insights"
                  className="inline-flex items-center px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-100/80 transition-colors whitespace-nowrap"
                >
                  <span itemProp="name">Blog</span>
                </Link>
              </li>

            </ul>
          </nav>

          {/* Right: Quick Action High-Converting CTAs */}
          <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
            <Link
              href="/builder?step=edit&mode=manual"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition-all shadow-xs whitespace-nowrap"
              title="Start with a blank canvas or edit sample template"
            >
              <PenTool className="w-3.5 h-3.5 text-slate-500" />
              <span>Manual Builder</span>
            </Link>
            <Link
              href="/builder?step=upload"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm shadow-indigo-200 active:scale-95 transition-all whitespace-nowrap"
              title="Launch full AI Studio with Neural OCR & AI suggestions"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>AI Resume Studio</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-1.5">
            <Link
              href="/builder?step=upload"
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold whitespace-nowrap shadow-xs min-h-[38px]"
              title="Launch AI Studio"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>AI Studio</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 min-h-[44px] min-w-[44px] rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation with Structured Semantic Sections */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-8 space-y-4 max-h-[calc(100dvh-4rem)] overflow-y-auto animate-in slide-in-from-top-2 duration-150 shadow-xl">
          
          {/* Privacy Trust Banner */}
          <div className="px-3 py-2 bg-emerald-50 border border-emerald-200/80 rounded-xl text-xs font-semibold text-emerald-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
            <span>100% Client-Side Private • Zero server data retention</span>
          </div>

          {/* Core AI Builders */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-1">
              AI Builders
            </div>
            <div className="grid grid-cols-1 gap-0.5 text-sm font-semibold text-slate-700">
              <Link
                href="/ai-resume-builder/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-100"
              >
                <span>AI Resume Builder</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/ai-cv-maker/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-100"
              >
                <span>AI CV Maker</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/cover-letter-builder/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-100"
              >
                <span>AI Cover Letter Generator</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </div>

          {/* Templates */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-1">
              Resume Templates
            </div>
            <div className="grid grid-cols-1 gap-0.5 text-sm font-semibold text-slate-700">
              <Link
                href="/resume-templates/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-100"
              >
                <div className="flex items-center gap-2">
                  <span>17+ ATS Tested Templates</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                    Free
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </div>

          {/* Free Tools */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-1">
              Free AI Tools
            </div>
            <div className="grid grid-cols-1 gap-0.5 text-sm font-semibold text-slate-700">
              <Link
                href="/ats-resume-builder/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-100"
              >
                <span>ATS Keyword Checker</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/ai-resume-writer/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-100"
              >
                <span>AI Resume Bullet Writer</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/tools/resume-summary-generator/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-100"
              >
                <span>Professional Summary Generator</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/tools/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 px-3 rounded-lg text-indigo-600 font-bold hover:bg-indigo-50"
              >
                <span>All 15+ Career Tools</span>
                <ChevronRight className="w-4 h-4 text-indigo-500" />
              </Link>
            </div>
          </div>

          {/* Resources & Guides */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-1">
              Resources
            </div>
            <div className="grid grid-cols-1 gap-0.5 text-sm font-semibold text-slate-700">
              <Link
                href="/blog/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-100"
              >
                <span>Career Guides &amp; Blog</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/privacy/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <span>Client-Side Privacy Guarantee</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </div>

          {/* Conversion Actions */}
          <div className="pt-2 grid grid-cols-2 gap-2">
            <Link
              href="/builder?step=edit&mode=manual"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-700 font-bold text-xs shadow-xs"
            >
              <PenTool className="w-3.5 h-3.5 text-slate-600" />
              <span>Manual Builder</span>
            </Link>
            <Link
              href="/builder?step=upload"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-sm shadow-indigo-200"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>AI Resume Studio</span>
            </Link>
          </div>

        </div>
      )}
    </header>
  );
}
