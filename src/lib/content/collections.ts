import { getCollection, type CollectionEntry, type CollectionKey } from "astro:content";
import { editableEntry, type EditableEntry } from "@/lib/tina/content";

async function entries<K extends CollectionKey>(name: K, editing = false): Promise<EditableEntry<K>[]> {
  const local = await getCollection(name);
  return Promise.all(local.map((entry) => editableEntry(entry as CollectionEntry<K>, editing)));
}

async function singleton<K extends CollectionKey>(name: K, editing = false, primary = false): Promise<CollectionEntry<K>["data"]> {
  const [entry] = await getCollection(name);
  if (!entry) throw new Error(`Missing content for ${name}`);
  return (await editableEntry(entry as CollectionEntry<K>, editing, primary)).data;
}

export const getSiteSettings = (editing = false, primary = false) => singleton("siteSettings", editing, primary);
export const getProfile = (editing = false) => singleton("profile", editing, true);
export const getContactPage = (editing = false) => singleton("contactPage", editing, true);
export const getServicesPage = (editing = false) => singleton("servicesPage", editing, true);

const byOrder = (a: { data: { order?: number } }, b: { data: { order?: number } }) =>
  (a.data.order ?? Infinity) - (b.data.order ?? Infinity);

export async function getPublishedExperience(editing = false) {
  return (await entries("experience", editing)).filter((e) => e.data.published).sort(byOrder);
}
export async function getPublishedTraining(editing = false) {
  return (await entries("training", editing)).filter((e) => e.data.published).sort(byOrder);
}
export async function getPublishedServices(editing = false) {
  return (await entries("services", editing)).filter((e) => e.data.published).sort(byOrder);
}
export async function getPublishedResources(editing = false) {
  return (await entries("resources", editing)).filter((e) => e.data.published)
    .sort((a, b) => (b.data.publishedAt?.getTime() ?? 0) - (a.data.publishedAt?.getTime() ?? 0));
}
export async function getFeaturedResources(limit = 3, editing = false) {
  return (await getPublishedResources(editing)).filter((e) => e.data.featured).slice(0, limit);
}
export async function getPublishedCourses(editing = false) {
  return (await entries("courses", editing)).filter((e) => e.data.published);
}

type SlugCollection = "services" | "courses" | "resources";

async function localBySlug<K extends SlugCollection>(name: K, slug: string) {
  const local = await getCollection(name);
  return local.find((e) => e.id === slug || e.data.slug === slug) as CollectionEntry<K> | undefined;
}

export async function hasDocument(name: SlugCollection, slug: string, editing = false) {
  const entry = await localBySlug(name, slug);
  return Boolean(entry && (editing || entry.data.published));
}

async function bySlug<K extends SlugCollection>(name: K, slug: string, editing = false, primary = true) {
  const entry = await localBySlug(name, slug);
  if (!entry || (!editing && !entry.data.published)) return undefined;
  return editableEntry(entry as CollectionEntry<K>, editing, primary);
}
export const getCourseBySlug = (slug: string, editing = false, primary = true) => bySlug("courses", slug, editing, primary);
export const getServiceBySlug = (slug: string, editing = false) => bySlug("services", slug, editing);
export const getResourceBySlug = (slug: string, editing = false) => bySlug("resources", slug, editing);

export async function getFaq(category?: string, editing = false) {
  return (await entries("faq", editing))
    .filter((e) => e.data.published && (!category || e.data.category === category)).sort(byOrder);
}
export async function getServicesForGrid(editing = false) {
  return (await getPublishedServices(editing)).map(({ data }) => ({
    ...data,
    href: `/${data.slug}`,
  }));
}
