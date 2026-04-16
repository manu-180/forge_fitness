"use client";

import { useReveal } from "@/lib/hooks";
import { coaches } from "@/lib/data";

export function Coaches() {
  const [hr, hv] = useReveal();
  const [gr, gv] = useReveal(0.05);
  return (
    <section className="CO" id="coaches">
      <div className="SC">
        <div ref={hr} className={`ph rv ${hv ? "v" : ""}`}>
          <div>
            <div className="ey">
              <span className="eyl" />
              El Equipo
            </div>
            <h2 className="st">
              QUIENES TE
              <br />
              <span>ENTRENAN</span>
            </h2>
          </div>
          <p className="ps" style={{ maxWidth: 320 }}>
            Coaches certificados con experiencia competitiva real.
          </p>
        </div>
        <div ref={gr} className="cg">
          {coaches.map((c, i) => (
            <div
              key={c.name}
              className="cc"
              style={{
                opacity: gv ? 1 : 0,
                transform: gv ? "translateY(0)" : "translateY(40px)",
                transition: `all .7s var(--eo) ${gv ? i * 0.12 : 0}s`,
              }}
            >
              <div className="cc-tb" />
              <div
                className="cc-ph"
                style={{ backgroundImage: `url(${c.img})` }}
              />
              <div className="cc-gr" />
              <div className="cc-nm">{String(i + 1).padStart(2, "0")}</div>
              <div className="cc-ct">
                <div className="cc-tg">
                  <span className="cc-td" />
                  {c.spec}
                </div>
                <h3 className="cc-n">{c.name}</h3>
                <p className="cc-r">{c.role}</p>
                <p className="cc-b">{c.bio}</p>
                <div className="cc-s">
                  <div>
                    <div className="cc-sv">{c.stats.e}</div>
                    <div className="cc-sl">Años</div>
                  </div>
                  <div>
                    <div className="cc-sv">{c.stats.a}</div>
                    <div className="cc-sl">Atletas</div>
                  </div>
                  <div>
                    <div className="cc-sv">{c.stats.c}</div>
                    <div className="cc-sl">Certif.</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
