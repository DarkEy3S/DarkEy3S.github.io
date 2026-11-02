'use client';
import { useEffect } from 'react';

export function Progress() {
  useEffect(() => {
    const on = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      document.documentElement.style.setProperty('--scroll', String(max > 0 ? scrollY / max : 0));
    };
    on();
    addEventListener('scroll', on, { passive: true });
    addEventListener('resize', on);
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on); };
  }, []);
  return <div className="progress" aria-hidden="true" />;
}
