import React, { useRef } from 'react';
import { useApp } from '../context/AppContext.jsx';

/** CSS 3D tilt that follows the pointer. Disabled for reduced motion. */
export default function Tilt({ as: Tag = 'div', max = 10, className = '', style, children, ...rest }) {
  const ref = useRef(null);
  const { reduced } = useApp();
  const move = (e) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `rotateY(${x * max}deg) rotateX(${-y * max}deg) translateZ(0)`;
  };
  const leave = () => { if (ref.current) ref.current.style.transform = ''; };
  return (
    <Tag ref={ref} className={className} style={style} onPointerMove={move} onPointerLeave={leave} {...rest}>
      {children}
    </Tag>
  );
}
