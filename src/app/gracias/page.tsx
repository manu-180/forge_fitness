import type { Metadata } from "next";
import { Suspense } from "react";
import { getSiteConfig } from "@/lib/site-config";
import { GraciasClient } from "./GraciasClient";

export function generateMetadata(): Metadata {
  const site = getSiteConfig();
  return {
    title: `¡Gracias! — ${site.brand.name}`,
    description: `Te redirigimos a WhatsApp para continuar tu contacto con ${site.brand.name}.`,
  };
}

function GraciasFallback() {
  return (
    <main
      className="GR"
      style={{ minHeight: "100dvh", display: "grid", placeItems: "center" }}
    >
      <div
        className="GR-bg"
        style={{ opacity: 1 }}
        aria-hidden
      />
      <p className="GR-tx" style={{ position: "relative", zIndex: 2 }}>
        Cargando…
      </p>
    </main>
  );
}

export default function GraciasPage() {
  return (
    <Suspense fallback={<GraciasFallback />}>
      <GraciasClient />
    </Suspense>
  );
}
