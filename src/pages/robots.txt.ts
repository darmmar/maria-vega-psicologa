import type { APIRoute } from "astro";
import { siteConfig } from "@/lib/config/site";

export const GET: APIRoute = () => {
  const sitemapUrl = new URL("/sitemap-index.xml", siteConfig.siteUrl).href;

  const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin/

Sitemap: ${sitemapUrl}
`;

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
