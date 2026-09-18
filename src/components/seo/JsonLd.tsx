import React from 'react';
import { FaqItem } from '@/lib/types';

interface WebApplicationSchemaProps {
  name?: string;
  description?: string;
  url?: string;
}

export function WebApplicationSchema({
  name = 'CVMake – Private AI Resume Builder & CV Maker',
  description = 'Privacy-first browser-based AI resume builder and AI CV maker. Generate ATS-friendly resumes, optimize bullet points, and export vector PDFs with zero server storage.',
  url = 'https://cvmake.dev',
}: WebApplicationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    operatingSystem: 'Any modern browser (Chrome, Safari, Firefox, Edge)',
    applicationCategory: 'BusinessApplication',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1420',
      bestRating: '5',
      worstRating: '1',
    },
    author: {
      '@type': 'Organization',
      name: 'CVMake',
      url: 'https://cvmake.dev',
    },
    image: 'https://cvmake.dev/icon.svg',
    description,
    url,
    softwareVersion: '2.0',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    featureList: [
      'Client-side Google Gemini 1.5 Flash AI resume parsing & drafting',
      'Tesseract 4.0.0_best Neural LSTM OCR scanner for physical & image resumes',
      'pdfjs-dist digital vector PDF text extractor',
      'Real-time live ATS scoring & diagnostic scorecard (0-100 audit)',
      'Google XYZ formula achievement bullet point generator',
      'AI professional summary generator with customizable executive tones',
      '17 recruiter-approved ATS-friendly resume & CV templates',
      'Dual-mode builder: AI Resume Studio & Manual Canvas',
      '100% vector PDF & native print export with zero layout distortion',
      'Zero database architecture – 100% private in-browser processing',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CVMake',
    url: 'https://cvmake.dev',
    logo: 'https://cvmake.dev/icon.svg',
    description: 'Privacy-first career development and browser-based AI resume building platform.',
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema({ faqs }: { faqs: FaqItem[] }) {
  if (!faqs || faqs.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export interface ArticleSchemaProps {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  imageUrl?: string;
}

export function ArticleSchema({
  headline,
  description,
  url,
  datePublished,
  dateModified,
  authorName = 'CVMake Editorial Team',
  imageUrl = 'https://cvmake.dev/icon.svg',
}: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    image: imageUrl,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'CVMake',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cvmake.dev/icon.svg',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export interface HowToStep {
  name: string;
  text: string;
  url?: string;
  image?: string;
}

export function HowToSchema({
  name,
  description,
  steps,
  image,
}: {
  name: string;
  description: string;
  steps: HowToStep[];
  image?: string;
}) {
  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    totalTime: 'PT5M',
    ...(image
      ? {
          image: {
            '@type': 'ImageObject',
            url: image,
            width: '1376',
            height: '768',
            caption: name,
          },
        }
      : {}),
    step: steps.map((s, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: s.name,
      text: s.text,
      url: s.url,
      ...(s.image ? { image: s.image } : {}),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export interface VideoClip {
  name: string;
  startOffset: number;
  endOffset: number;
  url: string;
}

export interface VideoSchemaProps {
  name?: string;
  description?: string;
  thumbnailUrl?: string[];
  uploadDate?: string;
  contentUrl?: string;
  embedUrl?: string;
  duration?: string;
  clips?: VideoClip[];
}

export function VideoSchema({
  name = 'How CVMake AI Resume Builder & AI CV Maker Works (4-Step Video Guide)',
  description = 'Learn how CVMake creates ATS-friendly resumes in 4 easy steps using in-browser Neural OCR, Gemini AI bullet optimization, 17 recruiter-tested templates, and vector PDF download with 100% privacy.',
  thumbnailUrl = [
    'https://cvmake.dev/images/how-it-works-video-poster.jpg',
    'https://cvmake.dev/images/how-it-works-ai-resume-builder.jpg',
  ],
  uploadDate = '2026-09-18T00:00:00+00:00',
  contentUrl = 'https://cvmake.dev/videos/how-it-works-ai-resume-builder.mp4',
  embedUrl = 'https://cvmake.dev/videos/how-it-works-ai-resume-builder.mp4',
  duration = 'PT25S',
  clips = [
    {
      name: 'Step 1: Document Upload & Neural OCR',
      startOffset: 3,
      endOffset: 8,
      url: 'https://cvmake.dev/#step-1',
    },
    {
      name: 'Step 2: Gemini AI Bullet Optimization & Live ATS Score',
      startOffset: 8,
      endOffset: 14,
      url: 'https://cvmake.dev/#step-2',
    },
    {
      name: 'Step 3: 17 Recruiter-Approved ATS Templates',
      startOffset: 14,
      endOffset: 19,
      url: 'https://cvmake.dev/#step-3',
    },
    {
      name: 'Step 4: 1-Click Vector PDF & Print Export',
      startOffset: 19,
      endOffset: 25,
      url: 'https://cvmake.dev/#step-4',
    },
  ],
}: VideoSchemaProps) {
  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl,
    uploadDate,
    contentUrl,
    embedUrl,
    duration,
    inLanguage: 'en',
    caption: 'How CVMake AI Resume Builder Works',
    hasPart: clips.map(clip => ({
      '@type': 'Clip',
      name: clip.name,
      startOffset: clip.startOffset,
      endOffset: clip.endOffset,
      url: clip.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

