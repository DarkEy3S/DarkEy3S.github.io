'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { setPref } from './prefs';
import s from './ui.module.css';

const langs = [['ru', 'RU'], ['hy', 'HY'], ['en', 'EN']] as const;

function toggleTheme() {
  const theme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  document.documentElement.dataset.theme = theme;
  setPref('theme', theme);
}

export function Controls({ lang, language, theme }: { lang: string; language: string; theme: string }) {
  const rest = usePathname().split('/').slice(2).join('/');
  useEffect(() => setPref('locale', lang), [lang]);
  return (
    <div className={s.controls}>
      <nav aria-label={language} className={s.langs}>
        {langs.map(([l, label]) => (
          <a
            key={l}
            href={`/${l}/${rest}`}
            hrefLang={l}
            lang={l}
            data-magnet="glow"
            onClick={(e) => {
              setPref('locale', l);
              const next = `/${l}/${rest}${location.hash}`;
              if (next !== e.currentTarget.getAttribute('href')) {
                e.preventDefault();
                location.assign(next);
              }
            }}
            aria-current={l === lang ? 'page' : undefined}
          >{label}</a>
        ))}
      </nav>
      <button type="button" className={s.theme} onClick={toggleTheme} aria-label={theme} title={theme}>
        <svg className={s.sun} viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
        <svg className={s.moon} viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
      </button>
    </div>
  );
}
