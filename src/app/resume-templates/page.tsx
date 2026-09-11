import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FaqSection } from '@/components/seo/FaqSection';
import { WebApplicationSchema, BreadcrumbSchema } from '@/components/seo/JsonLd';
import { TEMPLATE_SHOWCASES, SEO_LANDING_PAGES } from '@/lib/seo-data';
import { Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';

const pageData = SEO_LANDING_PAGES['resume-templates'];

export const metadata: Metadata = {
  title: pageData.title,
  description: pageData.metaDescription,
  alternates: {
    canonical: 'https://cvmake.dev/resume-templates/',
  },
  openGraph: {
    title: pageData.title,
    description: pageData.metaDescription,
    url: 'https://cvmake.dev/resume-templates/',
    type: 'website',
  },
};

export default function ResumeTemplatesPage() {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://cvmake.dev/' },
    { name: 'Resume Templates', url: 'https://cvmake.dev/resume-templates/' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <WebApplicationSchema
        name={pageData.title}
        description={pageData.metaDescription}
        url="https://cvmake.dev/resume-templates/"
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Header />

      <main id="main-content" className="flex-1">
        {/* Hero */}
      <section className="pt-12 pb-16 bg-gradient-to-b from-indigo-50/40 via-white to-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-6 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>9 Recruiter-Approved Layouts • 100% Free</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {pageData.h1}
          </h1>

          <p className="mt-4 text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {pageData.subtitle}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/builder"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-lg shadow-indigo-200 active:scale-[0.98] transition-all"
            >
              <Sparkles className="w-5 h-5" />
              Build Resume with Any Template
            </Link>
          </div>

          <p className="mt-4 text-xs text-slate-500">
            No account required. All templates are 100% ATS-friendly.
          </p>
        </div>
      </section>

      {/* Template Gallery Grid */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Explore Our 9 Resume Templates
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Click any template to learn more or launch it directly in the live builder.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEMPLATE_SHOWCASES.map(tpl => (
              <div
                key={tpl.slug}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col"
              >
                {/* Visual Preview Header Mockup */}
                <div className="h-44 bg-slate-100 border-b border-slate-200 p-4 flex flex-col justify-between relative overflow-hidden group">
                  <div className="space-y-1.5 opacity-75">
                    <div className="h-3 w-1/3 bg-slate-800 rounded"></div>
                    <div className="h-2 w-1/4 bg-slate-400 rounded"></div>
                    <div className="h-1.5 w-1/2 bg-slate-300 rounded pt-1"></div>
                    <div className="h-1.5 w-full bg-slate-200 rounded mt-3"></div>
                    <div className="h-1.5 w-5/6 bg-slate-200 rounded"></div>
                  </div>
                  <div className="flex justify-between items-center z-10">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-white/90 text-slate-800 px-2 py-0.5 rounded shadow-sm border border-slate-200">
                      {tpl.title}
                    </span>
                    <Link
                      href={`/builder?template=${tpl.slug}`}
                      className="text-xs font-bold text-indigo-600 bg-white px-2.5 py-1 rounded shadow-sm hover:bg-indigo-50 border border-slate-200 inline-flex items-center gap-1"
                    >
                      Use Template &rarr;
                    </Link>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      <Link
                        href={`/resume-templates/${tpl.slug}`}
                        className="hover:text-indigo-600 transition-colors"
                      >
                        {tpl.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-slate-500 italic mb-2">
                      Best for: {tpl.bestFor}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {tpl.tagline}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    {tpl.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex gap-2">
                    <Link
                      href={`/builder?template=${tpl.slug}`}
                      className="flex-1 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold text-center transition-colors shadow-sm"
                    >
                      Build With This
                    </Link>
                    <Link
                      href={`/resume-templates/${tpl.slug}`}
                      className="px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold text-center transition-colors"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro details */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-4 text-slate-700 text-base leading-relaxed">
          {pageData.introParagraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <FaqSection
        title="Frequently Asked Questions About Our Templates"
        faqs={pageData.faqs}
      />
      </main>

      <Footer />
    </div>
  );
}
