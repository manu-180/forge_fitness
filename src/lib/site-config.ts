/**
 * Configuración central del sitio (white-label / un deploy por cliente en Vercel).
 *
 * - Valores por defecto = cliente actual (Onfit Get Fit).
 * - Override opcional vía JSON en NEXT_PUBLIC_SITE_CONFIG (merge parcial).
 * - Overrides puntuales vía NEXT_PUBLIC_* documentadas en .env.example.
 *
 * Referencias: configuración por tenant en build (Next.js + Vercel env) es el patrón
 * habitual para sitios estáticos por cliente sin base de datos.
 */

export type HomeSectionId =
  | "preloader"
  | "tickerMotivation"
  | "differentiators"
  | "tickerCategories"
  | "programs"
  | "coaches"
  | "schedule"
  | "pricing"
  | "testimonials"
  | "tickerReviews"
  | "tickerBadges"
  | "experience"
  | "gallery"
  | "cta";

export type HomeSections = Record<HomeSectionId, boolean>;

/** Claves válidas para `sections` (documentación y validación JSON) */
export const HOME_SECTION_KEYS: readonly HomeSectionId[] = [
  "preloader",
  "tickerMotivation",
  "differentiators",
  "tickerCategories",
  "programs",
  "coaches",
  "schedule",
  "pricing",
  "testimonials",
  "tickerReviews",
  "tickerBadges",
  "experience",
  "gallery",
  "cta",
] as const;

export type SiteConfig = {
  brand: {
    /** Nombre completo para textos legales y mensajes */
    name: string;
    /** Primera palabra animada (preloader / titular hero) */
    wordPrimary: string;
    /** Segunda palabra (preloader / marca en footer) */
    wordSecondary: string;
    /** Texto compacto en navbar (ej. FORGE) */
    navShort: string;
    /** Letra dentro del hexágono */
    logoLetter: string;
    /** Línea bajo el logo en footer: "FORGE" + accent "FITNESS" */
    taglineShort: string;
    /** @handle sin arroba */
    instagramHandle: string;
    /** Ciudad / país en menú móvil */
    locationLabel: string;
  };
  seo: {
    title: string;
    description: string;
    siteName: string;
    /** Coma-separadas o vacío */
    keywords: string;
    /**
     * Imagen Open Graph / Twitter (ruta bajo `metadataBase` o URL absoluta).
     * Si está vacío, no se envía `og:image` (los crawlers eligen preview por defecto).
     */
    ogImageUrl: string;
    /** Si false: noindex (útil para staging / demo no indexable) */
    indexable: boolean;
  };
  contact: {
    /** Dirección multilínea para UI */
    addressLines: string;
    /** Teléfono mostrado (el de WhatsApp puede ser el mismo) */
    phoneDisplay: string;
    email: string;
    emailDisplay: string;
    hoursLines: string;
    /** Query para enlace Google Maps */
    mapsSearchQuery: string;
    /**
     * Fallback WhatsApp (solo dígitos) si no existe `NEXT_PUBLIC_WHATSAPP_PHONE`.
     * Por cliente: sobreescribir en JSON o env.
     */
    whatsappPhoneDigits: string;
  };
  assets: {
    faviconPath: string;
    /** Ruta bajo /public (ej. /logo-onfit.png). Vacío = hexágono + letra. */
    logoImageSrc: string;
  };
  hero: {
    eyebrowLeft: string;
    eyebrowRight: string;
    categoryLine: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
  };
  preloader: {
    subline: string;
  };
  sections: HomeSections;
};

