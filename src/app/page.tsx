import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FaqSection } from '@/components/seo/FaqSection';
import { WebApplicationSchema, OrganizationSchema, HowToSchema } from '@/components/seo/JsonLd';
import {
  Sparkles,
  ShieldCheck,
  FileCheck,
  Zap,
  Download,
  CheckCircle2,
  Layers,
  Award,
  Database,
  Sliders,
  Users,
  GraduationCap,
  Briefcase,
  Globe,
  Compass,
  Check,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free AI Resume Builder & AI CV Maker (ATS-Friendly) | CVMake',
  description:
    'Create an interview-winning resume with our free AI resume builder, AI CV maker, and resume maker AI. 100% browser-based privacy, ATS-friendly templates, and instant vector PDF download without signing up.',
  keywords: [
    'ai resume builder',
    'ai cv maker',
    'resume maker ai',
    'free ai resume builder',
    'ai resume builder free',
    'ai resume maker',
    'ai cv builder',
    'ai cv maker free',
    'resume builder ai',
    'resume maker',
    'cv maker',
    'cv builder',
    'ats resume builder',
    'ats friendly resume',
    'ats resume template',
    'resume creator',
    'ai resume generator',
    'create resume with ai',
    'create cv with ai',
    'resume builder online',
    'professional resume builder',
  ],
  alternates: {
    canonical: 'https://cvmake.dev/',
  },
  openGraph: {
    title: 'Free AI Resume Builder & AI CV Maker (ATS-Friendly) | CVMake',
    description:
      'Create a professional, ATS-friendly resume with AI — privately in your browser with zero server database storage and instant vector PDF download.',
    url: 'https://cvmake.dev/',
    siteName: 'CVMake',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Resume Builder & AI CV Maker | CVMake',
    description:
      'Private, browser-based AI resume builder and AI CV maker. 100% free vector PDF download.',
  },
};

