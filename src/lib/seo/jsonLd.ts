import { siteConfig } from "@/lib/config/site";
import type { BreadcrumbItem, FaqItem, JsonLdDocument, JsonLdNode } from "./types";

export const PERSON_ID = `${siteConfig.siteUrl}/#person`;
export const WEBSITE_ID = `${siteConfig.siteUrl}/#website`;
export const BUSINESS_ID = `${siteConfig.siteUrl}/#business`;

export function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.siteUrl).href;
}

export type SeoBusinessOverrides = {
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  googleMapsLink?: string | null;
  collegiateNumber?: string | null;
  businessName?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
};

export function buildMedicalBusiness(overrides?: SeoBusinessOverrides): JsonLdNode {
  const address = overrides?.address || siteConfig.legal.address || "Calle Zamarrilla 15, Málaga";
  const phone = overrides?.phone || siteConfig.contact.phone;
  const email = overrides?.email || siteConfig.contact.email;
  const mapsLink = overrides?.googleMapsLink || `https://maps.google.com/?q=${encodeURIComponent(address)}`;

  return {
    "@type": ["MedicalBusiness", "LocalBusiness"],
    "@id": BUSINESS_ID,
    name: overrides?.businessName || siteConfig.siteName,
    url: siteConfig.siteUrl,
    description: siteConfig.description,
    medicalSpecialty: ["Psychology", "Clinical"],
    currenciesAccepted: "EUR",
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.province,
      postalCode: "29007",
      addressCountry: "ES",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 36.7205169,
      longitude: -4.4372102,
    },
    ...(mapsLink && { hasMap: mapsLink }),
    areaServed: [
      {
        "@type": "City",
        name: siteConfig.location.city,
      },
      {
        "@type": "Country",
        name: "España",
      },
    ],
    founder: { "@id": PERSON_ID },
    employee: { "@id": PERSON_ID },
    ...(email && { email }),
    ...(phone && { telephone: phone }),
  };
}

export function buildPerson(options?: {
  url?: string;
  description?: string;
  overrides?: SeoBusinessOverrides;
}): JsonLdNode {
  const address = options?.overrides?.address || siteConfig.legal.address || "Calle Zamarrilla 15, Málaga";
  const phone = options?.overrides?.phone || siteConfig.contact.phone;
  const email = options?.overrides?.email || siteConfig.contact.email;
  const collegiateNumber =
    options?.overrides?.collegiateNumber || siteConfig.legal.collegiateNumber || "AO-10293";
  const instagram = options?.overrides?.instagram || siteConfig.contact.instagram;
  const linkedin = options?.overrides?.linkedin || siteConfig.contact.linkedin;

  const sameAs = [instagram, linkedin].filter(Boolean) as string[];

  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: siteConfig.professionalName,
    jobTitle: siteConfig.professionalTitle,
    url: options?.url ?? absoluteUrl("/conoceme"),
    description: options?.description ?? siteConfig.description,
    worksFor: { "@id": BUSINESS_ID },
    knowsAbout: [
      "Psicología Clínica",
      "Psicología General Sanitaria",
      "Terapia de Aceptación y Compromiso (ACT)",
      "Tratamiento de la Ansiedad",
      "Acompañamiento en el Duelo",
      "Terapia Online",
    ],
    ...(collegiateNumber && {
      identifier: collegiateNumber,
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "degree",
        name: "Psicóloga General Sanitaria",
        recognizedBy: {
          "@type": "Organization",
          name: "Colegio Oficial de Psicología de Andalucía Oriental",
        },
      },
    }),
    ...(email && { email }),
    ...(phone && { telephone: phone }),
    ...(sameAs.length > 0 && { sameAs }),
    workLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: address,
        addressLocality: siteConfig.location.city,
        addressRegion: siteConfig.location.province,
        postalCode: "29007",
        addressCountry: "ES",
      },
    },
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
    "@type": ["PsychologicalService", "ProfessionalService"],
    "@id": `${options.url}#service`,
    name: options.name,
    description: options.description,
    url: options.url,
    provider: { "@id": BUSINESS_ID },
    areaServed: [
      {
        "@type": "City",
        name: siteConfig.location.city,
      },
      {
        "@type": "Country",
        name: "España",
      },
    ],
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
  dateModified?: Date;
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
    ...(options.dateModified && {
      dateModified: options.dateModified.toISOString(),
    }),
    ...(options.image && { image: options.image }),
    ...(options.tags && options.tags.length > 0 && { keywords: options.tags.join(", ") }),
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
    buildMedicalBusiness(),
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
    ])
  );
}
