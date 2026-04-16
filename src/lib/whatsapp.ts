import { getSiteConfig } from "@/lib/site-config";

export function getWhatsAppPhoneDigits(): string {
  const fromEnv = process.env.NEXT_PUBLIC_WHATSAPP_PHONE?.replace(/\D/g, "");
  if (fromEnv) return fromEnv;
  return getSiteConfig().contact.whatsappPhoneDigits.replace(/\D/g, "");
}

export type WhatsAppLeadSource =
  | "hero"
  | "nav"
  | "nav_mobile"
  | "cta_reserva"
  | "cta_whatsapp"
  | "pricing"
  | "footer";

const SOURCES = new Set<WhatsAppLeadSource>([
  "hero",
  "nav",
  "nav_mobile",
  "cta_reserva",
  "cta_whatsapp",
  "pricing",
  "footer",
]);

export function parseLeadSource(raw: string | null): WhatsAppLeadSource {
  if (raw && SOURCES.has(raw as WhatsAppLeadSource)) {
    return raw as WhatsAppLeadSource;
  }
  return "hero";
}

function messageFor(
  source: WhatsAppLeadSource,
  planLabel?: string | null,
): string {
  const brand = getSiteConfig().brand.name;
  switch (source) {
    case "hero":
      return `Hola, vengo desde la web de ${brand} y quiero empezar. ¿Me pueden orientar con los próximos pasos?`;
    case "nav":
      return `Hola, quiero empezar en ${brand}. ¿Me cuentan cómo dar el primer paso?`;
    case "nav_mobile":
      return `Hola, quiero reservar mi clase gratis en ${brand}. ¿Qué horarios tienen disponibles?`;
    case "cta_reserva":
      return `Hola, quiero reservar mi clase gratis en ${brand}. ¿Me confirman disponibilidad y qué necesito llevar?`;
    case "cta_whatsapp":
      return `Hola, quiero hablar por WhatsApp con ${brand} para conocer cómo sumarme y resolver dudas antes de empezar.`;
    case "pricing":
      return `Hola, quiero información del plan "${planLabel ?? "elegido"}" en ${brand}. ¿Me pasan precio vigente (mensual/anual) y medios de pago?`;
    case "footer":
      return `Hola, los contacto desde la web de ${brand}. Necesito ayuda / información.`;
    default:
      return `Hola, quiero información de ${brand}.`;
  }
}

export function buildWhatsAppUrl(
  source: WhatsAppLeadSource,
  planLabel?: string | null,
): string {
  const phone = getWhatsAppPhoneDigits();
  const text = messageFor(source, planLabel);
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function graciasHref(
  source: WhatsAppLeadSource,
  planLabel?: string | null,
): string {
  const q = new URLSearchParams();
  q.set("src", source);
  if (planLabel) q.set("plan", planLabel);
  return `/gracias?${q.toString()}`;
}
