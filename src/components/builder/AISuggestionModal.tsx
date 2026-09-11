'use client';

import React, { useState } from 'react';
import { Sparkles, X, Check, Wand2, ShieldCheck } from 'lucide-react';
import {
  generateProfessionalSummaries,
  generateAchievementBullets,
  getSkillsForRole,
  improveResumeText,
} from '@/lib/ai-engine';

interface AISuggestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'summary' | 'bullet' | 'skills' | 'improver';
  initialRole?: string;
  initialText?: string;
  onApply: (selectedContent: string | string[]) => void;
}

export function AISuggestionModal({
  isOpen,
  onClose,
  type,
  initialRole = 'Software Engineer',
  initialText = '',
  onApply,
}: AISuggestionModalProps) {
  const [role, setRole] = useState(initialRole);
  const [experienceYears, setExperienceYears] = useState('5+');
  const [strengths, setStrengths] = useState('driving scalable architectures and team velocity');
  const [duty, setDuty] = useState(initialText || 'managing database migration and system performance');
  const [metricHint, setMetricHint] = useState('by 35% with zero downtime');
  const [improverText, setImproverText] = useState(initialText);
  const [improverMode, setImproverMode] = useState<'strengthen' | 'concise' | 'action'>('strengthen');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                {type === 'summary' && 'AI Professional Summary Generator'}
                {type === 'bullet' && 'AI Achievement Bullet Point Generator'}
                {type === 'skills' && 'AI Skills Suggestions'}
                {type === 'improver' && 'AI Text Improver'}
              </h3>
              <p className="text-xs text-slate-700 flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                Runs client-side in browser • Zero server retention
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-900 p-1.5 rounded-lg hover:bg-slate-200/60"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Case: Summary */}
          {type === 'summary' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Target Job Title
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    placeholder="e.g. Senior Software Engineer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Years of Experience
                  </label>
                  <input
                    type="text"
                    value={experienceYears}
                    onChange={e => setExperienceYears(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                    placeholder="e.g. 7+"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Key Strengths & Value
                </label>
                <input
                  type="text"
                  value={strengths}
                  onChange={e => setStrengths(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  placeholder="e.g. cloud architecture, team velocity, cost reduction"
                />
              </div>

              <div className="pt-2">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select a generated summary:
                </p>
                <div className="space-y-3">
                  {generateProfessionalSummaries(role, experienceYears, strengths).map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 border border-slate-200 rounded-xl hover:border-indigo-400 hover:bg-indigo-50/30 transition-all group"
                    >
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs font-bold text-indigo-700">{item.style}</span>
                        <button
                          type="button"
                          onClick={() => {
                            onApply(item.text);
                            onClose();
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-600 text-white rounded-md text-xs font-semibold shadow-sm hover:bg-indigo-700"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Apply to Resume
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Case: Bullet Points */}
          {type === 'bullet' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Task / Responsibility
                </label>
                <input
                  type="text"
                  value={duty}
                  onChange={e => setDuty(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  placeholder="e.g. was responsible for building the onboarding flow"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Measurable Metric or Outcome (Optional)
                </label>
                <input
                  type="text"
                  value={metricHint}
                  onChange={e => setMetricHint(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  placeholder="e.g. increasing completion rate by 24%"
                />
              </div>

              <div className="pt-2">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  XYZ Achievement Bullet Options:
                </p>
                <div className="space-y-2.5">
                  {generateAchievementBullets(role, duty, metricHint).map((bullet, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 border border-slate-200 rounded-xl hover:border-indigo-400 hover:bg-indigo-50/20 transition-all flex items-start justify-between gap-3"
                    >
                      <p className="text-xs sm:text-sm text-slate-800 leading-snug">{bullet}</p>
                      <button
                        type="button"
                        onClick={() => {
                          onApply(bullet);
                          onClose();
                        }}
                        className="flex-shrink-0 inline-flex items-center gap-1 px-3 py-1 bg-indigo-600 text-white rounded-md text-xs font-semibold hover:bg-indigo-700"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Apply
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Case: Skills */}
          {type === 'skills' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Search Role / Industry
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  placeholder="e.g. Frontend, DevOps, Marketing, Sales, Product"
                />
              </div>

              {(() => {
                const s = getSkillsForRole(role);
                return (
                  <div className="space-y-4 pt-2">
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs font-bold text-slate-800">
                          Recommended Technical Skills ({s.technical.length})
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            onApply(s.technical);
                            onClose();
                          }}
                          className="text-xs font-semibold text-indigo-600 hover:underline"
                        >
                          Add All
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {s.technical.map((sk, i) => (
                          <span
                            key={i}
                            onClick={() => {
                              onApply([sk]);
                            }}
                            className="cursor-pointer px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800 hover:bg-indigo-100 hover:text-indigo-800 transition-colors"
                          >
                            + {sk}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs font-bold text-slate-800">
                          Tools & Platforms ({s.tools.length})
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            onApply(s.tools);
                            onClose();
                          }}
                          className="text-xs font-semibold text-indigo-600 hover:underline"
                        >
                          Add All
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {s.tools.map((sk, i) => (
                          <span
                            key={i}
                            onClick={() => {
                              onApply([sk]);
                            }}
                            className="cursor-pointer px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800 hover:bg-indigo-100 hover:text-indigo-800 transition-colors"
                          >
                            + {sk}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs font-bold text-slate-800">
                          Core Competencies / Soft Skills ({s.soft.length})
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            onApply(s.soft);
                            onClose();
                          }}
                          className="text-xs font-semibold text-indigo-600 hover:underline"
                        >
                          Add All
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {s.soft.map((sk, i) => (
                          <span
                            key={i}
                            onClick={() => {
                              onApply([sk]);
                            }}
                            className="cursor-pointer px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800 hover:bg-indigo-100 hover:text-indigo-800 transition-colors"
                          >
                            + {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Case: Improver */}
          {type === 'improver' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Paste Raw Text to Improve
                </label>
                <textarea
                  rows={4}
                  value={improverText}
                  onChange={e => setImproverText(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  placeholder="e.g. was responsible for fixing bugs and worked on the server"
                />
              </div>

              <div className="flex gap-2">
                {(['strengthen', 'action', 'concise'] as const).map(mode => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setImproverMode(mode)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                      improverMode === mode
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>

              <div className="p-4 border border-indigo-200 bg-indigo-50/30 rounded-xl">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-bold text-indigo-800 flex items-center gap-1">
                    <Wand2 className="w-3.5 h-3.5" />
                    AI Enhanced Output
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      onApply(improveResumeText(improverText, improverMode));
                      onClose();
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-600 text-white rounded-md text-xs font-semibold hover:bg-indigo-700"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Apply Output
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                  {improveResumeText(improverText, improverMode) || (
                    <span className="italic text-slate-600 font-medium">Enter text above to see the enhanced version...</span>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
