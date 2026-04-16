"use client";

import { useState } from "react";
import { useReveal } from "@/lib/hooks";
import { WhatsAppLeadLink } from "@/components/WhatsAppLeadLink";
import { formatPriceAR, pricingGuarantees, pricingPlans } from "@/lib/data";

export function Pricing() {
  const [yr, setYr] = useState(false);
  const [hr, hv] = useReveal();
  const [gr, gv] = useReveal(0.05);
  const [br, bv] = useReveal();
  return (
    <section className="PP" id="planes">
      <div className="po po1" />
      <div className="po po2" />
      <div className="SC" style={{ maxWidth: 1200 }}>
        <div ref={hr} className={`pp-h rv ${hv ? "v" : ""}`}>
          <div className="ey">
            <span className="eyl" />
            Planes & Precios
            <span className="eyl" />
          </div>
          <h2 className="st">
            INVERTÍ EN
            <br />
            <span>VOS</span>
          </h2>
          <p className="pp-sub">
            Planes flexibles. Sin contratos. Cancelá cuando quieras.
          </p>
        </div>
        <div className="bl">
          <span className={`bll ${!yr ? "on" : ""}`}>Mensual</span>
          <div
            className={`tg ${yr ? "yr" : ""}`}
            onClick={() => setYr(!yr)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setYr(!yr);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Cambiar entre precio mensual y anual"
          >
            <div className="tgt" />
          </div>
          <span className={`bll ${yr ? "on" : ""}`}>Anual</span>
          <span className={`blb ${yr ? "on" : ""}`}>Hasta 20% OFF</span>
        </div>
        <div ref={gr} className="ppg">
          {pricingPlans.map((p, i) => {
            const pr = yr ? p.yr : p.mo;
            const sv = yr ? Math.round((1 - p.yr / p.mo) * 100) : 0;
            return (
              <div
                key={p.name}
                className={`ppc ${p.feat ? "ft" : "bs"}`}
                style={{
                  opacity: gv ? 1 : 0,
                  transform: gv ? "translateY(0)" : "translateY(40px)",
                  transition: `all .7s var(--eo) ${gv ? i * 0.12 : 0}s`,
                }}
              >
                {p.feat && <div className="ppb">Recomendado</div>}
                <div className="ppt">{p.tier}</div>
                <h3 className="ppn">{p.name}</h3>
                <p className="ppd">{p.desc}</p>
                <div className="ppp">
                  <span className="ppc2">$</span>
                  <span className="ppa">{formatPriceAR(pr)}</span>
                  <span className="pper">/mes</span>
                </div>
                <div className="ppor">
                  {yr ? (
                    <>
                      <span style={{ textDecoration: "line-through" }}>
                        ${formatPriceAR(p.mo)}
                      </span>
                      <span
                        style={{
                          marginLeft: ".4rem",
                          color: "var(--lm)",
                          fontWeight: 700,
                          textDecoration: "none",
                          fontSize: ".65rem",
                        }}
                      >
                        Ahorrás {sv}%
                      </span>
                    </>
                  ) : (
                    "\u00A0"
                  )}
                </div>
                <div className="ppdv" />
                <ul className="ppfl">
                  {p.fts.map((f, j) => (
                    <li key={j} className={`ppf ${f.y ? "" : "off"}`}>
                      <span className={`fck ${f.y ? "y" : "n"}`}>
                        {f.y ? "✓" : "—"}
                      </span>
                      {f.t}
                    </li>
                  ))}
                </ul>
                <WhatsAppLeadLink
                  className={`ppct ${p.feat ? "pri" : "ol"}`}
                  source="pricing"
                  planLabel={p.name}
                >
                  {p.feat ? "Empezar Ahora" : "Elegir Plan"}
                </WhatsAppLeadLink>
              </div>
            );
          })}
        </div>
        <div ref={br} className={`gu rv ${bv ? "v" : ""}`}>
          {pricingGuarantees.map(([ic, tx], i) => (
            <div key={i} className="gui">
              <span>{ic}</span>
              <span>{tx}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
