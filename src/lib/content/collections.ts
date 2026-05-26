import { getCollection } from "astro:content";

export async function getSiteSettings() {
  const items = await getCollection("siteSettings");
  const settings = items[0]?.data;
  if (!settings) {
    throw new Error("Missing site settings at src/content/siteSettings/settings.json");
  }
  return settings;
}

export async function getProfile() {
  const items = await getCollection("profile");
  const profile = items[0]?.data;
  if (!profile) {
    throw new Error("Missing profile at src/content/profile/profile.json");
  }
  return profile;
}

export async function getContactPage() {
  const items = await getCollection("contactPage");
  const page = items[0]?.data;
  if (!page) {
    throw new Error("Missing contact page at src/content/contactPage/contact.json");
  }
  return page;
}

export async function getPublishedExperience() {
  const items = await getCollection("experience", ({ data }) => data.published);
  return items.sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));
}

export async function getPublishedTraining() {
  const items = await getCollection("training", ({ data }) => data.published);
  return items.sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));
}

export async function getPublishedServices() {
  const services = await getCollection("services", ({ data }) => data.published);
  return services.sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));
}

export async function getPublishedResources() {
  const resources = await getCollection("resources", ({ data }) => data.published);
  return resources.sort((a, b) => {
    const dateA = a.data.publishedAt?.getTime() ?? 0;
    const dateB = b.data.publishedAt?.getTime() ?? 0;
    return dateB - dateA;
  });
}

export async function getFeaturedResources(limit = 3) {
  const resources = await getCollection("resources", ({ data }) => data.published && data.featured);
  return resources
    .sort((a, b) => {
      const dateA = a.data.publishedAt?.getTime() ?? 0;
      const dateB = b.data.publishedAt?.getTime() ?? 0;
      return dateB - dateA;
    })
    .slice(0, limit);
}

export async function getPublishedCourses() {
  return getCollection("courses", ({ data }) => data.published);
}

export async function getCourseBySlug(slug: string) {
  const courses = await getCollection("courses");
  return courses.find((c) => c.id === slug || c.data.slug === slug);
}

export async function getFaq(category?: string) {
  const items = await getCollection("faq", ({ data }) => data.published);
  const filtered = category ? items.filter((i) => i.data.category === category) : items;
  return filtered.sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));
}

export async function getServiceBySlug(slug: string) {
  const services = await getCollection("services");
  return services.find((s) => s.id === slug || s.data.slug === slug);
}

export async function getServicesForGrid() {
  const services = await getPublishedServices();
  return services.map((service) => ({
    title: service.data.title,
    shortDescription: service.data.shortDescription,
    href: `/${service.data.slug}`,
    icon: service.data.icon,
    thumbnail: service.data.thumbnail,
    thumbnailAlt: service.data.thumbnailAlt,
  }));
}

export async function getResourceBySlug(slug: string) {
  const resources = await getCollection("resources");
  return resources.find((r) => r.id === slug || r.data.slug === slug);
}
