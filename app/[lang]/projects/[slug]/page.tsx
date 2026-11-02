import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Cover, Diagram } from '@/components/Visuals';
import { alternates, formatPeriod, getDict, getProjects, projectSection, published } from '@/content';
import type { Locale } from '@/content/types';
import s from './case.module.css';

type Props = { params: Promise<{ lang: string; slug: string }> };

async function load({ params }: Props) {
  const { lang, slug } = await params;
  return { lang: lang as Locale, d: getDict(lang as Locale), p: getProjects(lang as Locale).find((x) => x.slug === slug) };
}

export const dynamicParams = false;
export const generateStaticParams = () => published.map(({ slug }) => ({ slug }));

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { lang, p } = await load(props);
  if (!p) return {};
  const path = `/projects/${p.slug}/`;
  return {
    title: p.title, description: p.summary,
    alternates: { canonical: `/${lang}${path}`, ...alternates(path) },
    openGraph: { title: p.title, description: p.summary },
  };
}

export default async function CasePage(props: Props) {
  const { lang, d, p } = await load(props);
  if (!p) notFound();
  const L = d.caseLabels;
  const results = p.results?.filter((r) => r.confirmed);

  return (
    <article className="container">
      <header className={s.head}>
        <Link href={`/${lang}/#${projectSection(p.group)}`} className={s.back}>← {d.ui.back}</Link>
        <p className="eyebrow">{p.group === 'pet' ? d.ui.pet : `${d.companies[p.company].name} · ${formatPeriod(lang, p.period)}${p.group === 'agency' ? ` · ${d.ui.team}` : ''}`}</p>
        <h1 className={s.title}>{p.title}</h1>
        <p className="lead">{p.summary}</p>
      </header>

      <div className={s.cover}><Cover p={p} d={d} /></div>
      {p.group !== 'pet' && p.company === 'uroven' && <div className={s.diagram}><Diagram d={d.diagram} /></div>}

      <div className={s.body}>
        <aside className={s.meta}>
          {p.role && <div><h2 className="mono">{L.role}</h2><p>{p.role}</p></div>}
          {p.group !== 'pet' && <div><h2 className="mono">{L.company}</h2><p>{d.companies[p.company].name}<br /><span>{formatPeriod(lang, p.period)}</span></p></div>}
          {p.stack && <div><h2 className="mono">{L.stack}</h2><ul className="tags">{p.stack.map((x) => <li key={x} className="tag">{x}</li>)}</ul></div>}
          {p.link && <div><h2 className="mono">{L.link}</h2><a href={p.link} target="_blank" rel="noopener noreferrer" className="link">{d.ui.openSite} ↗</a></div>}
          {p.repo && <div><h2 className="mono">{d.ui.github}</h2><a href={p.repo} target="_blank" rel="noopener noreferrer" className="link">{d.ui.github} ↗</a></div>}
        </aside>

        <div className={s.content}>
          {p.task && <section><h2>{L.task}</h2><p className={s.text}>{p.task}</p></section>}
          {p.implemented && (
            <section>
              <h2>{L.implemented}</h2>
              <ul className={s.list}>{p.implemented.map((x) => <li key={x}>{x}</li>)}</ul>
            </section>
          )}
          {results?.length ? (
            <section><h2>{L.results}</h2><ul className={s.results}>{results.map((r) => <li key={r.text}>{r.text}</li>)}</ul></section>
          ) : null}
        </div>
      </div>
    </article>
  );
}
