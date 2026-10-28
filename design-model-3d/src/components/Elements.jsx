import React, { useState } from 'react';
import { OrbitControls } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Play } from 'lucide-react';
import Section from './Section.jsx';
import SafeCanvas, { Lights } from './SafeCanvas.jsx';
import { Phone, Database, Screen, LayerStack, Cloud, Wire, Packet, Float, Spin, Label } from './Shapes.jsx';
import { ELEMENTS, CORE_NOTE, CLASS_BOXES, CLASS_LINKS, MENU } from '../data/content.js';
import { useApp } from '../context/AppContext.jsx';

/* ------------- 5 selectable 3D objects ------------- */
function ElementObject({ id, x, selected, onPick }) {
  const s = selected ? 1.55 : 1.3;
  const emissiveIntensity = selected ? 0.7 : 0.2;
  let shape;
  switch (id) {
    case 'data':
      shape = [[-0.35, 0.35], [0.35, 0.35], [0, -0.35]].map(([a, b], i) => (
        <mesh key={i} position={[a, b, 0]}><boxGeometry args={[0.55, 0.55, 0.55]} /><meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={emissiveIntensity} /></mesh>
      )); break;
    case 'arch':
      shape = [[-0.5, 0.3], [0.5, 0.3], [0, -0.5]].map(([a, b], i) => (
        <mesh key={i} position={[a, b, 0]}><sphereGeometry args={[0.3, 20, 20]} /><meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={emissiveIntensity} /></mesh>
      )); break;
    case 'ui':
      shape = (<><mesh><boxGeometry args={[0.85, 1.2, 0.1]} /><meshStandardMaterial color="#1b2766" /></mesh><mesh position={[0, 0, 0.07]}><planeGeometry args={[0.7, 1]} /><meshStandardMaterial color="#fb923c" emissive="#fb923c" emissiveIntensity={emissiveIntensity} /></mesh><mesh position={[0, 0, -0.07]} rotation={[0, Math.PI, 0]}><planeGeometry args={[0.7, 1]} /><meshStandardMaterial color="#fb923c" emissive="#fb923c" emissiveIntensity={emissiveIntensity} /></mesh></>); break;
    case 'comp':
      shape = (<><mesh><torusGeometry args={[0.45, 0.17, 12, 24]} /><meshStandardMaterial color="#4ade80" emissive="#4ade80" emissiveIntensity={emissiveIntensity} /></mesh><mesh><boxGeometry args={[0.35, 0.35, 0.35]} /><meshStandardMaterial color="#e8edff" /></mesh></>); break;
    default:
      shape = (<><mesh position={[0, 0.35, 0]}><sphereGeometry args={[0.4, 20, 20]} /><meshStandardMaterial color="#a78bfa" emissive="#8b5cf6" emissiveIntensity={emissiveIntensity} /></mesh><mesh position={[0, -0.4, 0]}><cylinderGeometry args={[0.4, 0.4, 0.5, 24]} /><meshStandardMaterial color="#fb923c" emissive="#fb923c" emissiveIntensity={emissiveIntensity} /></mesh></>);
  }
  const el = ELEMENTS.find((e) => e.id === id);
  return (
    <Float position={[x, 0.1, 0]}>
      <group onClick={onPick} scale={s} onPointerOver={() => { document.body.style.cursor = 'pointer'; }} onPointerOut={() => { document.body.style.cursor = ''; }}>
        <Spin speed={selected ? 1.2 : 0.4}>{shape}</Spin>
      </group>
      <Label y={-1.05} color={selected ? '#fb923c' : '#e8edff'}>{el.name}</Label>
    </Float>
  );
}

function ElementsRow({ sel, setSel }) {
  return (
    <>
      <Lights />
      {ELEMENTS.map((e, i) => <ElementObject key={e.id} id={e.id} x={(i - 2) * 5.6} selected={sel === e.id} onPick={() => setSel(e.id)} />)}
    </>
  );
}

