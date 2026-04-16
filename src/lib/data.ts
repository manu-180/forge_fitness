/**
 * Contenido demo. En textos mostrados al usuario podés usar placeholders
 * {{BRAND_NAME}}, {{BRAND_PRIMARY}}, {{BRAND_SECONDARY}} (ver `formatBrandText`).
 */
export const tickerMotivation = [
  "PUSH YOUR LIMITS",
  "NO EXCUSES",
  "BUILD YOUR BODY",
  "TRAIN INSANE",
  "BECOME UNSTOPPABLE",
  "EVERY REP COUNTS",
  "PAIN IS FUEL",
  "RISE & GRIND",
] as const;

export const tickerCategories = [
  "CROSSFIT",
  "BOXING",
  "HIIT",
  "YOGA FLOW",
  "STRENGTH",
  "FUNCTIONAL",
  "SPINNING",
  "CALISTHENICS",
] as const;

export const tickerReviews = [
  "★★★★★ INCREÍBLE",
  "LOS MEJORES COACHES",
  "★★★★★ CAMBIÓ MI VIDA",
  "VALE CADA PESO",
  "★★★★★ RESULTADOS REALES",
] as const;

export const tickerBadges = [
  "GOOGLE REVIEWS 4.9",
  "TOP 1 GYM BOUTIQUE",
  "500+ MIEMBROS",
  "98% RETENCIÓN",
  "CERTIFICACIÓN INTERNACIONAL",
] as const;

export const navItems = [
  { l: "Programas", h: "#programas" },
  { l: "Coaches", h: "#coaches" },
  { l: "Horarios", h: "#horarios" },
  { l: "Planes", h: "#planes" },
  { l: "Contacto", h: "#contacto" },
] as const;

export const differentiatorCards = [
  {
    n: "01",
    i: "🔥",
    t: "Clases de 45 Min",
    d: "Entrenamientos intensos diseñados para maximizar resultados en menos tiempo.",
  },
  {
    n: "02",
    i: "🎯",
    t: "Coaching 1:1",
    d: "Plan personalizado. Coaches que te guían y empujan a tu máximo potencial.",
  },
  {
    n: "03",
    i: "⚡",
    t: "Tecnología Integrada",
    d: "Heart rate tracking, métricas de progreso y datos que impulsan resultados.",
  },
  {
    n: "04",
    i: "🏗️",
    t: "Equipamiento Premium",
    d: "Lo último en máquinas y equipamiento funcional para atletas exigentes.",
  },
  {
    n: "05",
    i: "🧬",
    t: "Recovery Zone",
    d: "Sauna, crioterapia y stretching. La recuperación es clave.",
  },
  {
    n: "06",
    i: "👥",
    t: "Comunidad Elite",
    d: "Eventos, challenges mensuales y una red de personas con tu visión.",
  },
] as const;

export type CounterStat = {
  v: number;
  s: string;
  l: string;
  raw?: string;
};

export const differentiatorCounters: CounterStat[] = [
  { v: 500, s: "+", l: "Miembros" },
  { v: 12, s: "K", l: "Clases Dictadas" },
  { v: 98, s: "%", l: "Retención" },
  { v: 0, s: "", l: "Rating", raw: "4.9" },
];

export type ProgramItem = {
  name: string;
  icon: string;
  tag: string | null;
  int: number;
  dur: string;
  cal: string;
  desc: string;
  img: string;
};

