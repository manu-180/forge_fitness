"use client";

import { AnimatedCounter, useReveal } from "@/lib/hooks";
import {
  differentiatorCards,
  differentiatorCounters,
} from "@/lib/data";

export function Differentiators() {
  const [hr, hv] = useReveal();
  const [gr, gv] = useReveal(0.1);
  const [cr, cv] = useReveal(0.2);
  const cards = differentiatorCards;
  return (
    <section className="DF">
      <div className="SC">
        <div ref={hr} className={`rv ${hv ? "v" : ""}`}>
          <div className="ey">
            <span className="eyl" />
            Por qué elegirnos
          </div>
          <h2 className="st" style={{ maxWidth: 650 }}>
            NO SOMOS UN GYM
            <br />
            <span>SOMOS TU VENTAJA</span>
          </h2>
        </div>
        <div ref={gr} className="dg">
          {cards.map((c, i) => (
            <div
              key={c.n}
              className="dc"
              style={{
                opacity: gv ? 1 : 0,
                transform: gv ? "translateY(0)" : "translateY(25px)",
                transition: `all .6s var(--eo) ${gv ? i * 0.08 : 0}s`,
              }}
            >
              <div className="dn">{c.n}</div>
              <div className="di">{c.i}</div>
              <h3 className="dt">{c.t}</h3>
              <p className="dd">{c.d}</p>
            </div>
          ))}
        </div>
        <div ref={cr} className={`CN rv ${cv ? "v" : ""}`}>
          {differentiatorCounters.map((c, i) => (
            <div key={i} className="cn">
              <div className="cv">
                {c.raw || <AnimatedCounter end={c.v} s={c.s} />}
              </div>
              <div className="cl">{c.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
