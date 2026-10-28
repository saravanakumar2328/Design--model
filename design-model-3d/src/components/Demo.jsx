import React, { useEffect, useMemo, useState } from 'react';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCcw, Sparkles } from 'lucide-react';
import Section from './Section.jsx';
import SafeCanvas, { Lights } from './SafeCanvas.jsx';
import { Phone, Database, Screen, Wire, Packet } from './Shapes.jsx';
import { MENU, DEMO_STEPS, DEMO_EXPLAIN } from '../data/content.js';
import { useApp } from '../context/AppContext.jsx';

const DP = { phone: [-3.4, 0.2, 0], db: [0, 0.2, 0], tv: [3.4, 0.2, 0] };

function DemoScene({ step, hi }) {
  const all = hi === 'all';
  return (
    <>
      <Lights />
      <Wire from={DP.phone} to={DP.db} active={step >= 2} />
      <Wire from={DP.db} to={DP.tv} color="#fb923c" active={step >= 4} />
      <Packet path={[DP.phone, DP.db]} run={step >= 2} loop={false} speed={0.5} size={0.16} />
      <Packet path={[DP.db, DP.tv]} run={step >= 4} loop={false} speed={0.5} color="#22d3ee" size={0.16} />
      <Phone position={DP.phone} label="Customer Phone" selected={all || hi === 'phone'} scale={0.9} />
      <Database position={DP.db} label="Cloud Database" glow={step === 3 || step === 2} selected={all || hi === 'database'} />
      <Screen position={DP.tv} label="Kitchen TV" glow={step >= 4} selected={all || hi === 'tv'} scale={0.8} />
      <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={1.2} maxPolarAngle={1.8} />
    </>
  );
}

