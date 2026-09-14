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
  CheckCircle2,
  Cpu,
  FileCheck,
} from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setToolsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-15 gap-4">
          
          {/* Left: Brand Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <FileText className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight text-slate-900">
                  CV<span className="text-indigo-600">Make</span>
                </span>
                <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/70">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  100% Private
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 flex-1 justify-center max-w-2xl">
            <Link
              href="/resume-templates"
              className="px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors whitespace-nowrap"
            >
              Templates
            </Link>

            <Link
              href="/ai-resume-builder"
              className="px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors whitespace-nowrap"
            >
              Resume Builder
            </Link>

            <Link
              href="/ai-cv-maker"
              className="px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors whitespace-nowrap"
            >
              CV Maker
            </Link>

            <Link
              href="/cover-letter-builder"
              className="px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors whitespace-nowrap"
            >
              Cover Letter
            </Link>

            {/* Tools Dropdown Menu */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setToolsDropdownOpen(true)}
              onMouseLeave={() => setToolsDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors whitespace-nowrap"
              >
                Tools
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                    toolsDropdownOpen ? 'rotate-180 text-indigo-600' : ''
                  }`}
                />
              </button>

              {toolsDropdownOpen && (
                <div className="absolute top-full left-0 w-64 pt-2 z-50">
                  <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 p-2 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                    <Link
                      href="/ats-resume-builder"
                      onClick={() => setToolsDropdownOpen(false)}
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
                          Scan keywords & pass company filters
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/ai-resume-writer"
                      onClick={() => setToolsDropdownOpen(false)}
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
                          Generate impact bullet points
                        </div>
                      </div>
                    </Link>

                    <div className="h-px bg-slate-100 my-1" />

                    <Link
                      href="/tools"
                      onClick={() => setToolsDropdownOpen(false)}
                      className="flex items-center justify-between p-2 rounded-xl text-xs font-bold text-indigo-600 hover:bg-indigo-50 transition-colors"
                    >
                      <span>All 15+ Career Tools</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/blog"
              className="px-3 py-1.5 rounded-lg text-xs xl:text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors whitespace-nowrap"
            >
              Blog
            </Link>
          </nav>

          {/* Right: Quick Action CTAs */}
          <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
            <Link
              href="/builder?step=edit&mode=manual"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition-all shadow-xs whitespace-nowrap"
              title="Start with a blank canvas"
            >
              <PenTool className="w-3.5 h-3.5 text-slate-500" />
              <span>Manual Builder</span>
            </Link>
            <Link
              href="/builder?step=upload"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm shadow-indigo-200 active:scale-95 transition-all whitespace-nowrap"
              title="Launch full AI Studio"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>AI Resume Studio</span>
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/builder?step=upload"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-600 text-white text-xs font-bold whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>Studio</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-150">
          <div className="px-3 py-2 bg-emerald-50 border border-emerald-200/80 rounded-xl text-xs font-semibold text-emerald-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
            <span>100% Client-Side. Zero server data storage.</span>
          </div>

          <div className="grid grid-cols-1 gap-1 text-sm font-semibold text-slate-700">
            <Link
              href="/resume-templates"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-100"
            >
              <span>Resume Templates</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/ai-resume-builder"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-100"
            >
              <span>AI Resume Builder</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/ai-cv-maker"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-100"
            >
              <span>AI CV Maker</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/cover-letter-builder"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-100"
            >
              <span>Cover Letter Generator</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/ats-resume-builder"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-100"
            >
              <span>ATS Keyword Checker</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/ai-resume-writer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-100"
            >
              <span>AI Content Writer</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/tools"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-100"
            >
              <span>All Career Tools</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-100"
            >
              <span>Guides &amp; Blog</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>

          <div className="pt-2 grid grid-cols-2 gap-2">
            <Link
              href="/builder?step=edit&mode=manual"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-700 font-bold text-xs"
            >
              <PenTool className="w-3.5 h-3.5 text-slate-600" />
              <span>Manual</span>
            </Link>
            <Link
              href="/builder?step=upload"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>AI Studio</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
