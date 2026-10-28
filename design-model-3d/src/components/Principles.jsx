import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Section from './Section.jsx';
import Tilt from './Tilt.jsx';
import { PRINCIPLES } from '../data/content.js';
import { useApp } from '../context/AppContext.jsx';

const C = { cyan: '#22d3ee', purple: '#8b5cf6', orange: '#fb923c', green: '#4ade80', line: '#5b6bb5', red: '#f87171' };

function Pulse({ children, delay = 0, dur = 2, from = 0.35 }) {
  const { reduced } = useApp();
  return (
    <motion.g animate={reduced ? { opacity: 1 } : { opacity: [from, 1, from] }} transition={{ repeat: Infinity, duration: dur, delay }}>
      {children}
    </motion.g>
  );
}

const R = (p) => <rect rx="6" fill="rgba(255,255,255,0.08)" stroke={C.line} {...p} />;
const T = (p) => <text fill="#dfe6ff" fontSize="9" textAnchor="middle" fontFamily="system-ui" {...p} />;

function Viz({ type }) {
  const { reduced } = useApp();
  const spin = reduced ? {} : { animate: { rotate: 360 }, transition: { repeat: Infinity, duration: 4, ease: 'linear' } };
  let body;
  switch (type) {
    case 'options':
      body = (<>
        {R({ x: 10, y: 26, width: 40, height: 22 })}{T({ x: 30, y: 40, children: 'Order' })}
        {R({ x: 150, y: 26, width: 40, height: 22 })}{T({ x: 170, y: 40, children: 'Kitchen' })}
        <Pulse delay={0}><path d="M50 32 Q100 2 150 32" fill="none" stroke={C.cyan} strokeWidth="2" /></Pulse>
        <Pulse delay={0.7}><path d="M50 37 L150 37" fill="none" stroke={C.purple} strokeWidth="2" /></Pulse>
        <Pulse delay={1.4}><path d="M50 42 Q100 72 150 42" fill="none" stroke={C.orange} strokeWidth="2" /></Pulse>
      </>); break;
    case 'trace':
      body = (<>
        {R({ x: 10, y: 24, width: 62, height: 26 })}{T({ x: 41, y: 40, children: 'Requirement' })}
        {R({ x: 128, y: 24, width: 62, height: 26 })}{T({ x: 159, y: 40, children: 'Cart' })}
        <Pulse><path d="M72 37 L128 37" stroke={C.green} strokeWidth="2" strokeDasharray="4 3" /></Pulse>
      </>); break;
    case 'reuse':
      body = [0, 1, 2].map((i) => <Pulse key={i} delay={i * 0.4}><g>{R({ x: 14 + i * 62, y: 14, width: 52, height: 46, stroke: C.cyan })}{T({ x: 40 + i * 62, y: 34, children: 'Menu' })}{T({ x: 40 + i * 62, y: 48, children: 'Card' })}</g></Pulse>);
      break;
    case 'tables':
      body = [0, 1, 2, 3].map((i) => <Pulse key={i} delay={i * 0.5}><g>{R({ x: 14 + i * 46, y: 16, width: 38, height: 40, stroke: C.orange })}{T({ x: 33 + i * 46, y: 40, children: `T${i + 14}` })}</g></Pulse>);
      break;
    case 'consistent':
      body = [0, 1, 2].map((i) => (<g key={i}>{R({ x: 14 + i * 62, y: 10, width: 52, height: 54 })}<rect x={20 + i * 62} y="16" width="40" height="18" rx="4" fill={C.line} />{T({ x: 40 + i * 62, y: 46, children: '₹ 00' })}<Pulse delay={i * 0.3}><rect x={24 + i * 62} y="50" width="32" height="9" rx="4" fill={C.cyan} /></Pulse></g>));
      break;
    case 'change':
      body = (<>
        {[0, 1, 2].map((i) => <g key={i}>{R({ x: 14 + i * 46, y: 22, width: 38, height: 30 })}</g>)}
        <motion.g animate={reduced ? {} : { x: [30, 0, 0, 30], opacity: [0, 1, 1, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
          <rect x="152" y="22" width="38" height="30" rx="6" fill="rgba(251,146,60,0.25)" stroke={C.orange} />{T({ x: 171, y: 41, children: 'NEW' })}
        </motion.g>
      </>); break;
    case 'degrade':
      body = (<>
        {R({ x: 14, y: 12, width: 60, height: 50, stroke: C.red })}
        <Pulse><path d="M30 24 L58 50 M58 24 L30 50" stroke={C.red} strokeWidth="3" /></Pulse>
        {R({ x: 110, y: 12, width: 76, height: 50, stroke: C.green })}
        <rect x="116" y="18" width="30" height="22" rx="4" fill={C.line} />{T({ x: 131, y: 33, children: 'IMG' })}
        {T({ x: 160, y: 30, children: 'Dosa' })}{T({ x: 160, y: 44, children: '₹60' })}
        <path d="M78 37 L106 37" stroke={C.cyan} strokeWidth="2" markerEnd="url(#a)" />
      </>); break;
    case 'assess':
      body = [0, 1, 2, 3].map((i) => <Pulse key={i} delay={i * 0.5}><g><circle cx={30 + i * 46} cy="37" r="14" fill="none" stroke={C.green} strokeWidth="2" /><path d={`M${23 + i * 46} 37 l5 5 l10 -11`} stroke={C.green} strokeWidth="2.5" fill="none" /></g></Pulse>);
      break;
    case 'review':
      body = (<>
        {R({ x: 14, y: 14, width: 120, height: 46 })}
        {T({ x: 74, y: 34, children: '60 + 2×180' })}{T({ x: 74, y: 50, children: '= 420' })}
        <motion.g {...spin} style={{ originX: '160px', originY: '37px' }}><circle cx="160" cy="30" r="11" fill="none" stroke={C.cyan} strokeWidth="3" /><path d="M168 38 l10 10" stroke={C.cyan} strokeWidth="4" /></motion.g>
      </>); break;
    default:
      body = ['Login', 'Menu', 'Order', 'Bill'].map((n, i) => <Pulse key={n} delay={i * 0.4}><g>{R({ x: 8 + i * 48, y: 18, width: 42, height: 36, stroke: [C.cyan, C.purple, C.orange, C.green][i] })}{T({ x: 29 + i * 48, y: 40, children: n })}</g></Pulse>);
  }
  return (
    <svg viewBox="0 0 200 74" width="100%" height="100%" role="img" aria-label={`Animation for ${type}`} preserveAspectRatio="xMidYMid meet">
      <defs><marker id="a" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill={C.cyan} /></marker></defs>
      {body}
    </svg>
  );
}

function Modal({ p, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current?.focus();
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <motion.div className="modal-back" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="glass modal glow-cyan" role="dialog" aria-modal="true" aria-label={p.name}
        initial={{ scale: 0.7, rotateX: 25, opacity: 0 }} animate={{ scale: 1, rotateX: 0, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 22 }} onClick={(e) => e.stopPropagation()}>
        <button ref={ref} className="close-btn" onClick={onClose} aria-label="Close"><X size={18} /></button>
        <div className="p-num">PRINCIPLE {p.id} OF 10</div>
        <h3 style={{ fontSize: '1.5rem' }}>{p.name}</h3>
        <div className="viz big"><Viz type={p.viz} /></div>
        <dl className="kv">
          <dt>Definition</dt><dd>{p.definition}</dd>
          <dt>Why it matters</dt><dd>{p.why}</dd>
          <dt>Restaurant example</dt><dd>{p.example}</dd>
        </dl>
      </motion.div>
    </motion.div>
  );
}

export default function Principles() {
  const [open, setOpen] = useState(null);
  const p = PRINCIPLES.find((x) => x.id === open);
  return (
    <Section id="principles" eyebrow="Section 3" title="Ten Principles of Software Design"
      lead="Good designs follow guiding principles. Click any card to bring it forward and read the full explanation.">
      <div className="p-grid">
        {PRINCIPLES.map((x) => (
          <Tilt key={x.id} as="div" role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(x.id); } }} max={14} className="glass p-card" onClick={() => setOpen(x.id)} aria-label={`Open principle ${x.id}: ${x.name}`}>
            <div className="p-num">PRINCIPLE {x.id}</div>
            <h3>{x.name}</h3>
            <div className="viz"><Viz type={x.viz} /></div>
            <p style={{ color: 'var(--muted)', fontSize: '0.88rem', margin: 0 }}>{x.definition}</p>
          </Tilt>
        ))}
      </div>
      <AnimatePresence>{p && <Modal key={p.id} p={p} onClose={() => setOpen(null)} />}</AnimatePresence>
    </Section>
  );
}
