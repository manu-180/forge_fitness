"use client";

import { useState } from "react";
import { useReveal } from "@/lib/hooks";
import { scheduleByDay, scheduleDayKeys } from "@/lib/data";

export function Schedule() {
  const [day, setDay] = useState<(typeof scheduleDayKeys)[number]>("LUN");
  const [key, setKey] = useState(0);
  const [hr, hv] = useReveal();
  const [tr, tv] = useReveal(0.05);
  const cls = scheduleByDay[day] || [];
  return (
    <section className="SD" id="horarios">
      <div className="SC" style={{ maxWidth: 1200 }}>
        <div ref={hr} className={`sd-h rv ${hv ? "v" : ""}`}>
          <div className="ey">
            <span className="eyl" />
            Horarios
            <span className="eyl" />
          </div>
          <h2 className="st">
            ENCONTRÁ TU
            <br />
            <span>HORARIO</span>
          </h2>
          <p className="sd-sub">
            +50 clases semanales. Reservá tu lugar con un click.
          </p>
        </div>
        <div className="tbs">
          {scheduleDayKeys.map((d) => (
            <button
              type="button"
              key={d}
              className={`tb ${day === d ? "on" : ""}`}
              onClick={() => {
                setDay(d);
                setKey((k) => k + 1);
              }}
            >
              <span className="tdn">{d}</span>
            </button>
          ))}
        </div>
        <div ref={tr} className={`stb rv ${tv ? "v" : ""}`} key={key}>
          <div className="sth">
            <span>Hora</span>
            <span>Clase</span>
            <span>Duración</span>
            <span>Cupos</span>
            <span />
          </div>
          {cls.map((c, idx) => {
            const fl = c.sp === 0;
            const lo = c.sp > 0 && c.sp / c.tot <= 0.15;
            const fd = Math.round((c.sp / c.tot) * 5);
            return (
              <div
                key={`${day}-${idx}`}
                className="sr"
                style={{
                  animation: `ri .4s var(--eo) ${idx * 0.05}s both`,
                }}
              >
                <span className="sr-t">{c.t}</span>
                <div>
                  <span className="sr-n">
                    <span>{c.i}</span> {c.n}
                  </span>
                  <span className="sr-c">con {c.c}</span>
                </div>
                <span className="sr-d">{c.d}</span>
                <div className="sr-sp">
                  <div className="spd">
                    {[0, 1, 2, 3, 4].map((j) => (
                      <div
                        key={j}
                        className={`sd2 ${j < fd ? (lo ? "wn" : "on") : ""}`}
                      />
                    ))}
                  </div>
                  <span className={`spt ${lo || fl ? "lo" : ""}`}>
                    {fl ? "Lleno" : `${c.sp} left`}
                  </span>
                </div>
                <button type="button" className={`sr-bk ${fl ? "fl" : ""}`}>
                  {fl ? "Espera" : "Reservar"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
