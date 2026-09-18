export interface SocialLink {
  name: string;
  url: string;
  handle: string;
  category: string;
  badgeColor: string;
  hoverColor: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/cvmakedev',
    handle: '@cvmakedev',
    category: 'Open Source & Code',
    badgeColor: 'bg-slate-800 text-slate-200 border-slate-700',
    hoverColor: 'hover:text-white hover:bg-slate-800',
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@CVMake-dev',
    handle: '@CVMake-dev',
    category: 'Video Tutorials & Guides',
    badgeColor: 'bg-red-500/10 text-red-400 border-red-500/20',
    hoverColor: 'hover:text-red-400 hover:bg-red-500/10',
  },
  {
    name: 'Reddit',
    url: 'https://www.reddit.com/user/cvmakedev/',
    handle: 'u/cvmakedev',
    category: 'Community & Discussions',
    badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    hoverColor: 'hover:text-orange-400 hover:bg-orange-500/10',
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/cvmakedev',
    handle: 'cvmakedev',
    category: 'Community & Updates',
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    hoverColor: 'hover:text-blue-400 hover:bg-blue-500/10',
  },
  {
    name: 'Medium',
    url: 'https://medium.com/@aicvmaker',
    handle: '@aicvmaker',
    category: 'Career & Resume Articles',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    hoverColor: 'hover:text-emerald-400 hover:bg-emerald-500/10',
  },
  {
    name: 'Pinterest',
    url: 'https://www.pinterest.com/aicvmaker/',
    handle: '@aicvmaker',
    category: 'Resume & CV Templates Design',
    badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    hoverColor: 'hover:text-rose-400 hover:bg-rose-500/10',
  },
  {
    name: 'Quora',
    url: 'https://www.quora.com/profile/CV-Make',
    handle: 'CV-Make',
    category: 'Q&A & Career Advice',
    badgeColor: 'bg-red-600/10 text-red-300 border-red-600/20',
    hoverColor: 'hover:text-red-300 hover:bg-red-600/10',
  },
];

export const SOCIAL_URLS = SOCIAL_LINKS.map(s => s.url);
