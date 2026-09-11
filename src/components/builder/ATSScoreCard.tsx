'use client';

import React, { useState } from 'react';
import { ResumeData } from '@/lib/types';
import { evaluateATS } from '@/lib/ats-evaluator';
import { CheckCircle2, AlertTriangle, AlertCircle, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

interface ATSScoreCardProps {
  resume: ResumeData;
  onFixShortcut?: (category: string) => void;
}

export function ATSScoreCard({ resume, onFixShortcut: _onFixShortcut }: ATSScoreCardProps) {
  const [expanded, setExpanded] = useState(false);
  const result = evaluateATS(resume);

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-800 border-emerald-500 bg-emerald-50';
    if (score >= 70) return 'text-amber-800 border-amber-500 bg-amber-50';
    return 'text-rose-800 border-rose-500 bg-rose-50';
  };

  const getProgressColor = (score: number) => {
    if (score >= 85) return 'bg-emerald-600';
    if (score >= 70) return 'bg-amber-600';
    return 'bg-rose-600';
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
      {/* Top Banner */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl border-2 ${getScoreColor(
              result.score
            )}`}
          >
            {result.score}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-slate-900 text-sm">ATS Readability Score</h4>
              <span className="px-1.5 py-0.5 rounded text-[11px] font-extrabold bg-slate-100 text-slate-700">
                Grade: {result.grade}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5 max-w-xs line-clamp-1">
              {result.summary}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 p-1 rounded-md"
        >
          {expanded ? 'Hide Details' : 'View Audit'}
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${getProgressColor(
            result.score
          )}`}
          style={{ width: `${result.score}%` }}
        />
      </div>

      {/* Quick Metrics Bar */}
      <div className="grid grid-cols-4 gap-2 mt-3 pt-3 border-t border-slate-100 text-center">
        <div className="bg-slate-50 rounded-lg p-1.5">
          <span className="block text-[10px] text-slate-700 font-medium">Words</span>
          <span className="text-xs font-bold text-slate-800">
            {result.metrics.wordCount}
          </span>
        </div>
        <div className="bg-slate-50 rounded-lg p-1.5">
          <span className="block text-[10px] text-slate-700 font-medium">Action Verbs</span>
          <span className="text-xs font-bold text-slate-800">
            {result.metrics.actionVerbCount}
          </span>
        </div>
        <div className="bg-slate-50 rounded-lg p-1.5">
          <span className="block text-[10px] text-slate-700 font-medium">Metrics</span>
          <span className="text-xs font-bold text-slate-800">
            {result.metrics.quantifiableResultsCount}
          </span>
        </div>
        <div className="bg-slate-50 rounded-lg p-1.5">
          <span className="block text-[10px] text-slate-700 font-medium">Read Time</span>
          <span className="text-xs font-bold text-slate-800">
            ~{result.metrics.estimatedReadingMinutes}m
          </span>
        </div>
      </div>

      {/* Expanded Checklist */}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-slate-200 space-y-2.5 max-h-72 overflow-y-auto">
          <div className="flex items-center justify-between text-xs text-slate-700 pb-1 font-medium">
            <span>ATS Diagnostic Checklist</span>
            <span className="text-[11px] font-bold text-emerald-800 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              Audited 100% locally
            </span>
          </div>

          {result.issues.map(issue => (
            <div
              key={issue.id}
              className={`p-2.5 rounded-lg border text-xs flex items-start gap-2.5 ${
                issue.passed
                  ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
                  : issue.severity === 'critical'
                  ? 'bg-rose-50/60 border-rose-200 text-rose-950'
                  : 'bg-amber-50/60 border-amber-200 text-amber-950'
              }`}
            >
              {issue.passed ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
              ) : issue.severity === 'critical' ? (
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <span className="font-bold block">{issue.title}</span>
                <span className="text-[11px] leading-tight block opacity-90">
                  {issue.message}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
