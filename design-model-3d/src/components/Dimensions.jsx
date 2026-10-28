import React, { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { motion } from 'framer-motion';
import Section from './Section.jsx';
import Tilt from './Tilt.jsx';
import SafeCanvas, { Lights } from './SafeCanvas.jsx';
import { Phone, Database, Screen, Wire, Packet, Label } from './Shapes.jsx';
import { PROCESS_STAGES, ABSTRACTION_LEVELS } from '../data/content.js';
import { motionStore, useApp } from '../context/AppContext.jsx';

/* ------------------------------ Process ------------------------------ */
export function ProcessDimension() {
  const [sel, setSel] = useState('req');
  const stage = PROCESS_STAGES.find((s) => s.id === sel);
  return (
    <Section id="process" eyebrow="Section 2" title="Dimensions of the Design Model"
      lead="A design can be described in two ways: by the steps used to create it (Process) and by how much detail it shows (Abstraction).">
      <div className="grid2">
        <Tilt className="glass dim-card glow-cyan">
          <div className="chip core">Dimension 1</div>
          <h3>Process Dimension</h3>
          <p>The Process Dimension represents the activities and steps followed to create the software design.</p>
          <p className="lead" style={{ fontSize: '0.95rem' }}>It focuses on HOW the design is developed through different design activities.</p>
        </Tilt>
        <Tilt className="glass dim-card" style={{ borderColor: 'rgba(251,146,60,0.55)' }}>
          <div className="chip extra">Dimension 2</div>
          <h3>Abstraction Dimension</h3>
          <p>The Abstraction Dimension represents the level of detail used to describe a software design.</p>
          <p className="lead" style={{ fontSize: '0.95rem' }}>It focuses on HOW MUCH detail is shown: overall system or individual component.</p>
        </Tilt>
      </div>

      <h3 style={{ marginTop: 28 }}>Process Dimension: design activities</h3>
      <p className="lead">Click a stage to highlight it. Real design is iterative, so teams may go back to earlier stages.</p>
      <div className="flow-row" role="tablist" aria-label="Design process stages">
        {PROCESS_STAGES.map((s, i) => (
          <React.Fragment key={s.id}>
            <button role="tab" aria-selected={sel === s.id} className={`stage-btn ${sel === s.id ? 'sel' : ''}`} onClick={() => setSel(s.id)}>
              {i + 1}. {s.name}
            </button>
            {i < PROCESS_STAGES.length - 1 && <ChevronRight className="stage-arrow" size={18} aria-hidden />}
          </React.Fragment>
        ))}
      </div>
      <motion.div key={stage.id} className="glass pad" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} role="tabpanel">
        <h3 style={{ color: 'var(--orange)' }}>{stage.name}</h3>
        <dl className="kv">
          <dt>Definition</dt><dd>{stage.definition}</dd>
          <dt>Purpose</dt><dd>{stage.purpose}</dd>
          <dt>Restaurant example</dt><dd>{stage.example}</dd>
          <dt>Expected output</dt><dd>{stage.output}</dd>
        </dl>
      </motion.div>
    </Section>
  );
}

/* ---------------------------- Abstraction ---------------------------- */
const CAM = { high: { pos: [0, 0.6, 11], look: [0, 0, 0] }, medium: { pos: [-1.4, 0.2, 5.6], look: [-1.4, 0, 0] }, low: { pos: [-1.4, 0, 4.2], look: [-1.4, 0, 0] } };

function CameraRig({ level }) {
  const { camera } = useThree();
  const look = useRef(new THREE.Vector3(0, 0, 0));
  useFrame((_, d) => {
    const t = CAM[level];
    const k = motionStore.reduced ? 1 : 1 - Math.exp(-d * 3.2);
    camera.position.lerp(new THREE.Vector3(...t.pos), k);
    look.current.lerp(new THREE.Vector3(...t.look), k);
    camera.lookAt(look.current);
  });
  return null;
}

function Layer({ active, children, position = [0, 0, 0] }) {
  const ref = useRef();
  // Inactive layers are unmounted so their HTML labels never overlap the active layer.
  useFrame((_, d) => {
    if (!ref.current) return;
    const k = motionStore.reduced ? 1 : 1 - Math.exp(-d * 5);
    ref.current.scale.setScalar(THREE.MathUtils.lerp(ref.current.scale.x, 1, k));
  });
  if (!active) return null;
  return <group ref={ref} position={position} scale={0.2}>{children}</group>;
}

function Box({ pos, color, text, size = [1.5, 0.8, 0.3] }) {
  return (
    <group position={pos}>
      <mesh>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} emissive={color} emissiveIntensity={0.3} />
      </mesh>
      <Label y={0}>{text}</Label>
    </group>
  );
}

function Person({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.5, 0]}><sphereGeometry args={[0.28, 20, 20]} /><meshStandardMaterial color="#fb923c" emissive="#fb923c" emissiveIntensity={0.3} /></mesh>
      <mesh position={[0, -0.1, 0]}><coneGeometry args={[0.42, 0.9, 20]} /><meshStandardMaterial color="#f59e0b" /></mesh>
      <Label y={-0.85}>Customer</Label>
    </group>
  );
}

