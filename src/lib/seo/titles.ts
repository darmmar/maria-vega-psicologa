export const SITE_SHORT_NAME = "María Vega";

/** Strip duplicated site / brand suffixes so SeoHead can append `| María Vega` once. */
export function normalizePageTitle(raw: string): string {
  return raw
    .replace(/\s*[—–-]\s*María Vega\b[^|]*/gi, "")
    .replace(/\s*\|\s*María Vega\b[^|]*/gi, "")
    .replace(/\s*\|\s*Psicóloga[^|]*/gi, "")
    .replace(/\bMaría Vega Psicología\b/gi, "")
    .trim();
}

export function buildFullTitle(shortTitle: string, siteName = "María Vega Psicología"): string {
  const pageTitle = normalizePageTitle(shortTitle);

  if (pageTitle === siteName || pageTitle === SITE_SHORT_NAME || pageTitle === "") {
    return SITE_SHORT_NAME;
  }

  return `${pageTitle} | ${SITE_SHORT_NAME}`;
}
