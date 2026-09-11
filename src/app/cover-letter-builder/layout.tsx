import type { Metadata } from 'next';
import { WebApplicationSchema, BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'AI Cover Letter Builder – Free Tailored Job Letters | CVMake',
  description:
    'Generate tailored, recruiter-ready cover letters customized for your target company and role in seconds with private AI assistance. Free vector PDF export and print formatting.',
  keywords: [
    'ai cover letter builder',
    'cover letter generator',
    'ai cover letter generator',
    'free cover letter builder',
    'job application letter ai',
    'cover letter maker online',
  ],
  alternates: {
    canonical: 'https://cvmake.dev/cover-letter-builder/',
  },
  openGraph: {
    title: 'AI Cover Letter Builder – Free Tailored Job Letters | CVMake',
    description:
      'Generate personalized, recruiter-ready cover letters tailored to your target company and role in seconds with private AI assistance.',
    url: 'https://cvmake.dev/cover-letter-builder/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Cover Letter Builder | CVMake',
    description: 'Generate customized, professional job application letters in seconds with AI.',
  },
};

export default function CoverLetterBuilderLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://cvmake.dev/' },
    { name: 'Cover Letter Builder', url: 'https://cvmake.dev/cover-letter-builder/' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <WebApplicationSchema
        name="AI Cover Letter Builder | CVMake"
        description="Generate tailored, recruiter-ready cover letters customized for your target company and role in seconds with private AI assistance."
        url="https://cvmake.dev/cover-letter-builder/"
      />
      {children}
    </>
  );
}
