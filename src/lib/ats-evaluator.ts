import { ResumeData, ATSAnalysisResult, ATSIssue } from './types';
import { ACTION_VERBS } from './ai-engine';

export function evaluateATS(resume: ResumeData): ATSAnalysisResult {
  const issues: ATSIssue[] = [];
  let score = 100;

  // 1. Contact Information Check
  const hasName = Boolean(resume.personalInfo.fullName.trim());
  const hasEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resume.personalInfo.email.trim());
  const hasPhone = resume.personalInfo.phone.trim().length >= 7;
  const hasLocation = Boolean(resume.personalInfo.location.trim());

  if (!hasName) {
    score -= 20;
    issues.push({
      id: 'contact-name',
      category: 'contact',
      title: 'Missing Full Name',
      message: 'ATS scanners require a clear, prominent candidate name at the top of the document.',
      severity: 'critical',
      passed: false,
    });
  } else {
    issues.push({
      id: 'contact-name-ok',
      category: 'contact',
      title: 'Full Name Present',
      message: `Identified candidate name: ${resume.personalInfo.fullName}`,
      severity: 'tip',
      passed: true,
    });
  }

  if (!hasEmail) {
    score -= 15;
    issues.push({
      id: 'contact-email',
      category: 'contact',
      title: 'Missing or Invalid Email',
      message: 'Recruiters and automated parsing engines need a valid email address to contact you.',
      severity: 'critical',
      passed: false,
    });
  } else {
    issues.push({
      id: 'contact-email-ok',
      category: 'contact',
      title: 'Valid Email Found',
      message: 'Standard email format recognized by ATS parsers.',
      severity: 'tip',
      passed: true,
    });
  }

  if (!hasPhone) {
    score -= 10;
    issues.push({
      id: 'contact-phone',
      category: 'contact',
      title: 'Missing Phone Number',
      message: 'Include a direct contact number with country/area code.',
      severity: 'warning',
      passed: false,
    });
  }

  if (!hasLocation) {
    score -= 5;
    issues.push({
      id: 'contact-loc',
      category: 'contact',
      title: 'Missing City/Location',
      message: 'ATS filters often sort candidates by geography (City, State / Remote).',
      severity: 'warning',
      passed: false,
    });
  }

  // 2. Professional Summary
  const summaryWords = resume.summary.trim().split(/\s+/).filter(Boolean).length;
  if (summaryWords === 0) {
    score -= 10;
    issues.push({
      id: 'summary-missing',
      category: 'content',
      title: 'No Professional Summary',
      message: 'A concise 2-4 sentence summary immediately clarifies your level and value proposition.',
      severity: 'warning',
      passed: false,
    });
  } else if (summaryWords < 20) {
    score -= 5;
    issues.push({
      id: 'summary-short',
      category: 'content',
      title: 'Summary Is Very Brief',
      message: 'Expand your summary to 35-60 words highlighting core strengths and years of experience.',
      severity: 'warning',
      passed: false,
    });
  } else {
    issues.push({
      id: 'summary-ok',
      category: 'content',
      title: 'Strong Professional Summary',
      message: `Summary contains ${summaryWords} words, optimal for ATS indexing and recruiter scanning.`,
      severity: 'tip',
      passed: true,
    });
  }

  // 3. Work Experience & Quantifiable Achievements
  const totalExperiences = resume.workExperience.length;
  let allBullets: string[] = [];
  resume.workExperience.forEach(exp => {
    allBullets = allBullets.concat(exp.bullets.filter(b => b.trim().length > 0));
  });

  if (totalExperiences === 0 || allBullets.length === 0) {
    score -= 25;
    issues.push({
      id: 'exp-missing',
      category: 'content',
      title: 'No Work Experience Bullets',
      message: 'Work experience is the most heavily weighted section in ATS ranking algorithms.',
      severity: 'critical',
      passed: false,
    });
  }

  // Quantifiable metrics: %, $, numbers, k, m, +
  const metricRegex = /(\d+[%$kKmM+]|\$\d+|\b\d{2,}\b|\b\d+\s?(percent|hours|days|weeks|months|years|users|clients|teams)\b)/i;
  const metricsBullets = allBullets.filter(b => metricRegex.test(b));

  if (allBullets.length > 0 && metricsBullets.length === 0) {
    score -= 15;
    issues.push({
      id: 'metrics-missing',
      category: 'content',
      title: 'Zero Quantifiable Metrics Detected',
      message: 'Resumes with measurable outcomes (e.g. "increased speed by 25%", "$150k savings") rank 40% higher with hiring managers.',
      severity: 'warning',
      passed: false,
    });
  } else if (metricsBullets.length > 0) {
    issues.push({
      id: 'metrics-found',
      category: 'content',
      title: `${metricsBullets.length} Quantified Achievement(s) Found`,
      message: 'Measurable figures significantly enhance resume credibility and ATS score.',
      severity: 'tip',
      passed: true,
    });
  }

  // Action Verbs
  const lowerActionVerbs = ACTION_VERBS.map(v => v.toLowerCase());
  let actionVerbCount = 0;
  allBullets.forEach(bullet => {
    const firstWord = bullet.trim().split(/\s+/)[0]?.toLowerCase().replace(/[^a-z]/g, '');
    if (lowerActionVerbs.includes(firstWord)) {
      actionVerbCount++;
    }
  });

  if (allBullets.length > 2 && actionVerbCount < 2) {
    score -= 10;
    issues.push({
      id: 'verbs-low',
      category: 'keywords',
      title: 'Few Strong Action Verbs',
      message: 'Start your bullets with powerful action verbs (e.g., Spearheaded, Engineered, Orchestrated, Optimized).',
      severity: 'warning',
      passed: false,
    });
  } else if (actionVerbCount >= 2) {
    issues.push({
      id: 'verbs-ok',
      category: 'keywords',
      title: 'High-Impact Action Verbs Detected',
      message: `${actionVerbCount} bullet points start with strong executive action verbs.`,
      severity: 'tip',
      passed: true,
    });
  }

  // 4. Skills Section
  const totalSkills =
    resume.skills.technical.length +
    resume.skills.tools.length +
    resume.skills.soft.length;

  if (totalSkills < 4) {
    score -= 10;
    issues.push({
      id: 'skills-low',
      category: 'keywords',
      title: 'Low Skill Keyword Count',
      message: 'Add at least 6-12 relevant technical, tool, and industry skills to pass keyword matching filters.',
      severity: 'warning',
      passed: false,
    });
  } else {
    issues.push({
      id: 'skills-ok',
      category: 'keywords',
      title: `${totalSkills} Skills Categorized`,
      message: 'Strong keyword inventory detected for ATS parser indexing.',
      severity: 'tip',
      passed: true,
    });
  }

  // 5. Total Word Count
  const allText = [
    resume.personalInfo.fullName,
    resume.personalInfo.jobTitle,
    resume.summary,
    ...allBullets,
    ...resume.education.map(e => `${e.degree} ${e.field} ${e.school}`),
    ...resume.skills.technical,
    ...resume.skills.tools,
    ...resume.skills.soft,
  ].join(' ');

  const totalWords = allText.trim().split(/\s+/).filter(Boolean).length;

  if (totalWords < 150) {
    score -= 15;
    issues.push({
      id: 'words-under',
      category: 'length',
      title: 'Resume Is Too Brief (< 150 words)',
      message: 'ATS systems may flag very sparse resumes as incomplete.',
      severity: 'warning',
      passed: false,
    });
  } else if (totalWords > 1100) {
    score -= 10;
    issues.push({
      id: 'words-over',
      category: 'length',
      title: 'Resume Is Overly Long (> 1,100 words)',
      message: 'Keep your resume concise (typically 400-800 words for 1-2 pages) to retain recruiter engagement.',
      severity: 'warning',
      passed: false,
    });
  }

  // Clamp score
  const finalScore = Math.max(10, Math.min(100, score));

  let grade: 'A+' | 'A' | 'B' | 'C' | 'D' = 'D';
  let summary = 'Requires significant optimization to pass modern ATS filters.';

  if (finalScore >= 95) {
    grade = 'A+';
    summary = 'Outstanding ATS compliance. Excellent keyword density, structured headings, and quantified impact.';
  } else if (finalScore >= 85) {
    grade = 'A';
    summary = 'Very strong ATS profile. Passes standard parser checks and recruiter readability guidelines.';
  } else if (finalScore >= 70) {
    grade = 'B';
    summary = 'Good foundation. Address the flagged warnings to maximize your interview callback rate.';
  } else if (finalScore >= 50) {
    grade = 'C';
    summary = 'Moderate readability. Needs additional quantifiable metrics, skills keywords, and contact details.';
  }

  return {
    score: finalScore,
    grade,
    summary,
    issues,
    metrics: {
      wordCount: totalWords,
      actionVerbCount,
      quantifiableResultsCount: metricsBullets.length,
      bulletCount: allBullets.length,
      estimatedReadingMinutes: Math.max(1, Math.round(totalWords / 200)),
      identifiedKeywords: [
        ...resume.skills.technical.slice(0, 5),
        ...resume.skills.tools.slice(0, 3),
      ],
    },
  };
}
