import type { Metadata } from "next";
import { Barlow, Bebas_Neue } from "next/font/google";
import { getSiteConfig } from "@/lib/site-config";
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

const site = getSiteConfig();

const keywordList = site.seo.keywords
  ? site.seo.keywords
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean)
  : [];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: site.seo.title,
  description: site.seo.description,
  ...(keywordList.length > 0 ? { keywords: keywordList } : {}),
  alternates: {
    canonical: "/",
  },
  robots: site.seo.indexable
    ? { index: true, follow: true, googleBot: { index: true, follow: true } }
    : {
        index: false,
        follow: false,
        googleBot: { index: false, follow: false },
      },
  openGraph: {
    title: site.seo.title,
    description: site.seo.description,
    locale: "es_AR",
    type: "website",
    url: siteUrl,
    siteName: site.seo.siteName,
    ...(site.seo.ogImageUrl
      ? {
          images: [
            {
              url: site.seo.ogImageUrl,
              width: 1200,
              height: 630,
              alt: site.seo.siteName,
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
    ...(site.seo.ogImageUrl ? { images: [site.seo.ogImageUrl] } : {}),
  },
  icons: {
    icon: site.assets.faviconPath,
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