const DEFAULT_SECTIONS: HomeSections = {
  preloader: true,
  tickerMotivation: true,
  differentiators: true,
  tickerCategories: true,
  programs: true,
  coaches: true,
  schedule: true,
  pricing: true,
  testimonials: true,
  tickerReviews: true,
  tickerBadges: true,
  experience: true,
  gallery: true,
  cta: true,
};

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  brand: {
    name: "Onfit Get Fit",
    wordPrimary: "ONFIT",
    wordSecondary: "GET FIT",
    navShort: "ONFIT",
    logoLetter: "O",
    taglineShort:
      "Gym boutique en Buenos Aires. Entrenamiento con enfoque real: técnica, constancia y resultados.",
    instagramHandle: "onfitgetfit",
    locationLabel: "Buenos Aires, ARG",
  },
  seo: {
    title: "Onfit Get Fit — Gym Boutique Premium en Buenos Aires",
    description:
      "Entrenamiento de élite en Buenos Aires. CrossFit, Boxing, HIIT, Yoga y más. Clases guiadas por coaches certificados.",
    siteName: "Onfit Get Fit",
    keywords:
      "Onfit Get Fit, gym, Buenos Aires, fitness, CrossFit, HIIT, Palermo, entrenamiento",
    ogImageUrl: "",
    indexable: true,
  },
  contact: {
    addressLines: "Av. del Libertador 4980\nPalermo, Buenos Aires",
    phoneDisplay: "11 2484-2720",
    email: "hola@onfitgetfit.com",
    emailDisplay: "hola@onfitgetfit.com",
    hoursLines: "Lun-Vie: 6:00–22:00\nSáb: 8:00–14:00",
    mapsSearchQuery: "Av. del Libertador 4980, Palermo, Buenos Aires, Argentina",
    whatsappPhoneDigits: "5491124842720",
  },
  assets: {
    faviconPath: "/logo-onfit.png",
    logoImageSrc: "/logo-onfit.png",
  },
  hero: {
    eyebrowLeft: "Est. 2024 — Buenos Aires",
    eyebrowRight: "Move smart · Get fit",
    categoryLine: "Gym Boutique Premium — Buenos Aires",
    titleLine1: "ONFIT",
    titleLine2: "GET FIT",
    subtitle:
      "Entrenamiento de élite en un espacio pensado para quienes buscan resultados reales. Sin excusas, sin límites.",
  },
  preloader: {
    subline: "Entrená con intención. Get fit.",
  },
  sections: { ...DEFAULT_SECTIONS },
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function normalizeSectionsPatch(raw: unknown): Partial<HomeSections> {
  if (!isRecord(raw)) return {};
  const out: Partial<HomeSections> = {};
  for (const key of HOME_SECTION_KEYS) {
    if (key in raw && typeof raw[key] === "boolean") {
      out[key] = raw[key];
    }
  }
  return out;
}

function mergePartialSiteConfig(
  base: SiteConfig,
  patch: unknown,
): SiteConfig {
  if (!isRecord(patch)) return base;
  const patchSections = normalizeSectionsPatch(patch.sections);
  const next: SiteConfig = {
    ...base,
    brand: { ...base.brand, ...(isRecord(patch.brand) ? patch.brand : {}) },
    seo: { ...base.seo, ...(isRecord(patch.seo) ? patch.seo : {}) },
    contact: {
      ...base.contact,
      ...(isRecord(patch.contact) ? patch.contact : {}),
    },
    assets: {
      ...base.assets,
      ...(isRecord(patch.assets) ? patch.assets : {}),
    },
    hero: { ...base.hero, ...(isRecord(patch.hero) ? patch.hero : {}) },
    preloader: {
      ...base.preloader,
      ...(isRecord(patch.preloader) ? patch.preloader : {}),
    },
    sections: {
      ...base.sections,
      ...patchSections,
    },
  };
  return next;
}

function parseSiteConfigJson(raw: string | undefined): Partial<SiteConfig> | null {
  if (!raw?.trim()) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "[site-config] NEXT_PUBLIC_SITE_CONFIG debe ser un objeto JSON.",
        );
      }
      return null;
    }
    return parsed as Partial<SiteConfig>;
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[site-config] NEXT_PUBLIC_SITE_CONFIG no es JSON válido:",
        e,
      );
    }
    return null;
  }
}

function trimStr(v: unknown, fallback: string): string {
  if (typeof v !== "string") return fallback;
  const t = v.trim();
  return t || fallback;
}

