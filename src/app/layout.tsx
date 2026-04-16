import type { Metadata } from "next";
import { Barlow, Bebas_Neue } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-barlow",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Onfit Get Fit — Gym Boutique Premium en Buenos Aires",
  description:
    "Entrenamiento de élite en Buenos Aires. CrossFit, Boxing, HIIT, Yoga y más. +50 clases semanales con coaches certificados.",
  openGraph: {
    title: "Onfit Get Fit — Gym Boutique Premium en Buenos Aires",
    description:
      "Entrenamiento de élite en Buenos Aires. CrossFit, Boxing, HIIT, Yoga y más. +50 clases semanales con coaches certificados.",
    locale: "es_AR",
    type: "website",
    url: siteUrl,
    siteName: "Onfit Get Fit",
  },
  twitter: {
    card: "summary_large_image",
    title: "Onfit Get Fit — Gym Boutique Premium en Buenos Aires",
    description:
      "Entrenamiento de élite en Buenos Aires. CrossFit, Boxing, HIIT, Yoga y más. +50 clases semanales con coaches certificados.",
  },
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${bebasNeue.variable} ${barlow.variable}`}>
        {children}
      </body>
    </html>
  );
}
