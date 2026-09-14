import { ResumeData } from './types';
import { generateProfessionalSummaries, generateAchievementBullets, getSkillsForRole } from './ai-engine';

const DEFAULT_GEMINI_API_KEY = 'AIzaSyCPMfk7fRhvnfmht0ziHCjDnqvGK4OgkvI';
const GEMINI_MODEL = 'gemini-2.5-flash';
const API_BASE_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export function getGeminiApiKey(): string {
  if (typeof window !== 'undefined') {
    const customKey = localStorage.getItem('cvmake_gemini_api_key');
    if (customKey && customKey.trim().length > 10) {
      return customKey.trim();
    }
  }
  return DEFAULT_GEMINI_API_KEY;
}

export function setCustomGeminiApiKey(key: string): void {
  if (typeof window !== 'undefined') {
    if (key.trim()) {
      localStorage.setItem('cvmake_gemini_api_key', key.trim());
    } else {
      localStorage.removeItem('cvmake_gemini_api_key');
    }
  }
}

export interface UploadedDocumentFile {
  name: string;
  mimeType: string;
  size: number;
  base64Data?: string;
  textContent?: string;
}

function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
}

/**
 * Parses up to 3 documents (PDF, DOCX text, images, TXT) with Gemini 2.5 Flash
 * into fully structured, ATS-optimized ResumeData.
 */
