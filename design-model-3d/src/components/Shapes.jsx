import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { motionStore } from '../context/AppContext.jsx';

export const COLORS = { cyan: '#22d3ee', purple: '#8b5cf6', orange: '#fb923c', green: '#4ade80', navy: '#1b2766' };

/** Small helper: floats a group up and down unless reduced motion is on. */
export function Float({ children, speed = 1, amp = 0.12, position = [0, 0, 0], ...rest }) {
  const ref = useRef();
  const seed = useRef(Math.random() * 6);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = motionStore.reduced ? 0 : clock.elapsedTime * speed + seed.current;
    ref.current.position.y = position[1] + Math.sin(t) * amp;
  });
  return <group ref={ref} position={position} {...rest}>{children}</group>;
}

function useHover() {
  const [hover, setHover] = useState(false);
  return [hover, { onPointerOver: (e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = 'pointer'; }, onPointerOut: () => { setHover(false); document.body.style.cursor = ''; } }];
}

export function Label({ children, y = -1.1, color = '#e8edff' }) {
  return (
    <Html position={[0, y, 0]} center distanceFactor={7.5} style={{ pointerEvents: 'none' }}>
      <div style={{ color, fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap', textShadow: '0 2px 8px #000', fontFamily: 'Inter, system-ui, sans-serif' }}>{children}</div>
    </Html>
  );
}

export function Phone({ position = [0, 0, 0], selected, onClick, label = 'Mobile App', scale = 1 }) {
  const [hover, h] = useHover();
  return (
    <Float position={position} scale={scale}>
      <group onClick={onClick} {...h} scale={hover || selected ? 1.08 : 1}>
        <mesh>
          <boxGeometry args={[0.9, 1.7, 0.12]} />
          <meshStandardMaterial color="#1b2766" metalness={0.5} roughness={0.35} emissive={selected ? COLORS.cyan : '#000'} emissiveIntensity={selected ? 0.35 : 0} />
        </mesh>
        <mesh position={[0, 0, 0.07]}>
          <planeGeometry args={[0.78, 1.5]} />
          <meshStandardMaterial color="#0f2a63" emissive={COLORS.cyan} emissiveIntensity={0.45} />
        </mesh>
        {[0.45, 0.05, -0.35].map((y, i) => (
          <mesh key={i} position={[0, y, 0.08]}>
            <planeGeometry args={[0.6, 0.28]} />
            <meshBasicMaterial color={i === 2 ? COLORS.orange : '#7dd3fc'} transparent opacity={0.85} />
          </mesh>
        ))}
      </group>
      <Label y={-1.2}>{label}</Label>
    </Float>
  );
}

export function Database({ position = [0, 0, 0], selected, onClick, label = 'Firebase DB', glow }) {
  const [hover, h] = useHover();
  const ring = useRef();
  useFrame((_, d) => { if (ring.current && !motionStore.reduced) ring.current.rotation.y += d * 0.8; });
  const on = selected || glow;
  return (
    <Float position={position}>
      <group onClick={onClick} {...h} scale={hover || selected ? 1.08 : 1}>
        {[-0.5, 0, 0.5].map((y, i) => (
          <mesh key={i} position={[0, y, 0]}>
            <cylinderGeometry args={[0.7, 0.7, 0.38, 36]} />
            <meshStandardMaterial color={i === 1 ? '#5b3fc9' : '#7c4dff'} metalness={0.4} roughness={0.35} emissive={COLORS.purple} emissiveIntensity={on ? 0.7 : 0.18} />
          </mesh>
        ))}
        <mesh ref={ring} position={[0, 0.78, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.75, 0.025, 8, 48]} />
          <meshBasicMaterial color={COLORS.cyan} />
        </mesh>
      </group>
      <Label y={-1.25}>{label}</Label>
    </Float>
  );
}

export function Screen({ position = [0, 0, 0], selected, onClick, label = 'Kitchen Display', glow, children }) {
  const [hover, h] = useHover();
  const on = selected || glow;
  return (
    <Float position={position}>
      <group onClick={onClick} {...h} scale={hover || selected ? 1.08 : 1}>
        <mesh>
          <boxGeometry args={[2, 1.2, 0.1]} />
          <meshStandardMaterial color="#141c52" metalness={0.5} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[1.85, 1.05]} />
          <meshStandardMaterial color="#0d2650" emissive={COLORS.orange} emissiveIntensity={on ? 0.55 : 0.2} />
        </mesh>
        {[0.3, 0, -0.3].map((y, i) => (
          <mesh key={i} position={[-0.25, y, 0.07]}>
            <planeGeometry args={[1.2 - i * 0.2, 0.14]} />
            <meshBasicMaterial color="#fde4cc" transparent opacity={0.85} />
          </mesh>
        ))}
        <mesh position={[0, -0.78, 0]}>
          <boxGeometry args={[0.2, 0.35, 0.1]} />
          <meshStandardMaterial color="#202a66" />
        </mesh>
        {children}
      </group>
      <Label y={-1.25}>{label}</Label>
    </Float>
  );
}

export function LayerStack({ position = [0, 0, 0], selected, onClick, label = 'Application Layer' }) {
  const [hover, h] = useHover();
  return (
    <Float position={position}>
      <group onClick={onClick} {...h} scale={hover || selected ? 1.08 : 1}>
        {[0.45, 0, -0.45].map((y, i) => (
          <mesh key={i} position={[0, y, 0]} rotation={[0, 0.5, 0]}>
            <boxGeometry args={[1.5, 0.28, 1.1]} />
            <meshStandardMaterial color={['#0891b2', '#0e7490', '#155e75'][i]} metalness={0.35} roughness={0.4} emissive={COLORS.cyan} emissiveIntensity={selected ? 0.6 : 0.15} />
          </mesh>
        ))}
      </group>
      <Label y={-1.15}>{label}</Label>
    </Float>
  );
}

export function Cloud({ position = [0, 0, 0], label = 'Firebase Cloud' }) {
  return (
    <Float position={position}>
      <group>
        {[[-0.5, 0, 0, 0.5], [0.1, 0.2, 0, 0.65], [0.7, -0.05, 0, 0.45]].map(([x, y, z, r], i) => (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[r, 20, 20]} />
            <meshStandardMaterial color="#8b5cf6" emissive={COLORS.purple} emissiveIntensity={0.35} roughness={0.5} />
          </mesh>
        ))}
      </group>
      <Label y={-0.95}>{label}</Label>
    </Float>
  );
}

