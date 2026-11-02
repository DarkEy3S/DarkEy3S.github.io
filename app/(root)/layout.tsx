import { defaultLocale } from '@/content';

export const metadata = { robots: { index: false } };

const redirect = `location.replace('/'+((document.cookie.match(/(?:^|; )portfolio_locale=(ru|hy|en)(?:;|$)/)||[])[1]||'${defaultLocale}')+'/')`;

export default function RootRedirectLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ru"><head><script dangerouslySetInnerHTML={{ __html: redirect }} /></head><body>{children}</body></html>;
}
