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
    <div className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300 no-print pb-safe">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-300 p-4 sm:p-5 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center flex-shrink-0">
              <Cookie className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Cookie & Storage Notice
              </h4>
              <span className="text-[11px] font-bold text-emerald-800 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-700" />
                Privacy-First Analytics &amp; Local Storage
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleAcknowledge}
            className="text-slate-600 hover:text-slate-900 p-1 rounded-md"
            aria-label="Close notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-700 leading-relaxed">
          CVMake uses privacy-friendly Google Analytics to monitor site performance, <strong className="text-slate-900 font-semibold">zero advertising cookies</strong>, and <strong className="text-slate-900 font-semibold">no data selling</strong>. We use essential local browser storage (<code className="text-[10px] bg-slate-100 text-slate-800 font-mono px-1 py-0.5 rounded font-medium">localStorage</code>) to keep your resume drafts private on your device.
        </p>

        <div className="flex items-center justify-between gap-2 pt-1">
          <Link
            href="/privacy"
            className="text-xs font-bold text-slate-700 hover:text-indigo-700 underline underline-offset-4"
          >
            Cookie Policy
          </Link>
          <button
            type="button"
            onClick={handleAcknowledge}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-700 hover:bg-indigo-800 text-white rounded-xl text-xs font-bold shadow-sm transition-all active:scale-95"
          >
            <Check className="w-3.5 h-3.5" />
            Got it, Essential Only
          </button>
        </div>
      </div>
    </div>
  );
}