export async function parseResumeDocumentsWithGemini(
  files: UploadedDocumentFile[],
  targetRole: string = '',
  targetJobDescription: string = '',
  onProgress?: (status: string) => void
): Promise<ResumeData> {
  const apiKey = getGeminiApiKey();

  onProgress?.('Preparing document data for AI analysis...');

  const parts: any[] = [];

  for (const file of files) {
    if (file.base64Data && (file.mimeType.startsWith('image/') || file.mimeType === 'application/pdf')) {
      parts.push({
        inlineData: {
          mimeType: file.mimeType,
          data: file.base64Data,
        },
      });
    } else if (file.textContent) {
      parts.push({
        text: `--- Document File: ${file.name} ---\n${file.textContent}\n--- End Document ---`,
      });
    }
  }

  const promptText = `
You are an elite Executive Career Strategist and ATS (Applicant Tracking System) Specialist.
Analyze the provided resume document(s) and transform the candidate's career history into a high-impact, ATS-optimized professional resume.

${targetRole ? `Target Role to optimize for: "${targetRole}"` : ''}
${targetJobDescription ? `Target Job Description to align keywords with:\n"""\n${targetJobDescription}\n"""` : ''}

Key Instructions:
1. Extract or deduce Full Name, Job Title, Email, Phone, Location, and social links (LinkedIn, GitHub, Portfolio).
2. Professional Summary: Write a compelling 3-4 sentence summary synthesizing their value proposition, years of experience, core expertise, and measurable impact.
3. Work Experience:
   - For every position, transform raw job duties into 3 to 5 quantified, Google XYZ bullet points: "Accomplished [X] as measured by [Y], by doing [Z]".
   - Use strong, active power verbs (Spearheaded, Architected, Engineered, Orchestrated, Optimized, Accelerated).
   - If numbers/metrics are omitted in the source, insert realistic professional impact metrics or estimate realistic percentage gains (e.g. "improving system throughput by 32%", "reducing cycle time by 25%").
4. Education: Degree, field of study, school name, graduation dates, GPA (if available).
5. Skills: Categorize intelligently into:
   - technical (programming languages, architectures, specialized domain skills)
   - tools (frameworks, software, platforms, cloud services)
   - soft (leadership, collaboration, strategic execution)
   - languages (spoken/natural languages)
6. Projects, Certifications, and Awards: Extract any relevant projects, certifications, or awards.

Respond strictly in valid JSON matching this exact structure:
{
  "title": "Professional Resume",
  "personalInfo": {
    "fullName": "Full Name",
    "jobTitle": "Target or Current Job Title",
    "email": "email@example.com",
    "phone": "+1 (555) 000-0000",
    "location": "City, State / Country",
    "website": "portfolio url or empty string",
    "linkedin": "linkedin.com/in/handle or empty string",
    "github": "github.com/handle or empty string"
  },
  "summary": "High impact summary paragraph...",
  "workExperience": [
    {
      "company": "Company Name",
      "position": "Job Title",
      "location": "City, Country or Remote",
      "startDate": "Mon YYYY",
      "endDate": "Mon YYYY or Present",
      "current": false,
      "bullets": [
        "Spearheaded...",
        "Engineered..."
      ]
    }
  ],
  "education": [
    {
      "school": "University or Institution",
      "degree": "Degree",
      "field": "Major / Field of Study",
      "location": "City, Country",
      "startDate": "YYYY",
      "endDate": "YYYY",
      "gpa": "3.8/4.0",
      "honors": "Magna Cum Laude"
    }
  ],
  "skills": {
    "technical": ["Skill 1", "Skill 2"],
    "tools": ["Tool 1", "Tool 2"],
    "soft": ["Skill 1", "Skill 2"],
    "languages": ["English (Native)"]
  },
  "projects": [
    {
      "name": "Project Name",
      "description": "Short description",
      "link": "https://...",
      "technologies": "React, Python, AWS",
      "bullets": ["Engineered...", "Optimized..."]
    }
  ],
  "certifications": [
    {
      "name": "Certification Name",
      "issuer": "Issuing Org",
      "date": "YYYY"
    }
  ],
  "awards": [
    {
      "title": "Award Title",
      "issuer": "Issuer",
      "date": "YYYY",
      "description": "Brief description"
    }
  ],
  "customSections": []
}
`;

  parts.push({ text: promptText });

  onProgress?.('Analyzing with AI...');

  try {
    const response = await fetch(`${API_BASE_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts }],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.2,
          topP: 0.95,
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`AI service returned status ${response.status}: ${errText}`);
    }

    onProgress?.('Synthesizing structured resume hierarchy & ATS formatting...');
    const result = await response.json();
    const candidateText = result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      throw new Error('No content returned from AI service.');
    }

    let parsed: any;
    try {
      parsed = JSON.parse(candidateText);
    } catch {
      // Clean possible markdown code fence
      const cleaned = candidateText.replace(/^```json\s*/i, '').replace(/\s*```$/, '').trim();
      parsed = JSON.parse(cleaned);
    }

    onProgress?.('Finalizing verified profile...');

    // Normalize and attach IDs
    const normalizedResume: ResumeData = {
      title: parsed.title || 'Professional Resume',
      personalInfo: {
        fullName: parsed.personalInfo?.fullName || 'Professional Candidate',
        jobTitle: parsed.personalInfo?.jobTitle || targetRole || 'Experienced Professional',
        email: parsed.personalInfo?.email || '',
        phone: parsed.personalInfo?.phone || '',
        location: parsed.personalInfo?.location || '',
        website: parsed.personalInfo?.website || '',
        linkedin: parsed.personalInfo?.linkedin || '',
        github: parsed.personalInfo?.github || '',
      },
      summary: parsed.summary || '',
      workExperience: (parsed.workExperience || []).map((exp: any) => ({
        id: generateId('exp'),
        company: exp.company || 'Company',
        position: exp.position || 'Position',
        location: exp.location || '',
        startDate: exp.startDate || '',
        endDate: exp.endDate || '',
        current: Boolean(exp.current),
        bullets: Array.isArray(exp.bullets) ? exp.bullets : [],
      })),
      education: (parsed.education || []).map((edu: any) => ({
        id: generateId('edu'),
        school: edu.school || 'University',
        degree: edu.degree || 'Degree',
        field: edu.field || '',
        location: edu.location || '',
        startDate: edu.startDate || '',
        endDate: edu.endDate || '',
        gpa: edu.gpa || '',
        honors: edu.honors || '',
      })),
      skills: {
        technical: Array.isArray(parsed.skills?.technical) ? parsed.skills.technical : [],
        tools: Array.isArray(parsed.skills?.tools) ? parsed.skills.tools : [],
        soft: Array.isArray(parsed.skills?.soft) ? parsed.skills.soft : [],
        languages: Array.isArray(parsed.skills?.languages) ? parsed.skills.languages : ['English'],
      },
      projects: (parsed.projects || []).map((p: any) => ({
        id: generateId('proj'),
        name: p.name || 'Project',
        description: p.description || '',
        link: p.link || '',
        technologies: p.technologies || '',
        bullets: Array.isArray(p.bullets) ? p.bullets : [],
      })),
      certifications: (parsed.certifications || []).map((c: any) => ({
        id: generateId('cert'),
        name: c.name || '',
        issuer: c.issuer || '',
        date: c.date || '',
        url: c.url || '',
      })),
      awards: (parsed.awards || []).map((a: any) => ({
        id: generateId('award'),
        title: a.title || '',
        issuer: a.issuer || '',
        date: a.date || '',
        description: a.description || '',
      })),
      customSections: (parsed.customSections || []).map((sec: any) => ({
        id: generateId('sec'),
        title: sec.title || 'Additional Information',
        items: (sec.items || []).map((item: any) => ({
          id: generateId('item'),
          title: item.title || '',
          subtitle: item.subtitle || '',
          date: item.date || '',
          description: item.description || '',
        })),
      })),
      sectionOrder: ['summary', 'workExperience', 'education', 'skills', 'projects', 'certifications', 'awards'],
      style: {
        template: 'ats',
        primaryColor: '#4f46e5',
        fontFamily: 'sans',
        fontSize: 'normal',
        lineSpacing: 'normal',
      },
    };

    return normalizedResume;
  } catch (error) {
    console.warn('Gemini 2.5 Flash call encountered an issue, falling back to local extractor:', error);
    throw error;
  }
}

/**
 * Enhances a bullet point into 3 Google XYZ quantified variations
 */
export async function enhanceBulletWithGemini(
  rawBullet: string,
  position: string,
  company: string
): Promise<string[]> {
  const apiKey = getGeminiApiKey();

  try {
    const prompt = `
You are a senior executive recruiter. Rewrite this resume bullet point into 3 distinct, high-impact Google XYZ bullet points ("Accomplished [X] as measured by [Y] by doing [Z]").
Role: ${position || 'Professional'} at ${company || 'Organization'}
Original Duty: "${rawBullet}"

Requirements:
- Start with strong action verbs (Spearheaded, Engineered, Orchestrated, Automated, Accelerated).
- Include realistic quantified impact metrics (percentages, dollar amounts, hours saved).
- Make each variation concise, punchy, and 100% ATS-friendly.

Respond in JSON format:
{
  "bullets": [
    "Option 1...",
    "Option 2...",
    "Option 3..."
  ]
}
`;

    const response = await fetch(`${API_BASE_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json', temperature: 0.3 },
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const txt = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (txt) {
        const parsed = JSON.parse(txt);
        if (Array.isArray(parsed.bullets) && parsed.bullets.length > 0) {
          return parsed.bullets;
        }
      }
    }
  } catch (err) {
    console.warn('Gemini bullet enhancer error:', err);
  }

  // Graceful local heuristic fallback
  return generateAchievementBullets(position, rawBullet).slice(0, 3);
}

/**
 * Generates tailored executive, technical, and concise summaries
 */
export async function generateSummaryWithGemini(
  resume: Partial<ResumeData>,
  targetRole?: string
): Promise<{ style: string; text: string }[]> {
  const apiKey = getGeminiApiKey();
  const role = targetRole || resume.personalInfo?.jobTitle || 'Experienced Professional';
  const skillsList = resume.skills?.technical?.slice(0, 6).join(', ') || 'strategic leadership, execution';

  try {
    const prompt = `
Write 3 distinct professional resume summaries for:
Candidate: ${resume.personalInfo?.fullName || 'Candidate'}
Target Role: ${role}
Key Skills: ${skillsList}
Experience Highlights: ${resume.workExperience?.[0]?.position || ''} at ${resume.workExperience?.[0]?.company || ''}

Provide 3 styles:
1. Executive & Leadership (High impact, strategic value)
2. Technical & Results-Driven (Hands-on execution, architecture, metrics)
3. Concise ATS (Tight 2-3 sentences for fast recruiter skimming)

Respond in JSON:
{
  "summaries": [
    { "style": "Executive & Impact-Driven", "text": "..." },
    { "style": "Technical & Results-Focused", "text": "..." },
    { "style": "Concise & Modern ATS", "text": "..." }
  ]
}
`;

    const response = await fetch(`${API_BASE_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json', temperature: 0.3 },
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const txt = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (txt) {
        const parsed = JSON.parse(txt);
        if (Array.isArray(parsed.summaries) && parsed.summaries.length > 0) {
          return parsed.summaries;
        }
      }
    }
  } catch (err) {
    console.warn('Gemini summary error:', err);
  }

  return generateProfessionalSummaries(role);
}

/**
 * Suggests missing in-demand skills for the candidate's target role
 */
export async function suggestSkillsWithGemini(
  currentSkills: string[],
  targetRole: string
): Promise<{ technical: string[]; tools: string[]; soft: string[] }> {
  const apiKey = getGeminiApiKey();

  try {
    const prompt = `
Given a candidate targeting the role of "${targetRole || 'Software Professional'}" with current skills: [${currentSkills.join(', ')}].
Suggest missing, high-demand industry skills that recruiters search for in ATS systems.

Return JSON:
{
  "technical": ["Skill A", "Skill B", "Skill C", "Skill D"],
  "tools": ["Tool A", "Tool B", "Tool C"],
  "soft": ["Competency A", "Competency B"]
}
`;

    const response = await fetch(`${API_BASE_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json', temperature: 0.3 },
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const txt = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (txt) {
        const parsed = JSON.parse(txt);
        return {
          technical: Array.isArray(parsed.technical) ? parsed.technical : [],
          tools: Array.isArray(parsed.tools) ? parsed.tools : [],
          soft: Array.isArray(parsed.soft) ? parsed.soft : [],
        };
      }
    }
  } catch (err) {
    console.warn('Gemini skills suggestion error:', err);
  }

  return getSkillsForRole(targetRole);
}
