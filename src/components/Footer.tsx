"use client";

import { useReveal } from "@/lib/hooks";
import { WhatsAppLeadLink } from "@/components/WhatsAppLeadLink";
import { footerNav, footerPrograms } from "@/lib/data";
import { getInstagramUrl, getTikTokUrl, getXUrl } from "@/lib/config";
import { getGoogleMapsSearchUrl, getSiteConfig } from "@/lib/site-config";

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconWhatsapp({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function IconX({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconTiktok({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.69 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 1 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

function IconPin({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function IconPhone({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <path d="M6.5 3h3l1.5 4.5-2 1.5a11 11 0 0 0 5 5l1.5-2L21 13v3a2 2 0 0 1-2.2 2A17 17 0 0 1 3 5.2 2 2 0 0 1 5 3h1.5z" />
    </svg>
  );
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function IconClock({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 8v4l2.5 2" />
    </svg>
  );
}


export function Footer() {
  const [r, v] = useReveal(0.05);
  const config = getSiteConfig();
  const mapsUrl = getGoogleMapsSearchUrl(config.contact.mapsSearchQuery);
  const contactLines = [
    {
      Icon: IconPin,
      text: config.contact.addressLines,
      mapsUrl,
    },
    {
      Icon: IconPhone,
      text: config.contact.phoneDisplay,
      whatsapp: true as const,
    },
    {
      Icon: IconMail,
      text: config.contact.emailDisplay,
      mailto: config.contact.email,
    },
    {
      Icon: IconClock,
      text: config.contact.hoursLines,
    },
  ];
  return (
    <footer className="FT">
      <div ref={r} className={`rv ${v ? "v" : ""}`}>
        <div className="FT-m">
          <div className="FT-brand">
            <div className="FT-logo">
              <div className="FT-hex">
                <span>{config.brand.logoLetter}</span>
              </div>
              {config.brand.wordPrimary}{" "}
              <span style={{ color: "var(--lm)" }}>
                {config.brand.wordSecondary}
              </span>
            </div>
            <p className="FT-d">{config.brand.taglineShort}</p>
            <ul className="FT-s">
              <li>
                <a
                  href={getInstagramUrl()}
                  className="FT-sb"
                  aria-label="Instagram"
                  {...(getInstagramUrl() !== "#"
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <IconInstagram className="FT-sico" />
                </a>
              </li>
              <li>
                <a
                  href={getXUrl()}
                  className="FT-sb"
                  aria-label="X (Twitter)"
                  {...(getXUrl() !== "#"
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <IconX className="FT-sico" />
                </a>
              </li>
              <li>
                <a
                  href={getTikTokUrl()}
                  className="FT-sb"
                  aria-label="TikTok"
                  {...(getTikTokUrl() !== "#"
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <IconTiktok className="FT-sico" />
                </a>
              </li>
              <li>
                <WhatsAppLeadLink
                  className="FT-sb"
                  source="footer"
                  aria-label="WhatsApp"
                >
                  <IconWhatsapp className="FT-sico" />
                </WhatsAppLeadLink>
              </li>
            </ul>
          </div>
          <nav className="FT-col" aria-label="Navegación del sitio">
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
          </nav>
          <nav className="FT-col" aria-label="Programas">
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
          </nav>
          <div className="FT-contact">
            <h4 className="FT-ct">Contacto</h4>
            <ul className="FT-clist">
              {contactLines.map((line, i) => {
                const { Icon, text } = line;
                const body =
                  "mapsUrl" in line && line.mapsUrl ? (
                    <a
                      href={line.mapsUrl}
                      className="FT-cit"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {text}
                    </a>
                  ) : "whatsapp" in line && line.whatsapp ? (
                    <WhatsAppLeadLink
                      source="footer"
                      className="FT-cit"
                    >
                      {text}
                    </WhatsAppLeadLink>
                  ) : "mailto" in line && line.mailto ? (
                    <a className="FT-cit" href={`mailto:${line.mailto}`}>
                      {text}
                    </a>
                  ) : (
                    <span className="FT-cit">{text}</span>
                  );
                return (
                  <li key={i} className="FT-ci">
                    <span className="FT-ciw" aria-hidden>
                      <Icon className="FT-cico" />
                    </span>
                    {body}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="FT-b">
          <p className="FT-cp">
            © {new Date().getFullYear()} {config.brand.wordPrimary}{" "}
            {config.brand.wordSecondary}. Todos los derechos reservados.
          </p>
          <nav className="FT-bl" aria-label="Legal">
            {["Términos", "Privacidad", "Cookies"].map((l) => (
              <a key={l} href="#" className="FT-blk">
                {l}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
