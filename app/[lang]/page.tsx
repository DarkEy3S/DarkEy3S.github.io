import Link from 'next/link';
import { Cover, Diagram } from '@/components/Visuals';
import { formatPeriod, getDict, getProjects, type LocalizedProject } from '@/content';
import { companies, stack } from '@/content/data';
import { photo, site } from '@/content/site';
import type { CompanyId, Dict, Locale, StackGroupId } from '@/content/types';
import s from './home.module.css';

const Heading = ({ eyebrow, title }: { eyebrow: string; title: string }) => (
  <><p className="eyebrow">{eyebrow}</p><h2 className="h2">{title}</h2></>
);

function Card({ p, lang, d, big }: { p: LocalizedProject; lang: Locale; d: Dict; big?: boolean }) {
  const href = `/${lang}/projects/${p.slug}/`;
  const meta = p.group === 'pet' ? d.ui.pet : p.group === 'agency' ? d.ui.team : `${d.companies[p.company].name} · ${formatPeriod(lang, p.period)}`;
  return (
    <article className={big ? `${s.card} ${s.big}` : s.card}>
      <Link href={href} tabIndex={-1} aria-hidden="true" className={s.cover}><Cover p={p} d={d} /></Link>
      <div className={s.cardText}>
        <p className="mono">{meta}</p>
        <h3><Link href={href}>{p.title}</Link></h3>
        <p>{p.summary}</p>
        {p.stack && <ul className="tags">{p.stack.slice(0, big ? 6 : 4).map((x) => <li key={x} className="tag">{x}</li>)}</ul>}
        <div className={s.actions}>
          <Link href={href} className="link">{d.ui.more} →</Link>
          {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" className="link">{d.ui.openSite} ↗</a>}
          {p.repo && <a href={p.repo} target="_blank" rel="noopener noreferrer" className="link">{d.ui.github} ↗</a>}
        </div>
      </div>
    </article>
  );
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const lang = (await params).lang as Locale;
  const d = getDict(lang);
  const projects = getProjects(lang);
  const [main, ...current] = projects.filter((p) => p.group === 'current');
  const pets = projects.filter((p) => p.group === 'pet');
  const agency = (Object.keys(companies) as CompanyId[])
    .map((id) => ({ id, items: projects.filter((p) => p.group === 'agency' && p.company === id) }))
    .filter((g) => g.items.length);
  const contacts = [
    site.email && { label: 'Email', text: site.email, href: `mailto:${site.email}` },
    site.telegram && { label: 'Telegram', text: `@${site.telegram}`, href: `https://t.me/${site.telegram}` },
    site.phone && { label: d.contacts.phoneLabel, text: site.phone, href: 'tel:' + site.phone.replace(/[^\d+]/g, '') },
  ].filter((c) => !!c);

  return (
    <>
      <section className={`container ${s.hero}`}>
        <div className={s.heroText}>
          <p className="eyebrow">{d.hero.eyebrow}</p>
          <h1 className={s.title}>{d.hero.name}</h1>
          <p className="lead">{d.hero.intro}</p>
          <div className={s.cta}>
            <Link href={`/${lang}/projects/${main.slug}/`} className="btn">{d.hero.toCase} →</Link>
            <Link href={`/${lang}/#${contacts.length ? 'contacts' : 'experience'}`} className="btn btn-ghost">
              {contacts.length ? d.hero.toContacts : d.hero.toExperience}
            </Link>
          </div>
        </div>
        <aside className={s.profile}>
          {photo && <img src={photo} alt={d.hero.photoAlt} className={s.photo} width={480} height={480} />}
          <dl>{d.profile.map(([k, v]) => <div key={k}><dt className="mono">{k}</dt><dd>{v}</dd></div>)}</dl>
          <ul className="tags">{stack.core.map((x) => <li key={x} className="tag">{x}</li>)}</ul>
        </aside>
      </section>

      <section id="work" className="container section">
        <Heading eyebrow={d.work.eyebrow} title={d.work.title} />
        <p className="lead">{d.work.text}</p>
        <div className={s.work}>
          <Card p={main} lang={lang} d={d} big />
          <Diagram d={d.diagram} />
          {current.map((p) => <Card key={p.slug} p={p} lang={lang} d={d} />)}
        </div>
      </section>

      <section id="sites" className={`section ${s.band}`}>
        <div className="container">
          <Heading eyebrow={d.sites.eyebrow} title={d.sites.title} />
          <p className="lead">{d.sites.text}</p>
          {agency.map((g) => (
            <div key={g.id} className={s.group}>
              <h3 className={s.groupHead}>
                {d.companies[g.id].name}<span className="mono">{d.companies[g.id].role} · {formatPeriod(lang, companies[g.id])}</span>
              </h3>
              <div className={s.grid}>{g.items.map((p) => <Card key={p.slug} p={p} lang={lang} d={d} />)}</div>
            </div>
          ))}
        </div>
      </section>

      {pets.length > 0 && (
        <section id="pets" className="container section">
          <Heading eyebrow={d.pets.eyebrow} title={d.pets.title} />
          <p className="lead">{d.pets.text}</p>
          <div className={s.work}>{pets.map((p) => <Card key={p.slug} p={p} lang={lang} d={d} big={pets.length === 1} />)}</div>
        </section>
      )}

      <section id="experience" className="container section">
        <Heading eyebrow={d.experience.eyebrow} title={d.experience.title} />
        <ol className={s.timeline}>
          {(Object.keys(companies) as CompanyId[]).map((id) => (
            <li key={id}>
              <p className="mono">{formatPeriod(lang, companies[id])}</p>
              <h3>{d.companies[id].role} · {d.companies[id].name}</h3>
              <p>{d.companies[id].text}</p>
            </li>
          ))}
          <li className={s.edu}>
            <p className="mono">{d.experience.education[0]}</p>
            <h3>{d.experience.education[1]}</h3>
            <p>{d.experience.education[2]}</p>
          </li>
        </ol>
      </section>

      <section id="stack" className="container section">
        <Heading eyebrow={d.stack.eyebrow} title={d.stack.title} />
        <div className={s.stack}>
          {(Object.keys(stack) as StackGroupId[]).map((g) => (
            <div key={g} className={g === 'core' ? `${s.stackGroup} ${s.core}` : s.stackGroup}>
              <h3 className="mono">{d.stack.groups[g]}</h3>
              <ul className="tags">{stack[g].map((x) => <li key={x} className="tag">{x}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      {contacts.length > 0 && (
        <section id="contacts" className="container section">
          <div className={s.contacts}>
            <div>
              <Heading eyebrow={d.contacts.eyebrow} title={d.contacts.title} />
              <p className="lead">{d.contacts.text}</p>
            </div>
            <ul>
              {contacts.map((c) => (
                <li key={c.label}><a href={c.href} {...(c.href.startsWith('https://') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}><span className="mono">{c.label}</span>{c.text}</a></li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
