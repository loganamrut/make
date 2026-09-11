import { MetadataRoute } from 'next';
import { SEO_LANDING_PAGES, TEMPLATE_SHOWCASES, MICRO_TOOLS_DATA, BLOG_POSTS } from '@/lib/seo-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cvmake.dev';
  const lastModified = new Date();

  // 1. Core pages
  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/builder/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/cover-letter-builder/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/resume-templates/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/terms/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];

  // 2. 19 SEO Landing Pages
  const landingRoutes: MetadataRoute.Sitemap = Object.keys(SEO_LANDING_PAGES).map(slug => ({
    url: `${baseUrl}/${slug}/`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 3. 9 Template Category Pages
  const templateRoutes: MetadataRoute.Sitemap = TEMPLATE_SHOWCASES.map(tpl => ({
    url: `${baseUrl}/resume-templates/${tpl.slug}/`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 4. 8 Micro Tools
  const toolRoutes: MetadataRoute.Sitemap = MICRO_TOOLS_DATA.map(tool => ({
    url: `${baseUrl}${tool.href}/`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 5. Blog Guides
  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map(post => ({
    url: `${baseUrl}/blog/${post.slug}/`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...coreRoutes, ...landingRoutes, ...templateRoutes, ...toolRoutes, ...blogRoutes];
}