/* ------------- Data / Class design ------------- */
function ClassDiagram() {
  const byId = Object.fromEntries(CLASS_BOXES.map((b) => [b.id, b]));
  const W = 120;
  const H = (b) => 28 + b.fields.length * 16;
  const center = (b) => [b.x + W / 2, b.y + H(b) / 2];
  return (
    <svg viewBox="0 0 620 290" className="svg-box" role="img" aria-label="Class diagram with Customer, Table, Order, OrderItem and Food">
      {CLASS_LINKS.map(([a, b, label], i) => {
        const [x1, y1] = center(byId[a]); const [x2, y2] = center(byId[b]);
        return (
          <g key={a + b}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#22d3ee" strokeWidth="2" className="dash-flow" />
            <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 6} className="svg-sub" textAnchor="middle" style={{ fill: '#fb923c' }}>{label}</text>
          </g>
        );
      })}
      {CLASS_BOXES.map((b, i) => (
        <g key={b.id} className="fade-in" style={{ animationDelay: `${i * 0.12}s` }}>
          <rect x={b.x} y={b.y} width={W} height={H(b)} rx="8" fill="#101a4a" stroke="#8b5cf6" />
          <rect x={b.x} y={b.y} width={W} height="24" rx="8" fill="#2b2f86" />
          <text x={b.x + W / 2} y={b.y + 17} textAnchor="middle" className="svg-text" style={{ fontWeight: 700 }}>{b.id}</text>
          {b.fields.map((f, k) => <text key={f} x={b.x + 10} y={b.y + 42 + k * 16} className="svg-sub">{f}</text>)}
        </g>
      ))}
    </svg>
  );
}

/* ------------- Architecture (3D) ------------- */
const AP = { phone: [-4.2, 0.1, 0], logic: [-1.4, 0.1, 0.4], db: [1.4, 0.1, 0], tv: [4.2, 0.1, 0] };
function ArchScene() {
  const route = [AP.phone, AP.logic, AP.db, AP.tv];
  return (
    <>
      <Lights />
      <Wire from={AP.phone} to={AP.logic} /><Wire from={AP.logic} to={AP.db} color="#8b5cf6" /><Wire from={AP.db} to={AP.tv} color="#fb923c" />
      <Packet path={route} /><Packet path={route} offset={0.5} color="#22d3ee" />
      <Phone position={AP.phone} label="Customer Mobile App" scale={0.8} />
      <LayerStack position={AP.logic} label="Application Logic" />
      <Database position={AP.db} label="Firebase Realtime DB" />
      <Screen position={AP.tv} label="Kitchen Display App" scale={0.75} />
      <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={1.2} maxPolarAngle={1.9} />
    </>
  );
}

/* ------------- Interface design mockups ------------- */
function InterfaceMock() {
  const [screen, setScreen] = useState('login');
  const [cart, setCart] = useState({});
  const [placed, setPlaced] = useState(false);
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const total = MENU.reduce((s, m) => s + (cart[m.id] || 0) * m.price, 0);
  const add = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const nav = ['login', 'menu', 'cart', 'status'];
  const names = { login: 'Login', menu: 'Menu', cart: 'Cart', status: 'Status' };
  const place = () => { if (count > 0) { setPlaced(true); setScreen('status'); } };
  return (
    <div className="mock-wrap">
      <div className="phone" aria-label="Customer mobile app mockup">
        <div className="phone-notch" />
        <div className="phone-screen">
          {screen === 'login' && (<>
            <b>Welcome to SmartDine</b><div className="field">Table: 16</div><div className="field">Name: Guest</div>
            <button className="mini-btn go" onClick={() => setScreen('menu')}>Login</button>
          </>)}
          {screen === 'menu' && (<>
            <b>Food Menu</b>
            {MENU.map((m) => <div className="food-row" key={m.id}><span>{m.name}<br /><span className="price">₹{m.price}</span></span><button className="mini-btn" onClick={() => add(m.id)} aria-label={`Add ${m.name}`}>Add</button></div>)}
            <button className="mini-btn go" onClick={() => setScreen('cart')}>View Cart ({count})</button>
          </>)}
          {screen === 'cart' && (<>
            <b>Your Cart</b>
            {count === 0 && <span style={{ color: 'var(--muted)' }}>Cart is empty. Add food from the menu.</span>}
            {MENU.filter((m) => cart[m.id]).map((m) => <div className="food-row" key={m.id}><span>{m.name} × {cart[m.id]}</span><span className="price">₹{m.price * cart[m.id]}</span></div>)}
            <div className="total-row"><span>Total</span><span>₹{total}</span></div>
            <button className="mini-btn go" disabled={count === 0} onClick={place}>Place Order</button>
          </>)}
          {screen === 'status' && (<>
            <b>Order Status</b>
            {placed ? <div className="status-steps"><span className="on">Placed</span><span>Preparing</span><span>Ready</span></div> : <span style={{ color: 'var(--muted)' }}>No order yet.</span>}
          </>)}
          <div className="phone-nav">{nav.map((n) => <button key={n} className={screen === n ? 'sel' : ''} onClick={() => setScreen(n)}>{names[n]}</button>)}</div>
        </div>
      </div>
      <div className="tv" aria-label="Kitchen display mockup">
        <div className="tv-screen">
          <b style={{ color: 'var(--orange)' }}>Kitchen Display</b>
          {placed ? (
            <div className="ticket"><b>Table 16</b>{MENU.filter((m) => cart[m.id]).map((m) => <div key={m.id}>{m.name} × {cart[m.id]}</div>)}</div>
          ) : <p style={{ color: 'var(--muted)', marginTop: 10 }}>Waiting for orders… Use the phone: Login → Menu → Add → Cart → Place Order.</p>}
        </div>
      </div>
    </div>
  );
}