export const programs: ProgramItem[] = [
  {
    name: "CrossFit",
    icon: "🏋️",
    tag: "Más Popular",
    int: 5,
    dur: "45 min",
    cal: "600-800",
    desc: "Funcional de alta intensidad: gimnasia, halterofilia y cardio.",
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
  },
  {
    name: "Boxing",
    icon: "🥊",
    tag: "Nuevo",
    int: 5,
    dur: "50 min",
    cal: "700-900",
    desc: "Técnica real combinada con cardio explosivo.",
    img: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&q=80",
  },
  {
    name: "HIIT Power",
    icon: "⚡",
    tag: "Intenso",
    int: 5,
    dur: "35 min",
    cal: "500-700",
    desc: "Intervalos de máxima intensidad. El método más eficiente.",
    img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80",
  },
  {
    name: "Strength Lab",
    icon: "💪",
    tag: null,
    int: 4,
    dur: "55 min",
    cal: "400-600",
    desc: "Fuerza periodizada. Masa muscular inteligente.",
    img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80",
  },
  {
    name: "Yoga Flow",
    icon: "🧘",
    tag: null,
    int: 2,
    dur: "60 min",
    cal: "200-350",
    desc: "Flexibilidad, equilibrio y fuerza mental.",
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80",
  },
  {
    name: "Functional",
    icon: "🔥",
    tag: null,
    int: 4,
    dur: "45 min",
    cal: "450-650",
    desc: "Kettlebells, TRX y peso corporal. Resultados reales.",
    img: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=600&q=80",
  },
];

export type CoachItem = {
  name: string;
  role: string;
  spec: string;
  bio: string;
  img: string;
  stats: { e: string; a: string; c: string };
};

export const coaches: CoachItem[] = [
  {
    name: "Marcos Ruiz",
    role: "Head Coach",
    spec: "CrossFit",
    bio: "10 años de experiencia. Ex competidor CrossFit Games Regional.",
    img: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=500&q=80",
    stats: { e: "10+", a: "200+", c: "8" },
  },
  {
    name: "Valentina López",
    role: "Boxing Coach",
    spec: "Boxing",
    bio: "Campeona nacional amateur. Técnica pura + HIIT explosivo.",
    img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&q=80",
    stats: { e: "7", a: "150+", c: "5" },
  },
  {
    name: "Nicolás Ferro",
    role: "Strength Coach",
    spec: "Strength",
    bio: "Powerlifting certificado. Especialista en periodización.",
    img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&q=80",
    stats: { e: "8", a: "180+", c: "6" },
  },
  {
    name: "Camila Duarte",
    role: "Yoga & Recovery",
    spec: "Yoga",
    bio: "Vinyasa y Yin Yoga. Movilidad y recuperación activa.",
    img: "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=500&q=80",
    stats: { e: "6", a: "120+", c: "7" },
  },
];

export type ScheduleRow = {
  t: string;
  n: string;
  i: string;
  c: string;
  d: string;
  sp: number;
  tot: number;
};

