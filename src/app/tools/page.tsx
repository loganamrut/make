import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { MICRO_TOOLS_DATA } from '@/lib/seo-data';
import {
  Wrench,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Resume & Career Tools | CVMake',
  description:
    'Free client-side career tools: ATS Resume Checker, Professional Summary Generator, Bullet Point Optimizer, Skills Suggester, and Cover Letter Creator.',
  alternates: {
    canonical: 'https://cvmake.dev/tools/',
  },
};

export default function ToolsHubPage() {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://cvmake.dev/' },
    { name: 'Tools', url: 'https://cvmake.dev/tools/' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <BreadcrumbSchema items={breadcrumbItems} />
      <Header />
      <Breadcrumbs items={breadcrumbItems} />

      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="pt-12 pb-16 bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-4">
              <Wrench className="w-3.5 h-3.5" />
              100% Free Client-Side Tools
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Free AI Resume & Career Tools
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              Interactive, browser-based utilities to optimize your resume bullets, analyze ATS compliance, discover role-specific skills, and generate cover letters.
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-emerald-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Zero server retention • All tools operate directly in your browser
            </div>
          </div>
        </section>

        {/* Grid of Tools */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MICRO_TOOLS_DATA.map(tool => (
            <div
              key={tool.slug}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                    {tool.badge}
                  </span>
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                </div>
                <h2 className="text-lg font-bold text-slate-900 mb-2">
                  <Link href={tool.href} className="hover:text-indigo-600 transition-colors">
                    {tool.title}
                  </Link>
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {tool.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={tool.href}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800"
                >
                  Launch Tool <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[10px] text-slate-400">Client-Side</span>
              </div>
            </div>
          ))}
        </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
