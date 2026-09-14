'use client';

import React, { useState } from 'react';
import { ResumeData, TemplateId, FontFamily } from '@/lib/types';
import { ResumeDocument } from './ResumeDocument';
import { Check, ArrowRight, ArrowLeft, Palette, Type } from 'lucide-react';

interface TemplateSelectorStepProps {
  resume: ResumeData;
  onSelectTemplate: (updatedResume: ResumeData) => void;
  onBack: () => void;
  onNext: () => void;
}

interface TemplateMetadata {
  id: TemplateId;
  name: string;
  category: 'ats' | 'tech' | 'executive' | 'modern' | 'compact';
  badge?: string;
  description: string;
}

const TEMPLATES: TemplateMetadata[] = [
  {
    id: 'ats',
    name: 'ATS Standard',
    category: 'ats',
    badge: '100% ATS Verified',
    description: 'Ultra-clean linear single-column format engineered to pass every corporate ATS parser without error.',
  },
  {
    id: 'modern',
    name: 'Modern Accent',
    category: 'modern',
    badge: 'Popular',
    description: 'Clean colored section dividers, contemporary typography, and balanced white space.',
  },
  {
    id: 'tech',
    name: 'Tech & Engineer',
    category: 'tech',
    badge: 'NEW • Software & IT',
    description: 'Terminal-inspired dark header, monospace accents, and categorized tech stack tags.',
  },
  {
    id: 'hybrid',
    name: 'Two-Column Hybrid',
    category: 'modern',
    badge: 'NEW • Recruiter Favorite',
    description: 'Dynamic 2-column sidebar layout displaying contact, skills, and education alongside career experience.',
  },
  {
    id: 'compact',
    name: 'Compact 1-Page Pro',
    category: 'compact',
    badge: 'NEW • High Density',
    description: 'Space-saving layout engineered to fit comprehensive careers cleanly onto a single high-impact page.',
  },
  {
    id: 'executive',
    name: 'Executive Leadership',
    category: 'executive',
    badge: 'Senior & C-Suite',
    description: 'Bold leadership accent banner and structured 2-column core competencies grid.',
  },
  {
    id: 'elegant',
    name: 'Elegant Executive',
    category: 'executive',
    badge: 'NEW • Classic Serif',
    description: 'Refined serif typography with delicate divider rules and sophisticated corporate appeal.',
  },
  {
    id: 'professional',
    name: 'Corporate Professional',
    category: 'executive',
    badge: 'Formal & Finance',
    description: 'Centered formal header with corporate divider line, perfect for consulting, banking, and law.',
  },
  {
    id: 'minimal',
    name: 'Minimal Clean',
    category: 'ats',
    badge: 'Minimalist',
    description: 'Crisp hairline borders, compact rhythm, and uncluttered layout.',
  },
  {
    id: 'simple',
    name: 'Simple Classic',
    category: 'ats',
    badge: 'Zero Friction',
    description: 'Understated, whitespace-rich design that puts raw career achievements front and center.',
  },
  {
    id: 'student',
    name: 'Student & Academic',
    category: 'ats',
    badge: 'New Graduate',
    description: 'Prioritizes university education, coursework, GPA, and academic projects above work history.',
  },
  {
    id: 'graduate',
    name: 'Career Pivot / Graduate',
    category: 'modern',
    badge: 'Entry Level',
    description: 'Balanced profile highlighting transferable skills, internships, and certifications.',
  },
  {
    id: 'creative',
    name: 'Creative Portfolio',
    category: 'modern',
    badge: 'Design & Marketing',
    description: 'High-contrast typography and prominent links to design portfolios and live projects.',
  },
  {
    id: 'academic',
    name: 'Academic CV',
    category: 'ats',
    badge: 'NEW • European / Research',
    description: 'Extended multi-page CV format suited for academia, publications, fellowships, and research.',
  },
];

const COLOR_PALETTES = [
  { name: 'Indigo', value: '#4f46e5' },
  { name: 'Emerald', value: '#059669' },
  { name: 'Slate', value: '#0f172a' },
  { name: 'Royal Blue', value: '#2563eb' },
  { name: 'Rose', value: '#e11d48' },
  { name: 'Violet', value: '#7c3aed' },
  { name: 'Amber', value: '#d97706' },
];