/* ------------- Component-level flowchart ------------- */
const FLOW = [
  { t: 'Start: customer taps “Add”', kind: '', text: 'The component begins when the customer adds food.' },
  { t: 'Add food to cart', kind: '', text: 'Increase the quantity of the food item in the cart.' },
  { t: 'Calculate order total', kind: '', text: 'For each item: price × quantity, then add all items.' },
  { t: 'Is the order valid?', kind: 'dec', text: 'Check: cart is not empty, quantities are 1 or more, table number selected.' },
  { t: 'Save the order', kind: '', text: 'If valid, write the order to the database. If not valid, show an error and stop.' },
  { t: 'Update the kitchen display', kind: 'end', text: 'The kitchen display refreshes and shows the new order.' },
];
function ComponentFlow() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const { reduced } = useApp();
  const run = () => {
    setOpen(true);
    if (reduced) { setActive(FLOW.length - 1); return; }
    setActive(0);
    FLOW.forEach((_, i) => setTimeout(() => setActive(i), i * 800));
  };
  return (
    <div className="flow-chart">
      <div className="comp-tabs">
        <button className="btn primary" aria-expanded={open} onClick={() => { setOpen(!open); setActive(-1); }}>{open ? 'Collapse component' : 'Expand “Place Order” component'}</button>
        {open && <button className="btn accent" onClick={run}><Play size={16} /> Run through</button>}
      </div>
      <AnimatePresence>
        {open && FLOW.map((n, i) => (
          <motion.div key={n.t} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: reduced ? 0 : i * 0.1 }} style={{ textAlign: 'center' }}>
            {i > 0 && <div className="fc-arrow"><ArrowDown size={16} /></div>}
            <button className={`fc-node ${n.kind}`} onClick={() => setActive(i)} style={{ color: 'inherit', boxShadow: active === i ? '0 0 22px rgba(34,211,238,0.6)' : 'none', borderWidth: active === i ? 2 : 1 }}>{n.t}</button>
          </motion.div>
        ))}
      </AnimatePresence>
      {open && active >= 0 && <div className="glass pad" style={{ marginTop: 14, maxWidth: 420 }} aria-live="polite"><b style={{ color: 'var(--cyan)' }}>{FLOW[active].t}:</b> {FLOW[active].text}</div>}
    </div>
  );
}

