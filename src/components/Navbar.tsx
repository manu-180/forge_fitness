"use client";

import { useEffect, useState } from "react";
import { WhatsAppLeadLink } from "@/components/WhatsAppLeadLink";
import { navItems } from "@/lib/data";

export function Navbar() {
  const [sc, setSc] = useState(false);
  const [op, setOp] = useState(false);
  useEffect(() => {
    const f = () => setSc(window.scrollY > 50);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  useEffect(() => {
    document.body.style.overflow = op ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [op]);
  const it = navItems;
  return (
    <>
      <nav className={`N ${sc ? "sc" : ""}`}>
        <a href="#" className="N-logo">
          <div className="N-hex">
            <span>F</span>
          </div>
          FORGE
        </a>
        <ul className="NL">
          {it.map((i) => (
            <li key={i.l}>
              <a href={i.h} className="nl">
                {i.l}
              </a>
            </li>
          ))}
          <li>
            <WhatsAppLeadLink className="nc" source="nav">
              Empezar
            </WhatsAppLeadLink>
          </li>
        </ul>
        <button
          type="button"
          className={`BG ${op ? "op" : ""}`}
          onClick={() => setOp(!op)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
      <div className={`MM ${op ? "op" : ""}`}>
        <ul className="ML">
          {it.map((x, i) => (
            <li key={x.l} className="MI">
              <a
                href={x.h}
                className="ml"
                style={{ transitionDelay: op ? `${i * 0.07}s` : "0s" }}
                onClick={() => setOp(false)}
              >
                {x.l}
                <span className="ln">0{i + 1}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="MF">
          <WhatsAppLeadLink
            className="mc"
            source="nav_mobile"
            onClick={() => setOp(false)}
          >
            Reservá Tu Clase Gratis
          </WhatsAppLeadLink>
          <div className="mi">
            <span>Buenos Aires, ARG</span>
            <span>@forgefitness</span>
          </div>
        </div>
      </div>
    </>
  );
}
