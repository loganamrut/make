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
