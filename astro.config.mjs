import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

const siteUrl =
  process.env.PUBLIC_SITE_URL?.trim() ||
  "https://mariavegapsicologa.vercel.app";

export default defineConfig({
  site: siteUrl,
  output: "static",
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
    sitemap(),
    icon(),
  ],
});
