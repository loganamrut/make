import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { CookieBanner } from '@/components/CookieBanner';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const viewport: Viewport = {
  themeColor: '#4f46e5',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://cvmake.dev'),
  title: {
    default: 'Free AI Resume Builder & AI CV Maker (ATS-Friendly) | CVMake',
    template: '%s',
  },
  description:
    'Create a professional resume with our free AI resume builder and AI CV maker. Build ATS-friendly resumes, improve your CV, and download it instantly.',
  keywords: [
    'ai resume builder',
    'ai cv maker',
    'resume maker ai',
    'AI resume builder free',
    'free AI resume builder',
    'AI resume maker',
    'AI CV builder',
    'AI CV maker free',
    'resume builder AI',
    'resume maker',
    'CV maker',
    'CV builder',
    'ATS resume builder',
    'ATS friendly resume',
    'ATS resume template',
    'resume template',
    'cover letter generator',
  ],
  authors: [{ name: 'CVMake Team', url: 'https://cvmake.dev' }],
  creator: 'CVMake',
  publisher: 'CVMake',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cvmake.dev',
    siteName: 'CVMake',
    title: 'AI Resume Builder & AI CV Maker | CVMake',
    description:
      'Create a professional, ATS-friendly resume with AI — privately in your browser with zero server database storage.',
    images: [
      {
        url: '/icon.svg',
        width: 512,
        height: 512,
        alt: 'CVMake – Private AI Resume Builder & AI CV Maker',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Resume Builder & AI CV Maker | CVMake',
    description:
      'Create a professional, ATS-friendly resume with AI — privately in your browser with zero server database storage.',
    images: ['/icon.svg'],
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-700 focus:text-white focus:rounded-lg focus:shadow-lg focus:text-sm focus:font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Skip to main content
        </a>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
