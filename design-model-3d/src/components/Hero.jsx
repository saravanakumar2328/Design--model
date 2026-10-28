import React from 'react';
import { BookOpen, Boxes, Rocket } from 'lucide-react';
import Hero3D from './Hero3D.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function Hero() {
  const { markVisited, reduced } = useApp();
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  React.useEffect(() => { markVisited('home'); }, [markVisited]);
  return (
    <section id="home" className="sec hero" aria-labelledby="home-title">
      <div>
        <div className="eyebrow">MCA · Software Engineering</div>
        <h1 id="home-title">Software Engineering Design Model</h1>
        <p className="sub">From Requirements to a Complete Software Design</p>
        <p className="lead">Learn how software engineers transform requirements into a structured software design using real-world examples and interactive 3D visualizations.</p>
        <div className="hero-actions">
          <button className="btn primary" onClick={() => go('introduction')}><BookOpen size={18} /> Explore Design Model</button>
          <button className="btn cyan" onClick={() => document.querySelector('.hero-canvas')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' })}><Boxes size={18} /> Explore 3D Architecture</button>
          <button className="btn accent" onClick={() => go('process')}><Rocket size={18} /> Start Learning</button>
        </div>
      </div>
      <Hero3D />
    </section>
  );
}
