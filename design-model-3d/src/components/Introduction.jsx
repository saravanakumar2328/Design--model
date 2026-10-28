import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Section from './Section.jsx';
import { DESIGN_COMPONENTS, WHY_IMPORTANT } from '../data/content.js';
import { useApp } from '../context/AppContext.jsx';

export default function Introduction() {
  const [built, setBuilt] = useState(false);
  const [sel, setSel] = useState(null);
  const { reduced } = useApp();
  const comp = DESIGN_COMPONENTS.find((c) => c.id === sel);
  return (
    <Section id="introduction" eyebrow="Section 1" title="What Is a Design Model?">
      <div className="glass def-box">
        A Design Model is a representation of how a software system will be organized and implemented before the actual coding begins.
      </div>
      <h3 style={{ marginTop: 20 }}>Why is it important?</h3>
      <ul className="why-list">
        {WHY_IMPORTANT.map((w) => <li key={w}><CheckCircle2 size={18} color="#4ade80" style={{ flex: 'none', marginTop: 4 }} />{w}</li>)}
      </ul>

      <h3 style={{ marginTop: 28 }}>Requirements become a Design</h3>
      <p className="lead">Press the button to see one requirement turn into design components. Then click a component.</p>
      <div className="transform">
        <div className="glass req-card">
          <div className="eyebrow" style={{ color: 'var(--orange)' }}>Software Requirement</div>
          <q>Customers must be able to order food using a mobile application.</q>
          <button className="btn accent" style={{ marginTop: 14, alignSelf: 'flex-start' }} onClick={() => { setBuilt(!built); setSel(null); }}>
            {built ? 'Reset' : 'Transform into Design'}
          </button>
        </div>
        <div className="arrow-mid"><ArrowRight size={36} /></div>
        <div className="glass pad">
          <div className="eyebrow">Software Design</div>
          <div className="design-list" style={{ marginTop: 8 }}>
            {DESIGN_COMPONENTS.map((c, i) => (
              <motion.button
                key={c.id}
                className={`design-chip ${sel === c.id ? 'sel' : ''}`}
                initial={false}
                animate={built ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0.18, y: reduced ? 0 : 14, scale: 0.95 }}
                transition={{ delay: reduced ? 0 : i * 0.12 }}
                disabled={!built}
                onClick={() => setSel(c.id)}
                aria-pressed={sel === c.id}
              >
                <b>{c.name}</b>
              </motion.button>
            ))}
          </div>
          {comp && <div className="note" style={{ borderStyle: 'solid', borderColor: 'var(--cyan)' }} aria-live="polite"><b style={{ color: 'var(--cyan)' }}>{comp.name}:</b> {comp.text}</div>}
          {!built && <p className="note">Design components appear after you press “Transform into Design”.</p>}
        </div>
      </div>
    </Section>
  );
}
