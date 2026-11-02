export type Locale = 'ru' | 'hy' | 'en';
export type Slug = 'catalog-platform' | 'uroven-pro' | 'khv-aero' | 'volna' | 'domart' | '01cat' | 'todo-app';
export type CompanyId = 'uroven' | '01cat' | 'shake' | 'redline';
export type StackGroupId = 'core' | 'backend' | 'data' | 'devops' | 'platforms';
export type ProjectGroup = 'current' | 'agency' | 'pet';
export type Month = `${number}-${number}`;

type Cover = { type: 'mockup' } | { type: 'todos' } | { type: 'screenshot'; src: string } | { type: 'external'; hue: number };
type ProjectCore = {
  slug: Slug;
  status: 'published' | 'draft';
  period?: { from: Month; to?: Month };
  stack?: string[];
  link?: string;
  repo?: string;
  cover: Cover;
};

export type Project =
  | (ProjectCore & { group: 'current' | 'agency'; company: CompanyId })
  | (ProjectCore & { group: 'pet' });

export type ProjectText = {
  title: string;
  summary: string;
  alt: string;
  task?: string;
  role?: string;
  implemented?: string[];
  results?: { text: string; confirmed: boolean }[];
};

export type Dict = {
  meta: { title: string; description: string; ogLocale: string };
  months: string[];
  ui: { skip: string; theme: string; language: string; present: string; back: string; openSite: string; more: string; team: string; pet: string; github: string };
  nav: { work: string; sites: string; pets: string; experience: string; stack: string; contacts: string };
  hero: { eyebrow: string; name: string; role: string; intro: string; toCase: string; toContacts: string; toExperience: string; photoAlt: string };
  profile: [label: string, value: string][];
  work: { eyebrow: string; title: string; text: string };
  diagram: { label: string; admin: [string, string]; oneC: [string, string]; store: [string, string]; toOneC: string; fromOneC: string; toStore: string };
  mockup: { title: string; search: string; demo: string; lock: string; cols: [string, string, string]; rows: [string, string, string][] };
  sites: { eyebrow: string; title: string; text: string };
  pets: { eyebrow: string; title: string; text: string; mock: { title: string; search: string; demo: string; items: [label: string, done: boolean][] } };
  experience: { eyebrow: string; title: string; education: [string, string, string] };
  stack: { eyebrow: string; title: string; groups: Record<StackGroupId, string> };
  contacts: { eyebrow: string; title: string; text: string; phoneLabel: string };
  caseLabels: { task: string; role: string; implemented: string; stack: string; results: string; link: string; company: string };
  notFound: { title: string; text: string; home: string };
  companies: Record<CompanyId, { name: string; role: string; text: string }>;
  projects: Record<Slug, ProjectText>;
};