function AbstractionScene({ level }) {
  const hi = [[-4.4, 0, 0], [-1.4, 0, 0], [1.6, 0, 0], [4.6, 0, 0]];
  const path = hi;
  return (
    <>
      <Lights />
      <CameraRig level={level} />
      <Layer active={level === 'high'}>
        <Person position={hi[0]} />
        <Phone position={hi[1]} label="Mobile App" />
        <Database position={hi[2]} label="Database" />
        <Screen position={hi[3]} label="Kitchen" scale={0.8} />
        <Wire from={hi[0]} to={hi[1]} /><Wire from={hi[1]} to={hi[2]} color="#8b5cf6" /><Wire from={hi[2]} to={hi[3]} color="#fb923c" />
        <Packet path={path} />
      </Layer>
      <Layer active={level === 'medium'} position={[-1.4, 0, 0]}>
        <Box pos={[-1, 0.7, 0]} color="#0891b2" text="Menu" />
        <Box pos={[1, 0.7, 0]} color="#7c3aed" text="Cart" />
        <Box pos={[-1, -0.7, 0]} color="#d97706" text="Order" />
        <Box pos={[1, -0.7, 0]} color="#059669" text="Login" />
        <Wire from={[-0.25, 0.7, 0]} to={[0.25, 0.7, 0]} /><Wire from={[0, 0.3, 0]} to={[0, -0.3, 0]} />
      </Layer>
      <Layer active={level === 'low'} position={[-1.4, 0, 0]}>
        <Box pos={[0, 1.05, 0]} size={[3.2, 0.5, 0.2]} color="#0891b2" text="Logic: read cart → build order" />
        <Box pos={[0, 0.35, 0]} size={[3.2, 0.5, 0.2]} color="#7c3aed" text="Data: tableNo, items, qty, total" />
        <Box pos={[0, -0.35, 0]} size={[3.2, 0.5, 0.2]} color="#d97706" text="Rules: cart not empty, qty ≥ 1" />
        <Box pos={[0, -1.05, 0]} size={[3.2, 0.5, 0.2]} color="#059669" text="DB: write order, set status" />
      </Layer>
    </>
  );
}

const LOW_DETAILS = {
  'Order-processing logic': ['Read items from the cart', 'Attach the table number', 'Calculate the total', 'Send the order to the database'],
  'Data fields': ['tableNumber', 'items (food, quantity)', 'total', 'status'],
  'Validation rules': ['Cart must not be empty', 'Quantity must be 1 or more', 'Table number must be selected'],
  'Database operations': ['Create the order record', 'Set status to “Placed”', 'Notify listeners (kitchen TV)'],
};
const MEDIUM_MODULES = ['Menu: shows food items', 'Cart: keeps chosen items and total', 'Order: creates and sends the order', 'Login: identifies the customer'];

function LevelFallback({ level }) {
  return (
    <div className="fallback">
      <p>3D is off, so here is the same idea as a plain diagram for the <b>{level}</b> level.</p>
      <div className="fb-flow">
        {['Customer', 'Mobile App', 'Database', 'Kitchen Display'].map((n, i, a) => (
          <React.Fragment key={n}><span className={`fb-node ${n === 'Mobile App' && level !== 'high' ? 'sel' : ''}`}>{n}</span>{i < a.length - 1 && <span aria-hidden>→</span>}</React.Fragment>
        ))}
      </div>
    </div>
  );
}

export function AbstractionDimension() {
  const [level, setLevel] = useState('high');
  const idx = ABSTRACTION_LEVELS.findIndex((l) => l.id === level);
  const cur = ABSTRACTION_LEVELS[idx];
  const { webgl } = useApp();
  const set = (i) => setLevel(ABSTRACTION_LEVELS[Math.max(0, Math.min(2, i))].id);
  return (
    <Section id="abstraction" eyebrow="Section 2 · continued" title="Abstraction Dimension: zoom in on the design"
      lead="High-level design describes the overall system. Low-level design explains the implementation details of individual components.">
      <div className="level-bar" role="group" aria-label="Abstraction level">
        {ABSTRACTION_LEVELS.map((l) => (
          <button key={l.id} className={`btn ${level === l.id ? 'sel' : ''}`} aria-pressed={level === l.id} onClick={() => setLevel(l.id)}>{l.name}</button>
        ))}
        <button className="btn cyan" disabled={idx === 2} onClick={() => set(idx + 1)}><ZoomIn size={16} /> {idx === 0 ? 'Zoom In' : 'Zoom In Again'}</button>
        <button className="btn" disabled={idx === 0} onClick={() => set(idx - 1)}><ZoomOut size={16} /> Zoom Out</button>
      </div>
      <div className="abs-grid">
        <SafeCanvas className="abs-canvas" camera={{ position: [0, 0.6, 11], fov: 45 }} fallback={<LevelFallback level={level} />}
          hint={webgl ? 'Use the buttons to move the camera' : undefined} label={`3D view of ${cur.label}`}>
          <AbstractionScene level={level} />
        </SafeCanvas>
        <div className="glass pad" aria-live="polite">
          <h3 style={{ color: 'var(--orange)' }}>{cur.label}</h3>
          <p>{cur.text}</p>
          {level === 'medium' && <ul>{MEDIUM_MODULES.map((m) => <li key={m}>{m}</li>)}</ul>}
          {level === 'low' && Object.entries(LOW_DETAILS).map(([k, v]) => (
            <div key={k}><b style={{ color: 'var(--cyan)' }}>{k}</b><ul style={{ margin: '2px 0 8px' }}>{v.map((x) => <li key={x}>{x}</li>)}</ul></div>
          ))}
        </div>
      </div>
      <p className="note"><b>Teaching aid:</b> These three levels (High, Medium, Low) are a simple way to understand abstraction. Not every software engineering textbook defines exactly these three formal levels.</p>
    </Section>
  );
}
