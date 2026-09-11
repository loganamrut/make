import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FaqSection } from '@/components/seo/FaqSection';
import { WebApplicationSchema, BreadcrumbSchema, HowToSchema } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { SeoLandingPageData } from '@/lib/seo-data';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface LandingPageTemplateProps {
  data: SeoLandingPageData;
}

export function LandingPageTemplate({ data }: LandingPageTemplateProps) {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://cvmake.dev/' },
    { name: data.h1, url: `https://cvmake.dev/${data.slug}/` },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <WebApplicationSchema
        name={`${data.h1} | CVMake`}
        description={data.metaDescription}
        url={`https://cvmake.dev/${data.slug}/`}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      {data.howItWorksSteps && data.howItWorksSteps.length > 0 && (
        <HowToSchema
          name={`How to use ${data.h1}`}
          description={data.metaDescription}
          steps={data.howItWorksSteps.map(step => ({
            name: step.title,
            text: step.description,
          }))}
        />
      )}
      <Header />
      <Breadcrumbs items={breadcrumbItems} />

      <main id="main-content" className="flex-1">
        {/* Hero Section */}
      <section className="pt-12 pb-16 bg-gradient-to-b from-indigo-50/40 via-white to-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-6 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{data.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {data.h1}
          </h1>

          <p className="mt-4 text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {data.subtitle}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={data.primaryCtaLink}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-lg shadow-indigo-200 active:scale-[0.98] transition-all"
            >
              <Sparkles className="w-5 h-5" />
              {data.primaryCtaText}
            </Link>
            <Link
              href={data.secondaryCtaLink}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-base shadow-sm transition-all"
            >
              {data.secondaryCtaText}
            </Link>
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Private by design — your resume stays in your browser.
          </p>
        </div>
      </section>

      {/* In-depth Article / Introduction */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-5 text-slate-700 text-base sm:text-lg leading-relaxed">
          {data.introParagraphs.map((para, i) => (
            <p key={i} className="text-justify sm:text-left">
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Key Features & Benefits
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Why candidates prefer CVMake for {data.h1.toLowerCase()}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.keyFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base mb-1">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How It Works
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Four streamlined steps to a winning document.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.howItWorksSteps.map(step => (
              <div
                key={step.step}
                className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 relative"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-black text-sm flex items-center justify-center mb-3">
                  {step.step}
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FaqSection
        title={`Frequently Asked Questions About ${data.h1}`}
        faqs={data.faqs}
      />

      {/* Internal Linking Cluster */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
            Related Tools & Resources
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {data.relatedLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="px-4 py-2 bg-white border border-slate-200 hover:border-indigo-400 hover:text-indigo-600 rounded-lg text-xs font-semibold text-slate-700 shadow-sm transition-all"
              >
                {link.title} &rarr;
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 bg-indigo-700 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-black">
            Get Started with {data.h1} Today
          </h2>
          <p className="mt-3 text-white/95 text-sm sm:text-base font-medium">
            Build your resume privately in your browser with no sign-up wall.
          </p>
          <div className="mt-6">
            <Link
              href={data.primaryCtaLink}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white text-indigo-700 font-bold text-sm shadow-md hover:bg-indigo-50 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              {data.primaryCtaText} &rarr;
            </Link>
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
}