export default function Demo() {
  const { reduced } = useApp();
  const [qty, setQty] = useState({ dosa: 0, biriyani: 0 });
  const [step, setStep] = useState(0);
  const [explain, setExplain] = useState(false);
  const [exIdx, setExIdx] = useState(0);

  const items = useMemo(() => MENU.filter((m) => qty[m.id] > 0).map((m) => ({ ...m, qty: qty[m.id], line: m.price * qty[m.id] })), [qty]);
  const total = items.reduce((s, i) => s + i.line, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);
  const change = (id, d) => setQty((q) => ({ ...q, [id]: Math.max(0, Math.min(9, q[id] + d)) }));
  const canNext = step === 0 ? count > 0 : step < 5;
  const go = (s) => { setStep(s); if (s < 5) setExplain(false); };

  useEffect(() => {
    if (!explain || reduced) return undefined;
    const t = setInterval(() => setExIdx((i) => (i + 1) % DEMO_EXPLAIN.length), 3000);
    return () => clearInterval(t);
  }, [explain, reduced]);

  const hi = step === 5 && explain ? DEMO_EXPLAIN[exIdx].part : null;
  const reset = () => { setQty({ dosa: 0, biriyani: 0 }); setStep(0); setExplain(false); setExIdx(0); };
  const sample = () => { setQty({ dosa: 1, biriyani: 2 }); setStep(0); };

  const orderJson = `Table Number: Table 16\nItems:\n${items.map((i) => `  - ${i.name} — Quantity ${i.qty}`).join('\n')}\nTotal: ₹${total}\nStatus: Placed`;

  return (
    <Section id="project" eyebrow="Section 5" title="Real-Time Project Demonstration"
      lead="Follow one order in a Restaurant Food Ordering System (inspired by the SmartDine idea) from the phone to the kitchen.">
      <div className="demo-steps" role="tablist" aria-label="Demo steps">
        {DEMO_STEPS.map((s, i) => (
          <button key={s.title} role="tab" aria-selected={step === i} className={`${step === i ? 'sel' : ''} ${i < step ? 'done' : ''}`} onClick={() => (i === 0 || count > 0) && go(i)} disabled={i > 0 && count === 0}>
            {i + 1}. {s.title}
          </button>
        ))}
      </div>

      <div className="demo-grid">
        <div className="phone-col">
          <div className="phone" aria-label="Customer phone">
            <div className="phone-notch" />
            <div className="phone-screen">
              {step === 0 && (<>
                <b>Food Menu · Table 16</b>
                {MENU.map((m) => (
                  <div className="food-row" key={m.id}>
                    <span>{m.name}<br /><span className="price">₹{m.price}</span></span>
                    <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      <button className="mini-btn" onClick={() => change(m.id, -1)} aria-label={`Decrease ${m.name}`}>−</button>
                      <b aria-live="polite">{qty[m.id]}</b>
                      <button className="mini-btn" onClick={() => change(m.id, 1)} aria-label={`Increase ${m.name}`}>+</button>
                    </span>
                  </div>
                ))}
                <button className="mini-btn go" disabled={count === 0} onClick={() => go(1)}>Go to Cart ({count})</button>
              </>)}
              {step === 1 && (<>
                <b>Your Cart</b>
                {items.map((i) => <div className="food-row" key={i.id}><span>{i.name} × {i.qty}</span><span className="price">₹{i.line}</span></div>)}
                <div className="total-row"><span>Total</span><span>₹{total}</span></div>
                <button className="mini-btn go" onClick={() => go(2)}>Place Order</button>
                <button className="mini-btn" onClick={() => go(0)}>Change items</button>
              </>)}
              {step >= 2 && (<>
                <b>Order Status</b>
                <div className="status-steps"><span className="on">Placed</span><span className={step >= 4 ? 'on' : ''}>Sent to kitchen</span><span>Preparing</span></div>
                <p style={{ color: 'var(--muted)' }}>{step === 2 ? 'Sending your order to the cloud…' : 'Your order for Table 16 is placed.'}</p>
              </>)}
            </div>
          </div>
        </div>

        <div>
          <SafeCanvas className="demo-canvas" camera={{ position: [0, 1, 9.5], fov: 48 }} hint="Drag to rotate" label="3D order flow from phone to database to kitchen TV"
            fallback={<div className="fallback"><p>3D is off. Order flow:</p><div className="fb-flow"><span className="fb-node">Customer Phone</span><span>→</span><span className={`fb-node ${step >= 2 ? 'sel' : ''}`}>Cloud Database</span><span>→</span><span className={`fb-node ${step >= 4 ? 'sel' : ''}`}>Kitchen TV</span></div></div>}>
            <DemoScene step={step} hi={hi} />
          </SafeCanvas>
          <div className="glass pad" style={{ marginTop: 12 }} aria-live="polite">
            <h3 style={{ color: 'var(--orange)' }}>Step {step + 1}: {DEMO_STEPS[step].title}</h3>
            <p style={{ marginBottom: 0 }}>{DEMO_STEPS[step].text}</p>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
            <button className="btn" disabled={step === 0} onClick={() => go(step - 1)}><ChevronLeft size={16} /> Back</button>
            <button className="btn primary" disabled={!canNext} onClick={() => go(step + 1)}>{step === 1 ? 'Place Order' : 'Next'} <ChevronRight size={16} /></button>
            <button className="btn" onClick={sample}>Use sample order</button>
            <button className="btn" onClick={reset}><RotateCcw size={16} /> Reset</button>
          </div>
          {step === 0 && count === 0 && <p className="note">Choose some food first. Tip: Plain Dosa × 1 and Dindigul Biriyani × 2, or press “Use sample order”.</p>}
        </div>

        <div className="glass pad" aria-live="polite">
          {step <= 1 && (<>
            <h3>Cart calculation</h3>
            {items.length === 0 ? <p style={{ color: 'var(--muted)' }}>No items yet.</p> : items.map((i) => <div key={i.id}>{i.name} × {i.qty} = ₹{i.line}</div>)}
            <div className="total-row"><span>Total</span><span>₹{total}</span></div>
          </>)}
          {(step === 2 || step === 3) && (<>
            <h3>{step === 2 ? 'Order in transit' : 'Order stored in database'}</h3>
            <div className="json-box">{orderJson}</div>
            <p style={{ marginTop: 10 }}>{step === 3 ? 'The database stores the order information so every connected app can read it.' : 'The order data is travelling from the mobile app to the cloud.'}</p>
          </>)}
          {step === 4 && (<>
            <h3>Kitchen display</h3>
            <div className="ticket"><b>Table 16</b>{items.map((i) => <div key={i.id}>{i.name} × {i.qty}</div>)}</div>
          </>)}
          {step === 5 && (<>
            <div className="ticket" style={{ marginTop: 0 }}><b>Table 16</b>{items.map((i) => <div key={i.id}>{i.name} × {i.qty}</div>)}</div>
            <button className="btn accent" style={{ marginTop: 12 }} onClick={() => { setExplain(true); setExIdx(0); }}><Sparkles size={16} /> Show Design Explanation</button>
            <div className="explain-list">
              {DEMO_EXPLAIN.map((e, i) => (
                <motion.button key={e.id} className={`explain-item ${explain && exIdx === i ? 'sel' : ''}`} onClick={() => { setExplain(true); setExIdx(i); }}
                  animate={explain && exIdx === i && !reduced ? { scale: 1.02 } : { scale: 1 }}>
                  <b>{e.name}</b><br /><span style={{ color: 'var(--muted)' }}>{explain && exIdx === i ? e.text : 'Click to see its role'}</span>
                </motion.button>
              ))}
            </div>
          </>)}
        </div>
      </div>
    </Section>
  );
}
