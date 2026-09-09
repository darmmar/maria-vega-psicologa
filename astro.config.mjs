import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import cloudflare from "@astrojs/cloudflare";
import tina from "@tinacms/astro/integration";

const siteUrl =
  process.env.PUBLIC_SITE_URL?.trim() ||
  "https://mariavegagarcia.es";

export default defineConfig({
  site: siteUrl,
  output: "static",
  adapter: cloudflare({
    imageService: "compile",
  }),
  integrations: [
    tina(),
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
    sitemap({
      filter: (page) => !page.includes("/admin"),
    }),
    icon(),
  ],
});
