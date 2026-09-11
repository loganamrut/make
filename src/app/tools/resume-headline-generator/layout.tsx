import type { Metadata } from 'next';
import { WebApplicationSchema, BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'AI Resume Headline Generator – Catchy Executive Titles | CVMake',
  description:
    'Generate catchy executive resume headlines, title taglines, and professional summaries tailored to your target job title. Hook recruiters within the first 6 seconds.',
  keywords: [
    'resume headline generator',
    'resume title generator',
    'executive resume headline',
    'professional resume title ai',
    'catchy resume headline',
  ],
  alternates: {
    canonical: 'https://cvmake.dev/tools/resume-headline-generator/',
  },
  openGraph: {
    title: 'AI Resume Headline Generator | CVMake',
    description: 'Create memorable, recruiter-focused resume titles and headlines in seconds.',
    url: 'https://cvmake.dev/tools/resume-headline-generator/',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://cvmake.dev/' },
    { name: 'Tools', url: 'https://cvmake.dev/tools/' },
    { name: 'Resume Headline Generator', url: 'https://cvmake.dev/tools/resume-headline-generator/' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <WebApplicationSchema
        name="AI Resume Headline Generator | CVMake"
        description="Create memorable, recruiter-focused resume titles and headlines."
        url="https://cvmake.dev/tools/resume-headline-generator/"
      />
      {children}
    </>
  );
}
