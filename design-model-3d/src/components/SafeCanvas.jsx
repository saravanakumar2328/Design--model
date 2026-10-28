import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useApp } from '../context/AppContext.jsx';

class Boundary extends React.Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { /* handled by fallback UI */ }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

/**
 * Wraps a react-three-fiber Canvas with:
 *  - WebGL detection and a user-controlled "3D off" switch
 *  - an error boundary (failed asset or GPU problem shows the fallback)
 *  - a loading state
 */
export default function SafeCanvas({ children, fallback, className = '', hint, camera = { position: [0, 0, 8], fov: 45 }, label }) {
  const { webgl, reduced } = useApp();
  const fb = <div className={`canvas-box ${className}`} style={{ overflow: 'auto' }}>{fallback}</div>;
  if (!webgl) return fb;
  return (
    <Boundary fallback={fb}>
      <div className={`canvas-box ${className}`} role="img" aria-label={label || '3D visualization'}>
        <Suspense fallback={<div className="loading">Loading 3D…</div>}>
          <Canvas
            dpr={[1, 1.6]}
            camera={camera}
            frameloop={reduced ? 'demand' : 'always'}
            gl={{ antialias: true, powerPreference: 'high-performance' }}
          >
            {children}
          </Canvas>
        </Suspense>
        {hint && <div className="canvas-hint">{hint}</div>}
      </div>
    </Boundary>
  );
}

export function Lights() {
  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 6, 5]} intensity={1.4} />
      <pointLight position={[-5, -2, 3]} intensity={1.2} color="#8b5cf6" />
    </>
  );
}