const HOMEPAGE_FAQS = [
  {
    question: 'How does CVMake protect my privacy compared to other resume builders?',
    answer:
      'CVMake is engineered with an uncompromising browser-first architecture. Unlike conventional platforms that store your resume data in remote SQL databases and track your identity, CVMake processes your entire resume locally inside your web browser. We do not store your name, email, phone number, employment history, or documents on our servers.',
  },
  {
    question: 'What makes a resume truly ATS-friendly?',
    answer:
      'Applicant Tracking Systems (ATS) scan and parse submitted resumes to determine match relevance. Resumes fail ATS checks when they feature complex multi-column grids, graphic icons, non-selectable text, tables, or non-standard headings. CVMake generates single-column, cleanly structured documents with standard semantic headings and pure selectable vector text that ATS parsers index with 100% fidelity.',
  },
  {
    question: 'Can I use the AI resume builder for free without a subscription?',
    answer:
      'Yes. CVMake provides full, unrestricted access to the resume builder, all 9 ATS templates, AI writing suggestions, live preview, and vector PDF downloads without hidden paywalls or subscription traps.',
  },
  {
    question: 'What is the difference between a Resume and a Curriculum Vitae (CV)?',
    answer:
      'A resume is typically a 1-2 page summary prioritizing recent job achievements, skills, and business impact for corporate roles. A Curriculum Vitae (CV) is an exhaustive record of academic credentials, research publications, teaching appointments, and honors, common in international, healthcare, and higher-education applications. CVMake supports both formats.',
  },
  {
    question: 'Can I customize the resume templates, fonts, and colors?',
    answer:
      'Yes. You can effortlessly switch between 9 professionally designed ATS and modern templates, choose from carefully curated color palettes, customize typography (Sans-Serif, Serif, Monospace), adjust line spacing, and reorder sections.',
  },
  {
    question: 'How does the AI writing assistant help my resume?',
    answer:
      'Our AI assistant uses proven recruiter-backed models like the Google XYZ formula ("Accomplished X measured by Y by doing Z") to convert passive job duties into quantifiable business achievements, generate executive summaries, and suggest relevant technical and soft skills for your industry.',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <WebApplicationSchema />
      <OrganizationSchema />
      <HowToSchema
        name="How to Create a Professional ATS Resume with AI"
        description="Learn how to generate an ATS-optimized resume using CVMake in four easy steps without saving data on external servers."
        steps={[
          {
            name: "Enter Your Experience and Information",
            text: "Add your contact details, work history, education, and skills or load sample profile data.",
          },
          {
            name: "Enhance Resume Content with AI",
            text: "Transform passive job duties into quantifiable XYZ achievement bullets and generate executive summaries.",
          },
          {
            name: "Choose an ATS-Friendly Resume Template",
            text: "Select from 9 ATS-friendly layouts engineered for high parser readability, and customize fonts and colors.",
          },
          {
            name: "Download Clean Vector PDF",
            text: "Export clean, unwatermarked vector PDFs or print directly from your browser with zero data stored on external servers.",
          },
        ]}
      />
      <Header />

      <main id="main-content" className="flex-1">
        {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 bg-gradient-to-b from-indigo-50/50 via-white to-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Privacy Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-6 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Private by design — your resume stays in your browser.</span>
          </div>

          {/* Main H1 */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto leading-[1.15]">
            AI Resume Builder & <br className="hidden sm:inline" />
            <span className="text-indigo-600">AI CV Maker</span>
          </h1>

          {/* Hero Subtitle */}
          <p className="mt-5 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Create a professional, ATS-friendly resume with AI — privately in your browser.
            Zero server database. Zero tracking. Instant vector PDF download.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/builder"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-lg shadow-indigo-200 active:scale-[0.98] transition-all"
            >
              <Sparkles className="w-5 h-5" />
              Create My Resume
            </Link>
            <Link
              href="/builder"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-base shadow-sm transition-all"
            >
              <FileCheck className="w-5 h-5 text-indigo-600" />
              Build My CV
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              100% Free & Unrestricted
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Tested for ATS Parsers
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              No Credit Card or Sign-Up
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              No Database Storage
            </span>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Create Your Resume With AI — Privately & Accurately
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed text-justify sm:text-center">
            Welcome to CVMake, the privacy-first AI resume builder and AI CV maker designed to give job seekers an authentic competitive edge. In a job market dominated by automated applicant tracking algorithms and high-volume recruiting pipelines, your resume must communicate measurable value in seconds.
          </p>
          <p className="text-slate-600 text-base leading-relaxed text-justify sm:text-center">
            Unlike other platforms that monetize your personal employment records or lock your finished PDF behind deceitful subscription traps, CVMake executes entirely within your browser. You retain complete ownership of your career data while benefiting from state-of-the-art AI achievement drafting and real-time ATS optimization.
          </p>
        </div>
      </section>

      {/* How Our AI Resume Builder Works */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Simple 4-Step Process
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              How Our AI Resume Builder Works
            </h2>
            <p className="mt-3 text-slate-600 max-w-xl mx-auto text-base">
              Move from a blank page to a polished, ATS-ready resume in under 10 minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-black text-lg flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Enter Your Information
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Add your contact details, employment history, degrees, and core competencies. Load our curated sample profile to get an instant head start.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-black text-lg flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Improve Your Resume With AI
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Transform passive duties into quantified XYZ achievement bullets. Generate high-impact summaries and audit your live ATS score.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-black text-lg flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Choose a Professional Template
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Select from 9 ATS-friendly layouts ranging from minimal single-column formats to executive and academic styles. Customize fonts and accents.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-black text-lg flex items-center justify-center mb-4">
                4
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Download Your Resume
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Export clean, unwatermarked vector PDFs or print directly. Your document is immediately ready for submission to top employers.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/builder"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow transition-all"
            >
              Start Step 1 Now &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Why Use CVMake? */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Why Use CVMake?
            </h2>
            <p className="mt-3 text-slate-600 max-w-2xl mx-auto text-base">
              Engineered from the ground up to solve the real frustrations job seekers face with modern resume tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50">
              <Sparkles className="w-6 h-6 text-indigo-600 mb-3" />
              <h3 className="font-bold text-slate-900 text-base mb-1.5">AI-Powered Writing</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Generate action-driven achievement bullets and professional summaries that highlight measurable impact.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50">
              <FileCheck className="w-6 h-6 text-indigo-600 mb-3" />
              <h3 className="font-bold text-slate-900 text-base mb-1.5">ATS-Friendly Formatting</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Single-column, linear layouts and standard headers tested against Taleo, Workday, Greenhouse, and Lever.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50">
              <Layers className="w-6 h-6 text-indigo-600 mb-3" />
              <h3 className="font-bold text-slate-900 text-base mb-1.5">9 Professional Templates</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Switch between ATS, Modern, Executive, Student, and Minimalist templates in real time with a single click.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50">
              <ShieldCheck className="w-6 h-6 text-emerald-600 mb-3" />
              <h3 className="font-bold text-slate-900 text-base mb-1.5">Browser-Based Privacy</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your personal contact details and employment trajectory never leave your device. Zero cloud tracking.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50">
              <Database className="w-6 h-6 text-emerald-600 mb-3" />
              <h3 className="font-bold text-slate-900 text-base mb-1.5">No Database Architecture</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We operate with zero application database. No leaks, no data selling, no password accounts required.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50">
              <Sliders className="w-6 h-6 text-indigo-600 mb-3" />
              <h3 className="font-bold text-slate-900 text-base mb-1.5">Easy Real-Time Editing</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Split-screen live rendering shows changes instantly as you type with zero delay.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50">
              <Download className="w-6 h-6 text-indigo-600 mb-3" />
              <h3 className="font-bold text-slate-900 text-base mb-1.5">Instant PDF Download</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clean, selectable vector text PDFs formatted for standard US Letter and international A4 sheets.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/50">
              <Zap className="w-6 h-6 text-indigo-600 mb-3" />
              <h3 className="font-bold text-slate-900 text-base mb-1.5">No Complicated Setup</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                No software installs, no subscriptions, and no trial countdowns. Ready to build right away.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Build an ATS-Friendly Resume Deep-Dive */}
      <section className="py-20 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-4 border border-indigo-500/30">
                <FileCheck className="w-4 h-4 text-indigo-400" />
                ATS Parser Compatibility
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                Build an ATS-Friendly Resume That Actually Reaches Human Recruiters
              </h2>
              <p className="mt-4 text-slate-300 text-base leading-relaxed">
                Most job applicants get rejected not because they lack skills, but because their resumes get mangled by Applicant Tracking Systems (ATS). Parsers like Workday and Taleo struggle to interpret graphic columns, progress bars, and icon graphics.
              </p>
              <div className="mt-6 space-y-3 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Standard Semantic Headers:</strong> Experience, Education, and Skills sections are clearly labeled so algorithms index them flawlessly.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Pure Vector Text:</strong> We generate genuine selectable text in every PDF rather than rasterized images.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Single-Column Hierarchy:</strong> Guarantees sequential reading without text scrambling across columns.
                  </span>
                </div>
              </div>
              <div className="mt-8">
                <Link
                  href="/ats-resume-builder"
                  className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold text-sm underline underline-offset-4"
                >
                  Learn more about our ATS Resume Builder &rarr;
                </Link>
              </div>
            </div>

            <div className="bg-slate-800/80 p-6 sm:p-8 rounded-2xl border border-slate-700 shadow-xl space-y-4">
              <h3 className="font-bold text-white text-base border-b border-slate-700 pb-3">
                Live ATS Parser Inspection
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2.5 bg-slate-900/60 rounded-lg text-emerald-400">
                  <span>✓ Standard Contact Formatting</span>
                  <span className="font-bold">PASSED</span>
                </div>
                <div className="flex justify-between p-2.5 bg-slate-900/60 rounded-lg text-emerald-400">
                  <span>✓ Single-Column Reading Flow</span>
                  <span className="font-bold">PASSED</span>
                </div>
                <div className="flex justify-between p-2.5 bg-slate-900/60 rounded-lg text-emerald-400">
                  <span>✓ Quantified Achievement Density</span>
                  <span className="font-bold">PASSED</span>
                </div>
                <div className="flex justify-between p-2.5 bg-slate-900/60 rounded-lg text-emerald-400">
                  <span>✓ Selectable Text Layers</span>
                  <span className="font-bold">PASSED</span>
                </div>
                <div className="flex justify-between p-2.5 bg-slate-900/60 rounded-lg text-emerald-400">
                  <span>✓ Industry Keyword Recognition</span>
                  <span className="font-bold">PASSED</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 italic pt-2 font-medium">
                Audited locally using CVMake’s client-side diagnostic evaluator.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Clusters: AI Resume Builder Features, AI CV Maker, Resume Templates, AI Resume Writer, Cover Letter */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              AI Resume Builder Features
            </h2>
            <p className="mt-3 text-slate-600 max-w-2xl mx-auto text-base">
              A complete suite of career tools engineered for modern job seekers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold mb-4">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">AI CV Maker</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Design comprehensive, multi-page Curriculum Vitae for academic appointments, medical fellowships, and international roles with custom publications and grant sections.
              </p>
              <Link href="/ai-cv-maker" className="text-xs font-bold text-indigo-600 hover:underline">
                Explore AI CV Maker &rarr;
              </Link>
            </div>

            <div className="border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Resume Templates</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Choose from 9 recruiter-approved templates tailored for different career stages: ATS, Modern, Executive, Student, Graduate, and Minimalist.
              </p>
              <Link href="/resume-templates" className="text-xs font-bold text-indigo-600 hover:underline">
                Browse All Templates &rarr;
              </Link>
            </div>

            <div className="border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">AI Resume Writer</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Inject powerful action verbs and quantifiable metrics into your bullet points using our built-in Google XYZ achievement formula assistant.
              </p>
              <Link href="/ai-resume-writer" className="text-xs font-bold text-indigo-600 hover:underline">
                Discover AI Writer &rarr;
              </Link>
            </div>

            <div className="border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold mb-4">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">AI Cover Letter Generator</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Instantly generate a matching, job-specific 3-4 paragraph cover letter tailored to your target company and role.
              </p>
              <Link href="/cover-letter-builder" className="text-xs font-bold text-indigo-600 hover:underline">
                Generate Cover Letter &rarr;
              </Link>
            </div>

            <div className="border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">ATS Resume Checker</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Evaluate your resume against top ATS parser rules. Review your real-time score (0-100) and fix identified issues immediately.
              </p>
              <Link href="/tools/ats-resume-checker" className="text-xs font-bold text-indigo-600 hover:underline">
                Audit Your Resume &rarr;
              </Link>
            </div>

            <div className="border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Micro Tools Hub</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Access 8 free standalone client-side tools including our Bullet Generator, Summary Generator, Skills Suggester, and Headline Creator.
              </p>
              <Link href="/tools" className="text-xs font-bold text-indigo-600 hover:underline">
                Explore Free Tools &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Who Is CVMake For? */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Who Is CVMake For?
            </h2>
            <p className="mt-3 text-slate-600 max-w-2xl mx-auto text-base">
              Tailored support across every career level, discipline, and background.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200 text-center">
              <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">Students</h3>
              <p className="text-xs text-slate-500">
                Highlight coursework, academic projects, and campus leadership with zero prior job experience.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 text-center">
              <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">Recent Graduates</h3>
              <p className="text-xs text-slate-500">
                Bridge the gap between internships and entry-level positions with strong technical skills showcase.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 text-center">
              <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">Active Job Seekers</h3>
              <p className="text-xs text-slate-500">
                Rapidly tailor resumes to specific job postings and maximize ATS callback ratios.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 text-center">
              <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">Mid-Career Pros</h3>
              <p className="text-xs text-slate-500">
                Quantify career progression, leadership achievements, and cross-functional project wins.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 text-center">
              <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">Career Changers</h3>
              <p className="text-xs text-slate-500">
                Spotlight transferable skills and strategic problem-solving for pivot industries.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 text-center">
              <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">Remote Workers</h3>
              <p className="text-xs text-slate-500">
                Emphasize async collaboration, independent velocity, and distributed systems proficiency.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 text-center">
              <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">Freelancers</h3>
              <p className="text-xs text-slate-500">
                Package independent client engagements and notable portfolio projects cleanly.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 text-center">
              <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">Executives & VPs</h3>
              <p className="text-xs text-slate-500">
                Commanding layouts designed to present P&L responsibility, team scaling, and revenue gains.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Honest Comparison
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              CVMake vs Traditional Resume Builders
            </h2>
            <p className="mt-3 text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
              See why job seekers are switching from paywalled corporate platforms to our privacy-first AI resume maker.
            </p>
          </div>

          <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100/75 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-700">
                <tr>
                  <th scope="col" className="py-4 px-6">Feature</th>
                  <th scope="col" className="py-4 px-6 text-indigo-700 bg-indigo-50/50">CVMake (Free & Private)</th>
                  <th scope="col" className="py-4 px-6 text-slate-500">Traditional Resume Builders</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-slate-900">Pricing & Hidden Fees</td>
                  <td className="py-4 px-6 text-emerald-700 font-bold bg-indigo-50/20 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    100% Free Forever
                  </td>
                  <td className="py-4 px-6 text-slate-500">
                    $15 – $30/month subscription traps
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-slate-900">Data Storage & Privacy</td>
                  <td className="py-4 px-6 text-emerald-700 font-bold bg-indigo-50/20 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    Zero server database (100% in browser)
                  </td>
                  <td className="py-4 px-6 text-slate-500">
                    Uploaded to remote corporate servers
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-slate-900">Account Requirement</td>
                  <td className="py-4 px-6 text-emerald-700 font-bold bg-indigo-50/20 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    No sign-up or email required
                  </td>
                  <td className="py-4 px-6 text-slate-500">
                    Mandatory registration before download
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-slate-900">PDF Download Quality</td>
                  <td className="py-4 px-6 text-emerald-700 font-bold bg-indigo-50/20 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    Clean vector PDF (no watermarks)
                  </td>
                  <td className="py-4 px-6 text-slate-500">
                    Watermarked or locked behind credit cards
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-slate-900">ATS Parsing Optimization</td>
                  <td className="py-4 px-6 text-emerald-700 font-bold bg-indigo-50/20 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    Recruiter-tested linear layouts
                  </td>
                  <td className="py-4 px-6 text-slate-500">
                    Complex two-column grids that choke ATS
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-slate-900">AI Bullet Optimization</td>
                  <td className="py-4 px-6 text-emerald-700 font-bold bg-indigo-50/20 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    Google XYZ quantified formula
                  </td>
                  <td className="py-4 px-6 text-slate-500">
                    Generic, unmeasured text snippets
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-slate-900">Ad Trackers & Cookies</td>
                  <td className="py-4 px-6 text-emerald-700 font-bold bg-indigo-50/20 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    Zero third-party tracking cookies
                  </td>
                  <td className="py-4 px-6 text-slate-500">
                    Extensive ad network surveillance
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/builder"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              Build Your Free ATS Resume Now &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Recruiter Guide: The 4 Rules to Pass Any ATS */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              The 4 Recruiter Rules to Pass Any ATS
            </h2>
            <p className="mt-3 text-slate-600 max-w-2xl mx-auto text-sm sm:text-base">
              Over 75% of job applications are filtered by Workday, Taleo, Greenhouse, or Lever before human eyes see them. Here is how CVMake guarantees your resume passes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/60">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Single-Column Linear Hierarchy
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Many modern graphic design resumes rely on two-column sidebars, floating text frames, and icon bars. ATS parsers read horizontally across columns, scrambling your job titles with unrelated bullet points. CVMake enforces clean, linear reading flow so every parser indexes your history in chronological order.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/60">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Standard Semantic Headings
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Creative headings like "Where I’ve Been" or "My Toolbox" confuse automated categorization algorithms. CVMake automatically uses standardized headings: <strong>Professional Summary</strong>, <strong>Work Experience</strong>, <strong>Education</strong>, and <strong>Technical Skills</strong>, matching exact recruiter taxonomy.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/60">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Pure Selectable Vector Text Layers
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Resumes exported as flattened images or canvas drawings are completely invisible to text scanners. Our native browser print engine exports clean vector PDFs where every letter retains its raw character encoding, ensuring 100% parsing fidelity across every applicant tracking platform.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/60">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center mb-4">
                4
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Quantified Google XYZ Achievement Bullets
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Recruiters prioritize measurable impact over passive task descriptions. Using our built-in AI bullet assistant, you transform generic responsibilities into high-scoring XYZ achievements: <em>"Accomplished [X] as measured by [Y], by doing [Z]"</em>, raising both your ATS keyword score and recruiter callback rate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive FAQs */}
      <FaqSection
        title="Frequently Asked Questions"
        subtitle="Common questions regarding our AI resume builder, browser-only privacy, and ATS optimization."
        faqs={HOMEPAGE_FAQS}
      />

      {/* Bottom CTA */}
      <section className="py-20 bg-indigo-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Ready to Build Your Winning ATS Resume?
          </h2>
          <p className="mt-4 text-white/95 text-base sm:text-lg max-w-xl mx-auto font-medium">
            Join thousands of professionals creating recruiter-ready resumes with complete privacy. No account required.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/builder"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-indigo-700 font-bold text-base shadow-lg hover:bg-indigo-50 active:scale-95 transition-all"
            >
              Start Building Free &rarr;
            </Link>
            <Link
              href="/resume-templates"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl border-2 border-white/80 text-white font-bold text-base hover:bg-white/10 transition-all"
            >
              Browse Templates
            </Link>
          </div>
          <p className="mt-4 text-xs text-white font-medium">
            🔒 Private by design — your resume stays in your browser.
          </p>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
}
