import React, { useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';
import { motion } from 'framer-motion';
import Section from './Section.jsx';
import { SEQUENCE_PARTICIPANTS as P, SEQUENCE_MESSAGES as M } from '../data/content.js';
import { useApp } from '../context/AppContext.jsx';

const W = 880, TOP = 70, GAP = 58, X = [110, 330, 560, 780];

export default function Sequence() {
  const { reduced } = useApp();
  const [shown, setShown] = useState(0); // number of messages displayed
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return undefined;
    if (shown >= M.length) { setPlaying(false); return undefined; }
    const t = setTimeout(() => setShown((s) => s + 1), reduced ? 900 : 1700);
    return () => clearTimeout(t);
  }, [playing, shown, reduced]);

  const next = () => { setPlaying(false); setShown((s) => Math.min(M.length, s + 1)); };
  const restart = () => { setPlaying(false); setShown(0); };
  const play = () => { if (shown >= M.length) setShown(0); setPlaying(true); setShown((s) => (s >= M.length ? 1 : Math.max(1, s))); };
  const cur = shown > 0 ? M[shown - 1] : null;
  const H = TOP + M.length * GAP + 30;

  return (
    <Section id="sequence" eyebrow="Section 7" title="Interactive Sequence Diagram: Placing an Order"
      lead="A sequence diagram shows messages between parts of a system in time order, from top to bottom.">
      <div className="glass pad">
        <svg viewBox={`0 0 ${W} ${H}`} className="svg-box" role="img" aria-label="Sequence diagram for placing a restaurant order">
          <defs><marker id="arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#22d3ee" /></marker></defs>
          {P.map((name, i) => (
            <g key={name}>
              <rect x={X[i] - 80} y="10" width="160" height="34" rx="10" fill="#1b2766" stroke="#8b5cf6" />
              <text x={X[i]} y="32" textAnchor="middle" className="svg-text" style={{ fontWeight: 700 }}>{name}</text>
              <line x1={X[i]} y1="44" x2={X[i]} y2={H - 10} stroke="#4a5aa8" strokeDasharray="5 5" />
            </g>
          ))}
          {M.map((m, i) => {
            const y = TOP + i * GAP;
            const visible = i < shown;
            const active = i === shown - 1;
            const self = m.from === m.to;
            const x1 = X[m.from], x2 = X[m.to];
            return (
              <motion.g key={m.label} initial={false} animate={{ opacity: visible ? 1 : 0.1 }} transition={{ duration: reduced ? 0 : 0.4 }}>
                {self ? (
                  <>
                    <path d={`M${x1} ${y - 10} h36 v22 h-34`} fill="none" stroke={active ? '#fb923c' : '#22d3ee'} strokeWidth="2" markerEnd="url(#arrow)" />
                    <text x={x1 + 44} y={y + 6} className="svg-text" style={{ fill: active ? '#fb923c' : undefined }}>{m.label}</text>
                  </>
                ) : (
                  <>
                    <motion.line x1={x1} y1={y} x2={visible ? x2 + (x2 > x1 ? -6 : 6) : x1} y2={y} stroke={active ? '#fb923c' : '#22d3ee'} strokeWidth="2.4" markerEnd={visible ? 'url(#arrow)' : undefined}
                      initial={false} animate={{ x2: visible ? x2 + (x2 > x1 ? -6 : 6) : x1 }} transition={{ duration: reduced ? 0 : 0.6 }} />
                    <text x={(x1 + x2) / 2} y={y - 8} textAnchor="middle" className="svg-text" style={{ fill: active ? '#fb923c' : undefined }}>{m.label}</text>
                  </>
                )}
              </motion.g>
            );
          })}
        </svg>
        <div className="seq-controls">
          {!playing ? <button className="btn primary" onClick={play}><Play size={16} /> Play</button> : <button className="btn primary" onClick={() => setPlaying(false)}><Pause size={16} /> Pause</button>}
          <button className="btn" onClick={next} disabled={shown >= M.length}><SkipForward size={16} /> Next Step</button>
          <button className="btn" onClick={restart}><RotateCcw size={16} /> Restart</button>
          <span style={{ alignSelf: 'center', color: 'var(--muted)' }}>Message {shown} of {M.length}</span>
        </div>
        <div className="glass seq-msg glow-cyan" aria-live="polite">
          {cur ? (<><b style={{ color: 'var(--orange)' }}>{cur.label}</b><p style={{ marginBottom: 0 }}>{cur.text}</p></>) : <p style={{ margin: 0 }}>Press Play or Next Step to start the first message.</p>}
        </div>
      </div>
      <p className="note"><b>Example only:</b> This is one example implementation. The exact communication architecture depends on how the application is designed.</p>
    </Section>
  );
}
