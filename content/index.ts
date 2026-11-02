import { companies, projects } from './data';
import { en } from './en';
import { hy } from './hy';
import { ru } from './ru';
import type { Dict, Locale, Month } from './types';

export const locales: Locale[] = ['ru', 'hy', 'en'];
export const defaultLocale: Locale = 'ru';
const dicts: Record<Locale, Dict> = { ru, hy, en };

export const isLocale = (v: string): v is Locale => locales.includes(v as Locale);
export const getDict = (lang: Locale) => dicts[lang];

export const published = projects.filter((p) => p.status === 'published');

export function getProjects(lang: Locale) {
  return published.map((p) => ({
    ...p, ...dicts[lang].projects[p.slug],
    period: p.period ?? (p.group === 'pet' ? undefined : companies[p.company]),
  }));
}
export type LocalizedProject = ReturnType<typeof getProjects>[number];
export const projectSection = (group: LocalizedProject['group']) => (group === 'agency' ? 'sites' : group === 'pet' ? 'pets' : 'work');

export function formatPeriod(lang: Locale, period?: { from: Month; to?: Month }) {
  if (!period) return '';
  const d = dicts[lang];
  const fmt = (m: Month) => `${d.months[Number(m.slice(5)) - 1]} ${m.slice(0, 4)}`;
  return `${fmt(period.from)} — ${period.to ? fmt(period.to) : d.ui.present}`;
}

export const alternates = (path: string) => ({
  languages: { ...Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])), 'x-default': `/${defaultLocale}${path}` },
});
