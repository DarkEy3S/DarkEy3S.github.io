'use client';
import { useEffect, useRef } from 'react';

const interactive = 'a, button, [role="button"], label, summary, select';
const magnetic = '.btn, button, .link, header li a, [data-magnet]';

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const halo = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return;
    const root = document.documentElement;
    let x = 0, y = 0, hx = 0, hy = 0, ds = 1, dop = 0, raf = 0;
    let btn: HTMLElement | null = null;
    const release = () => {
      btn?.classList.remove('magnet');
      btn?.style.removeProperty('translate');
      btn = null;
      root.classList.remove('cursor-magnet');
    };
    const tick = () => {
      const on = root.classList.contains('cursor-on');
      const into = on && !!btn;
      const ts = into ? 3.5 : 1;
      const to = on ? (into ? 0 : 1) : 0;
      hx += (x - hx) * 0.065;
      hy += (y - hy) * 0.065;
      ds += (ts - ds) * (into ? 0.11 : 0.24);
      dop += (to - dop) * (into ? 0.2 : 0.12);
      halo.current!.style.transform = `translate3d(${hx}px, ${hy}px, 0)`;
      const d = dot.current!;
      d.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${ds})`;
      d.style.opacity = String(dop);
      d.style.filter = ds > 1.05 ? `blur(${(ds - 1) * 2.5}px)` : '';
      if (btn) {
        const r = btn.getBoundingClientRect();
        btn.style.setProperty('--mx', `${x - r.left}px`);
        btn.style.setProperty('--my', `${y - r.top}px`);
        if (btn.matches('.btn, button')) {
          const p = Math.min(4, r.height / 6);
          btn.style.translate = `${((x - r.left) / r.width - 0.5) * p}px ${((y - r.top) / r.height - 0.5) * p}px`;
        }
      }
      raf = Math.abs(x - hx) + Math.abs(y - hy) + Math.abs(ts - ds) * 8 + Math.abs(to - dop) * 8 > 0.04
        ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => { raf ||= requestAnimationFrame(tick); };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      x = e.clientX;
      y = e.clientY;
      if (!root.classList.contains('cursor-on')) { hx = x; hy = y; root.classList.add('cursor-on'); }
      kick();
    };
    const over = (e: PointerEvent) => {
      const el = e.target as Element;
      const b = el.closest?.<HTMLElement>(magnetic) ?? null;
      if (b !== btn) {
        release();
        if (b) { btn = b; b.classList.add('magnet'); root.classList.add('cursor-magnet'); }
      }
      root.classList.toggle('cursor-hover', !b && !!el.closest?.(interactive));
      kick();
    };
    const leave = () => { release(); root.classList.remove('cursor-on', 'cursor-hover'); kick(); };
    addEventListener('pointermove', move, { passive: true });
    addEventListener('pointerover', over, { passive: true });
    root.addEventListener('mouseleave', leave);
    return () => {
      removeEventListener('pointermove', move);
      removeEventListener('pointerover', over);
      root.removeEventListener('mouseleave', leave);
      cancelAnimationFrame(raf);
      release();
      root.classList.remove('cursor-on', 'cursor-hover');
    };
  }, []);
  return <><div ref={halo} className="cursor-halo" aria-hidden="true" /><div ref={dot} className="cursor-dot" aria-hidden="true" /></>;
}
