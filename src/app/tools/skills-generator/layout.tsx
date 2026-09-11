import type { Metadata } from 'next';
import { WebApplicationSchema, BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'AI Resume Skills Generator – Role-Specific Skills | CVMake',
  description:
    'Discover role-specific technical skills, industry tools, frameworks, and soft competencies. Interactive categorized tags for instant 1-click addition to your resume.',
  keywords: [
    'skills generator resume',
    'resume skills list',
    'technical skills for resume',
    'ai skills recommender',
    'best skills to put on resume',
  ],
  alternates: {
    canonical: 'https://cvmake.dev/tools/skills-generator/',
  },
  openGraph: {
    title: 'AI Resume Skills Generator | CVMake',
    description: 'Discover categorized technical, tool, and soft skills for your industry.',
    url: 'https://cvmake.dev/tools/skills-generator/',
    type: 'website',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://cvmake.dev/' },
    { name: 'Tools', url: 'https://cvmake.dev/tools/' },
    { name: 'Skills Generator', url: 'https://cvmake.dev/tools/skills-generator/' },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <WebApplicationSchema
        name="AI Resume Skills Generator | CVMake"
        description="Discover categorized technical, tool, and soft skills tailored to your industry."
        url="https://cvmake.dev/tools/skills-generator/"
      />
      {children}
    </>
  );
}
