import { ResumeData, CoverLetterData } from './types';

// Role-based skills directory for instant, offline suggestions
export const SKILLS_DIRECTORY: Record<
  string,
  { technical: string[]; tools: string[]; soft: string[] }
> = {
  software: {
    technical: [
      'TypeScript',
      'JavaScript',
      'Python',
      'Go',
      'Java',
      'React.js',
      'Next.js',
      'Node.js',
      'GraphQL',
      'REST APIs',
      'PostgreSQL',
      'Redis',
      'Microservices',
      'System Architecture',
    ],
    tools: [
      'Git',
      'Docker',
      'Kubernetes',
      'AWS',
      'Google Cloud',
      'GitHub Actions',
      'Terraform',
      'Linux',
      'Datadog',
      'Jira',
    ],
    soft: [
      'Problem Solving',
      'Cross-Functional Collaboration',
      'Agile / Scrum',
      'Technical Mentorship',
      'Root Cause Analysis',
      'Code Review',
    ],
  },
  frontend: {
    technical: [
      'React.js',
      'Next.js',
      'TypeScript',
      'JavaScript (ES6+)',
      'HTML5 & Semantic Markup',
      'CSS3 / Tailwind CSS',
      'Web Performance (Core Web Vitals)',
      'WCAG Accessibility',
      'State Management (Zustand/Redux)',
      'REST / GraphQL Integration',
    ],
    tools: [
      'Webpack',
      'Vite',
      'Git',
      'Figma',
      'Jest',
      'Playwright',
      'Storybook',
      'Chrome DevTools',
      'Vercel',
    ],
    soft: [
      'User Empathy',
      'Attention to Detail',
      'UI/UX Collaboration',
      'Iterative Prototyping',
      'Design System Governance',
    ],
  },
  backend: {
    technical: [
      'Node.js',
      'Go',
      'Python',
      'Java',
      'PostgreSQL',
      'MySQL',
      'MongoDB',
      'Redis',
      'Distributed Systems',
      'gRPC',
      'Kafka / RabbitMQ',
      'Database Optimization',
      'Authentication & OAuth2',
    ],
    tools: [
      'Docker',
      'Kubernetes',
      'AWS (ECS, RDS, S3)',
      'Terraform',
      'Postman',
      'Grafana',
      'Prometheus',
      'Git',
      'Linux',
    ],
    soft: [
      'Systemic Thinking',
      'High-Availability Planning',
      'Incident Post-Mortems',
      'Capacity Planning',
      'Cross-Team Alignment',
    ],
  },
  devops: {
    technical: [
      'CI/CD Pipelines',
      'Infrastructure as Code (IaC)',
      'Cloud Architecture',
      'Site Reliability Engineering (SRE)',
      'Container Orchestration',
      'Bash / Shell Scripting',
      'Networking & DNS',
      'Security Compliance',
    ],
    tools: [
      'Kubernetes',
      'Docker',
      'Terraform',
      'AWS',
      'GitHub Actions',
      'ArgoCD',
      'Helm',
      'Prometheus',
      'Datadog',
      'Ansible',
    ],
    soft: [
      'On-Call Incident Response',
      'Root-Cause Analysis',
      'Automation Mindset',
      'Zero-Downtime Migration',
      'Security First Mentality',
    ],
  },
  product: {
    technical: [
      'Product Strategy',
      'Roadmapping',
      'User Research',
      'A/B Testing & Experimentation',
      'Data Analytics & SQL',
      'Market & Competitor Analysis',
      'Go-To-Market (GTM)',
      'Feature Prioritization',
      'KPI & OKR Tracking',
    ],
    tools: [
      'Jira',
      'Figma',
      'Mixpanel',
      'Amplitude',
      'Notion',
      'Miro',
      'Tableau',
      'Google Analytics',
      'Linear',
    ],
    soft: [
      'Executive Stakeholder Management',
      'User Centricity',
      'Persuasive Storytelling',
      'Negotiation',
      'Cross-Functional Leadership',
      'Strategic Decision Making',
    ],
  },
  data: {
    technical: [
      'Python (Pandas, NumPy, Scikit-Learn)',
      'SQL & Data Warehousing',
      'Machine Learning',
      'Statistical Analysis',
      'Data Modeling',
      'ETL Pipelines',
      'A/B Testing',
      'Predictive Analytics',
    ],
    tools: [
      'Snowflake',
      'BigQuery',
      'dbt',
      'Tableau',
      'Power BI',
      'Apache Airflow',
      'Jupyter',
      'Git',
      'AWS / GCP',
    ],
    soft: [
      'Translating Data to Business Value',
      'Curiosity',
      'Critical Thinking',
      'Executive Dashboards Presentation',
      'Analytical Rigor',
    ],
  },
  design: {
    technical: [
      'UI Design',
      'UX Research & Wireframing',
      'Design Systems',
      'Interactive Prototyping',
      'Information Architecture',
      'Usability Testing',
      'Responsive Web & Mobile Design',
      'WCAG Accessibility',
    ],
    tools: [
      'Figma',
      'Adobe Creative Cloud',
      'Sketch',
      'Miro',
      'Principle',
      'Framer',
      'Zeplin',
      'Lottie',
    ],
    soft: [
      'Empathy',
      'Creative Problem Solving',
      'Design Critique & Feedback',
      'Storyboarding',
      'Developer Collaboration',
    ],
  },
  marketing: {
    technical: [
      'SEO (Technical & On-Page)',
      'Content Marketing',
      'Conversion Rate Optimization (CRO)',
      'Email Marketing & Lifecycle Automation',
      'Performance Marketing (PPC)',
      'Social Media Strategy',
      'Web Analytics',
      'Brand Positioning',
    ],
    tools: [
      'Google Analytics 4',
      'Google Search Console',
      'Ahrefs / SEMrush',
      'HubSpot',
      'Mailchimp',
      'Canva',
      'Meta Ads Manager',
      'WordPress',
    ],
    soft: [
      'Compelling Copywriting',
      'Creative Ideation',
      'Audience Research',
      'Multi-Channel Campaign Management',
      'Data-Driven Decision Making',
    ],
  },
  sales: {
    technical: [
      'B2B Enterprise Sales',
      'Pipeline Management',
      'Account-Based Marketing (ABM)',
      'Contract Negotiation',
      'Sales Forecasting',
      'Prospecting & Lead Qualification',
      'Customer Relationship Management (CRM)',
    ],
    tools: [
      'Salesforce',
      'HubSpot CRM',
      'LinkedIn Sales Navigator',
      'Outreach.io',
      'Gong',
      'ZoomInfo',
      'DocuSign',
    ],
    soft: [
      'Active Listening',
      'Relationship Building',
      'Objection Handling',
      'Persuasive Communication',
      'Resilience & Quota Discipline',
    ],
  },
  finance: {
    technical: [
      'Financial Modeling',
      'Budgeting & Forecasting (FP&A)',
      'Financial Reporting',
      'Variance Analysis',
      'Cash Flow Management',
      'US GAAP / IFRS Compliance',
      'Auditing',
    ],
    tools: [
      'Advanced Excel (VLOOKUP, Index/Match, Macros)',
      'QuickBooks',
      'NetSuite',
      'SAP',
      'Bloomberg Terminal',
      'Power BI',
    ],
    soft: [
      'Attention to Detail',
      'Ethical Judgement',
      'Risk Assessment',
      'Strategic Financial Advisory',
      'Cross-Department Coordination',
    ],
  },
  hr: {
    technical: [
      'Talent Acquisition & Full-Cycle Recruiting',
      'Employee Onboarding & Retention',
      'Performance Management',
      'HR Compliance & Labor Laws',
      'Compensation & Benefits Structuring',
      'Diversity, Equity & Inclusion (DEI)',
    ],
    tools: [
      'Workday',
      'Greenhouse',
      'Lever',
      'BambooHR',
      'Culture Amp',
      'Slack',
      'Google Workspace',
    ],
    soft: [
      'Conflict Resolution',
      'Confidentiality & Discretion',
      'Active Listening',
      'Organizational Culture Building',
      'Empathetic Coaching',
    ],
  },
  student: {
    technical: [
      'Academic Research',
      'Data Analysis',
      'Technical Writing',
      'Python',
      'Java',
      'Microsoft Office Suite',
      'Google Workspace',
      'Project Documentation',
    ],
    tools: ['Git', 'VS Code', 'Notion', 'Slack', 'Zoom', 'Trello', 'Canva'],
    soft: [
      'Fast Learner',
      'Time Management',
      'Adaptability',
      'Collaborative Team Player',
      'Critical Thinking',
      'Intellectual Curiosity',
    ],
  },
};

