"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReveal } from "@/lib/hooks";
import { formatBrandText } from "@/lib/brand-placeholders";
import { testimonials } from "@/lib/data";
import { getSiteConfig } from "@/lib/site-config";

export function Testimonials() {
  const brand = getSiteConfig().brand;
  const [cur, setCur] = useState(0);
  const tot = testimonials.length;
  const ir = useRef<ReturnType<typeof setInterval> | null>(null);
  const go = useCallback(
    (n: number) => setCur((n + tot) % tot),
    [tot],
  );
  const nx = useCallback(() => go(cur + 1), [cur, go]);
  const pv = useCallback(() => go(cur - 1), [cur, go]);
  useEffect(() => {
    ir.current = setInterval(nx, 6000);
    return () => {
      if (ir.current) clearInterval(ir.current);
    };
  }, [nx]);
  const rs = () => {
    if (ir.current) clearInterval(ir.current);
    ir.current = setInterval(nx, 6000);
  };
  const [hr, hv] = useReveal();
  const [cr, cv] = useReveal(0.05);
  const tD = testimonials;
  return (
    <section className="TE">
      <div className="SC" style={{ maxWidth: 1200 }}>
        <div ref={hr} className={`te-h rv ${hv ? "v" : ""}`}>
          <div className="ey">
            <span className="eyl" />
            Testimonios
            <span className="eyl" />
          </div>
          <h2 className="st">
            LO QUE DICEN
            <br />
            <span>NUESTROS ATLETAS</span>
          </h2>
          <div className="te-r">
            <div className="te-rs">
              {"★★★★★".split("").map((s, i) => (
                <span key={i}>{s}</span>
              ))}
            </div>
            <span className="te-rt">
              <strong>4.9/5</strong> — +200 reseñas
            </span>
          </div>
        </div>
        <div ref={cr} className={`rv ${cv ? "v" : ""}`}>
          <div className="cw">
            <div
              className="ct2"
              style={{ transform: `translateX(-${cur * 100}%)` }}
            >
              {tD.map((t, i) => (
                <div key={i} className="cs">
                  <div className="tc">
                    <div className="tc-aw">
                      <Image
                        src={t.img}
                        alt={t.name}
                        fill
                        className="tc-av"
                        sizes="130px"
                        unoptimized
                      />
                      <div className="tc-ab" />
                      <div className="tc-ag" />
                    </div>
                    <div>
                      <div className="tc-qm">&quot;</div>
                      <p className="tc-qt">{formatBrandText(t.q, brand)}</p>
                      <div className="tc-ar">
                        <div>
                          <div className="tc-an">{t.name}</div>
                          <div className="tc-ad">{t.det}</div>
                        </div>
                        <div className="tc-as">
                          {"★★★★★".split("").map((s, j) => (
                            <span key={j}>{s}</span>
                          ))}
                        </div>
                        <span className="tc-at">{t.tag}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="ccr">
            <button
              type="button"
              className="cb"
              onClick={() => {
                pv();
                rs();
              }}
            >
              ←
            </button>
            <div className="cds">
              {tD.map((_, i) => (
                <button
                  type="button"
                  key={i}
                  className={`cd ${i === cur ? "on" : ""}`}
                  onClick={() => {
                    go(i);
                    rs();
                  }}
                  aria-label={`Testimonio ${i + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              className="cb"
              onClick={() => {
                nx();
                rs();
              }}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
