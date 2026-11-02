import type { CompanyId, Month, Project, StackGroupId } from './types';

// Данные, общие для всех языков. Тексты проектов — в ru.ts, hy.ts, en.ts.
export const companies: Record<CompanyId, { from: Month; to?: Month }> = {
  uroven: { from: '2025-10' },
  '01cat': { from: '2024-10', to: '2025-08' },
  shake: { from: '2023-10', to: '2024-05' },
  redline: { from: '2022-03', to: '2022-07' },
};

export const projects: Project[] = [
  {
    slug: 'catalog-platform', status: 'published', group: 'current', company: 'uroven', cover: { type: 'mockup' },
    stack: ['Next.js', 'React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Deno Edge Functions', 'Docker', 'GitLab CI'],
  },
  {
    slug: 'uroven-pro', status: 'published', group: 'current', company: 'uroven', link: 'https://uroven.pro/',
    cover: { type: 'external', hue: 28 }, stack: ['CS-Cart', 'PHP', 'MySQL', 'REST API', '1С', 'Supabase Storage'],
  },
  { slug: 'khv-aero', status: 'published', group: 'agency', company: '01cat', link: 'https://khv.aero/', cover: { type: 'external', hue: 210 } },
  { slug: 'volna', status: 'published', group: 'agency', company: '01cat', link: 'https://volnabrosko.com/', cover: { type: 'external', hue: 190 }, stack: ['WordPress'] },
  { slug: 'domart', status: 'published', group: 'agency', company: '01cat', link: 'https://domartkhv.ru/', cover: { type: 'external', hue: 35 }, stack: ['WordPress'] },
  { slug: '01cat', status: 'published', group: 'agency', company: '01cat', link: 'https://www.01cat.ru/', cover: { type: 'external', hue: 265 }, stack: ['WordPress'] },
  {
    slug: 'todo-app', status: 'published', group: 'pet', cover: { type: 'todos' },
    link: 'https://darkey3s.github.io/todo-app/', repo: 'https://github.com/DarkEy3S/todo-app',
    stack: ['React', 'TypeScript', 'Vite', 'React Router', 'Supabase', 'Docker', 'Nginx', 'GitHub Actions'],
  },
  // Шаблон для новых кейсов — см. PORTFOLIO_CONTENT_GUIDE.md:
  // { slug: 'new-site', status: 'draft', group: 'agency', company: 'shake', link: 'https://...', cover: { type: 'external', hue: 150 }, stack: [] },
  // { slug: 'new-pet', status: 'draft', group: 'pet', repo: 'https://github.com/...', cover: { type: 'todos' }, stack: [] },
];

export const stack: Record<StackGroupId, string[]> = {
  core: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'Supabase', 'PostgreSQL'],
  backend: ['Node.js', 'REST API', 'Web API', 'Deno Edge Functions', 'PHP', 'Python'],
  data: ['SQL', 'MySQL', 'Supabase Storage', 'PostgreSQL RPC'],
  devops: ['Docker', 'Docker Compose', 'Git', 'GitHub', 'GitLab CI', 'Linux'],
  platforms: ['WordPress', 'CS-Cart', '1С', 'Bitrix24'],
};