// Power action verbs for ATS and recruiter impact
export const ACTION_VERBS = [
  'Architected',
  'Spearheaded',
  'Engineered',
  'Orchestrated',
  'Transformed',
  'Accelerated',
  'Optimized',
  'Pioneered',
  'Streamlined',
  'Surpassed',
  'Delivered',
  'Standardized',
  'Automated',
  'Elevated',
  'Consolidated',
  'Negotiated',
  'Amplified',
  'Mobilized',
  'Restructured',
  'Generated',
];

export function getSkillsForRole(query: string): {
  technical: string[];
  tools: string[];
  soft: string[];
} {
  const normalized = query.toLowerCase();
  for (const [key, val] of Object.entries(SKILLS_DIRECTORY)) {
    if (normalized.includes(key)) {
      return val;
    }
  }
  if (normalized.includes('engineer') || normalized.includes('developer') || normalized.includes('tech') || normalized.includes('code')) {
    return SKILLS_DIRECTORY.software;
  }
  if (normalized.includes('manager') || normalized.includes('lead') || normalized.includes('director')) {
    return SKILLS_DIRECTORY.product;
  }
  if (normalized.includes('analyst') || normalized.includes('scientist') || normalized.includes('bi')) {
    return SKILLS_DIRECTORY.data;
  }
  if (normalized.includes('market') || normalized.includes('seo') || normalized.includes('brand')) {
    return SKILLS_DIRECTORY.marketing;
  }
  if (normalized.includes('grad') || normalized.includes('student') || normalized.includes('intern') || normalized.includes('entry')) {
    return SKILLS_DIRECTORY.student;
  }
  return SKILLS_DIRECTORY.software;
}

