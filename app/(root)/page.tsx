import { defaultLocale } from '@/content';

const target = `/${defaultLocale}/`;

export default function RootRedirect() {
  return (
    <>
      <noscript><meta httpEquiv="refresh" content={`0;url=${target}`} /></noscript>
      <link rel="canonical" href={target} />
      <a href={target}>Севак Мартиросян — Fullstack-разработчик</a>
    </>
  );
}
