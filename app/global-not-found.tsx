import { getDict, locales } from '@/content';
import { fontVars, themeScript } from './fonts';
import './globals.css';

export const metadata = { title: locales.map((l) => getDict(l).notFound.title).join(' · ') };

export default function GlobalNotFound() {
  return (
    <html lang="ru" className={fontVars} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>
        <main className="container section" style={{ display: 'grid', gap: '2.5rem', minHeight: '100vh', alignContent: 'center' }}>
          <p className="eyebrow">404</p>
          {locales.map((l) => {
            const { notFound } = getDict(l);
            return (
              <section key={l} lang={l} style={{ display: 'grid', gap: '0.75rem', justifyItems: 'start' }}>
                <h1 className="h2">{notFound.title}</h1>
                <p className="lead">{notFound.text}</p>
                <a href={`/${l}/`} className="link">{notFound.home} →</a>
              </section>
            );
          })}
        </main>
      </body>
    </html>
  );
}
