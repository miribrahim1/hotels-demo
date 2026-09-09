import { resolveSiteUrl } from '@/lib/site-config.mjs';
const siteUrl = resolveSiteUrl();

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