/** Acepta boolean o strings típicos en JSON mal tipado ("true" / "false") */
function parseBoolLoose(v: unknown, fallback: boolean): boolean {
  if (typeof v === "boolean") return v;
  if (v === "false" || v === "0") return false;
  if (v === "true" || v === "1") return true;
  return fallback;
}

function coerceSections(raw: HomeSections): HomeSections {
  const out = { ...DEFAULT_SECTIONS };
  for (const key of HOME_SECTION_KEYS) {
    const v = raw[key];
    if (typeof v === "boolean") {
      out[key] = v;
    }
  }
  return out;
}

function sanitizeSiteConfig(c: SiteConfig): SiteConfig {
  const d = DEFAULT_SITE_CONFIG;
  const brand = {
    ...c.brand,
    name: trimStr(c.brand.name, d.brand.name),
    wordPrimary: trimStr(c.brand.wordPrimary, d.brand.wordPrimary),
    wordSecondary: trimStr(c.brand.wordSecondary, d.brand.wordSecondary),
    navShort: trimStr(c.brand.navShort, d.brand.navShort),
    logoLetter: (() => {
      const x = trimStr(c.brand.logoLetter, d.brand.logoLetter);
      return (x || d.brand.logoLetter).slice(0, 3);
    })(),
    taglineShort: trimStr(c.brand.taglineShort, d.brand.taglineShort),
    instagramHandle: trimStr(c.brand.instagramHandle, d.brand.instagramHandle).replace(
      /^@/,
      "",
    ),
    locationLabel: trimStr(c.brand.locationLabel, d.brand.locationLabel),
  };
  const seo = {
    ...c.seo,
    title: trimStr(c.seo.title, d.seo.title),
    description: trimStr(c.seo.description, d.seo.description),
    siteName: trimStr(c.seo.siteName, d.seo.siteName),
    keywords: typeof c.seo.keywords === "string" ? c.seo.keywords.trim() : d.seo.keywords,
    ogImageUrl: typeof c.seo.ogImageUrl === "string" ? c.seo.ogImageUrl.trim() : "",
    indexable: parseBoolLoose(c.seo.indexable, d.seo.indexable),
  };
  let email = trimStr(c.contact.email, d.contact.email);
  let emailDisplay = trimStr(c.contact.emailDisplay, d.contact.emailDisplay);
  if (!emailDisplay && email) emailDisplay = email;
  if (!email && emailDisplay) email = emailDisplay;
  const contact = {
    ...c.contact,
    addressLines: trimStr(c.contact.addressLines, d.contact.addressLines),
    phoneDisplay: trimStr(c.contact.phoneDisplay, d.contact.phoneDisplay),
    email,
    emailDisplay: emailDisplay || email,
    hoursLines: trimStr(c.contact.hoursLines, d.contact.hoursLines),
    mapsSearchQuery: trimStr(
      c.contact.mapsSearchQuery,
      d.contact.mapsSearchQuery,
    ),
    whatsappPhoneDigits: String(c.contact.whatsappPhoneDigits ?? "")
      .replace(/\D/g, "") || d.contact.whatsappPhoneDigits,
  };
  const assets = {
    ...c.assets,
    faviconPath: trimStr(c.assets.faviconPath, d.assets.faviconPath),
    logoImageSrc: trimStr(
      c.assets.logoImageSrc ?? "",
      d.assets.logoImageSrc,
    ),
  };
  const hero = {
    ...c.hero,
    eyebrowLeft: trimStr(c.hero.eyebrowLeft, d.hero.eyebrowLeft),
    eyebrowRight: trimStr(c.hero.eyebrowRight, d.hero.eyebrowRight),
    categoryLine: trimStr(c.hero.categoryLine, d.hero.categoryLine),
    titleLine1: trimStr(c.hero.titleLine1, d.hero.titleLine1),
    titleLine2: trimStr(c.hero.titleLine2, d.hero.titleLine2),
    subtitle: trimStr(c.hero.subtitle, d.hero.subtitle),
  };
  const preloader = {
    ...c.preloader,
    subline: trimStr(c.preloader.subline, d.preloader.subline),
  };
  return {
    ...c,
    brand,
    seo,
    contact,
    assets,
    hero,
    preloader,
    sections: coerceSections(c.sections),
  };
}