export const scheduleByDay: Record<string, ScheduleRow[]> = {
  LUN: [
    {
      t: "07:00",
      n: "CrossFit",
      i: "🏋️",
      c: "Marcos Ruiz",
      d: "45 min",
      sp: 4,
      tot: 20,
    },
    {
      t: "08:00",
      n: "Yoga Flow",
      i: "🧘",
      c: "Camila Duarte",
      d: "60 min",
      sp: 8,
      tot: 15,
    },
    {
      t: "09:30",
      n: "HIIT Power",
      i: "⚡",
      c: "Marcos Ruiz",
      d: "35 min",
      sp: 2,
      tot: 20,
    },
    {
      t: "17:30",
      n: "Boxing",
      i: "🥊",
      c: "Valentina López",
      d: "50 min",
      sp: 0,
      tot: 18,
    },
    {
      t: "18:30",
      n: "CrossFit",
      i: "🏋️",
      c: "Marcos Ruiz",
      d: "45 min",
      sp: 6,
      tot: 20,
    },
    {
      t: "19:30",
      n: "Functional",
      i: "🔥",
      c: "Nicolás Ferro",
      d: "45 min",
      sp: 12,
      tot: 20,
    },
  ],
  MAR: [
    {
      t: "07:00",
      n: "HIIT Power",
      i: "⚡",
      c: "Marcos Ruiz",
      d: "35 min",
      sp: 7,
      tot: 20,
    },
    {
      t: "09:30",
      n: "Boxing",
      i: "🥊",
      c: "Valentina López",
      d: "50 min",
      sp: 3,
      tot: 18,
    },
    {
      t: "17:30",
      n: "CrossFit",
      i: "🏋️",
      c: "Marcos Ruiz",
      d: "45 min",
      sp: 1,
      tot: 20,
    },
    {
      t: "18:30",
      n: "Functional",
      i: "🔥",
      c: "Nicolás Ferro",
      d: "45 min",
      sp: 9,
      tot: 20,
    },
  ],
  MIÉ: [
    {
      t: "07:00",
      n: "CrossFit",
      i: "🏋️",
      c: "Marcos Ruiz",
      d: "45 min",
      sp: 6,
      tot: 20,
    },
    {
      t: "08:00",
      n: "Yoga Flow",
      i: "🧘",
      c: "Camila Duarte",
      d: "60 min",
      sp: 10,
      tot: 15,
    },
    {
      t: "17:30",
      n: "Boxing",
      i: "🥊",
      c: "Valentina López",
      d: "50 min",
      sp: 2,
      tot: 18,
    },
    {
      t: "18:30",
      n: "CrossFit",
      i: "🏋️",
      c: "Marcos Ruiz",
      d: "45 min",
      sp: 0,
      tot: 20,
    },
    {
      t: "19:30",
      n: "Functional",
      i: "🔥",
      c: "Nicolás Ferro",
      d: "45 min",
      sp: 14,
      tot: 20,
    },
  ],
  JUE: [
    {
      t: "07:00",
      n: "HIIT Power",
      i: "⚡",
      c: "Marcos Ruiz",
      d: "35 min",
      sp: 9,
      tot: 20,
    },
    {
      t: "08:00",
      n: "Boxing",
      i: "🥊",
      c: "Valentina López",
      d: "50 min",
      sp: 6,
      tot: 18,
    },
    {
      t: "17:30",
      n: "CrossFit",
      i: "🏋️",
      c: "Marcos Ruiz",
      d: "45 min",
      sp: 3,
      tot: 20,
    },
    {
      t: "19:30",
      n: "Boxing",
      i: "🥊",
      c: "Valentina López",
      d: "50 min",
      sp: 1,
      tot: 18,
    },
  ],
  VIE: [
    {
      t: "07:00",
      n: "CrossFit",
      i: "🏋️",
      c: "Marcos Ruiz",
      d: "45 min",
      sp: 8,
      tot: 20,
    },
    {
      t: "09:30",
      n: "HIIT Power",
      i: "⚡",
      c: "Marcos Ruiz",
      d: "35 min",
      sp: 3,
      tot: 20,
    },
    {
      t: "17:30",
      n: "Boxing",
      i: "🥊",
      c: "Valentina López",
      d: "50 min",
      sp: 5,
      tot: 18,
    },
  ],
  SÁB: [
    {
      t: "08:00",
      n: "CrossFit Open",
      i: "🏋️",
      c: "Marcos Ruiz",
      d: "60 min",
      sp: 5,
      tot: 25,
    },
    {
      t: "09:30",
      n: "Boxing",
      i: "🥊",
      c: "Valentina López",
      d: "50 min",
      sp: 7,
      tot: 18,
    },
    {
      t: "10:30",
      n: "Yoga Flow",
      i: "🧘",
      c: "Camila Duarte",
      d: "60 min",
      sp: 9,
      tot: 15,
    },
  ],
};

export const scheduleDayKeys = ["LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"] as const;

export type PricingFeature = { t: string; y: boolean };

export type PricingPlan = {
  tier: string;
  name: string;
  desc: string;
  mo: number;
  yr: number;
  feat: boolean;
  fts: PricingFeature[];
};

