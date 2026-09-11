'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FaqSection } from '@/components/seo/FaqSection';
import { getSkillsForRole } from '@/lib/ai-engine';
import { Copy, Check, ShieldCheck, Wrench } from 'lucide-react';

const SKILLS_FAQS = [
  {
    question: 'How many skills should I list on a resume?',
    answer:
      'Most recruiters and ATS benchmarks recommend listing between 8 and 16 relevant skills, divided into technical capabilities, tool platforms, and core interpersonal competencies.',
  },
  {
    question: 'Should I use graphic skill rating bars on my resume?',
    answer:
      'No. ATS parsers cannot read graphic rating bubbles or percent bars (e.g. "Python 85%"). Furthermore, hiring managers find arbitrary self-ratings subjective. Simple text listing is far more effective.',
  },
];

export default function SkillsGeneratorPage() {
  const [roleInput, setRoleInput] = useState('Software Engineer');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const skillsData = getSkillsForRole(roleInput);

  const toggleSelectSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleCopySelected = () => {
    const text = selectedSkills.length > 0 ? selectedSkills.join(', ') : [...skillsData.technical, ...skillsData.tools].join(', ');
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <section className="pt-12 pb-12 bg-white border-b border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-3">
            <Wrench className="w-3.5 h-3.5" />
            Keyword Matching Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            AI Resume Skills Generator
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Discover the exact technical proficiencies, software tools, and competencies ATS parsers scan for in your role.
          </p>
          <div className="mt-3 flex items-center justify-center gap-1 text-xs text-emerald-800 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            100% Client-Side • Instant Results
          </div>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 w-full flex-1 space-y-8">
        {/* Search Bar */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1 w-full">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Enter Your Target Profession or Industry
            </label>
            <input
              type="text"
              value={roleInput}
              onChange={e => setRoleInput(e.target.value)}
              placeholder="e.g. Frontend, DevOps, Marketing, Product Manager, Data Scientist"
              className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none"
            />
          </div>
          <button
            type="button"
            onClick={handleCopySelected}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow transition-all self-end"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied to Clipboard!' : 'Copy Selected Skills'}
          </button>
        </div>

        {/* Categorized Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Technical */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex justify-between">
              <span>Technical Skills</span>
              <span className="text-xs text-indigo-600">{skillsData.technical.length}</span>
            </h2>
            <div className="flex flex-wrap gap-2">
              {skillsData.technical.map((sk, i) => {
                const isSelected = selectedSkills.includes(sk);
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => toggleSelectSkill(sk)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-indigo-600 text-white ring-2 ring-indigo-300 shadow-sm'
                        : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}
                    {sk}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tools & Platforms */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex justify-between">
              <span>Tools & Platforms</span>
              <span className="text-xs text-indigo-600">{skillsData.tools.length}</span>
            </h2>
            <div className="flex flex-wrap gap-2">
              {skillsData.tools.map((sk, i) => {
                const isSelected = selectedSkills.includes(sk);
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => toggleSelectSkill(sk)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-indigo-600 text-white ring-2 ring-indigo-300 shadow-sm'
                        : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}
                    {sk}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Soft Skills */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex justify-between">
              <span>Core Competencies</span>
              <span className="text-xs text-indigo-600">{skillsData.soft.length}</span>
            </h2>
            <div className="flex flex-wrap gap-2">
              {skillsData.soft.map((sk, i) => {
                const isSelected = selectedSkills.includes(sk);
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => toggleSelectSkill(sk)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-indigo-600 text-white ring-2 ring-indigo-300 shadow-sm'
                        : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}
                    {sk}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 flex items-center justify-between">
          <span className="text-xs font-bold text-indigo-900">
            Apply these skills directly to your ATS resume layout
          </span>
          <Link
            href="/builder"
            className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors shadow-sm"
          >
            Open Resume Builder &rarr;
          </Link>
        </div>
      </main>

      <FaqSection
        title="Resume Skills FAQs"
        faqs={SKILLS_FAQS}
      />

      <Footer />
    </div>
  );
}
