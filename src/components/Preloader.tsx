"use client";

import { useEffect, useState } from "react";

export function Preloader({ onDone }: { onDone?: () => void }) {
  const [p, setP] = useState(0);
  const [d, setD] = useState(false);
  useEffect(() => {
    (
      [
        [30, 200],
        [55, 500],
        [78, 900],
        [92, 1300],
        [100, 1600],
      ] as const
    ).forEach(([t, dl]) => setTimeout(() => setP(t), dl));
    setTimeout(() => {
      setD(true);
      setTimeout(() => onDone?.(), 600);
    }, 2200);
  }, [onDone]);
  const w1 = "FORGE";
  const w2 = "FITNESS";
  return (
    <div className={`PL ${d ? "dn" : ""}`}>
      <div className="PL-logo">
        {w1.split("").map((c, i) => (
          <span
            key={`a${i}`}
            className="lt"
            style={{ animationDelay: `${i * 0.06}s`, color: "var(--wh)" }}
          >
            {c}
          </span>
        ))}
        <span style={{ display: "inline-block", width: ".25em" }} />
        {w2.split("").map((c, i) => (
          <span
            key={`b${i}`}
            className="lt"
            style={{
              animationDelay: `${(w1.length + i) * 0.06}s`,
              color: "var(--lm)",
            }}
          >
            {c}
          </span>
        ))}
      </div>
      <div className="PL-bar">
        <div className="PL-fill" style={{ width: `${p}%` }} />
      </div>
      <div className="PL-tag">Forjá tu mejor versión</div>
    </div>
  );
}
