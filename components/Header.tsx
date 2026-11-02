import Link from 'next/link';
import type { Dict, Locale } from '@/content/types';
import { Controls } from './Controls';
import s from './ui.module.css';

export function Header({ lang, d, hasContacts }: { lang: Locale; d: Dict; hasContacts: boolean }) {
  const ids = ['work', 'sites', 'pets', 'experience', 'stack', ...(hasContacts ? ['contacts'] : [])] as (keyof Dict['nav'])[];
  return (
    <header className={s.header}>
      <div className={`container ${s.bar}`}>
        <Link href={`/${lang}/`} className={s.logo}>
          <span className={s.mark} aria-hidden="true">{d.hero.name.split(' ').map((w) => w[0]).join('')}</span>
          <span className={s.name}>{d.hero.name}</span>
        </Link>
        <nav className={s.nav}>
          <ul>{ids.map((id) => <li key={id}><Link href={`/${lang}/#${id}`}>{d.nav[id]}</Link></li>)}</ul>
        </nav>
        <Controls lang={lang} language={d.ui.language} theme={d.ui.theme} />
      </div>
    </header>
  );
}
