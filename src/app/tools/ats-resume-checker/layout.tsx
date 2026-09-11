import type { Metadata } from 'next';
import { WebApplicationSchema, BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Free ATS Resume Checker – Score & Scan Your Resume Online | CVMake',
  description:
    'Scan and audit your resume format, headings, keyword density, and metrics against top ATS parsers (Taleo, Workday, Greenhouse). Get an instant 0-100 ATS score with actionable fixes.',
  keywords: [
    'ats resume checker',
    'ats score resume',
    'resume scanner ats',
    'ats friendly resume test',
    'free ats checker online',
    'check resume for ats',
  ],
  alternates: {
    canonical: 'https://cvmake.dev/tools/ats-resume-checker/',
  },
  openGraph: {
    title: 'Free ATS Resume Checker – Score & Scan Your Resume Online | CVMake',
    description:
      'Scan and audit your resume format, headings, and keyword density against top ATS algorithms. 100% free and private.',
    url: 'https://cvmake.dev/tools/ats-resume-checker/',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://cvmake.dev/' },
    { name: 'Tools', url: 'https://cvmake.dev/tools/' },
    { name: 'ATS Resume Checker', url: 'https://cvmake.dev/tools/ats-resume-checker/' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <WebApplicationSchema
        name="Free ATS Resume Checker | CVMake"
        description="Audit your resume format, headings, and keywords against top ATS engines."
        url="https://cvmake.dev/tools/ats-resume-checker/"
      />
      {children}
    </>
  );
}
