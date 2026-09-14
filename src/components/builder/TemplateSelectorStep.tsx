'use client';

import React, { useState } from 'react';
import { ResumeData, TemplateId, FontFamily } from '@/lib/types';
import { ResumeDocument } from './ResumeDocument';
import {
  Check,
  ArrowRight,
  ArrowLeft,
  Palette,
  Type,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Sparkles,
} from 'lucide-react';

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
    id: 'banner',
    name: 'Vibrant Banner',
    category: 'modern',
    badge: 'NEW • Colorful Header',
    description: 'Full-width colored header block with high-contrast typography, translucent contact pills, and modern skill badges.',
  },
  {
    id: 'infographic',
    name: 'Infographic Modern',
    category: 'modern',
    badge: 'NEW • Visual & Designable',
    description: 'Soft-tinted sidebar with circular icon badges, visual skill pill tags, and clean dual-column layout.',
  },
  {
    id: 'timeline',
    name: 'Career Timeline',
    category: 'modern',
    badge: 'NEW • Visual Milestones',
    description: 'Chronological timeline rail connecting career milestones with colored waypoint nodes and date pills.',
  },
  {
    id: 'metro',
    name: 'Metro Modular',
    category: 'tech',
    badge: 'NEW • Clean Cards',
    description: 'Card-based modular sections with colored category chips, structured borders, and modern grid balance.',
  },
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
    badge: 'Software & IT',
    description: 'Terminal-inspired dark header, monospace accents, and categorized tech stack tags.',
  },
  {
    id: 'hybrid',
    name: 'Two-Column Hybrid',
    category: 'modern',
    badge: 'Recruiter Favorite',
    description: 'Dynamic 2-column sidebar layout displaying contact, skills, and education alongside career experience.',
  },
  {
    id: 'compact',
    name: 'Compact 1-Page Pro',
    category: 'compact',
    badge: 'High Density',
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
    badge: 'Classic Serif',
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
    badge: 'European / Research',
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

interface TemplatePreviewThumbnailProps {
  resume: ResumeData;
  templateId: TemplateId;
}

function TemplatePreviewThumbnail({ resume, templateId }: TemplatePreviewThumbnailProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  // Default scale ~0.32: for standard 4-column card (container ~270px -> 800 * 0.32 = ~256px + 14px padding)
  const [scale, setScale] = React.useState<number>(0.32);

  React.useEffect(() => {
    if (!containerRef.current) return;

    const computeScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        // Leave 16px horizontal margin (8px on each side) for clean paper document look
        const targetWidth = Math.max(width - 16, 160);
        // Base document design width is 816px (standard US Letter)
        const newScale = targetWidth / 816;
        setScale(newScale);
      }
    };

    computeScale();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(computeScale);
      ro.observe(containerRef.current);
    }

    return () => {
      if (ro) ro.disconnect();
    };
  }, []);

  const previewResume: ResumeData = {
    ...resume,
    style: {
      ...resume.style,
      template: templateId,
    },
  };

  return (
    <div
      ref={containerRef}
      className="relative h-80 bg-slate-100/80 overflow-hidden flex justify-center items-start pt-2 px-2 select-none"
    >
      {/* 
        CRITICAL FIX: 
        We enforce fixed width 816px with minWidth and flexShrink 0.
        This prevents parent flexbox from squishing the 816px layout down,
        matching the exact layout of the live editor and PDF export.
      */}
      <div
        style={{
          width: '816px',
          minWidth: '816px',
          maxWidth: '816px',
          flexShrink: 0,
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          pointerEvents: 'none',
        }}
        className="shadow-md rounded-xs bg-white border border-slate-200"
      >
        <ResumeDocument resume={previewResume} id={`preview-${templateId}`} />
      </div>

      {/* Subtle bottom fade to indicate continuation of document */}
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-slate-100/90 to-transparent pointer-events-none" />
    </div>
  );
}

