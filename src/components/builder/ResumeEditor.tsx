'use client';

import React, { useState } from 'react';
import {
  ResumeData,
  WorkExperienceItem,
  EducationItem,
  ProjectItem,
  TemplateId,
  FontFamily,
  FontSize,
} from '@/lib/types';
import {
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Plus,
  Trash2,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Palette,
  RotateCcw,
  Download,
  Upload,
  Copy,
  Wand2,
} from 'lucide-react';
import { SAMPLE_RESUME, BLANK_RESUME } from '@/lib/sample-data';
import { exportResumeAsJSON, clearResumeData } from '@/lib/storage';
import { AISuggestionModal } from './AISuggestionModal';

interface ResumeEditorProps {
  resume: ResumeData;
  onChange: (updated: ResumeData) => void;
}

const TEMPLATE_OPTIONS: { id: TemplateId; label: string }[] = [
  { id: 'ats', label: 'ATS Standard' },
  { id: 'modern', label: 'Modern' },
  { id: 'professional', label: 'Professional' },
  { id: 'simple', label: 'Simple' },
  { id: 'minimal', label: 'Minimal' },
  { id: 'executive', label: 'Executive' },
  { id: 'student', label: 'Student' },
  { id: 'graduate', label: 'Graduate' },
  { id: 'creative', label: 'Creative' },
];

const COLOR_PALETTE = [
  { name: 'Slate', value: '#0f172a' },
  { name: 'Navy', value: '#1e3a8a' },
  { name: 'Indigo', value: '#4338ca' },
  { name: 'Emerald', value: '#047857' },
  { name: 'Teal', value: '#0f766e' },
  { name: 'Crimson', value: '#be123c' },
  { name: 'Purple', value: '#6d28d9' },
  { name: 'Charcoal', value: '#334155' },
];

