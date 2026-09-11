'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, Cookie, Check, X } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'cvmake_cookie_consent_v1';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!consent) {
        // Show after a brief delay for smooth entrance
        const timer = setTimeout(() => setIsVisible(true), 800);
        return () => clearTimeout(timer);
      }
    } catch {
      // Storage unavailable
    }
  }, []);

  const handleAcknowledge = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'acknowledged');
    } catch {}
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300 no-print">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 p-5 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <Cookie className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Cookie & Storage Notice
              </h4>
              <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Zero Tracking Cookies
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleAcknowledge}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
            aria-label="Close notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          CVMake uses <strong>zero advertising cookies</strong>, <strong>zero third-party pixels</strong>, and <strong>no invasive tracking scripts</strong>. We only use essential browser storage (<code className="text-[10px] bg-slate-100 px-1 py-0.5 rounded">localStorage</code>) to save your resume drafts locally on your device.
        </p>

        <div className="flex items-center justify-between gap-2 pt-1">
          <Link
            href="/privacy"
            className="text-xs font-semibold text-slate-600 hover:text-indigo-600 underline underline-offset-4"
          >
            Cookie Policy
          </Link>
          <button
            type="button"
            onClick={handleAcknowledge}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all active:scale-95"
          >
            <Check className="w-3.5 h-3.5" />
            Got it, Essential Only
          </button>
        </div>
      </div>
    </div>
  );
}
