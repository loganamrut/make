export type TemplateId = 
  | 'ats'
  | 'modern'
  | 'professional'
  | 'simple'
  | 'minimal'
  | 'executive'
  | 'student'
  | 'graduate'
  | 'creative'
  | 'tech'
  | 'compact'
  | 'elegant'
  | 'hybrid'
  | 'academic'
  | 'banner'
  | 'infographic'
  | 'timeline'
  | 'metro';

export type FontFamily = 'sans' | 'serif' | 'mono';
export type FontSize = 'compact' | 'normal' | 'spacious';

export interface ResumeStyle {
  template: TemplateId;
  primaryColor: string;
  fontFamily: FontFamily;
  fontSize: FontSize;
  lineSpacing: 'compact' | 'normal' | 'relaxed';
}

export interface WorkExperienceItem {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  honors?: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  link?: string;
  technologies: string;
  bullets: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface AwardItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  description: string;
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
}

export interface ResumeData {
  title: string;
  personalInfo: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    website?: string;
    linkedin?: string;
    github?: string;
  };
  summary: string;
  workExperience: WorkExperienceItem[];
  education: EducationItem[];
  skills: {
    technical: string[];
    tools: string[];
    soft: string[];
    languages: string[];
  };
  projects: ProjectItem[];
  certifications: CertificationItem[];
  awards: AwardItem[];
  customSections: CustomSection[];
  sectionOrder: string[];
  style: ResumeStyle;
}

export interface CoverLetterData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
  };
  recipient: {
    hiringManager: string;
    companyName: string;
    companyAddress?: string;
    jobTitle: string;
    department?: string;
  };
  date: string;
  greeting: string;
  openingParagraph: string;
  bodyParagraphs: string[];
  closingParagraph: string;
  signoff: string;
}

export interface ATSIssue {
  id: string;
  category: 'contact' | 'formatting' | 'content' | 'keywords' | 'length';
  title: string;
  message: string;
  severity: 'critical' | 'warning' | 'tip';
  passed: boolean;
}

export interface ATSAnalysisResult {
  score: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D';
  summary: string;
  issues: ATSIssue[];
  metrics: {
    wordCount: number;
    actionVerbCount: number;
    quantifiableResultsCount: number;
    bulletCount: number;
    estimatedReadingMinutes: number;
    identifiedKeywords: string[];
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}
