import type { SiteConfig } from "@/lib/site-config";

/**
 * Plantillas en `data.ts` y copy: {{BRAND_NAME}}, {{BRAND_PRIMARY}}, {{BRAND_SECONDARY}}
 */
export function formatBrandText(
  template: string,
  brand: SiteConfig["brand"],
): string {
  return template
    .replace(/\{\{BRAND_NAME\}\}/g, brand.name)
    .replace(/\{\{BRAND_PRIMARY\}\}/g, brand.wordPrimary)
    .replace(/\{\{BRAND_SECONDARY\}\}/g, brand.wordSecondary);
}
