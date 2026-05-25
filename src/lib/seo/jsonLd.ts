import { siteConfig } from "@/lib/config/site";
import type { BreadcrumbItem, FaqItem, JsonLdDocument, JsonLdNode } from "./types";

export const PERSON_ID = `${siteConfig.siteUrl}/#person`;
export const WEBSITE_ID = `${siteConfig.siteUrl}/#website`;

export function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.siteUrl).href;
}

function optionalContactFields(): Partial<Pick<JsonLdNode, "email" | "telephone">> {
  return {
    ...(siteConfig.contact.email && { email: siteConfig.contact.email }),
    ...(siteConfig.contact.phone && { telephone: siteConfig.contact.phone }),
  };
}

function workLocation(): JsonLdNode {
  return {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.province,
      addressCountry: "ES",
    },
  };
}

export function buildPerson(options?: {
  url?: string;
  description?: string;
}): JsonLdNode {
  const sameAs = [
    siteConfig.contact.instagram,
    siteConfig.contact.linkedin,
  ].filter(Boolean) as string[];

  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: siteConfig.professionalName,
    jobTitle: siteConfig.professionalTitle,
    url: options?.url ?? absoluteUrl("/conoceme"),
    description: options?.description ?? siteConfig.description,
    ...optionalContactFields(),
    ...(sameAs.length > 0 && { sameAs }),
    workLocation: workLocation(),
  };
}

export function buildWebSite(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: siteConfig.siteName,
    url: siteConfig.siteUrl,
    description: siteConfig.description,
    inLanguage: "es-ES",
    publisher: { "@id": PERSON_ID },
  };
}

export function buildProfessionalService(options: {
  name: string;
  description: string;
  url: string;
  serviceType?: string;
}): JsonLdNode {
  return {
    "@type": "ProfessionalService",
    "@id": `${options.url}#service`,
    name: options.name,
    description: options.description,
    url: options.url,
    provider: { "@id": PERSON_ID },
    areaServed: {
      "@type": "City",
      name: siteConfig.location.city,
    },
    ...(options.serviceType && { serviceType: options.serviceType }),
  };
}

export function buildBreadcrumbList(items: BreadcrumbItem[]): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : absoluteUrl(item.url),
    })),
  };
}

export function buildArticle(options: {
  title: string;
  description: string;
  url: string;
  datePublished?: Date;
  image?: string;
  tags?: string[];
}): JsonLdNode {
  return {
    "@type": "Article",
    headline: options.title,
    description: options.description,
    url: options.url,
    inLanguage: "es-ES",
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    mainEntityOfPage: options.url,
    ...(options.datePublished && {
      datePublished: options.datePublished.toISOString(),
    }),
    ...(options.image && { image: options.image }),
    ...(options.tags &&
      options.tags.length > 0 && { keywords: options.tags.join(", ") }),
  };
}

export function buildFAQPage(faqs: FaqItem[]): JsonLdNode {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildCourse(options: {
  name: string;
  description: string;
  url: string;
}): JsonLdNode {
  return {
    "@type": "Course",
    "@id": `${options.url}#course`,
    name: options.name,
    description: options.description,
    url: options.url,
    inLanguage: "es-ES",
    provider: { "@id": PERSON_ID },
  };
}

export function buildJsonLdGraph(...nodes: JsonLdNode[]): JsonLdDocument {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}

export function buildServicePageJsonLd(options: {
  title: string;
  description: string;
  path: string;
}): JsonLdDocument {
  const url = absoluteUrl(options.path);

  return buildJsonLdGraph(
    buildPerson(),
    buildProfessionalService({
      name: options.title,
      description: options.description,
      url,
      serviceType: options.title,
    }),
    buildBreadcrumbList([
      { name: "Inicio", url: "/" },
      { name: options.title, url: options.path },
    ]),
  );
}
