"use client";

import { useReveal } from "@/lib/hooks";
import { ctaTrust } from "@/lib/data";

export function CTA() {
  const [r, v] = useReveal(0.1);
  return (
    <section className="CT" id="contacto">
      <div
        id="join"
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          overflow: "hidden",
          clip: "rect(0,0,0,0)",
        }}
        aria-hidden
      />
      <div className="CT-bg">
        <div className="CT-gr" />
        <div className="CT-o CT-o1" />
        <div className="CT-o CT-o2" />
        <div className="CT-gl" />
      </div>
      <div ref={r} className={`CT-ct rv ${v ? "v" : ""}`}>
        <div className="ey" style={{ justifyContent: "center" }}>
          <span className="eyl" />
          Tu transformación empieza hoy
          <span className="eyl" />
        </div>
        <h2 className="CT-t">
          DEJÁ DE
          <br />
          <span className="CT-tl">PENSARLO</span>
        </h2>
        <p className="CT-sub">
          Tu primera clase es gratis. Sin compromiso, sin letra chica. Vení,
          entrená y sentí la diferencia FORGE.
        </p>
        <div className="CT-bs">
          <button type="button" className="CT-bm">
            ⚡ Reservá Tu Clase Gratis
          </button>
          <button type="button" className="CT-bs2">
            Hablar por WhatsApp
          </button>
        </div>
        <div className="CT-tr">
          {ctaTrust.map(([ic, tx], i) => (
            <span key={i} className="CT-ti">
              <span>{ic}</span>
              {tx}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
