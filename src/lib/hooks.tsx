"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export function useReveal(threshold = 0.15): [RefObject<HTMLDivElement>, boolean] {
  const r = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setV(true);
          o.disconnect();
        }
      },
      { threshold },
    );
    if (r.current) o.observe(r.current);
    return () => o.disconnect();
  }, [threshold]);
  return [r, v];
}

export function AnimatedCounter({
  end,
  s = "",
  d = 2200,
}: {
  end: number;
  s?: string;
  d?: number;
}) {
  const [c, setC] = useState(0);
  const r = useRef<HTMLSpanElement | null>(null);
  const st = useRef(false);
  useEffect(() => {
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !st.current) {
          st.current = true;
          const t0 = performance.now();
          const go = (n: number) => {
            const p = Math.min((n - t0) / d, 1);
            setC(Math.floor((1 - Math.pow(1 - p, 4)) * end));
            if (p < 1) requestAnimationFrame(go);
          };
          requestAnimationFrame(go);
        }
      },
      { threshold: 0.3 },
    );
    if (r.current) o.observe(r.current);
    return () => o.disconnect();
  }, [end, d]);
  return (
    <span ref={r}>
      {c}
      {s}
    </span>
  );
}