export function generateProfessionalSummaries(
  jobTitle: string,
  experienceYears: string = '5+',
  strengths: string = 'driving scalable solutions and team velocity',
  industry: string = 'technology'
): { style: string; text: string }[] {
  const title = jobTitle.trim() || 'Professional';
  const cleanExp = experienceYears.replace(/[^0-9+]/g, '') || '5+';
  const cleanStrengths = strengths.trim() || 'delivering high-impact business outcomes';

  return [
    {
      style: 'Executive & Impact-Driven (Recommended)',
      text: `Accomplished ${title} with ${cleanExp} years of proven success in ${industry}, recognized for ${cleanStrengths}. Adept at aligning cross-functional initiatives with core organizational objectives, optimizing operational efficiencies, and delivering measurable revenue and productivity gains.`,
    },
    {
      style: 'Technical & Results-Focused',
      text: `Results-oriented ${title} with ${cleanExp} years of hands-on expertise building robust architectures and ${cleanStrengths}. Strong analytical problem solver dedicated to standardizing best practices, automating bottlenecks, and scaling high-reliability workflows in fast-paced environments.`,
    },
    {
      style: 'Concise & Modern ATS',
      text: `Dynamic ${title} bringing ${cleanExp} years of progressive experience specializing in ${cleanStrengths}. Known for meticulous execution, rapid adaptation to emerging technologies, and driving consistent milestone delivery across complex projects.`,
    },
  ];
}

export function generateAchievementBullets(
  position: string,
  rawDuty: string,
  metricHint?: string
): string[] {
  const duty = rawDuty.trim() || 'responsible for managing core team projects';
  const metric = metricHint?.trim() || 'by 28% within 6 months';

  const cleanDuty = duty
    .replace(/^(responsible for|handled|worked on|helped with|did|managed)\s+/i, '')
    .trim();

  return [
    `Spearheaded the redesign of ${cleanDuty}, achieving a measurable performance improvement of ${metric}.`,
    `Engineered an automated workflow for ${cleanDuty}, reducing operational turnaround time by 35% and preventing critical regressions.`,
    `Collaborated cross-functionally across departments to streamline ${cleanDuty}, exceeding quarterly KPI benchmarks ${metric}.`,
    `Orchestrated end-to-end implementation of key initiatives surrounding ${cleanDuty}, driving higher team velocity and client satisfaction.`,
  ];
}

