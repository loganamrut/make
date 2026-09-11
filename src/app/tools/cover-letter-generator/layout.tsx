import type { Metadata } from 'next';
import { WebApplicationSchema, BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Quick AI Cover Letter Generator – 30-Second Job Letters | CVMake',
  description:
    'Generate customized, high-impact 3-paragraph job application cover letters in seconds. Highlight your accomplishments and fit for any job title with zero sign-up required.',
  keywords: [
    'cover letter generator',
    'quick cover letter',
    'ai cover letter maker free',
    'instant cover letter tool',
    'free cover letter generator online',
  ],
  alternates: {
    canonical: 'https://cvmake.dev/tools/cover-letter-generator/',
  },
  openGraph: {
    title: 'Quick AI Cover Letter Generator | CVMake',
    description: 'Generate customized, professional job application cover letters in 30 seconds.',
    url: 'https://cvmake.dev/tools/cover-letter-generator/',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://cvmake.dev/' },
    { name: 'Tools', url: 'https://cvmake.dev/tools/' },
    { name: 'Cover Letter Generator', url: 'https://cvmake.dev/tools/cover-letter-generator/' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <WebApplicationSchema
        name="Quick AI Cover Letter Generator | CVMake"
        description="Generate customized, professional job application letters in 30 seconds."
        url="https://cvmake.dev/tools/cover-letter-generator/"
      />
      {children}
    </>
  );
}
