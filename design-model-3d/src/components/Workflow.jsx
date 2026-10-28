import React, { useState } from 'react';
import { ArrowRight, Repeat } from 'lucide-react';
import { motion } from 'framer-motion';
import Section from './Section.jsx';
import { WORKFLOW } from '../data/content.js';

export default function Workflow() {
  const [sel, setSel] = useState('req');
  const cur = WORKFLOW.find((w) => w.id === sel);
  return (
    <Section id="workflow" eyebrow="Section 6" title="Design Model Workflow"
      lead="This is a common way to organize design work. Click each stage to see its input, activity, output, and restaurant example.">
      <div className="wf-stage">
        <div className="wf-row" role="tablist" aria-label="Design workflow stages">
          {WORKFLOW.map((w, i) => (
            <React.Fragment key={w.id}>
              <button role="tab" aria-selected={sel === w.id} className={`glass wf-card ${sel === w.id ? 'sel' : ''}`} onClick={() => setSel(w.id)}>
                <div className="n">Stage {i + 1}</div><b>{w.name}</b>
              </button>
              {i < WORKFLOW.length - 1 && <ArrowRight className="wf-arrow" aria-hidden />}
            </React.Fragment>
          ))}
        </div>
        <div className="loop-note"><Repeat size={18} /> Iterative: teams may go back to earlier stages at any time.</div>
      </div>
      <motion.div key={cur.id} className="wf-detail" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} aria-live="polite">
        <div className="glass"><h4>Input</h4>{cur.input}</div>
        <div className="glass"><h4>Main activity</h4>{cur.activity}</div>
        <div className="glass"><h4>Output</h4>{cur.output}</div>
        <div className="glass"><h4>Restaurant example</h4>{cur.example}</div>
      </motion.div>
      <p className="note"><b>Important:</b> Real software design is iterative. Developers may revisit earlier design decisions when they discover new requirements or technical problems. The stages are not one rigid sequence that must always happen in a straight line.</p>
    </Section>
  );
}
