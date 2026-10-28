import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

// 3D objects live in a separate React renderer, so they read motion settings from this tiny store.
export const motionStore = { reduced: false };

function detectWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch {
    return false;
  }
}

const Ctx = createContext(null);
export const useApp = () => useContext(Ctx);

export function AppProvider({ children }) {
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const [reduced, setReduced] = useState(!!prefersReduced);
  const [webgl, setWebgl] = useState(true);
  const [seminar, setSeminar] = useState(false);
  const [visited, setVisited] = useState(() => new Set(['home']));

  useEffect(() => {
    motionStore.reduced = reduced;
    document.documentElement.classList.toggle('reduced-motion', reduced);
  }, [reduced]);
  useEffect(() => { if (!detectWebGL()) setWebgl(false); }, []);

  const markVisited = useCallback((id) => setVisited((v) => (v.has(id) ? v : new Set(v).add(id))), []);

  const value = useMemo(() => ({
    reduced, setReduced, webgl, setWebgl, seminar, setSeminar, visited, markVisited,
  }), [reduced, webgl, seminar, visited, markVisited]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
