import { experimental_createIslandRoute } from "@tinacms/astro/experimental";
import { requestWithMetadata } from "@tinacms/astro";
import client from "../../../tina/__generated__/client";
import Hero from "@/components/sections/Hero.astro";

export const prerender = false;

export const POST = experimental_createIslandRoute({
  hero: {
    fetch: () =>
      requestWithMetadata(
        client.queries.siteSettings({ relativePath: "settings.json" }),
        { priority: "primary" }
      ),
    component: Hero,
    wrapper: { tag: "div" },
    propsFromData: (data: any) => ({
      siteSettings: data?.data?.siteSettings,
    }),
  },
});
