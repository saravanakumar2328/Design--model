import React, { useState } from 'react';
import { OrbitControls } from '@react-three/drei';
import SafeCanvas, { Lights } from './SafeCanvas.jsx';
import { Phone, Database, Screen, LayerStack, Wire, Packet, Float } from './Shapes.jsx';
import { HERO_PARTS } from '../data/content.js';

const P = { customer: [-3.2, 0.2, 0], app: [-0.9, 0.2, 0.6], database: [1.4, 0.2, -0.3], kitchen: [3.6, 0.2, 0.3] };
const FALLBACK_ORDER = ['customer', 'app', 'database', 'kitchen'];

export function PartInfo({ id }) {
  const p = HERO_PARTS[id];
  return (
    <div className="glass info-card glow-cyan" aria-live="polite">
      {p ? (
        <>
          <h3>{p.name}</h3>
          <p><b>Purpose:</b> {p.purpose}</p>
          <p style={{ marginBottom: 0 }}>{p.text}</p>
        </>
      ) : (
        <p style={{ margin: 0 }}>Click any part of the 3D system (or drag to rotate) to learn what it does.</p>
      )}
    </div>
  );
}

export function SystemScene({ selected, setSelected }) {
  const pick = (id) => () => setSelected(id);
  const route = [P.customer, P.app, P.database, P.kitchen];
  return (
    <>
      <Lights />
      <Wire from={P.customer} to={P.app} />
      <Wire from={P.app} to={P.database} color="#8b5cf6" />
      <Wire from={P.database} to={P.kitchen} color="#fb923c" />
      <Packet path={route} offset={0} />
      <Packet path={route} offset={0.5} color="#22d3ee" />
      <Phone position={P.customer} selected={selected === 'customer'} onClick={pick('customer')} label="Customer Interface" />
      <LayerStack position={P.app} selected={selected === 'app'} onClick={pick('app')} label="Application Layer" />
      <Database position={P.database} selected={selected === 'database'} onClick={pick('database')} label="Database" />
      <Screen position={P.kitchen} selected={selected === 'kitchen'} onClick={pick('kitchen')} label="Kitchen Display" />
      <Float position={[0, 2.4, -1]} amp={0.2}>
        <mesh>
          <icosahedronGeometry args={[0.25, 0]} />
          <meshStandardMaterial color="#8b5cf6" wireframe />
        </mesh>
      </Float>
      <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={1.1} maxPolarAngle={1.9} minAzimuthAngle={-0.8} maxAzimuthAngle={0.8} />
    </>
  );
}

export function SystemFallback({ selected, setSelected }) {
  return (
    <div className="fallback">
      <p>3D is turned off or not available on this device. Here is the same system as a simple diagram:</p>
      <div className="fb-flow">
        {FALLBACK_ORDER.map((id, i) => (
          <React.Fragment key={id}>
            <button className={`fb-node ${selected === id ? 'sel' : ''}`} onClick={() => setSelected(id)}>{HERO_PARTS[id].name}</button>
            {i < FALLBACK_ORDER.length - 1 && <span aria-hidden>→</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default function Hero3D() {
  const [selected, setSelected] = useState(null);
  return (
    <div>
      <SafeCanvas
        className="hero-canvas"
        camera={{ position: [0, 1.2, 10.8], fov: 48 }}
        hint="Drag to rotate · Click a part"
        label="3D restaurant ordering system: customer interface, application layer, database and kitchen display"
        fallback={<SystemFallback selected={selected} setSelected={setSelected} />}
      >
        <SystemScene selected={selected} setSelected={setSelected} />
      </SafeCanvas>
      <PartInfo id={selected} />
    </div>
  );
}
