import type { Metadata } from 'next';
import { WebApplicationSchema, BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'AI Resume Bullet Point Generator – Google XYZ Bullets | CVMake',
  description:
    'Transform passive job duties into quantifiable achievement bullets using Google’s XYZ formula: "Accomplished [X] measured by [Y] by doing [Z]". 100% free and client-side.',
  keywords: [
    'resume bullet generator',
    'action verbs resume',
    'google xyz formula resume',
    'quantified resume bullets ai',
    'bullet point optimizer',
  ],
  alternates: {
    canonical: 'https://cvmake.dev/tools/resume-bullet-generator/',
  },
  openGraph: {
    title: 'AI Resume Bullet Point Generator | CVMake',
    description: 'Convert basic job duties into powerful, quantified Google XYZ achievement bullets.',
    url: 'https://cvmake.dev/tools/resume-bullet-generator/',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://cvmake.dev/' },
    { name: 'Tools', url: 'https://cvmake.dev/tools/' },
    { name: 'Resume Bullet Generator', url: 'https://cvmake.dev/tools/resume-bullet-generator/' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <WebApplicationSchema
        name="AI Resume Bullet Point Generator | CVMake"
        description="Convert job duties into quantifiable Google XYZ achievement bullets."
        url="https://cvmake.dev/tools/resume-bullet-generator/"
      />
      {children}
    </>
  );
}
