import { defineConfig } from "tinacms";

export default defineConfig({
  branch:
    process.env.GITHUB_BRANCH ?? process.env.HEAD ?? "feat/initial-astro-website",
  clientId: process.env.TINA_CLIENT_ID ?? null,
  token: process.env.TINA_TOKEN ?? null,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      // SERVICIOS
      {
        name: "services",
        label: "Servicios terapéuticos",
        path: "src/content/services",
        format: "mdx",
        ui: {
          filename: {
            readonly: true,
            slugify: (values) => values?.slug ?? "",
          },
        },
        fields: [
          { type: "string", name: "title", label: "Título", required: true },
          { type: "string", name: "slug", label: "Slug URL", required: true },
          {
            type: "string",
            name: "description",
            label: "Descripción",
            required: true,
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "shortDescription",
            label: "Descripción breve (para cards)",
            required: true,
            ui: { component: "textarea" },
          },
          { type: "string", name: "seoTitle", label: "Título SEO" },
          {
            type: "string",
            name: "seoDescription",
            label: "Descripción SEO",
            ui: { component: "textarea" },
          },
          { type: "boolean", name: "published", label: "Publicado" },
          { type: "number", name: "order", label: "Orden" },
          { type: "string", name: "icon", label: "Icono (emoji)" },
          { type: "string", name: "ctaLabel", label: "Texto del botón CTA" },
          { type: "string", name: "ctaHref", label: "Enlace del botón CTA" },
          { type: "rich-text", name: "body", label: "Contenido", isBody: true },
        ],
      },

      // RECURSOS
      {
        name: "resources",
        label: "Recursos psicoeducativos",
        path: "src/content/resources",
        format: "mdx",
        ui: {
          filename: {
            readonly: true,
            slugify: (values) => values?.slug ?? "",
          },
        },
        fields: [
          { type: "string", name: "title", label: "Título", required: true },
          { type: "string", name: "slug", label: "Slug URL", required: true },
          {
            type: "string",
            name: "description",
            label: "Descripción",
            required: true,
            ui: { component: "textarea" },
          },
          { type: "string", name: "seoTitle", label: "Título SEO" },
          {
            type: "string",
            name: "seoDescription",
            label: "Descripción SEO",
            ui: { component: "textarea" },
          },
          { type: "boolean", name: "published", label: "Publicado" },
          { type: "boolean", name: "featured", label: "Destacado" },
          {
            type: "datetime",
            name: "publishedAt",
            label: "Fecha de publicación",
          },
          {
            type: "string",
            name: "image",
            label: "Imagen (ruta en public/images/)",
          },
          {
            type: "string",
            name: "tags",
            label: "Etiquetas",
            list: true,
            ui: { component: "tags" },
          },
          { type: "string", name: "ctaLabel", label: "Texto del botón CTA" },
          { type: "string", name: "ctaHref", label: "Enlace del botón CTA" },
          { type: "rich-text", name: "body", label: "Contenido", isBody: true },
        ],
      },

      // CURSOS
      {
        name: "courses",
        label: "Cursos",
        path: "src/content/courses",
        format: "mdx",
        fields: [
          { type: "string", name: "title", label: "Título", required: true },
          { type: "string", name: "slug", label: "Slug URL", required: true },
          {
            type: "string",
            name: "description",
            label: "Descripción",
            required: true,
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "shortDescription",
            label: "Descripción breve",
            required: true,
            ui: { component: "textarea" },
          },
          { type: "string", name: "seoTitle", label: "Título SEO" },
          {
            type: "string",
            name: "seoDescription",
            label: "Descripción SEO",
            ui: { component: "textarea" },
          },
          { type: "boolean", name: "published", label: "Publicado" },
          {
            type: "string",
            name: "paymentLink",
            label: "Enlace de pago (Stripe Payment Link)",
          },
          { type: "string", name: "image", label: "Imagen" },
          { type: "string", name: "ctaLabel", label: "Texto del botón CTA" },
          { type: "rich-text", name: "body", label: "Contenido", isBody: true },
        ],
      },

      // FAQ
      {
        name: "faq",
        label: "Preguntas frecuentes",
        path: "src/content/faq",
        format: "json",
        fields: [
          {
            type: "string",
            name: "question",
            label: "Pregunta",
            required: true,
          },
          {
            type: "string",
            name: "answer",
            label: "Respuesta",
            required: true,
            ui: { component: "textarea" },
          },
          { type: "number", name: "order", label: "Orden" },
          { type: "string", name: "category", label: "Categoría" },
          { type: "boolean", name: "published", label: "Publicado" },
        ],
      },
    ],
  },
});
