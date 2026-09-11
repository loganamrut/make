import type { Metadata } from 'next';
import { WebApplicationSchema, BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Job Description to Resume Matcher – ATS Keyword Match | CVMake',
  description:
    'Paste a target job description and your resume text to discover matching keywords and missing ATS phrases. Boost your resume relevance score before applying.',
  keywords: [
    'job description to resume',
    'resume keyword match',
    'ats keyword scanner',
    'resume job matcher tool',
    'match resume to job description',
  ],
  alternates: {
    canonical: 'https://cvmake.dev/tools/job-description-to-resume/',
  },
  openGraph: {
    title: 'Job Description to Resume Matcher | CVMake',
    description: 'Compare your resume against any job description to find missing ATS keywords.',
    url: 'https://cvmake.dev/tools/job-description-to-resume/',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://cvmake.dev/' },
    { name: 'Tools', url: 'https://cvmake.dev/tools/' },
    { name: 'Job Description Matcher', url: 'https://cvmake.dev/tools/job-description-to-resume/' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <WebApplicationSchema
        name="Job Description to Resume Matcher | CVMake"
        description="Compare your resume against job descriptions to extract missing ATS keywords."
        url="https://cvmake.dev/tools/job-description-to-resume/"
      />
      {children}
    </>
  );
}