/* ------------- Deployment (3D) ------------- */
const DP = { phone: [-4.8, -0.4, 0], net: [-2, 0.3, 0], cloud: [1.6, 1.2, 0], tv: [4.8, -0.4, 0] };
function DeployScene() {
  const route = [DP.phone, DP.net, DP.cloud, DP.tv];
  return (
    <>
      <Lights />
      <mesh position={[0, -1.6, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[11, 4]} /><meshStandardMaterial color="#0e1a52" transparent opacity={0.6} /></mesh>
      <Wire from={DP.phone} to={DP.net} /><Wire from={DP.net} to={DP.cloud} color="#8b5cf6" /><Wire from={DP.cloud} to={DP.tv} color="#fb923c" />
      <Packet path={route} /><Packet path={route} offset={0.5} color="#22d3ee" />
      <Phone position={DP.phone} label="Customer Android Phone" scale={0.7} />
      <Float position={DP.net}><mesh><boxGeometry args={[1.1, 0.25, 0.7]} /><meshStandardMaterial color="#0891b2" emissive="#22d3ee" emissiveIntensity={0.3} /></mesh><Label y={-0.6}>Restaurant Network / Internet</Label></Float>
      <Cloud position={DP.cloud} label="Firebase Cloud Database" />
      <Screen position={DP.tv} label="Kitchen Android TV" scale={0.7} />
      <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={1.1} maxPolarAngle={1.8} />
    </>
  );
}
const DEPLOY_STEPS = ['Customer places the order on the Android phone.', 'The order goes through the restaurant network or internet.', 'It is saved in the Firebase cloud database.', 'The kitchen Android TV receives the update and shows the order.'];

function TextFallback({ items }) {
  return <div className="fallback"><p>3D is off. Here are the parts as a list:</p><div className="fb-flow">{items.map((x, i) => <React.Fragment key={x}><span className="fb-node">{x}</span>{i < items.length - 1 && <span aria-hidden>→</span>}</React.Fragment>)}</div></div>;
}

function Detail({ id }) {
  const el = ELEMENTS.find((e) => e.id === id);
  let visual;
  if (id === 'data') visual = <div className="glass pad"><ClassDiagram /></div>;
  if (id === 'arch') visual = <SafeCanvas className="detail-canvas" camera={{ position: [0, 0.8, 8.4], fov: 48 }} hint="Drag to rotate" label="3D system architecture with animated data flow" fallback={<TextFallback items={['Customer mobile app', 'Application logic', 'Firebase Realtime Database', 'Kitchen display app']} />}><ArchScene /></SafeCanvas>;
  if (id === 'ui') visual = <div className="glass pad"><p style={{ color: 'var(--muted)' }}>Try it: click the buttons and the navigation tabs on the phone.</p><InterfaceMock /></div>;
  if (id === 'comp') visual = <div className="glass pad"><ComponentFlow /></div>;
  if (id === 'deploy') visual = (
    <>
      <SafeCanvas className="detail-canvas" camera={{ position: [0, 1, 9], fov: 48 }} hint="Drag to rotate" label="3D restaurant deployment environment" fallback={<TextFallback items={['Customer Android phone', 'Restaurant network / internet', 'Firebase cloud database', 'Kitchen Android TV']} />}><DeployScene /></SafeCanvas>
      <div className="glass pad" style={{ marginTop: 12 }}><b style={{ color: 'var(--cyan)' }}>How an order travels</b><ol style={{ margin: '6px 0 0', paddingLeft: 20 }}>{DEPLOY_STEPS.map((s) => <li key={s}>{s}</li>)}</ol></div>
    </>
  );
  return (
    <div key={id} className="fade-in">
      <div className="glass pad" style={{ marginBottom: 12 }}>
        <span className={`chip ${el.core ? 'core' : 'extra'}`}>{el.core ? 'Commonly taught core element' : 'Additional element (classification varies)'}</span>
        <h3 style={{ marginTop: 8 }}>{el.name}</h3>
        <p>{el.definition}</p>
        <p><b style={{ color: 'var(--cyan)' }}>Restaurant example:</b> {el.example}</p>
      </div>
      {visual}
    </div>
  );
}

export default function Elements() {
  const [sel, setSel] = useState('data');
  return (
    <Section id="elements" eyebrow="Section 4" title="Core Elements of the Design Model"
      lead="Five design elements describe a software system from different angles. Click a 3D object (or a tab) to explore it.">
      <SafeCanvas className="el-canvas" camera={{ position: [0, 0, 9], fov: 45 }} hint="Click an object" label="Five 3D objects representing the five design elements"
        fallback={<TextFallback items={ELEMENTS.map((e) => e.name)} />}>
        <ElementsRow sel={sel} setSel={setSel} />
      </SafeCanvas>
      <div className="el-tabs" role="tablist" aria-label="Design elements">
        {ELEMENTS.map((e, i) => <button key={e.id} role="tab" aria-selected={sel === e.id} className={`btn ${sel === e.id ? 'sel' : ''}`} onClick={() => setSel(e.id)}>{i + 1}. {e.name}</button>)}
      </div>
      <Detail id={sel} />
      <div className="note"><b>Note:</b> {CORE_NOTE}</div>
    </Section>
  );
}
