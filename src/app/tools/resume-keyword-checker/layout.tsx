import type { Metadata } from 'next';
import { WebApplicationSchema, BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Resume Keyword Checker – Scan Action Verbs & Keywords | CVMake',
  description:
    'Scan your resume text for dynamic executive action verbs, quantifiable metrics, and overused passive clichés. Optimize keyword density for ATS search algorithms.',
  keywords: [
    'resume keyword checker',
    'resume action verbs',
    'ats buzzword checker',
    'resume scanner keywords',
    'check resume action verbs',
  ],
  alternates: {
    canonical: 'https://cvmake.dev/tools/resume-keyword-checker/',
  },
  openGraph: {
    title: 'Resume Keyword Checker | CVMake',
    description: 'Scan your resume for high-impact action verbs and eliminate passive clichés.',
    url: 'https://cvmake.dev/tools/resume-keyword-checker/',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://cvmake.dev/' },
    { name: 'Tools', url: 'https://cvmake.dev/tools/' },
    { name: 'Keyword Checker', url: 'https://cvmake.dev/tools/resume-keyword-checker/' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <WebApplicationSchema
        name="Resume Keyword Checker | CVMake"
        description="Scan your resume text for high-impact action verbs and ATS keywords."
        url="https://cvmake.dev/tools/resume-keyword-checker/"
      />
      {children}
    </>
  );
}