function envTrim(key: string): string | undefined {
  const v = process.env[key]?.trim();
  return v || undefined;
}

function applyEnvOverrides(c: SiteConfig): SiteConfig {
  let next = c;

  const brandName = envTrim("NEXT_PUBLIC_BRAND_NAME");
  const wordPrimary = envTrim("NEXT_PUBLIC_BRAND_WORD_PRIMARY");
  const wordSecondary = envTrim("NEXT_PUBLIC_BRAND_WORD_SECONDARY");
  const navShort = envTrim("NEXT_PUBLIC_BRAND_NAV_SHORT");
  const logoLetter = envTrim("NEXT_PUBLIC_BRAND_LOGO_LETTER");
  const taglineShort = envTrim("NEXT_PUBLIC_BRAND_TAGLINE_SHORT");
  const instagramHandle = envTrim("NEXT_PUBLIC_INSTAGRAM_HANDLE");
  const locationLabel = envTrim("NEXT_PUBLIC_LOCATION_LABEL");

  if (
    brandName ||
    wordPrimary ||
    wordSecondary ||
    navShort ||
    logoLetter ||
    taglineShort ||
    instagramHandle ||
    locationLabel
  ) {
    next = {
      ...next,
      brand: {
        ...next.brand,
        ...(brandName ? { name: brandName } : {}),
        ...(wordPrimary ? { wordPrimary } : {}),
        ...(wordSecondary ? { wordSecondary } : {}),
        ...(navShort ? { navShort } : {}),
        ...(logoLetter ? { logoLetter } : {}),
        ...(taglineShort ? { taglineShort } : {}),
        ...(instagramHandle ? { instagramHandle } : {}),
        ...(locationLabel ? { locationLabel } : {}),
      },
    };
  }

  const seoTitle = envTrim("NEXT_PUBLIC_SEO_TITLE");
  const seoDescription = envTrim("NEXT_PUBLIC_SEO_DESCRIPTION");
  const seoSiteName = envTrim("NEXT_PUBLIC_SEO_SITE_NAME");
  if (seoTitle || seoDescription || seoSiteName) {
    next = {
      ...next,
      seo: {
        ...next.seo,
        ...(seoTitle ? { title: seoTitle } : {}),
        ...(seoDescription ? { description: seoDescription } : {}),
        ...(seoSiteName ? { siteName: seoSiteName } : {}),
      },
    };
  }

  const addressLines = envTrim("NEXT_PUBLIC_CONTACT_ADDRESS");
  const phoneDisplay = envTrim("NEXT_PUBLIC_CONTACT_PHONE_DISPLAY");
  const email = envTrim("NEXT_PUBLIC_CONTACT_EMAIL");
  const hoursLines = envTrim("NEXT_PUBLIC_CONTACT_HOURS");
  const mapsSearchQuery = envTrim("NEXT_PUBLIC_MAPS_SEARCH_QUERY");
  if (addressLines || phoneDisplay || email || hoursLines || mapsSearchQuery) {
    next = {
      ...next,
      contact: {
        ...next.contact,
        ...(addressLines ? { addressLines } : {}),
        ...(phoneDisplay ? { phoneDisplay } : {}),
        ...(email
          ? { email, emailDisplay: email }
          : {}),
        ...(hoursLines ? { hoursLines } : {}),
        ...(mapsSearchQuery ? { mapsSearchQuery } : {}),
      },
    };
  }

  const faviconPath = envTrim("NEXT_PUBLIC_ASSETS_FAVICON_PATH");
  const logoImageSrc = envTrim("NEXT_PUBLIC_ASSETS_LOGO_IMAGE");
  if (faviconPath || logoImageSrc) {
    next = {
      ...next,
      assets: {
        ...next.assets,
        ...(faviconPath ? { faviconPath } : {}),
        ...(logoImageSrc ? { logoImageSrc } : {}),
      },
    };
  }

  const heroEyebrowLeft = envTrim("NEXT_PUBLIC_HERO_EYEBROW_LEFT");
  const heroEyebrowRight = envTrim("NEXT_PUBLIC_HERO_EYEBROW_RIGHT");
  const heroCategory = envTrim("NEXT_PUBLIC_HERO_CATEGORY_LINE");
  const heroTitle1 = envTrim("NEXT_PUBLIC_HERO_TITLE_LINE_1");
  const heroTitle2 = envTrim("NEXT_PUBLIC_HERO_TITLE_LINE_2");
  const heroSubtitle = envTrim("NEXT_PUBLIC_HERO_SUBTITLE");
  if (
    heroEyebrowLeft ||
    heroEyebrowRight ||
    heroCategory ||
    heroTitle1 ||
    heroTitle2 ||
    heroSubtitle
  ) {
    next = {
      ...next,
      hero: {
        ...next.hero,
        ...(heroEyebrowLeft ? { eyebrowLeft: heroEyebrowLeft } : {}),
        ...(heroEyebrowRight ? { eyebrowRight: heroEyebrowRight } : {}),
        ...(heroCategory ? { categoryLine: heroCategory } : {}),
        ...(heroTitle1 ? { titleLine1: heroTitle1 } : {}),
        ...(heroTitle2 ? { titleLine2: heroTitle2 } : {}),
        ...(heroSubtitle ? { subtitle: heroSubtitle } : {}),
      },
    };
  }

  const preloaderSubline = envTrim("NEXT_PUBLIC_PRELOADER_SUBLINE");
  if (preloaderSubline) {
    next = {
      ...next,
      preloader: { ...next.preloader, subline: preloaderSubline },
    };
  }

  const seoKeywords = envTrim("NEXT_PUBLIC_SEO_KEYWORDS");
  const seoOgImage = envTrim("NEXT_PUBLIC_SEO_OG_IMAGE_URL");
  const seoNoIndex = envTrim("NEXT_PUBLIC_SEO_NO_INDEX");
  if (seoKeywords || seoOgImage || seoNoIndex) {
    next = {
      ...next,
      seo: {
        ...next.seo,
        ...(seoKeywords ? { keywords: seoKeywords } : {}),
        ...(seoOgImage ? { ogImageUrl: seoOgImage } : {}),
        ...(seoNoIndex === "1" || seoNoIndex === "true"
          ? { indexable: false }
          : {}),
      },
    };
  }

  const waDigits = envTrim("NEXT_PUBLIC_CONTACT_WHATSAPP_DIGITS");
  const emailDisplayOnly = envTrim("NEXT_PUBLIC_CONTACT_EMAIL_DISPLAY");
  if (waDigits || emailDisplayOnly) {
    next = {
      ...next,
      contact: {
        ...next.contact,
        ...(waDigits
          ? { whatsappPhoneDigits: waDigits.replace(/\D/g, "") }
          : {}),
        ...(emailDisplayOnly ? { emailDisplay: emailDisplayOnly } : {}),
      },
    };
  }

  return next;
}

let cached: SiteConfig | null = null;

/**
 * Config resuelta en tiempo de build (NEXT_PUBLIC_*). Llama en server o client.
 */
export function getSiteConfig(): SiteConfig {
  if (cached) return cached;
  let config = DEFAULT_SITE_CONFIG;
  const fromJson = parseSiteConfigJson(
    process.env.NEXT_PUBLIC_SITE_CONFIG,
  );
  if (fromJson) {
    config = mergePartialSiteConfig(config, fromJson);
  }
  config = applyEnvOverrides(config);
  config = sanitizeSiteConfig(config);
  cached = config;
  return config;
}

export function getGoogleMapsSearchUrl(query: string): string {
  return (
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(query)
  );
}
