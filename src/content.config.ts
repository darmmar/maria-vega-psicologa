import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const services = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/services" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    published: z.boolean().default(true),
    order: z.number().optional(),
    icon: z.string().optional(),
    shortDescription: z.string(),
    ctaLabel: z.string().optional(),
    ctaHref: z.string().optional(),
  }),
});

const resources = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/resources" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    published: z.boolean().default(false),
    featured: z.boolean().default(false),
    publishedAt: z.coerce.date().optional(),
    image: z.string().optional(),
    ctaLabel: z.string().optional(),
    ctaHref: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

const courses = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/courses" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    published: z.boolean().default(false),
    paymentLink: z.string().optional(),
    shortDescription: z.string(),
    image: z.string().optional(),
    ctaLabel: z.string().default("Saber más"),
  }),
});

const faq = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/faq" }),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    order: z.number().optional(),
    category: z.string().optional(),
    published: z.boolean().default(true),
  }),
});

export const collections = { services, resources, courses, faq };
