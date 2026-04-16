"use client";

import { useState } from "react";
import { getHeroVideoSrc } from "@/lib/config";
import { WhatsAppLeadLink } from "@/components/WhatsAppLeadLink";
import { getSiteConfig } from "@/lib/site-config";

export function Hero() {
  const [vl, setVl] = useState(false);
  const videoSrc = getHeroVideoSrc();
  const hero = getSiteConfig().hero;
  return (
    <section className="H" id="hero">
      <div className="H-v">
        <video
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setVl(true)}
          style={{ opacity: vl ? 1 : 0, transition: "opacity 1.5s" }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 30% 40%,rgba(245,213,71,.06),transparent 60%),var(--bg)",
            opacity: vl ? 0 : 1,
            transition: "opacity 1.5s",
          }}
        />
      </div>
      <div className="H-o1" />
      <div className="H-o2" />
      <div className="H-in">
        <div className="H-mn">
          <div className="H-si H-sl">{hero.eyebrowLeft}</div>
          <div className="H-si H-sr">{hero.eyebrowRight}</div>
          <div className="H-c">
            <div className="H-ey">
              <span className="H-eyl" />
              {hero.categoryLine}
              <span className="H-eyl" />
            </div>
            <h1 className="H-t">
              <span className="H-tl">
                <span className="H-ti">{hero.titleLine1}</span>
              </span>
              <span className="H-tl">
                <span className="H-ti">{hero.titleLine2}</span>
              </span>
            </h1>
            <p className="H-sub">{hero.subtitle}</p>
            <div className="H-btns">
              <WhatsAppLeadLink className="hb hbp" source="hero">
                Empezar Ahora
              </WhatsAppLeadLink>
              <a className="hb hbo" href="#programas">
                Ver Programas
              </a>
            </div>
          </div>
        </div>
        <div className="H-ft">
          <div className="H-sc">
            <span className="H-sct">Scroll</span>
            <div className="H-scl" />
          </div>
        </div>
      </div>
    </section>
  );
}
