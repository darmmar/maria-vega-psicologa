import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const ctaLinkSchema = z.object({
  label: z.string(),
  href: z.string(),
});

const pillarSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string(),
});

const sectionHeadingSchema = z.object({
  label: z.string(),
  title: z.string(),
});

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

const siteSettings = defineCollection({
  loader: glob({ pattern: "settings.json", base: "./src/content/siteSettings" }),
  schema: z.object({
    hero: z.object({
      label: z.string(),
      title: z.string(),
      description: z.string(),
      primaryCta: ctaLinkSchema,
      secondaryCta: ctaLinkSchema,
      badges: z.array(z.string()),
      imagePlaceholder: z.string(),
    }),
    therapyApproach: z.object({
      label: z.string(),
      title: z.string(),
      description: z.string(),
      pillars: z.array(pillarSchema),
    }),
    servicesSection: sectionHeadingSchema,
    experienceSection: sectionHeadingSchema,
    trainingSection: sectionHeadingSchema.extend({
      clinicalTitle: z.string(),
      complementaryTitle: z.string(),
    }),
    cta: ctaLinkSchema.extend({
      title: z.string(),
      description: z.string(),
    }),
    courseHighlight: z.object({
      label: z.string(),
      ctaLabel: z.string(),
    }),
  }),
});

const profile = defineCollection({
  loader: glob({ pattern: "profile.json", base: "./src/content/profile" }),
  schema: z.object({
    hero: z.object({
      label: z.string(),
      title: z.string(),
      intro: z.array(z.string()),
      photoAlt: z.string(),
      photoPlaceholder: z.string(),
    }),
    approach: z.object({
      label: z.string(),
      title: z.string(),
      paragraphs: z.array(z.string()),
    }),
    cta: ctaLinkSchema.extend({
      title: z.string(),
      description: z.string(),
    }),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/experience" }),
  schema: z.object({
    area: z.string(),
    order: z.number().optional(),
    published: z.boolean().default(true),
  }),
});

const training = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/training" }),
  schema: z.object({
    degree: z.string(),
    institution: z.string(),
    year: z.string().optional(),
    category: z.enum(["clinical", "complementary"]),
    order: z.number().optional(),
    published: z.boolean().default(true),
  }),
});

export const collections = {
  services,
  resources,
  courses,
  faq,
  siteSettings,
  profile,
  experience,
  training,
};
