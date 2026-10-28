import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, X } from 'lucide-react';
import SafeCanvas, { Lights } from './SafeCanvas.jsx';
import { Spin, Float } from './Shapes.jsx';
import { SEMINAR_SLIDES } from '../data/content.js';
import { useApp } from '../context/AppContext.jsx';

function Backdrop() {
  return (
    <>
      <Lights />
      <Float position={[4.8, 0.6, -3]} amp={0.25}>
        <Spin speed={0.15}>
          <mesh><icosahedronGeometry args={[1.5, 1]} /><meshStandardMaterial color="#8b5cf6" wireframe /></mesh>
          <mesh><torusGeometry args={[2.1, 0.02, 8, 64]} /><meshBasicMaterial color="#22d3ee" /></mesh>
        </Spin>
      </Float>
    </>
  );
}

export default function Seminar() {
  const { seminar, setSeminar, webgl } = useApp();
  const [idx, setIdx] = useState(0);
  const [full, setFull] = useState(false);
  const root = useRef(null);
  const last = SEMINAR_SLIDES.length - 1;

  const next = useCallback(() => setIdx((i) => Math.min(last, i + 1)), [last]);
  const prev = useCallback(() => setIdx((i) => Math.max(0, i - 1)), []);

  const exit = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
    setSeminar(false);
  }, [setSeminar]);

  const toggleFull = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await root.current?.requestFullscreen?.();
    } catch { /* fullscreen not allowed; presentation still works */ }
  };

  useEffect(() => {
    if (!seminar) return undefined;
    setIdx(0);
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') next();
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') prev();
      else if (e.key === 'Escape' && !document.fullscreenElement) exit();
    };
    const onFs = () => setFull(!!document.fullscreenElement);
    window.addEventListener('keydown', onKey);
    document.addEventListener('fullscreenchange', onFs);
    root.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('fullscreenchange', onFs);
      document.body.style.overflow = '';
    };
  }, [seminar, next, prev, exit]);

  if (!seminar) return null;
  const s = SEMINAR_SLIDES[idx];
  return (
    <div className="seminar" ref={root} tabIndex={-1} role="dialog" aria-modal="true" aria-label="Seminar presentation mode">
      {webgl && <div className="bg3d" aria-hidden><SafeCanvas className="bg3d-box" fallback={null} camera={{ position: [0, 0, 7], fov: 45 }}><Backdrop /></SafeCanvas></div>}
      <div className="sem-top">
        <b style={{ color: 'var(--orange)' }}>Seminar Mode · {idx + 1} / {SEMINAR_SLIDES.length}</b>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button className="btn" onClick={toggleFull}>{full ? <Minimize2 size={16} /> : <Maximize2 size={16} />} {full ? 'Exit Full Screen' : 'Full Screen'}</button>
          <button className="btn accent" onClick={exit}><X size={16} /> Exit</button>
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={idx} className="sem-body" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.25 }}>
          <div className="eyebrow">Software Engineering Design Model</div>
          <h2>{s.title}</h2>
          <p className="def">{s.body}</p>
          <p className="ex"><b>Example:</b> {s.example}</p>
        </motion.div>
      </AnimatePresence>
      <div className="sem-bottom">
        <button className="btn" onClick={prev} disabled={idx === 0}><ChevronLeft size={18} /> Previous</button>
        <div className="sem-dots" aria-hidden>{SEMINAR_SLIDES.map((_, i) => <i key={i} className={i === idx ? 'on' : ''} />)}</div>
        <button className="btn primary" onClick={next} disabled={idx === last}>Next <ChevronRight size={18} /></button>
      </div>
    </div>
  );
}