export function TemplateSelectorStep({
  resume,
  onSelectTemplate,
  onBack,
  onNext,
}: TemplateSelectorStepProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [modalTemplateId, setModalTemplateId] = useState<TemplateId | null>(null);
  const [modalZoom, setModalZoom] = useState<number>(85);
  const currentTemplate = resume.style.template;

  // Auto-fit modal zoom on mobile viewports
  React.useEffect(() => {
    if (modalTemplateId && typeof window !== 'undefined') {
      const w = window.innerWidth;
      if (w < 860) {
        setModalZoom(Math.max(32, Math.min(85, Math.floor(((w - 36) / 816) * 100))));
      } else {
        setModalZoom(85);
      }
    }
  }, [modalTemplateId]);

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

  // Switch modal template with Prev / Next
  const handleModalNavigate = (direction: 'prev' | 'next') => {
    if (!modalTemplateId) return;
    const currentIndex = TEMPLATES.findIndex(t => t.id === modalTemplateId);
    if (currentIndex === -1) return;

    if (direction === 'prev') {
      const prevIndex = (currentIndex - 1 + TEMPLATES.length) % TEMPLATES.length;
      setModalTemplateId(TEMPLATES[prevIndex].id);
    } else {
      const nextIndex = (currentIndex + 1) % TEMPLATES.length;
      setModalTemplateId(TEMPLATES[nextIndex].id);
    }
  };

  const activeModalTemplateMeta = TEMPLATES.find(t => t.id === modalTemplateId);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-1">
            Step 2 of 4 • Template Gallery
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Choose Your Resume Template</span>
            <span className="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800">
              {TEMPLATES.length} Pro Styles
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Every template is 100% customizable, ATS-compliant, and renders your data dynamically with high-definition previews.
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
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 -mx-1 px-1 scrollbar-none">
          {[
            { id: 'all', label: `All (${TEMPLATES.length})` },
            { id: 'modern', label: 'Colorful & Modern' },
            { id: 'ats', label: 'ATS Verified' },
            { id: 'tech', label: 'Tech & Engineering' },
            { id: 'executive', label: 'Executive & C-Suite' },
            { id: 'compact', label: 'Compact 1-Page' },
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCategory(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex-shrink-0 ${
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

          return (
            <div
              key={tpl.id}
              className={`group relative rounded-2xl border-2 transition-all duration-200 bg-white flex flex-col overflow-hidden shadow-sm hover:shadow-xl ${
                isSelected
                  ? 'border-indigo-600 ring-2 ring-indigo-600 ring-offset-2 scale-[1.01]'
                  : 'border-slate-200 hover:border-indigo-300'
              }`}
            >
              {/* Top Banner with Badge & Selection indicator */}
              <div
                onClick={() => handleTemplateClick(tpl.id)}
                className="p-3 border-b border-slate-100 flex items-center justify-between gap-2 bg-slate-50/80 cursor-pointer"
              >
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

              {/* Live Miniature Document Preview Container */}
              <div
                onClick={() => handleTemplateClick(tpl.id)}
                className="relative cursor-pointer group/preview"
              >
                <TemplatePreviewThumbnail resume={resume} templateId={tpl.id} />

                {/* Hover overlay with dual actions: Select & Full Size Preview */}
                <div className="absolute inset-0 z-10 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2.5 p-4">
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      handleTemplateClick(tpl.id);
                    }}
                    className="w-full max-w-[190px] py-2.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xl transition-transform active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    {isSelected ? 'Selected' : 'Use Template'}
                  </button>
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      setModalTemplateId(tpl.id);
                    }}
                    className="w-full max-w-[190px] py-2.5 px-3 bg-white/95 hover:bg-white text-slate-800 text-xs font-bold rounded-xl shadow-xl transition-transform active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-4 h-4 text-indigo-600" />
                    Full Size Preview
                  </button>
                </div>
              </div>

              {/* Description footer with Quick Look button */}
              <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between gap-2 text-[11px] text-slate-600">
                <span className="line-clamp-2 leading-relaxed flex-1">
                  {tpl.description}
                </span>
                <button
                  type="button"
                  onClick={() => setModalTemplateId(tpl.id)}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-colors flex-shrink-0"
                  title="Open Full Size Preview"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Bottom Action Bar */}
      <div className="sticky bottom-4 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
            <Sparkles className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Selected Style:{' '}
              <span className="text-indigo-600 uppercase tracking-wide">
                {TEMPLATES.find(t => t.id === currentTemplate)?.name || currentTemplate}
              </span>
            </h4>
            <p className="text-xs text-slate-500">
              Click &quot;Continue&quot; to edit content, reorder sections, and polish bullet points.
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

      {/* Full Size Preview Lightbox Modal */}
      {modalTemplateId && activeModalTemplateMeta && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex flex-col justify-between p-3 sm:p-6 overflow-hidden animate-in fade-in duration-150">
          {/* Top Modal Header */}
          <div className="bg-white rounded-2xl shadow-xl p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleModalNavigate('prev')}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                title="Previous Template"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold text-slate-900">
                    {activeModalTemplateMeta.name}
                  </h3>
                  {activeModalTemplateMeta.badge && (
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full">
                      {activeModalTemplateMeta.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 hidden sm:block">
                  {activeModalTemplateMeta.description}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleModalNavigate('next')}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                title="Next Template"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Live Color Picker & Zoom in Modal */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-1.5">
                <span className="text-xs font-semibold text-slate-600">Color:</span>
                {COLOR_PALETTES.map(p => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => handleColorChange(p.value)}
                    style={{ backgroundColor: p.value }}
                    className={`w-4 h-4 rounded-full transition-transform ${
                      resume.style.primaryColor === p.value
                        ? 'ring-2 ring-offset-2 ring-slate-900 scale-110'
                        : 'hover:scale-105'
                    }`}
                    title={p.name}
                  />
                ))}
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setModalZoom(z => Math.max(50, z - 10))}
                  className="p-1 rounded text-slate-600 hover:bg-white"
                  title="Zoom out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-bold text-slate-700 w-9 text-center">
                  {modalZoom}%
                </span>
                <button
                  type="button"
                  onClick={() => setModalZoom(z => Math.min(130, z + 10))}
                  className="p-1 rounded text-slate-600 hover:bg-white"
                  title="Zoom in"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Select & Close CTAs */}
              <button
                type="button"
                onClick={() => {
                  handleTemplateClick(modalTemplateId);
                  setModalTemplateId(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  currentTemplate === modalTemplateId
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200'
                }`}
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                {currentTemplate === modalTemplateId ? 'Currently Active' : 'Use This Template'}
              </button>

              <button
                type="button"
                onClick={() => setModalTemplateId(null)}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                title="Close Full Screen Preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Document Body */}
          <div className="flex-1 overflow-auto my-2 sm:my-4 flex justify-center items-start p-1 sm:p-2">
            <div
              style={{
                width: modalZoom < 100 ? `${Math.round(816 * (modalZoom / 100))}px` : '816px',
                minWidth: modalZoom < 100 ? `${Math.round(816 * (modalZoom / 100))}px` : '816px',
                height: modalZoom < 100 ? `${Math.round(1056 * (modalZoom / 100))}px` : undefined,
                position: 'relative',
                transition: 'width 0.15s ease-out, height 0.15s ease-out',
              }}
              className="shadow-2xl rounded-sm bg-white flex justify-center flex-shrink-0"
            >
              <div
                style={{
                  width: '816px',
                  minWidth: '816px',
                  transform: `scale(${modalZoom / 100})`,
                  transformOrigin: modalZoom < 100 ? 'top left' : 'top center',
                  transition: 'transform 0.15s ease-out',
                }}
              >
                <ResumeDocument
                  resume={{
                    ...resume,
                    style: {
                      ...resume.style,
                      template: modalTemplateId,
                    },
                  }}
                  id="modal-preview-doc"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
