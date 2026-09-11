import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { BLOG_POSTS } from '@/lib/seo-data';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Career & Resume Guides | CVMake Blog',
  description:
    'Expert advice on resume writing, ATS algorithms, achievement bullet points, CV formatting, and AI career tools.',
  alternates: {
    canonical: 'https://cvmake.dev/blog/',
  },
};

export default function BlogIndexPage() {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://cvmake.dev/' },
    { name: 'Blog', url: 'https://cvmake.dev/blog/' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <BreadcrumbSchema items={breadcrumbItems} />
      <Header />
      <Breadcrumbs items={breadcrumbItems} />

      <main id="main-content" className="flex-1">
        <section className="pt-12 pb-16 bg-white border-b border-slate-200 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              Career Advice & Strategy
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              CVMake Career & Resume Guides
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              Practical, actionable advice written for modern job seekers. Zero fluff, real recruiter formulas, and concrete examples.
            </p>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.map(post => (
            <article
              key={post.slug}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-700 mb-2 font-medium">
                  <span className="font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-slate-600">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 mt-2 hover:text-indigo-700 transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {post.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-indigo-700 hover:text-indigo-900"
                >
                  Read Full Guide <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[11px] text-slate-600 font-medium">{post.publishedDate}</span>
              </div>
            </article>
          ))}
        </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
