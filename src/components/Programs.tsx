"use client";

import { useReveal } from "@/lib/hooks";
import { programs } from "@/lib/data";

export function Programs() {
  const [hr, hv] = useReveal();
  const [gr, gv] = useReveal(0.05);
  return (
    <section className="PR" id="programas">
      <div className="SC">
        <div ref={hr} className={`ph rv ${hv ? "v" : ""}`}>
          <div>
            <div className="ey">
              <span className="eyl" />
              Nuestros Programas
            </div>
            <h2 className="st">
              ELEGÍ TU
              <br />
              <span>DISCIPLINA</span>
            </h2>
          </div>
          <p className="ps">
            +50 clases semanales diseñadas por coaches certificados.
          </p>
        </div>
        <div ref={gr} className="pg">
          {programs.map((p, i) => (
            <div
              key={p.name}
              className="pc"
              style={{
                opacity: gv ? 1 : 0,
                transform: gv ? "translateY(0)" : "translateY(40px)",
                transition: `all .7s var(--eo) ${gv ? i * 0.1 : 0}s`,
              }}
            >
              <div
                className="pc-bg"
                style={{ backgroundImage: `url(${p.img})` }}
              />
              <div className="pc-ov" />
              <div className="pc-nm">{String(i + 1).padStart(2, "0")}</div>
              {p.tag && (
                <div className="pc-tg">
                  <span className="pc-td" />
                  {p.tag}
                </div>
              )}
              <div className="pc-ct">
                <div className="pc-ic">{p.icon}</div>
                <h3 className="pc-n">{p.name}</h3>
                <div className="pc-int">
                  {[1, 2, 3, 4, 5].map((l) => (
                    <div
                      key={l}
                      className={`ib ${l <= p.int ? "on" : ""}`}
                    />
                  ))}
                  <span className="il">
                    {p.int >= 5 ? "Max" : p.int >= 4 ? "Alta" : "Media"}
                  </span>
                </div>
                <p className="pc-d">{p.desc}</p>
                <div className="pc-ft">
                  <div className="pc-m">
                    <span className="pm">⏱ {p.dur}</span>
                    <span className="pm">🔥 {p.cal} cal</span>
                  </div>
                  <span className="pc-cta">Ver más →</span>
                </div>
              </div>
              <div className="pc-ac" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