/** A glowing line between two points. */
export function Wire({ from, to, color = COLORS.cyan, active = true }) {
  const geo = React.useMemo(() => new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...from), new THREE.Vector3(...to)]), [from, to]);
  return (
    <line geometry={geo}>
      <lineBasicMaterial color={color} transparent opacity={active ? 0.85 : 0.25} />
    </line>
  );
}

/** A data packet travelling along a list of points. `run` controls whether it moves. */
export function Packet({ path, color = COLORS.orange, speed = 0.35, run = true, loop = true, offset = 0, onDone, size = 0.12 }) {
  const ref = useRef();
  const prog = useRef(offset);
  const done = useRef(false);
  useFrame((_, d) => {
    if (!ref.current) return;
    if (!run) { ref.current.visible = false; prog.current = offset; done.current = false; return; }
    if (motionStore.reduced) { ref.current.visible = true; ref.current.position.set(...path[path.length - 1]); return; }
    ref.current.visible = true;
    prog.current += d * speed;
    if (prog.current >= 1) {
      if (loop) prog.current -= 1;
      else { prog.current = 1; if (!done.current) { done.current = true; onDone && onDone(); } }
    }
    const seg = path.length - 1;
    const f = Math.min(prog.current, 0.9999) * seg;
    const i = Math.floor(f);
    const a = path[i], b = path[i + 1];
    const t = f - i;
    ref.current.position.set(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t);
  });
  return (
    <mesh ref={ref} visible={false}>
      <sphereGeometry args={[size, 14, 14]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

export function Spin({ children, speed = 0.3 }) {
  const ref = useRef();
  useFrame((_, d) => { if (ref.current && !motionStore.reduced) ref.current.rotation.y += d * speed; });
  return <group ref={ref}>{children}</group>;
}
