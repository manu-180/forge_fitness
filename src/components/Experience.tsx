"use client";

import { useEffect, useRef } from "react";
import { useReveal } from "@/lib/hooks";
import { experienceStats, experienceTags } from "@/lib/data";

export function Experience() {
  const r = useRef<HTMLElement>(null);
  const ir = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const fn = () => {
      if (!r.current || !ir.current) return;
      const rc = r.current.getBoundingClientRect();
      const wh = window.innerHeight;
      if (rc.bottom < 0 || rc.top > wh) return;
      const p = (wh - rc.top) / (wh + rc.height);
      ir.current.style.transform = `translateY(${(p - 0.5) * 40}px)`;
    };
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const [cr, cv] = useReveal(0.1);
  return (
    <section className="EX" ref={r}>
      <div className="EX-bg">
        <div className="EX-img" ref={ir} />
      </div>
      <div className="EX-ov" />
      <div ref={cr} className={`EX-ct rv ${cv ? "v" : ""}`}>
        <div>
          <div className="ey">
            <span className="eyl" />
            La Experiencia
          </div>
          <h2
            className="st"
            style={{ fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)" }}
          >
            UN ESPACIO
            <br />
            DISEÑADO PARA
            <br />
            <span>RENDIR</span>
          </h2>
          <p className="EX-d">
            Cada detalle está pensado para potenciar tu entrenamiento.
            Acústica, temperatura, iluminación — todo calibrado.
          </p>
          <div className="EX-p">
            {experienceTags.map((f) => (
              <span key={f} className="ep">
                <span className="epd" />
                {f}
              </span>
            ))}
          </div>
        </div>
        <div className="EX-ss">
          {experienceStats.map(([v, l], i) => (
            <div
              key={i}
              className="esc"
              style={{
                opacity: cv ? 1 : 0,
                transform: cv ? "translateY(0)" : "translateY(20px)",
                transition: `all .6s var(--eo) ${cv ? i * 0.1 : 0}s`,
              }}
            >
              <div className="esv">{v}</div>
              <div className="esl">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
