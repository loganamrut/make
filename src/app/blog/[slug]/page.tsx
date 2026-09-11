import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';
import { BLOG_POSTS_CONTENT } from '@/lib/blog-content';
import { Sparkles, Clock, Calendar, ArrowLeft, ShieldCheck } from 'lucide-react';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return Object.keys(BLOG_POSTS_CONTENT).map(slug => ({
    slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = BLOG_POSTS_CONTENT[params.slug];
  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} | CVMake`,
    description: post.description,
    alternates: {
      canonical: `https://cvmake.dev/blog/${post.slug}/`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://cvmake.dev/blog/${post.slug}/`,
      type: 'article',
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = BLOG_POSTS_CONTENT[params.slug];
  if (!post) notFound();

  const breadcrumbItems = [
    { name: 'Home', url: 'https://cvmake.dev/' },
    { name: 'Blog', url: 'https://cvmake.dev/blog/' },
    { name: post.title, url: `https://cvmake.dev/blog/${post.slug}/` },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <BreadcrumbSchema items={breadcrumbItems} />
      <Header />

      {/* Article Header */}
      <header className="pt-12 pb-10 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to All Guides
          </Link>

          <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
            <span className="font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {post.publishedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            {post.description}
          </p>
        </div>
      </header>

      {/* Article Body */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 w-full flex-1">
        <div
          className="prose prose-slate max-w-none text-slate-800 text-base leading-relaxed space-y-5"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* Action Callout Box */}
        <div className="my-10 p-6 rounded-2xl bg-gradient-to-r from-indigo-50 to-indigo-100/50 border border-indigo-200 space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-indigo-950 text-base">
              Put This Advice Into Practice
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-indigo-900 leading-relaxed">
            Build your resume with CVMake’s privacy-first browser engine. All templates follow the strict ATS rules outlined in this guide.
          </p>
          <div className="pt-2 flex flex-wrap gap-2">
            {post.relatedTools.map((tool, idx) => (
              <Link
                key={idx}
                href={tool.href}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 shadow-sm transition-all"
              >
                {tool.title} &rarr;
              </Link>
            ))}
          </div>
        </div>

        {/* Privacy Note */}
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>
            CVMake operates 100% locally in your browser. We never store your resume or credentials on remote servers.
          </span>
        </div>
      </main>

      <Footer />
    </div>
  );
}
