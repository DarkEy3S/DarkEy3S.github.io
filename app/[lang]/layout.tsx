import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Cursor } from '@/components/Cursor';
import { Header } from '@/components/Header';
import { Progress } from '@/components/Progress';
import { alternates, getDict, isLocale, locales } from '@/content';
import { photo, site } from '@/content/site';
import { fontVars, themeScript } from '../fonts';
import '../globals.css';

type Props = { params: Promise<{ lang: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => locales.map((lang) => ({ lang }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const d = getDict(lang);
  return {
    ...(site.url && { metadataBase: new URL(site.url) }),
    title: { default: d.meta.title, template: `%s — ${d.hero.name}` },
    description: d.meta.description,
    icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }] },
    alternates: { canonical: `/${lang}/`, ...alternates('/') },
    openGraph: {
      type: 'website', locale: d.meta.ogLocale, siteName: d.hero.name, title: d.meta.title, description: d.meta.description,
      ...(photo && { images: [{ url: photo, alt: d.hero.photoAlt }] }),
    },
  };
}

export default async function LangLayout({ children, params }: Props & { children: React.ReactNode }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const d = getDict(lang);
  return (
    <html lang={lang} className={fontVars} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>
        <a href="#main" className="skip">{d.ui.skip}</a>
        <Header lang={lang} d={d} hasContacts={Boolean(site.email || site.telegram || site.phone)} />
        <main id="main">{children}</main>
        <footer className="container footer mono">© {new Date().getFullYear()} {d.hero.name}</footer>
        <Progress />
        <Cursor />
      </body>
    </html>
  );
}
