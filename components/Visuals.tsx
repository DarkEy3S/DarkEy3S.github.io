import type { LocalizedProject } from '@/content';
import type { Dict } from '@/content/types';
import s from './visuals.module.css';

export function Diagram({ d }: { d: Dict['diagram'] }) {
  const node = ([title, text]: [string, string], accent = false) => (
    <div className={accent ? `${s.node} ${s.accent}` : s.node}><strong>{title}</strong><span className="mono">{text}</span></div>
  );
  return (
    <figure className={s.diagram}>
      <figcaption className="mono">{d.label}</figcaption>
      <div className={s.flow}>
        {node(d.admin, true)}
        <div className={s.edge}><span><b aria-hidden="true">→</b>{d.toOneC}</span><span><b aria-hidden="true">←</b>{d.fromOneC}</span></div>
        {node(d.oneC)}
        <div className={s.edge}><span><b aria-hidden="true">→</b>{d.toStore}</span></div>
        {node(d.store)}
      </div>
    </figure>
  );
}

const priority = [s.high, s.high, s.mid, s.low];

export function AdminMockup({ m, alt }: { m: Dict['mockup']; alt: string }) {
  return (
    <div role="img" aria-label={alt} className={s.mock}>
      <div aria-hidden="true" className={s.window}>
        <div className={s.top}><i /><i /><i /><span className="mono">{m.title}</span><em className="mono">{m.demo}</em></div>
        <div className={s.body}>
          <div className={s.side}>{[0, 1, 2, 3, 4].map((i) => <span key={i} className={i === 1 ? s.on : undefined} />)}</div>
          <div className={s.main}>
            <div className={s.search}>{m.search}</div>
            <div className={s.table}>
              <div className={`${s.row} ${s.head}`}>{m.cols.map((c) => <span key={c}>{c}</span>)}</div>
              {m.rows.map(([name, prio, stage], i) => (
                <div key={name} className={i === 0 ? `${s.row} ${s.active}` : s.row}>
                  <span>{name}</span><span><b className={priority[i]}>{prio}</b></span><span>{stage}</span>
                </div>
              ))}
            </div>
            <div className={`mono ${s.lock}`}>{m.lock}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TodosMockup({ m, alt }: { m: Dict['pets']['mock']; alt: string }) {
  return (
    <div role="img" aria-label={alt} className={s.mock}>
      <div aria-hidden="true" className={s.window}>
        <div className={s.top}><i /><i /><i /><span className="mono">{m.title}</span><em className="mono">{m.demo}</em></div>
        <div className={s.todos}>
          <div className={s.search}>{m.search}</div>
          {m.items.map(([label, done]) => (
            <div key={label} className={done ? `${s.todo} ${s.done}` : s.todo}><b /><span>{label}</span></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Cover({ p, d }: { p: LocalizedProject; d: Dict }) {
  const { cover } = p;
  if (cover.type === 'mockup') return <AdminMockup m={d.mockup} alt={p.alt} />;
  if (cover.type === 'todos') return <TodosMockup m={d.pets.mock} alt={p.alt} />;
  if (cover.type === 'screenshot') return <img className={s.shot} src={cover.src} alt={p.alt} loading="lazy" />;
  const host = p.link ? new URL(p.link).hostname.replace(/^www\./, '') : p.title;
  return (
    <div role="img" aria-label={p.alt} className={s.thumb} style={{ '--h': cover.hue } as React.CSSProperties}>
      <div aria-hidden="true" className={s.bar}><i /><i /><i /><span className="mono">{host}</span></div>
      <div aria-hidden="true" className={s.art}><strong>{host}</strong><span /><span /><span /></div>
    </div>
  );
}
