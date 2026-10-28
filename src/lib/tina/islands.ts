import type { IslandConfig, IslandRegistry } from "@tinacms/astro/experimental";
import HomePage from "@/components/tina/HomePage.astro";
import ProfilePage from "@/components/tina/ProfilePage.astro";
import ContactPage from "@/components/tina/ContactPage.astro";
import ServicesPage from "@/components/tina/ServicesPage.astro";
import CoursesPage from "@/components/tina/CoursesPage.astro";
import ResourcesPage from "@/components/tina/ResourcesPage.astro";
import CoursePage from "@/components/tina/CoursePage.astro";
import ResourcePage from "@/components/tina/ResourcePage.astro";
import ServicePage from "@/components/pages/ServicePage.astro";

// Loaders run inside the component so initial rendering and unsaved previews
// share the same code and the helper's request-scoped metadata/overlay stores.
const page = (component: IslandConfig["component"]) => ({
  component,
  fetch: async () => null,
  wrapper: { tag: "main", className: "flex-1" },
  propsFromData: (_data: unknown, params: URLSearchParams) => ({
    preview: true,
    slug: params.get("slug") ?? undefined,
  }),
});

export const islands = {
  home: page(HomePage),
  profile: page(ProfilePage),
  contact: page(ContactPage),
  services: page(ServicesPage),
  courses: page(CoursesPage),
  resources: page(ResourcesPage),
  course: page(CoursePage),
  resource: page(ResourcePage),
  service: page(ServicePage),
} satisfies IslandRegistry;
