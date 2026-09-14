'use client';

import React from 'react';
import { ResumeData } from '@/lib/types';
import { Mail, Phone, MapPin, Globe, ExternalLink, Link2, Terminal, BookOpen, Briefcase, Award } from 'lucide-react';

interface ResumeDocumentProps {
  resume: ResumeData;
}

export function ResumeDocument({ resume }: ResumeDocumentProps) {
  const { template, primaryColor, fontFamily, fontSize, lineSpacing } = resume.style;

  const fontClass =
    fontFamily === 'serif'
      ? 'font-serif'
      : fontFamily === 'mono'
      ? 'font-mono'
      : 'font-sans';

  const sizeClass =
    fontSize === 'compact'
      ? 'text-xs leading-tight'
      : fontSize === 'spacious'
      ? 'text-base leading-relaxed'
      : 'text-sm leading-normal';

  const spacingClass =
    lineSpacing === 'compact' ? 'space-y-3' : lineSpacing === 'relaxed' ? 'space-y-6' : 'space-y-4';

  const renderContactItem = (icon: React.ReactNode, text?: string, href?: string) => {
    if (!text) return null;
    return (
      <span className="inline-flex items-center gap-1 text-slate-600">
        {icon}
        {href ? (
          <a
            href={href.startsWith('http') ? href : `https://${href}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-slate-700"
          >
            {text}
          </a>
        ) : (
          <span>{text}</span>
        )}
      </span>
    );
  };

  const renderSectionHeader = (title: string, icon?: React.ReactNode) => {
    if (template === 'tech') {
      return (
        <h2 className="text-xs font-mono font-bold uppercase tracking-wider mb-2 pb-0.5 border-b border-slate-300 flex items-center gap-1.5" style={{ color: primaryColor }}>
          <span className="text-slate-400">{'//'}</span>
          {icon && <span className="w-3.5 h-3.5">{icon}</span>}
          {title}
        </h2>
      );
    }
    if (template === 'elegant') {
      return (
        <div className="mb-2 text-center">
          <h2 className="text-xs font-serif font-bold uppercase tracking-widest text-slate-900 pb-1">
            {title}
          </h2>
          <div className="w-16 h-px mx-auto" style={{ backgroundColor: primaryColor }} />
        </div>
      );
    }
    if (template === 'modern') {
      return (
        <h2
          className="text-xs font-bold uppercase tracking-wider mb-2 pl-2 border-l-3"
          style={{ borderColor: primaryColor, color: primaryColor }}
        >
          {title}
        </h2>
      );
    }
    return (
      <h2
        className="text-xs font-bold uppercase tracking-wider mb-2 pb-0.5 border-b"
        style={{ borderColor: primaryColor, color: primaryColor }}
      >
        {title}
      </h2>
    );
  };

  // Section: Summary
  const renderSummary = () => {
    if (!resume.summary.trim()) return null;
    return (
      <section className="mb-3.5">
        {renderSectionHeader('Professional Summary')}
        <p className="text-slate-800 leading-relaxed text-justify">{resume.summary}</p>
      </section>
    );
  };

  // Section: Work Experience
  const renderExperience = () => {
    if (resume.workExperience.length === 0) return null;
    return (
      <section className="mb-3.5">
        {renderSectionHeader('Work Experience', <Briefcase className="w-3 h-3" />)}
        <div className="space-y-3">
          {resume.workExperience.map(exp => (
            <div key={exp.id} className="text-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-semibold">
                <span className="text-slate-900 text-sm font-bold">
                  {exp.position}{' '}
                  <span className="font-medium text-slate-600">| {exp.company}</span>
                </span>
                <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
                  {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  {exp.location ? ` • ${exp.location}` : ''}
                </span>
              </div>
              {exp.bullets.length > 0 && (
                <ul className="mt-1 list-disc list-outside pl-4 space-y-1 text-slate-700 text-xs sm:text-[13px]">
                  {exp.bullets
                    .filter(b => b.trim().length > 0)
                    .map((bullet, idx) => (
                      <li key={idx} className="leading-snug">
                        {bullet}
                      </li>
                    ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  // Section: Education
  const renderEducation = () => {
    if (resume.education.length === 0) return null;
    return (
      <section className="mb-3.5">
        {renderSectionHeader('Education', <BookOpen className="w-3 h-3" />)}
        <div className="space-y-2">
          {resume.education.map(edu => (
            <div key={edu.id} className="text-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                <span className="text-sm font-bold text-slate-900">
                  {edu.degree} in {edu.field}{' '}
                  <span className="font-normal text-slate-600">— {edu.school}</span>
                </span>
                <span className="text-xs text-slate-500 whitespace-nowrap">
                  {edu.startDate} – {edu.endDate}
                </span>
              </div>
              {(edu.gpa || edu.honors) && (
                <p className="text-xs text-slate-600 mt-0.5">
                  {edu.gpa && <span className="font-medium">GPA: {edu.gpa}</span>}
                  {edu.gpa && edu.honors && <span> • </span>}
                  {edu.honors && <span>{edu.honors}</span>}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  // Section: Skills
  const renderSkills = (isSidebar: boolean = false) => {
    const hasTech = resume.skills.technical.length > 0;
    const hasTools = resume.skills.tools.length > 0;
    const hasSoft = resume.skills.soft.length > 0;
    const hasLang = resume.skills.languages.length > 0;

    if (!hasTech && !hasTools && !hasSoft && !hasLang) return null;

    if (template === 'tech' || isSidebar) {
      return (
        <section className="mb-3.5">
          {renderSectionHeader('Skills & Technologies')}
          <div className="space-y-2 text-xs text-slate-800">
            {hasTech && (
              <div>
                <span className="font-bold text-slate-900 block mb-1">Technical Stack:</span>
                <div className="flex flex-wrap gap-1">
                  {resume.skills.technical.map((s, idx) => (
                    <span key={idx} className="px-1.5 py-0.5 bg-slate-100 text-slate-800 font-mono text-[11px] rounded border border-slate-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {hasTools && (
              <div>
                <span className="font-bold text-slate-900 block mb-1">Tools & Platforms:</span>
                <div className="flex flex-wrap gap-1">
                  {resume.skills.tools.map((t, idx) => (
                    <span key={idx} className="px-1.5 py-0.5 bg-slate-50 text-slate-700 text-[11px] rounded border border-slate-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {hasSoft && (
              <div>
                <span className="font-bold text-slate-900 block mb-1">Core Competencies:</span>
                <p className="text-slate-700 text-xs">{resume.skills.soft.join(' • ')}</p>
              </div>
            )}
            {hasLang && (
              <div>
                <span className="font-bold text-slate-900 block mb-1">Languages:</span>
                <p className="text-slate-700 text-xs">{resume.skills.languages.join(', ')}</p>
              </div>
            )}
          </div>
        </section>
      );
    }

    return (
      <section className="mb-3.5">
        {renderSectionHeader('Skills & Proficiencies')}
        <div className="space-y-1.5 text-xs text-slate-800">
          {hasTech && (
            <div>
              <span className="font-bold text-slate-900">Technical Skills: </span>
              <span>{resume.skills.technical.join(', ')}</span>
            </div>
          )}
          {hasTools && (
            <div>
              <span className="font-bold text-slate-900">Tools & Platforms: </span>
              <span>{resume.skills.tools.join(', ')}</span>
            </div>
          )}
          {hasSoft && (
            <div>
              <span className="font-bold text-slate-900">Core Competencies: </span>
              <span>{resume.skills.soft.join(', ')}</span>
            </div>
          )}
          {hasLang && (
            <div>
              <span className="font-bold text-slate-900">Languages: </span>
              <span>{resume.skills.languages.join(', ')}</span>
            </div>
          )}
        </div>
      </section>
    );
  };

  // Section: Projects
  const renderProjects = () => {
    if (resume.projects.length === 0) return null;
    return (
      <section className="mb-3.5">
        {renderSectionHeader('Key Projects', <Terminal className="w-3 h-3" />)}
        <div className="space-y-2.5">
          {resume.projects.map(proj => (
            <div key={proj.id} className="text-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-slate-900">{proj.name}</span>
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-indigo-600 hover:underline inline-flex items-center gap-0.5"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Link
                    </a>
                  )}
                </div>
                {proj.technologies && (
                  <span className="text-xs text-slate-500 font-mono">
                    {proj.technologies}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-700 mt-0.5 leading-snug">{proj.description}</p>
              {proj.bullets.length > 0 && (
                <ul className="mt-1 list-disc list-outside pl-4 space-y-0.5 text-xs text-slate-700">
                  {proj.bullets
                    .filter(b => b.trim().length > 0)
                    .map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  // Section: Certifications & Awards
  const renderCertifications = () => {
    const hasCerts = resume.certifications.length > 0;
    const hasAwards = resume.awards.length > 0;
    if (!hasCerts && !hasAwards) return null;

    return (
      <section className="mb-3.5">
        {renderSectionHeader('Certifications & Awards', <Award className="w-3 h-3" />)}
        <div className="space-y-1.5 text-xs">
          {resume.certifications.map(cert => (
            <div key={cert.id} className="flex justify-between items-baseline">
              <span className="font-semibold text-slate-900">
                {cert.name} <span className="font-normal text-slate-600">— {cert.issuer}</span>
              </span>
              <span className="text-slate-500 whitespace-nowrap">{cert.date}</span>
            </div>
          ))}
          {resume.awards.map(award => (
            <div key={award.id} className="flex justify-between items-baseline">
              <span className="font-semibold text-slate-900">
                {award.title} <span className="font-normal text-slate-600">— {award.issuer}</span>
              </span>
              <span className="text-slate-500 whitespace-nowrap">{award.date}</span>
            </div>
          ))}
        </div>
      </section>
    );
  };

  // Section: Custom Sections
  const renderCustomSections = () => {
    if (resume.customSections.length === 0) return null;
    return (
      <>
        {resume.customSections.map(sec => (
          <section key={sec.id} className="mb-3.5">
            {renderSectionHeader(sec.title)}
            <div className="space-y-2">
              {sec.items.map(item => (
                <div key={item.id} className="text-xs">
                  <div className="flex justify-between font-semibold text-slate-900">
                    <span>{item.title}</span>
                    {item.date && <span className="text-slate-500 font-normal">{item.date}</span>}
                  </div>
                  {item.subtitle && (
                    <p className="text-slate-600 italic">{item.subtitle}</p>
                  )}
                  <p className="text-slate-700 mt-0.5">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </>
    );
  };

  // Render Header based on Template
  const renderHeader = () => {
    if (template === 'executive') {
      return (
        <header className="mb-5 pb-3 border-b-2 border-slate-200">
          <div className="border-l-4 pl-4" style={{ borderColor: primaryColor }}>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight uppercase text-slate-900">
              {resume.personalInfo.fullName || 'Your Name'}
            </h1>
            <p
              className="text-sm sm:text-base font-bold tracking-wide uppercase mt-0.5"
              style={{ color: primaryColor }}
            >
              {resume.personalInfo.jobTitle || 'Professional Job Title'}
            </p>
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
            {renderContactItem(<Mail className="w-3.5 h-3.5" />, resume.personalInfo.email)}
            {renderContactItem(<Phone className="w-3.5 h-3.5" />, resume.personalInfo.phone)}
            {renderContactItem(<MapPin className="w-3.5 h-3.5" />, resume.personalInfo.location)}
            {renderContactItem(<Link2 className="w-3.5 h-3.5" />, resume.personalInfo.linkedin, resume.personalInfo.linkedin)}
            {renderContactItem(<Link2 className="w-3.5 h-3.5" />, resume.personalInfo.github, resume.personalInfo.github)}
            {renderContactItem(<Globe className="w-3.5 h-3.5" />, resume.personalInfo.website, resume.personalInfo.website)}
          </div>
        </header>
      );
    }

    if (template === 'professional' || template === 'elegant') {
      return (
        <header className="mb-5 pb-3 text-center border-b border-slate-200">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 uppercase tracking-wider">
            {resume.personalInfo.fullName || 'Your Name'}
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1 uppercase tracking-widest">
            {resume.personalInfo.jobTitle || 'Professional Job Title'}
          </p>
          <div className="w-24 h-0.5 mx-auto my-2" style={{ backgroundColor: primaryColor }} />
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-slate-600">
            {renderContactItem(<Mail className="w-3.5 h-3.5" />, resume.personalInfo.email)}
            {renderContactItem(<Phone className="w-3.5 h-3.5" />, resume.personalInfo.phone)}
            {renderContactItem(<MapPin className="w-3.5 h-3.5" />, resume.personalInfo.location)}
            {renderContactItem(<Link2 className="w-3.5 h-3.5" />, resume.personalInfo.linkedin, resume.personalInfo.linkedin)}
            {renderContactItem(<Link2 className="w-3.5 h-3.5" />, resume.personalInfo.github, resume.personalInfo.github)}
            {renderContactItem(<Globe className="w-3.5 h-3.5" />, resume.personalInfo.website, resume.personalInfo.website)}
          </div>
        </header>
      );
    }

    if (template === 'tech') {
      return (
        <header className="mb-5 pb-3 border-b-2 border-slate-800 bg-slate-900 text-white -m-8 sm:-m-10 mb-6 p-6 sm:p-8 rounded-t-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <h1 className="text-2xl sm:text-3xl font-mono font-bold tracking-tight text-white">
                  {resume.personalInfo.fullName || 'Your Name'}
                </h1>
              </div>
              <p className="text-sm font-mono text-indigo-300 mt-0.5">
                $ {resume.personalInfo.jobTitle || 'Software Engineer'}
              </p>
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-mono text-slate-300 sm:text-right">
              {renderContactItem(<Mail className="w-3.5 h-3.5 text-slate-400" />, resume.personalInfo.email)}
              {renderContactItem(<Phone className="w-3.5 h-3.5 text-slate-400" />, resume.personalInfo.phone)}
              {renderContactItem(<MapPin className="w-3.5 h-3.5 text-slate-400" />, resume.personalInfo.location)}
              {renderContactItem(<Link2 className="w-3.5 h-3.5 text-slate-400" />, resume.personalInfo.github, resume.personalInfo.github)}
              {renderContactItem(<Link2 className="w-3.5 h-3.5 text-slate-400" />, resume.personalInfo.linkedin, resume.personalInfo.linkedin)}
            </div>
          </div>
        </header>
      );
    }

    if (template === 'compact') {
      return (
        <header className="mb-3 pb-2 border-b border-slate-300 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight" style={{ color: primaryColor }}>
              {resume.personalInfo.fullName || 'Your Name'}
            </h1>
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              {resume.personalInfo.jobTitle || 'Professional Job Title'}
            </p>
          </div>
          <div className="flex flex-wrap gap-x-2.5 gap-y-0.5 text-[11px] text-slate-600 sm:text-right">
            {renderContactItem(<Mail className="w-3 h-3" />, resume.personalInfo.email)}
            {renderContactItem(<Phone className="w-3 h-3" />, resume.personalInfo.phone)}
            {renderContactItem(<MapPin className="w-3 h-3" />, resume.personalInfo.location)}
            {renderContactItem(<Link2 className="w-3 h-3" />, resume.personalInfo.linkedin, resume.personalInfo.linkedin)}
          </div>
        </header>
      );
    }

    // Default (ATS, Modern, Simple, Minimal, Creative, Graduate)
    return (
      <header className="mb-4 pb-3 border-b border-slate-200">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-extrabold tracking-tight"
            style={{ color: template === 'ats' ? '#0f172a' : primaryColor }}
          >
            {resume.personalInfo.fullName || 'Your Name'}
          </h1>
          <p className="text-sm sm:text-base font-medium text-slate-700 mt-0.5">
            {resume.personalInfo.jobTitle || 'Professional Job Title'}
          </p>
        </div>

        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
          {renderContactItem(<Mail className="w-3.5 h-3.5" />, resume.personalInfo.email)}
          {renderContactItem(<Phone className="w-3.5 h-3.5" />, resume.personalInfo.phone)}
          {renderContactItem(<MapPin className="w-3.5 h-3.5" />, resume.personalInfo.location)}
          {renderContactItem(<Link2 className="w-3.5 h-3.5" />, resume.personalInfo.linkedin, resume.personalInfo.linkedin)}
          {renderContactItem(<Link2 className="w-3.5 h-3.5" />, resume.personalInfo.github, resume.personalInfo.github)}
          {renderContactItem(<Globe className="w-3.5 h-3.5" />, resume.personalInfo.website, resume.personalInfo.website)}
        </div>
      </header>
    );
  };

  // Two-column hybrid layout
  if (template === 'hybrid') {
    return (
      <div
        id="resume-print-area"
        className={`resume-paper bg-white text-slate-900 p-8 sm:p-10 shadow-lg border border-slate-200 rounded-sm mx-auto max-w-[850px] min-h-[1050px] ${fontClass} ${sizeClass}`}
        style={{ boxSizing: 'border-box' }}
      >
        {renderHeader()}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Rail / Sidebar (4 cols) */}
          <aside className="md:col-span-4 space-y-4 border-r border-slate-200 pr-4">
            {renderSkills(true)}
            {renderEducation()}
            {renderCertifications()}
          </aside>
          {/* Right Main Content (8 cols) */}
          <main className="md:col-span-8 space-y-4">
            {renderSummary()}
            {renderExperience()}
            {renderProjects()}
            {renderCustomSections()}
          </main>
        </div>
      </div>
    );
  }

  // Single-column layout for all other templates
  return (
    <div
      id="resume-print-area"
      className={`resume-paper bg-white text-slate-900 p-8 sm:p-10 shadow-lg border border-slate-200 rounded-sm mx-auto max-w-[850px] min-h-[1050px] ${fontClass} ${sizeClass}`}
      style={{ boxSizing: 'border-box' }}
    >
      {renderHeader()}
      <div className={spacingClass}>
        {template === 'student' || template === 'academic' ? (
          <>
            {renderSummary()}
            {renderEducation()}
            {renderProjects()}
            {renderExperience()}
            {renderSkills()}
            {renderCertifications()}
            {renderCustomSections()}
          </>
        ) : (
          <>
            {renderSummary()}
            {renderExperience()}
            {renderEducation()}
            {renderSkills()}
            {renderProjects()}
            {renderCertifications()}
            {renderCustomSections()}
          </>
        )}
      </div>
    </div>
  );
}
