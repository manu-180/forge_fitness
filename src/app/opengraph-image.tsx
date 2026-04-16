import { ImageResponse } from "next/og";
import { getSiteConfig } from "@/lib/site-config";

/** Edge evita prerender en Node donde @vercel/og puede fallar (Invalid URL). */
export const runtime = "edge";

export const alt = "Vista previa social — Forge Fitness";

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

const BEBAS_URL =
  "https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/bebasneue/BebasNeue-Regular.ttf";
const BARLOW_URL =
  "https://cdn.jsdelivr.net/gh/google/fonts@main/ofl/barlow/Barlow-SemiBold.ttf";

export default async function OpenGraphImage() {
  const site = getSiteConfig();

  const [bebasData, barlowData] = await Promise.all([
    fetch(BEBAS_URL).then((r) => r.arrayBuffer()),
    fetch(BARLOW_URL).then((r) => r.arrayBuffer()),
  ]);

  const title = site.seo.siteName || site.brand.name;
  const line1 = `${site.brand.wordPrimary} ${site.brand.wordSecondary}`.trim();
  const desc =
    site.brand.taglineShort.slice(0, 140) +
    (site.brand.taglineShort.length > 140 ? "…" : "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          background: "#0a0a0a",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(125deg, #0a0a0a 0%, #141210 42%, #0d0c08 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 90% 70% at 12% 22%, rgba(245,213,71,0.14), transparent 52%), radial-gradient(ellipse 70% 55% at 88% 78%, rgba(245,213,71,0.08), transparent 50%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 6,
            background: "linear-gradient(180deg, #f5d547, #c9a227)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            padding: "56px 64px 56px 72px",
            zIndex: 1,
            gap: 20,
          }}
        >
          <div
            style={{
              fontFamily: "Barlow",
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "rgba(245,245,240,0.55)",
            }}
          >
            {site.hero.categoryLine}
          </div>
          <div
            style={{
              fontFamily: "Bebas Neue",
              fontSize: 118,
              lineHeight: 0.92,
              letterSpacing: "0.02em",
              textTransform: "uppercase",
              color: "#f5f5f0",
              display: "flex",
              flexWrap: "wrap",
              maxWidth: 980,
            }}
          >
            {line1}
          </div>
          <div
            style={{
              width: 120,
              height: 4,
              borderRadius: 2,
              background: "linear-gradient(90deg, #f5d547, rgba(245,213,71,0.2))",
            }}
          />
          <div
            style={{
              fontFamily: "Barlow",
              fontSize: 28,
              lineHeight: 1.35,
              color: "rgba(245,245,240,0.88)",
              maxWidth: 920,
              fontWeight: 600,
            }}
          >
            {desc}
          </div>
          <div
            style={{
              marginTop: 12,
              fontFamily: "Barlow",
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#f5d547",
            }}
          >
            {title}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Bebas Neue",
          data: bebasData,
          style: "normal",
          weight: 400,
        },
        {
          name: "Barlow",
          data: barlowData,
          style: "normal",
          weight: 600,
        },
      ],
    },
  );
}
