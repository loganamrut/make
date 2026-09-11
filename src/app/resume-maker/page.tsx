import type { Metadata } from 'next';
import { SEO_LANDING_PAGES } from '@/lib/seo-data';
import { LandingPageTemplate } from '@/components/seo/LandingPageTemplate';

const pageData = SEO_LANDING_PAGES['resume-maker'];

export const metadata: Metadata = {
  title: pageData.title,
  description: pageData.metaDescription,
  alternates: {
    canonical: `https://cvmake.dev/${pageData.slug}/`,
  },
  openGraph: {
    title: pageData.title,
    description: pageData.metaDescription,
    url: `https://cvmake.dev/${pageData.slug}/`,
    type: 'website',
  },
};

export default function ResumeMakerLandingPage() {
  return <LandingPageTemplate data={pageData} />;
}
