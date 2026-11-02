import type { MetadataRoute } from 'next';
import { locales, published } from '@/content';
import { site } from '@/content/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.url) return [];
  const url = (l: string, path: string) => `${site.url}/${l}${path}`;
  return ['/', ...published.map((p) => `/projects/${p.slug}/`)].flatMap((path) =>
    locales.map((l) => ({ url: url(l, path), alternates: { languages: Object.fromEntries(locales.map((x) => [x, url(x, path)])) } })),
  );
}
