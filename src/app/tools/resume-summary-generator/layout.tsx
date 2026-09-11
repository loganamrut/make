import type { Metadata } from 'next';
import { WebApplicationSchema, BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'AI Resume Summary Generator – Free Executive Bios | CVMake',
  description:
    'Generate tailored professional resume summaries and executive bios in seconds. Choose from 3 distinct tones: Executive Leadership, Technical Specialist, and Concise Impact.',
  keywords: [
    'resume summary generator',
    'ai resume summary',
    'professional summary generator',
    'executive summary resume maker',
    'resume objective generator',
  ],
  alternates: {
    canonical: 'https://cvmake.dev/tools/resume-summary-generator/',
  },
  openGraph: {
    title: 'AI Resume Summary Generator | CVMake',
    description: 'Generate 3 high-impact professional resume summaries tailored to your experience.',
    url: 'https://cvmake.dev/tools/resume-summary-generator/',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://cvmake.dev/' },
    { name: 'Tools', url: 'https://cvmake.dev/tools/' },
    { name: 'Summary Generator', url: 'https://cvmake.dev/tools/resume-summary-generator/' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <WebApplicationSchema
        name="AI Resume Summary Generator | CVMake"
        description="Generate 3 high-impact professional summaries tailored to your role."
        url="https://cvmake.dev/tools/resume-summary-generator/"
      />
      {children}
    </>
  );
}
