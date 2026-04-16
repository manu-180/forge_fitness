"use client";

import { useReveal } from "@/lib/hooks";
import { footerNav, footerPrograms } from "@/lib/data";

export function Footer() {
  const [r, v] = useReveal(0.05);
  return (
    <footer className="FT">
      <div ref={r} className={`rv ${v ? "v" : ""}`}>
        <div className="FT-m">
          <div>
            <div className="FT-logo">
              <div className="FT-hex">
                <span>F</span>
              </div>
              FORGE <span style={{ color: "var(--lm)" }}>FITNESS</span>
            </div>
            <p className="FT-d">
              Gym boutique premium en Buenos Aires. Entrenamiento de élite,
              comunidad real, resultados medibles.
            </p>
            <div className="FT-s">
              {["📷", "▶️", "💬", "🎵"].map((ic, i) => (
                <button key={i} type="button" className="FT-sb">
                  {ic}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="FT-ct">Navegación</h4>
            <ul className="FT-l">
              {footerNav.map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase()}`} className="FT-lk">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="FT-ct">Programas</h4>
            <ul className="FT-l">
              {footerPrograms.map((p) => (
                <li key={p}>
                  <a href="#programas" className="FT-lk">
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="FT-ct">Contacto</h4>
            {(
              [
                ["📍", "Av. del Libertador 4980\nPalermo, Buenos Aires"],
                ["📞", "+54 11 5555-0000"],
                ["✉️", "info@forgefitness.com"],
                ["🕐", "Lun-Vie: 6:00–22:00\nSáb: 8:00–14:00"],
              ] as const
            ).map(([ic, tx], i) => (
              <div key={i} className="FT-ci">
                <span className="FT-cic">{ic}</span>
                <span className="FT-cit" style={{ whiteSpace: "pre-line" }}>
                  {tx}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="FT-b">
          <span className="FT-cp">
            © 2024 FORGE FITNESS. Todos los derechos reservados.
          </span>
          <div className="FT-bl">
            {["Términos", "Privacidad", "Cookies"].map((l) => (
              <a key={l} href="#" className="FT-blk">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
