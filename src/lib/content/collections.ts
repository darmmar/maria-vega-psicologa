import { getCollection } from 'astro:content'

export async function getPublishedServices() {
  const services = await getCollection('services', ({ data }) => data.published)
  return services.sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99))
}

export async function getPublishedResources() {
  const resources = await getCollection('resources', ({ data }) => data.published)
  return resources.sort((a, b) => {
    const dateA = a.data.publishedAt?.getTime() ?? 0
    const dateB = b.data.publishedAt?.getTime() ?? 0
    return dateB - dateA
  })
}

export async function getFeaturedResources(limit = 3) {
  const resources = await getCollection(
    'resources',
    ({ data }) => data.published && data.featured
  )
  return resources
    .sort((a, b) => {
      const dateA = a.data.publishedAt?.getTime() ?? 0
      const dateB = b.data.publishedAt?.getTime() ?? 0
      return dateB - dateA
    })
    .slice(0, limit)
}

export async function getPublishedCourses() {
  return getCollection('courses', ({ data }) => data.published)
}

export async function getFaq(category?: string) {
  const items = await getCollection('faq', ({ data }) => data.published)
  const filtered = category ? items.filter((i) => i.data.category === category) : items
  return filtered.sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99))
}

export async function getServiceBySlug(slug: string) {
  const services = await getCollection('services')
  return services.find((s) => s.id === slug || s.data.slug === slug)
}

export async function getResourceBySlug(slug: string) {
  const resources = await getCollection('resources')
  return resources.find((r) => r.id === slug || r.data.slug === slug)
}
