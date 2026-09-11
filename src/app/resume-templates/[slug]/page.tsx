import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FaqSection } from '@/components/seo/FaqSection';
import { WebApplicationSchema, BreadcrumbSchema } from '@/components/seo/JsonLd';
import { ResumeDocument } from '@/components/builder/ResumeDocument';
import { SAMPLE_RESUME } from '@/lib/sample-data';
import { TEMPLATE_SHOWCASES } from '@/lib/seo-data';
import { TemplateId } from '@/lib/types';
import { Sparkles, ShieldCheck, CheckCircle2, Layers } from 'lucide-react';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return TEMPLATE_SHOWCASES.map(tpl => ({
    slug: tpl.slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const tpl = TEMPLATE_SHOWCASES.find(t => t.slug === params.slug);
  if (!tpl) return { title: 'Template Not Found' };

  return {
    title: `${tpl.title} – Free ATS & PDF Download | CVMake`,
    description: `Preview and customize the ${tpl.title}. ${tpl.tagline}. Optimized for applicant tracking systems, free vector PDF export, and browser privacy.`,
    alternates: {
      canonical: `https://cvmake.dev/resume-templates/${tpl.slug}/`,
    },
    openGraph: {
      title: `${tpl.title} | CVMake`,
      description: tpl.tagline,
      url: `https://cvmake.dev/resume-templates/${tpl.slug}/`,
      type: 'website',
    },
  };
}

export default function TemplateCategoryPage({ params }: Props) {
  const tpl = TEMPLATE_SHOWCASES.find(t => t.slug === params.slug);
  if (!tpl) notFound();

  const previewResume = {
    ...SAMPLE_RESUME,
    style: {
      ...SAMPLE_RESUME.style,
      template: tpl.slug as TemplateId,
    },
  };

  const breadcrumbItems = [
    { name: 'Home', url: 'https://cvmake.dev/' },
    { name: 'Templates', url: 'https://cvmake.dev/resume-templates/' },
    { name: tpl.title, url: `https://cvmake.dev/resume-templates/${tpl.slug}/` },
  ];

  const templateFaqs = [
    {
      question: `Is the ${tpl.title} compatible with ATS systems?`,
      answer: `Yes. Like all CVMake templates, the ${tpl.title} is designed with clean document hierarchy, standard section headers, and pure vector text that parses accurately in Workday, Taleo, Greenhouse, and Lever.`,
    },
    {
      question: `Who should use the ${tpl.title}?`,
      answer: `This template is especially recommended for: ${tpl.bestFor}. Its design balances scannability with industry-appropriate aesthetics.`,
    },
    {
      question: `Can I change the fonts and colors on this template?`,
      answer: `Absolutely. Inside the CVMake builder, you can customize the primary accent color, choose between Sans-Serif, Serif, or Monospace typography, and toggle line spacing.`,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <WebApplicationSchema
        name={`${tpl.title} | CVMake`}
        description={tpl.tagline}
        url={`https://cvmake.dev/resume-templates/${tpl.slug}/`}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <Header />

      {/* Hero Section */}
      <section className="pt-12 pb-12 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-4">
            <Layers className="w-3.5 h-3.5" />
            Resume Template Showcase
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {tpl.title}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-xl mx-auto">
            {tpl.tagline}
          </p>

          <div className="mt-6 flex items-center justify-center gap-4">
            <Link
              href={`/builder?template=${tpl.slug}`}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              Use This Template in Builder
            </Link>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            🔒 100% Free • No account required • Stays in your browser
          </p>
        </div>
      </section>

      {/* Main Preview & Highlights Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Template Features & Best For */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
                Template Specifications
              </h2>
              <div>
                <span className="block text-xs font-bold uppercase text-slate-500 tracking-wider">
                  Recommended For
                </span>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">
                  {tpl.bestFor}
                </p>
              </div>

              <div>
                <span className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">
                  Key Design Features
                </span>
                <div className="space-y-2">
                  {tpl.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <Link
                  href={`/builder?template=${tpl.slug}`}
                  className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  Edit With My Information &rarr;
                </Link>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-emerald-950 text-xs leading-relaxed space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Browser-Side Privacy Guarantee
              </div>
              <p>
                When you load this template into the CVMake builder, your data is processed locally. We do not store your resume on remote database servers.
              </p>
            </div>
          </div>

          {/* Right Column: Live Resume Document Sheet */}
          <div className="lg:col-span-8 flex justify-center">
            <div className="w-full max-w-[800px]">
              <ResumeDocument resume={previewResume} />
            </div>
          </div>
        </div>
      </main>

      {/* FAQs */}
      <FaqSection
        title={`Questions About the ${tpl.title}`}
        faqs={templateFaqs}
      />

      <Footer />
    </div>
  );
}
