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
    description,
    url,
    softwareVersion: '2.0',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    featureList: [
      'Client-side AI resume drafting',
      'Real-time ATS parsing audit',
      'Google XYZ formula achievement bullet generator',
      '9 professional ATS-friendly resume templates',
      'Clean vector PDF export and print formatting',
      'Zero database architecture – 100% browser privacy',
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
