import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext.jsx';

export default function Section({ id, eyebrow, title, lead, children }) {
  const ref = useRef(null);
  const { markVisited } = useApp();
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) { markVisited(id); return undefined; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) markVisited(id); });
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, [id, markVisited]);
  return (
    <section id={id} ref={ref} className="sec" aria-labelledby={`${id}-title`} data-section={id}>
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.5 }}>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h2 id={`${id}-title`}>{title}</h2>
        {lead && <p className="lead">{lead}</p>}
        <div style={{ marginTop: 18 }}>{children}</div>
      </motion.div>
    </section>
  );
}
