"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { WhatsAppLeadLink } from "@/components/WhatsAppLeadLink";
import { navItems } from "@/lib/data";
import { getSiteConfig } from "@/lib/site-config";

function DrawerChevron() {
  return (
    <svg
      className="ml-ch-ic"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg
      className="MM-hr-ic"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg
      className="mc-wa"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function Navbar() {
  const [sc, setSc] = useState(false);
  const [op, setOp] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
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
  useEffect(() => {
    if (!op) return;
    const t = window.setTimeout(() => closeRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOp(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [op]);
  const it = navItems;
  const site = getSiteConfig();
  const { navShort, logoLetter, locationLabel, instagramHandle, name } =
    site.brand;
  const logoImg = site.assets.logoImageSrc.trim();
  const hoursLine = site.contact.hoursLines
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean)
    .join(" · ");
  return (
    <>
      <nav className={`N ${sc ? "sc" : ""}`}>
        <a href="#" className="N-logo">
          {logoImg ? (
            <Image
              src={logoImg}
              alt={name}
              width={36}
              height={36}
              className="N-brandmark"
              priority
            />
          ) : (
            <div className="N-hex">
              <span>{logoLetter}</span>
            </div>
          )}
          {navShort}
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
      <div
        className={`MM ${op ? "op" : ""}`}
        aria-hidden={!op}
      >
        <button
          type="button"
          className="MM-scrim"
          tabIndex={-1}
          aria-label="Cerrar menú"
          onClick={() => setOp(false)}
        />
        <aside
          className="MM-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={(e) => e.stopPropagation()}
        >
          <header className="MM-head">
            <div className="MM-brand">
              <p id={titleId} className="MM-title">
                {name}
              </p>
              <p className="MM-sub">{site.hero.categoryLine}</p>
            </div>
            <button
              ref={closeRef}
              type="button"
              className="MM-close"
              aria-label="Cerrar menú"
              onClick={() => setOp(false)}
            >
              <span className="MM-x1" aria-hidden />
              <span className="MM-x2" aria-hidden />
            </button>
          </header>
          <div className="MM-rule" aria-hidden />
          <div className="MM-scroll">
            <ul className="ML">
              {it.map((x, i) => (
                <li key={x.l} className="MI">
                  <a
                    href={x.h}
                    className="ml"
                    style={{
                      transitionDelay: op ? `${Math.min(i, 8) * 0.04}s` : "0s",
                    }}
                    onClick={() => setOp(false)}
                  >
                    <span>{x.l}</span>
                    <span className="ml-ch">
                      <DrawerChevron />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="MM-foot">
            <WhatsAppLeadLink
              className="mc mc-drawer"
              source="nav_mobile"
              onClick={() => setOp(false)}
            >
              <IconWhatsApp />
              Reservar por WhatsApp
            </WhatsAppLeadLink>
            <p className="MM-hours">
              <IconClock />
              <span>{hoursLine}</span>
            </p>
            <div className="MM-meta">
              <span>{locationLabel}</span>
              <span className="MM-meta-sep" aria-hidden>
                ·
              </span>
              <span>@{instagramHandle}</span>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
