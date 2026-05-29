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
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/servicios" }),
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
    thumbnail: z.string().optional(),
    thumbnailAlt: z.string().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
  }),
});

const resources = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/recursos" }),
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
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/cursos" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    published: z.boolean().default(false),
    paymentLink: z.string().optional(),
    shortDescription: z.string(),
    heroLabel: z.string().optional(),
    audienceIntro: z.string().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    ctaLabel: z.string().default("Saber más"),
  }),
});

const contactPage = defineCollection({
  loader: glob({ pattern: "contact.json", base: "./src/content/contactPage" }),
  schema: z.object({
    seoTitle: z.string(),
    seoDescription: z.string(),
    hero: z.object({
      label: z.string(),
      title: z.string(),
      intro: z.string(),
    }),
    firstConsultation: z.object({
      title: z.string(),
      paragraphs: z.array(z.string()),
      calendarCta: z.object({
        prefix: z.string(),
        linkLabel: z.string(),
        linkHref: z.string(),
        suffix: z.string(),
      }),
    }),
    contactDetails: z.object({
      title: z.string(),
      location: z.string(),
    }),
    formSection: z.object({
      title: z.string(),
      submitLabel: z.string(),
      privacyNote: z.string(),
    }),
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
      image: z.string().optional(),
      imageAlt: z.string().optional(),
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
      ctaHref: z.string(),
    }),
    coursesPage: z.object({
      label: z.string(),
      title: z.string(),
      intro: z.string(),
      seoTitle: z.string(),
      seoDescription: z.string(),
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
      photo: z.string().optional(),
      photoAlt: z.string(),
      secondaryPhoto: z.string().optional(),
      secondaryPhotoAlt: z.string().optional(),
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

const bookingPage = defineCollection({
  loader: glob({ pattern: "booking.json", base: "./src/content/bookingPage" }),
  schema: z.object({
    seoTitle: z.string(),
    seoDescription: z.string(),
    hero: z.object({
      label: z.string(),
      title: z.string(),
      intro: z.string(),
    }),
    sessions: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        duration: z.string(),
        format: z.string(),
        icon: z.string(),
        bookingUrl: z.string(),
        badge: z.string().nullable().optional(),
      })
    ),
    faqItems: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    ),
  }),
});

export const collections = {
  services,
  resources,
  courses,
  faq,
  siteSettings,
  profile,
  contactPage,
  experience,
  training,
  bookingPage,
};