export function generateHeadlines(jobTitle: string, focusArea: string = 'High-Growth Scaling'): string[] {
  const title = jobTitle.trim() || 'Professional';
  return [
    `${title} | ${focusArea} & Strategic Execution`,
    `Senior ${title} — Building Scalable Systems & High-Performing Teams`,
    `${title} | Driving Operational Excellence, Innovation & Measurable ROI`,
    `Results-Driven ${title} Specializing in ${focusArea}`,
  ];
}

export function improveResumeText(rawText: string, mode: 'strengthen' | 'concise' | 'action'): string {
  if (!rawText.trim()) return '';

  let cleaned = rawText
    .replace(/\bresponsible for\b/gi, 'Spearheaded')
    .replace(/\bworked on\b/gi, 'Engineered')
    .replace(/\bhelped to\b/gi, 'Accelerated')
    .replace(/\bdid\b/gi, 'Executed')
    .replace(/\bmanaged\b/gi, 'Orchestrated')
    .replace(/\bvery\b/gi, '')
    .replace(/\breally\b/gi, '')
    .trim();

  if (mode === 'action') {
    const firstWord = cleaned.split(' ')[0];
    if (!ACTION_VERBS.some(v => v.toLowerCase() === firstWord.toLowerCase())) {
      cleaned = `Successfully ${cleaned.charAt(0).toLowerCase() + cleaned.slice(1)}`;
    }
  }

  if (mode === 'concise') {
    cleaned = cleaned.replace(/\s{2,}/g, ' ');
  }

  return cleaned;
}

export function generateCoverLetterFromResume(
  resume: ResumeData,
  targetJobTitle: string,
  targetCompany: string,
  tone: 'professional' | 'enthusiastic' | 'concise' = 'professional'
): CoverLetterData {
  const name = resume.personalInfo.fullName || 'Candidate';
  const role = targetJobTitle.trim() || resume.personalInfo.jobTitle || 'Professional Role';
  const company = targetCompany.trim() || 'Your Esteemed Organization';
  const topCompany = resume.workExperience[0]?.company || 'my previous employer';
  const topBullet = resume.workExperience[0]?.bullets[0] || 'led high-impact projects that exceeded organizational benchmarks';

  let opening = `I am writing to express my enthusiastic interest in the ${role} position at ${company}. With a strong track record of success in ${resume.personalInfo.jobTitle || 'my field'} and a commitment to operational excellence, I am confident in my ability to deliver immediate value to your team.`;

  if (tone === 'concise') {
    opening = `Please accept this letter and my attached resume as an application for the ${role} opportunity at ${company}. My background in ${resume.personalInfo.jobTitle || 'delivering high-quality solutions'} aligns directly with your goals.`;
  }

  const body1 = `Throughout my career, most recently as ${resume.workExperience[0]?.position || 'a key contributor'} at ${topCompany}, I have prioritized measurable outcomes, structured problem solving, and cross-functional execution. Specifically, I ${topBullet.charAt(0).toLowerCase() + topBullet.slice(1)}`;

  const body2 = `What excites me most about joining ${company} is your reputation for innovation and market leadership. I thrive in collaborative environments where high standards, rapid learning, and accountability are paramount. My core competencies in ${resume.skills.technical.slice(0, 4).join(', ') || 'strategic execution'} position me to hit the ground running.`;

  const closing = `I would welcome the opportunity to discuss how my experience and passion can contribute to the ongoing success of ${company}. Thank you for your consideration, and I look forward to hearing from you.`;

  return {
    personalInfo: {
      fullName: name,
      email: resume.personalInfo.email,
      phone: resume.personalInfo.phone,
      location: resume.personalInfo.location,
      linkedin: resume.personalInfo.linkedin,
    },
    recipient: {
      hiringManager: 'Hiring Team',
      companyName: company,
      jobTitle: role,
    },
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    greeting: `Dear ${company} Hiring Team,`,
    openingParagraph: opening,
    bodyParagraphs: [body1, body2],
    closingParagraph: closing,
    signoff: 'Sincerely,',
  };
}
