import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
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
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#4f46e5' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
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
        url: 'https://cvmake.dev/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CVMake – Free AI Resume Builder & AI CV Maker',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Resume Builder & AI CV Maker | CVMake',
    description:
      'Create a professional, ATS-friendly resume with AI — privately in your browser with zero server database storage.',
    images: ['https://cvmake.dev/og-image.png'],
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48 32x32 16x16' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
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
        <link rel="icon" href="/favicon.ico" sizes="48x48 32x32 16x16" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" sizes="any" />
        <link rel="icon" href="/favicon-48x48.png" sizes="48x48" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white`}
      >
        {/* Google Analytics 4 (GA4) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-HT87NWEHNT"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-HT87NWEHNT', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
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
