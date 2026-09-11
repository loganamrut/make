import type { Metadata } from 'next';
import { WebApplicationSchema, BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'AI Resume Builder Online – Free Live Resume Editor | CVMake',
  description:
    'Build an interview-winning, ATS-optimized resume in real-time with our free AI resume builder. Live split-screen preview, instant AI suggestions, and 1-click vector PDF download with complete privacy.',
  keywords: [
    'ai resume builder',
    'ai resume builder online',
    'free ai resume builder',
    'resume maker ai',
    'ats resume builder',
    'live resume editor',
    'free resume maker',
    'online resume creator',
  ],
  alternates: {
    canonical: 'https://cvmake.dev/builder/',
  },
  openGraph: {
    title: 'AI Resume Builder Online – Free Live Resume Editor | CVMake',
    description:
      'Build an ATS-optimized resume in real-time with our free AI resume builder. Live split-screen preview and vector PDF download.',
    url: 'https://cvmake.dev/builder/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Resume Builder Online | CVMake',
    description: 'Free, private, real-time AI resume builder with instant vector PDF download.',
  },
};

export default function BuilderLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://cvmake.dev/' },
    { name: 'Resume Builder', url: 'https://cvmake.dev/builder/' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <WebApplicationSchema
        name="AI Resume Builder Online | CVMake"
        description="Build an ATS-optimized resume in real-time with our free AI resume builder. Live preview and vector PDF export."
        url="https://cvmake.dev/builder/"
      />
      {children}
    </>
  );
}