export function ResumeEditor({ resume, onChange }: ResumeEditorProps) {
  const [activeSection, setActiveSection] = useState<string>('personal');
  const [aiModalState, setAiModalState] = useState<{
    isOpen: boolean;
    type: 'summary' | 'bullet' | 'skills' | 'improver';
    targetExpId?: string;
    targetBulletIdx?: number;
    initialText?: string;
    initialRole?: string;
  }>({
    isOpen: false,
    type: 'summary',
  });

  const toggleSection = (sec: string) => {
    setActiveSection(activeSection === sec ? '' : sec);
  };

  // Helper update functions
  const updatePersonalInfo = (field: keyof ResumeData['personalInfo'], val: string) => {
    onChange({
      ...resume,
      personalInfo: {
        ...resume.personalInfo,
        [field]: val,
      },
    });
  };

  const updateSummary = (summary: string) => {
    onChange({ ...resume, summary });
  };

  const updateStyle = (key: keyof ResumeData['style'], val: any) => {
    onChange({
      ...resume,
      style: {
        ...resume.style,
        [key]: val,
      },
    });
  };

  // Experience handlers
  const addExperience = () => {
    const newItem: WorkExperienceItem = {
      id: `exp-${Date.now()}`,
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      bullets: [''],
    };
    onChange({
      ...resume,
      workExperience: [newItem, ...resume.workExperience],
    });
  };

  const updateExperience = (id: string, field: keyof WorkExperienceItem, val: any) => {
    onChange({
      ...resume,
      workExperience: resume.workExperience.map(exp =>
        exp.id === id ? { ...exp, [field]: val } : exp
      ),
    });
  };

  const removeExperience = (id: string) => {
    onChange({
      ...resume,
      workExperience: resume.workExperience.filter(exp => exp.id !== id),
    });
  };

  const duplicateExperience = (exp: WorkExperienceItem) => {
    const duplicated: WorkExperienceItem = {
      ...exp,
      id: `exp-${Date.now()}`,
      company: `${exp.company} (Copy)`,
    };
    onChange({
      ...resume,
      workExperience: [...resume.workExperience, duplicated],
    });
  };

  const updateBullet = (expId: string, bIdx: number, val: string) => {
    onChange({
      ...resume,
      workExperience: resume.workExperience.map(exp => {
        if (exp.id !== expId) return exp;
        const bullets = [...exp.bullets];
        bullets[bIdx] = val;
        return { ...exp, bullets };
      }),
    });
  };

  const addBullet = (expId: string) => {
    onChange({
      ...resume,
      workExperience: resume.workExperience.map(exp => {
        if (exp.id !== expId) return exp;
        return { ...exp, bullets: [...exp.bullets, ''] };
      }),
    });
  };

  const removeBullet = (expId: string, bIdx: number) => {
    onChange({
      ...resume,
      workExperience: resume.workExperience.map(exp => {
        if (exp.id !== expId) return exp;
        return { ...exp, bullets: exp.bullets.filter((_, idx) => idx !== bIdx) };
      }),
    });
  };

  // Education handlers
  const addEducation = () => {
    const newEdu: EducationItem = {
      id: `edu-${Date.now()}`,
      school: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      honors: '',
    };
    onChange({
      ...resume,
      education: [...resume.education, newEdu],
    });
  };

  const updateEducation = (id: string, field: keyof EducationItem, val: any) => {
    onChange({
      ...resume,
      education: resume.education.map(edu =>
        edu.id === id ? { ...edu, [field]: val } : edu
      ),
    });
  };

  const removeEducation = (id: string) => {
    onChange({
      ...resume,
      education: resume.education.filter(edu => edu.id !== id),
    });
  };

  // Skills handlers
  const addSkill = (category: keyof ResumeData['skills'], skill: string) => {
    const clean = skill.trim();
    if (!clean || resume.skills[category].includes(clean)) return;
    onChange({
      ...resume,
      skills: {
        ...resume.skills,
        [category]: [...resume.skills[category], clean],
      },
    });
  };

  const removeSkill = (category: keyof ResumeData['skills'], skillToRemove: string) => {
    onChange({
      ...resume,
      skills: {
        ...resume.skills,
        [category]: resume.skills[category].filter(s => s !== skillToRemove),
      },
    });
  };

  // Projects handlers
  const addProject = () => {
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      name: '',
      description: '',
      technologies: '',
      link: '',
      bullets: [''],
    };
    onChange({
      ...resume,
      projects: [...resume.projects, newProj],
    });
  };

  const updateProject = (id: string, field: keyof ProjectItem, val: any) => {
    onChange({
      ...resume,
      projects: resume.projects.map(p => (p.id === id ? { ...p, [field]: val } : p)),
    });
  };

  const removeProject = (id: string) => {
    onChange({
      ...resume,
      projects: resume.projects.filter(p => p.id !== id),
    });
  };

  // Import JSON handler
  const handleJSONUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = event => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        onChange({ ...SAMPLE_RESUME, ...parsed });
      } catch {
        alert('Invalid JSON file. Please verify the format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* Top Utilities Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-white border border-slate-200 rounded-xl shadow-sm">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onChange(SAMPLE_RESUME)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Load Sample
          </button>
          <button
            type="button"
            onClick={() => {
              if (confirm('Start with a blank resume? Unsaved changes will be cleared.')) {
                clearResumeData();
                onChange(BLANK_RESUME);
              }
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => exportResumeAsJSON(resume)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            title="Export full resume profile as JSON backup"
          >
            <Download className="w-3.5 h-3.5" />
            Backup JSON
          </button>
          <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer transition-colors">
            <Upload className="w-3.5 h-3.5" />
            Restore
            <input
              type="file"
              accept=".json"
              onChange={handleJSONUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Style & Layout Controls Accordion */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('design')}
          className="w-full px-5 py-4 flex items-center justify-between font-bold text-slate-900 text-sm hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Palette className="w-4 h-4 text-indigo-600" />
            <span>Design, Templates & Typography</span>
          </div>
          {activeSection === 'design' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {activeSection === 'design' && (
          <div className="p-5 border-t border-slate-100 space-y-4 bg-slate-50/50">
            {/* Template Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Resume Template (9 Designs)
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
                {TEMPLATE_OPTIONS.map(tpl => (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => updateStyle('template', tpl.id)}
                    className={`px-3 py-2 text-xs font-semibold rounded-lg border text-center transition-all ${
                      resume.style.template === tpl.id
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-600'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {tpl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Accent Color Palette */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Primary Accent Color
              </label>
              <div className="flex flex-wrap gap-2">
                {COLOR_PALETTE.map(c => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => updateStyle('primaryColor', c.value)}
                    className={`w-7 h-7 rounded-full border-2 transition-transform ${
                      resume.style.primaryColor === c.value
                        ? 'scale-110 border-indigo-600 ring-2 ring-indigo-300'
                        : 'border-white hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.value }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Font Family & Spacing */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Font Family</label>
                <select
                  value={resume.style.fontFamily}
                  onChange={e => updateStyle('fontFamily', e.target.value as FontFamily)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                >
                  <option value="sans">Modern Sans-Serif</option>
                  <option value="serif">Executive Serif</option>
                  <option value="mono">Clean Monospace</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Font Size</label>
                <select
                  value={resume.style.fontSize}
                  onChange={e => updateStyle('fontSize', e.target.value as FontSize)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                >
                  <option value="compact">Compact (Fit 1 Page)</option>
                  <option value="normal">Standard</option>
                  <option value="spacious">Spacious</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Line Spacing</label>
                <select
                  value={resume.style.lineSpacing}
                  onChange={e => updateStyle('lineSpacing', e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                >
                  <option value="compact">Tight</option>
                  <option value="normal">Regular</option>
                  <option value="relaxed">Relaxed</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 1. Personal Information Section */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('personal')}
          className="w-full px-5 py-4 flex items-center justify-between font-bold text-slate-900 text-sm hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <User className="w-4 h-4 text-indigo-600" />
            <span>Personal & Contact Details</span>
          </div>
          {activeSection === 'personal' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {activeSection === 'personal' && (
          <div className="p-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={resume.personalInfo.fullName}
                onChange={e => updatePersonalInfo('fullName', e.target.value)}
                placeholder="e.g. Alex Morgan"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Job Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={resume.personalInfo.jobTitle}
                onChange={e => updatePersonalInfo('jobTitle', e.target.value)}
                placeholder="e.g. Senior Software Engineer"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                value={resume.personalInfo.email}
                onChange={e => updatePersonalInfo('email', e.target.value)}
                placeholder="alex.morgan@email.com"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={resume.personalInfo.phone}
                onChange={e => updatePersonalInfo('phone', e.target.value)}
                placeholder="+1 (555) 234-5678"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Location (City, State / Country)
              </label>
              <input
                type="text"
                value={resume.personalInfo.location}
                onChange={e => updatePersonalInfo('location', e.target.value)}
                placeholder="San Francisco, CA"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                LinkedIn URL
              </label>
              <input
                type="text"
                value={resume.personalInfo.linkedin}
                onChange={e => updatePersonalInfo('linkedin', e.target.value)}
                placeholder="linkedin.com/in/alexmorgan"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                GitHub / Portfolio URL
              </label>
              <input
                type="text"
                value={resume.personalInfo.github}
                onChange={e => updatePersonalInfo('github', e.target.value)}
                placeholder="github.com/alexmorgan"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Personal Website
              </label>
              <input
                type="text"
                value={resume.personalInfo.website}
                onChange={e => updatePersonalInfo('website', e.target.value)}
                placeholder="https://alexmorgan.dev"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* 2. Professional Summary Section */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('summary')}
          className="w-full px-5 py-4 flex items-center justify-between font-bold text-slate-900 text-sm hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Professional Summary</span>
          </div>
          {activeSection === 'summary' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {activeSection === 'summary' && (
          <div className="p-5 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">
                2-4 sentence summary highlighting experience and impact
              </span>
              <button
                type="button"
                onClick={() =>
                  setAiModalState({
                    isOpen: true,
                    type: 'summary',
                    initialRole: resume.personalInfo.jobTitle,
                  })
                }
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-bold hover:bg-indigo-100 transition-colors shadow-sm"
              >
                <Wand2 className="w-3.5 h-3.5 text-indigo-600" />
                AI Summary Assistant
              </button>
            </div>
            <textarea
              rows={4}
              value={resume.summary}
              onChange={e => updateSummary(e.target.value)}
              placeholder="Results-driven professional with 5+ years of experience..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none leading-relaxed"
            />
          </div>
        )}
      </div>

      {/* 3. Work Experience Section */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('experience')}
          className="w-full px-5 py-4 flex items-center justify-between font-bold text-slate-900 text-sm hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Briefcase className="w-4 h-4 text-indigo-600" />
            <span>Work Experience ({resume.workExperience.length})</span>
          </div>
          {activeSection === 'experience' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {activeSection === 'experience' && (
          <div className="p-5 border-t border-slate-100 space-y-6">
            {resume.workExperience.map((exp, idx) => (
              <div
                key={exp.id}
                className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 space-y-3 relative"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Role #{idx + 1}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => duplicateExperience(exp)}
                      className="p-1 text-slate-500 hover:text-slate-800"
                      title="Duplicate this role"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeExperience(exp.id)}
                      className="p-1 text-rose-500 hover:text-rose-700"
                      title="Remove role"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Company</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={e => updateExperience(exp.id, 'company', e.target.value)}
                      placeholder="e.g. Apex Cloud Systems"
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Position / Title</label>
                    <input
                      type="text"
                      value={exp.position}
                      onChange={e => updateExperience(exp.id, 'position', e.target.value)}
                      placeholder="e.g. Senior Software Engineer"
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Start Date</label>
                    <input
                      type="text"
                      value={exp.startDate}
                      onChange={e => updateExperience(exp.id, 'startDate', e.target.value)}
                      placeholder="e.g. 2021-03"
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">End Date</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        disabled={exp.current}
                        value={exp.current ? 'Present' : exp.endDate}
                        onChange={e => updateExperience(exp.id, 'endDate', e.target.value)}
                        placeholder="e.g. 2024-05"
                        className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none disabled:bg-slate-200"
                      />
                      <label className="flex items-center gap-1 text-xs text-slate-600 whitespace-nowrap cursor-pointer">
                        <input
                          type="checkbox"
                          checked={exp.current}
                          onChange={e => updateExperience(exp.id, 'current', e.target.checked)}
                          className="rounded text-indigo-600 focus:ring-indigo-500"
                        />
                        Current
                      </label>
                    </div>
                  </div>
                </div>

                {/* Bullets */}
                <div className="pt-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      Accomplishment Bullets
                    </span>
                    <button
                      type="button"
                      onClick={() => addBullet(exp.id)}
                      className="text-xs text-indigo-600 font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      Add Bullet
                    </button>
                  </div>

                  {exp.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2">
                      <span className="text-slate-600 mt-2 text-xs font-bold">•</span>
                      <textarea
                        rows={2}
                        value={bullet}
                        onChange={e => updateBullet(exp.id, bIdx, e.target.value)}
                        placeholder="Accomplished [X] measured by [Y] by doing [Z]..."
                        className="flex-1 px-2.5 py-1.5 border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setAiModalState({
                            isOpen: true,
                            type: 'bullet',
                            targetExpId: exp.id,
                            targetBulletIdx: bIdx,
                            initialRole: exp.position || resume.personalInfo.jobTitle,
                            initialText: bullet,
                          })
                        }
                        className="p-1.5 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 transition-colors flex-shrink-0"
                        title="AI Bullet Optimizer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeBullet(exp.id, bIdx)}
                        className="p-1.5 text-slate-500 hover:text-rose-600 flex-shrink-0"
                        title="Remove bullet"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addExperience}
              className="w-full py-2.5 border-2 border-dashed border-slate-300 hover:border-indigo-500 rounded-xl text-xs font-bold text-slate-600 hover:text-indigo-600 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Another Work Experience
            </button>
          </div>
        )}
      </div>

      {/* 4. Education Section */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('education')}
          className="w-full px-5 py-4 flex items-center justify-between font-bold text-slate-900 text-sm hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <span>Education ({resume.education.length})</span>
          </div>
          {activeSection === 'education' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {activeSection === 'education' && (
          <div className="p-5 border-t border-slate-100 space-y-4">
            {resume.education.map(edu => (
              <div
                key={edu.id}
                className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 space-y-3 relative"
              >
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="text-xs font-bold text-slate-700">Degree / Institution</span>
                  <button
                    type="button"
                    onClick={() => removeEducation(edu.id)}
                    className="p-1 text-rose-500 hover:text-rose-700"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">University / College</label>
                    <input
                      type="text"
                      value={edu.school}
                      onChange={e => updateEducation(edu.id, 'school', e.target.value)}
                      placeholder="e.g. UC Berkeley"
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Degree</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={e => updateEducation(edu.id, 'degree', e.target.value)}
                      placeholder="e.g. Bachelor of Science"
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Field of Study</label>
                    <input
                      type="text"
                      value={edu.field}
                      onChange={e => updateEducation(edu.id, 'field', e.target.value)}
                      placeholder="e.g. Computer Science"
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Graduation Date</label>
                    <input
                      type="text"
                      value={edu.endDate}
                      onChange={e => updateEducation(edu.id, 'endDate', e.target.value)}
                      placeholder="e.g. 2017-05"
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">GPA (Optional)</label>
                    <input
                      type="text"
                      value={edu.gpa}
                      onChange={e => updateEducation(edu.id, 'gpa', e.target.value)}
                      placeholder="e.g. 3.85 / 4.0"
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Honors / Awards</label>
                    <input
                      type="text"
                      value={edu.honors}
                      onChange={e => updateEducation(edu.id, 'honors', e.target.value)}
                      placeholder="e.g. Cum Laude, Dean’s Honors List"
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addEducation}
              className="w-full py-2.5 border-2 border-dashed border-slate-300 hover:border-indigo-500 rounded-xl text-xs font-bold text-slate-600 hover:text-indigo-600 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Education
            </button>
          </div>
        )}
      </div>

      {/* 5. Skills Section */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('skills')}
          className="w-full px-5 py-4 flex items-center justify-between font-bold text-slate-900 text-sm hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Wrench className="w-4 h-4 text-indigo-600" />
            <span>
              Skills & Keywords (
              {resume.skills.technical.length +
                resume.skills.tools.length +
                resume.skills.soft.length}
              )
            </span>
          </div>
          {activeSection === 'skills' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {activeSection === 'skills' && (
          <div className="p-5 border-t border-slate-100 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Organized keywords for ATS parsing and recruiter matching
              </span>
              <button
                type="button"
                onClick={() =>
                  setAiModalState({
                    isOpen: true,
                    type: 'skills',
                    initialRole: resume.personalInfo.jobTitle,
                  })
                }
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-bold hover:bg-indigo-100 transition-colors shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                AI Skill Suggestions
              </button>
            </div>

            {/* Technical Skills */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                Technical Skills
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {resume.skills.technical.map((sk, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800"
                  >
                    {sk}
                    <button
                      type="button"
                      onClick={() => removeSkill('technical', sk)}
                      className="text-slate-600 hover:text-rose-600 font-bold ml-0.5"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Type skill & press Enter (e.g. React, Python)"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkill('technical', e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              />
            </div>

            {/* Tools & Platforms */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                Tools & Platforms
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {resume.skills.tools.map((sk, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800"
                  >
                    {sk}
                    <button
                      type="button"
                      onClick={() => removeSkill('tools', sk)}
                      className="text-slate-600 hover:text-rose-600 font-bold ml-0.5"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Type tool & press Enter (e.g. Docker, AWS, Figma)"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkill('tools', e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              />
            </div>

            {/* Soft Skills */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                Core Competencies & Soft Skills
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {resume.skills.soft.map((sk, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800"
                  >
                    {sk}
                    <button
                      type="button"
                      onClick={() => removeSkill('soft', sk)}
                      className="text-slate-600 hover:text-rose-600 font-bold ml-0.5"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Type competency & press Enter (e.g. Cross-functional Leadership)"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkill('soft', e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* 6. Projects Section */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('projects')}
          className="w-full px-5 py-4 flex items-center justify-between font-bold text-slate-900 text-sm hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <FolderGit2 className="w-4 h-4 text-indigo-600" />
            <span>Key Projects ({resume.projects.length})</span>
          </div>
          {activeSection === 'projects' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {activeSection === 'projects' && (
          <div className="p-5 border-t border-slate-100 space-y-4">
            {resume.projects.map(proj => (
              <div
                key={proj.id}
                className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 space-y-3"
              >
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="text-xs font-bold text-slate-700">Project Details</span>
                  <button
                    type="button"
                    onClick={() => removeProject(proj.id)}
                    className="p-1 text-rose-500 hover:text-rose-700"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Project Name</label>
                    <input
                      type="text"
                      value={proj.name}
                      onChange={e => updateProject(proj.id, 'name', e.target.value)}
                      placeholder="e.g. Distributed Cache Engine"
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Technologies Used</label>
                    <input
                      type="text"
                      value={proj.technologies}
                      onChange={e => updateProject(proj.id, 'technologies', e.target.value)}
                      placeholder="e.g. Go, Docker, Raft"
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Project URL</label>
                    <input
                      type="text"
                      value={proj.link}
                      onChange={e => updateProject(proj.id, 'link', e.target.value)}
                      placeholder="https://github.com/alexmorgan/project"
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Brief Description</label>
                    <textarea
                      rows={2}
                      value={proj.description}
                      onChange={e => updateProject(proj.id, 'description', e.target.value)}
                      placeholder="Open-source engine processing 85k ops/sec..."
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addProject}
              className="w-full py-2.5 border-2 border-dashed border-slate-300 hover:border-indigo-500 rounded-xl text-xs font-bold text-slate-600 hover:text-indigo-600 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Project
            </button>
          </div>
        )}
      </div>

      {/* AI Suggestion Modal */}
      <AISuggestionModal
        isOpen={aiModalState.isOpen}
        onClose={() => setAiModalState({ ...aiModalState, isOpen: false })}
        type={aiModalState.type}
        initialRole={aiModalState.initialRole}
        initialText={aiModalState.initialText}
        onApply={result => {
          if (aiModalState.type === 'summary' && typeof result === 'string') {
            updateSummary(result);
          } else if (
            aiModalState.type === 'bullet' &&
            aiModalState.targetExpId !== undefined &&
            aiModalState.targetBulletIdx !== undefined &&
            typeof result === 'string'
          ) {
            updateBullet(aiModalState.targetExpId, aiModalState.targetBulletIdx, result);
          } else if (aiModalState.type === 'skills') {
            const skillsToAdd = Array.isArray(result) ? result : [result];
            skillsToAdd.forEach(sk => addSkill('technical', sk));
          }
        }}
      />
    </div>
  );
}
