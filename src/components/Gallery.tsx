"use client";

import Image from "next/image";
import { useReveal } from "@/lib/hooks";
import { galleryItems } from "@/lib/data";

export function Gallery() {
  const [hr, hv] = useReveal();
  const [gr, gv] = useReveal(0.05);
  const gD = galleryItems;
  return (
    <section className="GA">
      <div className="SC">
        <div ref={hr} className={`GA-h rv ${hv ? "v" : ""}`}>
          <div className="ey">
            <span className="eyl" />
            Nuestro Espacio
            <span className="eyl" />
          </div>
          <h2 className="st">
            CONOCÉ EL
            <br />
            <span>AMBIENTE</span>
          </h2>
        </div>
        <div ref={gr} className="GA-g">
          {gD.map((g, i) => (
            <div
              key={i}
              className={`gi ${g.sp}`}
              style={{
                opacity: gv ? 1 : 0,
                transform: gv ? "scale(1)" : "scale(.97)",
                transition: `all .6s var(--eo) ${gv ? i * 0.07 : 0}s`,
              }}
            >
              <Image
                src={g.src}
                alt={g.lb}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                loading="lazy"
                unoptimized
              />
              <div className="gi-o">
                <span className="gi-l">{g.lb}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
