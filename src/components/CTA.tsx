"use client";

import type { SVGProps } from "react";
import { WhatsAppLeadLink } from "@/components/WhatsAppLeadLink";
import { formatBrandText } from "@/lib/brand-placeholders";
import { useReveal } from "@/lib/hooks";
import { getSiteConfig } from "@/lib/site-config";

function IconBolt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M11.25 1.75 3 12.75h6.75L8.25 22.25 21 9.25h-6.75L16.75 1.75h-5.5Z" />
    </svg>
  );
}

export function CTA() {
  const [r, v] = useReveal(0.1);
  const brand = getSiteConfig().brand;
  const ctaBody = formatBrandText(
    "Tu primera clase es gratis. Sin compromiso, sin letra chica. Vení, entrená y sentí la diferencia {{BRAND_PRIMARY}}.",
    brand,
  );
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
        <p className="CT-sub">{ctaBody}</p>
        <div className="CT-bs">
          <WhatsAppLeadLink className="CT-bm" source="cta_reserva">
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.45rem",
              }}
            >
              <IconBolt width={16} height={16} style={{ flexShrink: 0 }} />
              Reservá Tu Clase Gratis
            </span>
          </WhatsAppLeadLink>
          <WhatsAppLeadLink className="CT-bs2" source="cta_whatsapp">
            Hablar por WhatsApp
          </WhatsAppLeadLink>
        </div>
      </div>
    </section>
  );
}
