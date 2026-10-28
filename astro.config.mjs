import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import cloudflare from "@astrojs/cloudflare";
import tina from "@tinacms/astro/integration";
import { tinaAdminDevRedirect } from "@tinacms/astro/vite";

const siteUrl = process.env.PUBLIC_SITE_URL?.trim() || "http://localhost:4321";

export default defineConfig({
  site: siteUrl,
  output: "static",
  adapter: cloudflare({
    imageService: "compile",
  }),
  vite: {
    plugins: [tinaAdminDevRedirect()],
  },
  integrations: [
    tina(),
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
    sitemap({
      filter: (page) => !page.includes("/admin") && !page.includes("/legal/"),
    }),
    icon(),
  ],
});