export const pricingPlans: PricingPlan[] = [
  {
    tier: "Starter",
    name: "Essentials",
    desc: "Para quienes arrancan su camino fitness.",
    mo: 25000,
    yr: 20000,
    feat: false,
    fts: [
      { t: "8 clases por mes", y: true },
      { t: "Zona musculación", y: true },
      { t: "App con seguimiento", y: true },
      { t: "1 evaluación corporal", y: true },
      { t: "Clases premium", y: false },
      { t: "Coaching personalizado", y: false },
      { t: "Recovery Zone", y: false },
    ],
  },
  {
    tier: "Más Popular",
    name: "Pro",
    desc: "Acceso completo para resultados reales.",
    mo: 45000,
    yr: 36000,
    feat: true,
    fts: [
      { t: "Clases ilimitadas", y: true },
      { t: "Zona musculación", y: true },
      { t: "App con seguimiento", y: true },
      { t: "Evaluaciones mensuales", y: true },
      { t: "Clases premium", y: true },
      { t: "Coaching personalizado", y: true },
      { t: "Recovery Zone", y: false },
    ],
  },
  {
    tier: "Premium",
    name: "Elite",
    desc: "La experiencia {{BRAND_NAME}} completa. Sin límites.",
    mo: 65000,
    yr: 52000,
    feat: false,
    fts: [
      { t: "Clases ilimitadas", y: true },
      { t: "Musculación 24/7", y: true },
      { t: "App avanzada", y: true },
      { t: "Evaluaciones semanales", y: true },
      { t: "Clases premium", y: true },
      { t: "Coaching 1:1", y: true },
      { t: "Recovery Zone ilimitada", y: true },
    ],
  },
];

export function formatPriceAR(n: number): string {
  return n.toLocaleString("es-AR");
}

export type TestimonialItem = {
  name: string;
  det: string;
  tag: string;
  q: string;
  img: string;
};

export const testimonials: TestimonialItem[] = [
  {
    name: "Martín Aguirre",
    det: "2 años · Plan Pro",
    tag: "CrossFit",
    q: "Probé 5 gyms antes de conocer {{BRAND_NAME}}. La diferencia está en los coaches: te corrigen, te empujan y celebran cada PR. Bajé 12kg.",
    img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=300&q=80",
  },
  {
    name: "Lucía Fernández",
    det: "8 meses · Plan Elite",
    tag: "Boxing",
    q: "El boxing con Valentina es adictivo. Lo mejor es la comunidad: acá no te juzgan, te bancan.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80",
  },
  {
    name: "Santiago Morales",
    det: "1 año · Plan Pro",
    tag: "Strength",
    q: "Vine buscando masa muscular y me fui con disciplina y constancia. Nico sabe periodizar para resultados reales.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
  },
  {
    name: "Carolina Ruiz",
    det: "6 meses · Essentials",
    tag: "Yoga",
    q: "Empecé con yoga pensando que era solo estirar. Camila me mostró que es una disciplina completa.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80",
  },
];

export const experienceTags = [
  "1.200 m²",
  "Equipamiento Rogue",
  "Iluminación dinámica",
  "Sonido envolvente",
  "Recovery Zone",
  "Vestuarios premium",
] as const;

export const experienceStats: [string, string][] = [
  ["1.200 m²", "Superficie"],
  ["22°C", "Climatización"],
  ["JBL Pro", "Sonido"],
  ["DMX", "Iluminación"],
];

export type GalleryItem = { src: string; lb: string; sp: string };

export const galleryItems: GalleryItem[] = [
  {
    src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    lb: "Zona Funcional",
    sp: "gw",
  },
  {
    src: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=80",
    lb: "Peso Libre",
    sp: "",
  },
  {
    src: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&q=80",
    lb: "Cardio Zone",
    sp: "",
  },
  {
    src: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=600&q=80",
    lb: "Boxing Ring",
    sp: "",
  },
  {
    src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80",
    lb: "Recovery",
    sp: "",
  },
  {
    src: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&q=80",
    lb: "Entrenamiento",
    sp: "gw",
  },
];

export const footerPrograms = [
  "CrossFit",
  "Boxing",
  "HIIT Power",
  "Strength Lab",
  "Yoga Flow",
  "Functional",
] as const;

export const footerNav = [
  "Programas",
  "Coaches",
  "Horarios",
  "Planes",
  "Galería",
  "Contacto",
] as const;