export function TemplateSelectorStep({
  resume,
  onSelectTemplate,
  onBack,
  onNext,
}: TemplateSelectorStepProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const currentTemplate = resume.style.template;

  const filteredTemplates = activeCategory === 'all'
    ? TEMPLATES
    : TEMPLATES.filter(t => t.category === activeCategory);

  const handleTemplateClick = (tplId: TemplateId) => {
    onSelectTemplate({
      ...resume,
      style: {
        ...resume.style,
        template: tplId,
      },
    });
  };

  const handleColorChange = (color: string) => {
    onSelectTemplate({
      ...resume,
      style: {
        ...resume.style,
        primaryColor: color,
      },
    });
  };

  const handleFontChange = (font: FontFamily) => {
    onSelectTemplate({
      ...resume,
      style: {
        ...resume.style,
        fontFamily: font,
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-1">
            Step 2 of 4 • Template Gallery
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Choose Your Resume Template ({TEMPLATES.length} Styles)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Every template is 100% customizable, ATS-compliant, and renders your data dynamically.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Upload
          </button>
          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-200 transition-all active:scale-95"
          >
            Next: Edit &amp; Customize <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Customizer Toolbar */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: `All (${TEMPLATES.length})` },
            { id: 'ats', label: 'ATS Verified' },
            { id: 'tech', label: 'Tech & Engineering' },
            { id: 'executive', label: 'Executive & C-Suite' },
            { id: 'modern', label: 'Modern & Hybrid' },
            { id: 'compact', label: 'Compact 1-Page' },
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCategory(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCategory === tab.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Global Style Adjusters */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-700">
          {/* Color Palettes */}
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-slate-500" />
            <span>Accent:</span>
            <div className="flex items-center gap-1.5">
              {COLOR_PALETTES.map(p => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => handleColorChange(p.value)}
                  style={{ backgroundColor: p.value }}
                  className={`w-5 h-5 rounded-full transition-transform ${
                    resume.style.primaryColor === p.value
                      ? 'ring-2 ring-offset-2 ring-slate-900 scale-110'
                      : 'hover:scale-105'
                  }`}
                  title={p.name}
                />
              ))}
            </div>
          </div>

          {/* Font switcher */}
          <div className="flex items-center gap-1.5 pl-3 border-l border-slate-200">
            <Type className="w-4 h-4 text-slate-500" />
            <select
              value={resume.style.fontFamily}
              onChange={e => handleFontChange(e.target.value as FontFamily)}
              className="px-2 py-1 bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              <option value="sans">Inter (Modern Sans)</option>
              <option value="serif">Merriweather (Classic Serif)</option>
              <option value="mono">JetBrains (Tech Mono)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTemplates.map(tpl => {
          const isSelected = currentTemplate === tpl.id;
          // Create clone with this template for live miniature render
          const previewResume: ResumeData = {
            ...resume,
            style: {
              ...resume.style,
              template: tpl.id,
            },
          };

          return (
            <div
              key={tpl.id}
              onClick={() => handleTemplateClick(tpl.id)}
              className={`group relative rounded-2xl border-2 cursor-pointer transition-all duration-200 bg-white flex flex-col overflow-hidden shadow-sm hover:shadow-xl ${
                isSelected
                  ? 'border-indigo-600 ring-2 ring-indigo-600 ring-offset-2 scale-[1.02]'
                  : 'border-slate-200 hover:border-indigo-300'
              }`}
            >
              {/* Top Banner with Badge */}
              <div className="p-3.5 border-b border-slate-100 flex items-center justify-between gap-2 bg-slate-50/70">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {tpl.name}
                  </h3>
                  {tpl.badge && (
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full inline-block mt-0.5">
                      {tpl.badge}
                    </span>
                  )}
                </div>

                {isSelected ? (
                  <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-full border-2 border-slate-300 group-hover:border-indigo-400 flex items-center justify-center flex-shrink-0 text-transparent">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </div>

              {/* Live Miniature Document Preview */}
              <div className="relative h-72 bg-slate-100 overflow-hidden flex justify-center items-start p-2.5">
                <div
                  style={{
                    transform: 'scale(0.36)',
                    transformOrigin: 'top center',
                    width: '800px',
                    pointerEvents: 'none',
                    userSelect: 'none',
                  }}
                  className="shadow-md"
                >
                  <ResumeDocument resume={previewResume} />
                </div>

                {/* Overlay hover prompt */}
                <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3.5 py-1.5 bg-slate-900/90 text-white text-xs font-bold rounded-lg shadow-lg">
                    {isSelected ? 'Currently Selected' : 'Select Template'}
                  </span>
                </div>
              </div>

              {/* Description footer */}
              <div className="p-3 bg-white border-t border-slate-100 text-[11px] text-slate-600 leading-relaxed">
                {tpl.description}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Bottom Action Bar */}
      <div className="sticky bottom-4 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
            ✓
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Selected: <span className="text-indigo-600 capitalize">{currentTemplate}</span>
            </h4>
            <p className="text-xs text-slate-500">
              You can modify content, typography, and sections in the next step.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={onBack}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50"
          >
            &larr; Back
          </button>
          <button
            type="button"
            onClick={onNext}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-200 active:scale-95 transition-all"
          >
            Continue to Editor &amp; Modify <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
