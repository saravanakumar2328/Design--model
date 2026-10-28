import React, { useEffect, useState } from 'react';
import { Layers, Menu, X, Presentation } from 'lucide-react';
import { NAV } from '../data/content.js';
import { useApp } from '../context/AppContext.jsx';

function Toggle({ label, on, onClick }) {
  return (
    <button className="toggle" aria-pressed={on} onClick={onClick}>
      <span>{label}</span><span className="switch" />
    </button>
  );
}

export default function Sidebar() {
  const { visited, setSeminar, reduced, setReduced, webgl, setWebgl } = useApp();
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-40% 0px -50% 0px' });
    NAV.forEach((n) => { const el = document.getElementById(n.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    setOpen(false);
  };
  const pct = Math.round((NAV.filter((n) => visited.has(n.id)).length / NAV.length) * 100);

  return (
    <>
      <button className="menu-btn" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)}>
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      <div className={`scrim ${open ? 'show' : ''}`} onClick={() => setOpen(false)} />
      <aside className={`sidebar ${open ? 'open' : ''}`} aria-label="Main navigation">
        <div className="brand">
          <div className="brand-logo"><Layers size={20} /></div>
          <div>Design Model<small>3D Learning Lab</small></div>
        </div>
        <nav className="nav">
          {NAV.map((n) => (
            <button key={n.id} className={active === n.id ? 'active' : ''} aria-current={active === n.id ? 'true' : undefined} onClick={() => go(n.id)}>
              <span className={`dot ${visited.has(n.id) ? 'seen' : ''}`} />{n.label}
            </button>
          ))}
          <button className="nav-seminar" onClick={() => { setSeminar(true); setOpen(false); }}>
            <Presentation size={16} /> Seminar Mode
          </button>
        </nav>
        <div className="side-foot">
          <div className="progress-wrap">
            Explored: {pct}%
            <div className="progress" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Exploration progress"><span style={{ width: `${pct}%` }} /></div>
          </div>
          <Toggle label="Reduce motion" on={reduced} onClick={() => setReduced(!reduced)} />
          <Toggle label="3D graphics" on={webgl} onClick={() => setWebgl(!webgl)} />
        </div>
      </aside>
    </>
  );
}
