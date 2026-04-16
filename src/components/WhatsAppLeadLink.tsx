"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentPropsWithoutRef, MouseEvent } from "react";
import {
  buildWhatsAppUrl,
  graciasHref,
  type WhatsAppLeadSource,
} from "@/lib/whatsapp";

type Props = {
  source: WhatsAppLeadSource;
  planLabel?: string | null;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href">;

/**
 * En el mismo gesto de clic: abre WhatsApp (web o app vía wa.me) en contexto externo
 * y navega a /gracias en la app. Evita depender solo del popup al cargar la página.
 */
export function WhatsAppLeadLink({
  source,
  planLabel,
  onClick,
  ...rest
}: Props) {
  const router = useRouter();
  const href = graciasHref(source, planLabel ?? undefined);
  const waUrl = buildWhatsAppUrl(source, planLabel);

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    try {
      window.open(waUrl, "_blank", "noopener,noreferrer");
    } catch {
      /* noop */
    }
    onClick?.(e);
    router.push(href);
  }

  return <Link href={href} onClick={handleClick} {...rest} />;
}
