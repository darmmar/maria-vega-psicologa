import { defineConfig } from "tinacms";

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ??
  process.env.GITHUB_BRANCH ??
  process.env.VERCEL_GIT_COMMIT_REF ??
  process.env.HEAD ??
  "main";

const clientId =
  process.env.NEXT_PUBLIC_TINA_CLIENT_ID ?? process.env.TINA_CLIENT_ID ?? null;

const imageFieldUi = {
  format(value: string) {
    if (!value) return value;
    if (value.startsWith("/")) return value;
    if (value.startsWith("images/")) return `/${value}`;
    return `/images/${value}`;
  },
  parse(value: string) {
    if (!value) return value;
    return value.startsWith("/") ? value.slice(1) : value;
  },
};

const ctaLinkFields = [
  { type: "string" as const, name: "label", label: "Texto del botón", required: true },
  { type: "string" as const, name: "href", label: "Enlace", required: true },
];

const singletonUi = {
  allowedActions: {
    create: false,
    delete: false,
  },
};

export default defineConfig({
  branch,
  clientId,
  token: process.env.TINA_TOKEN ?? null,

  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_TOKEN,
      stopwordLanguages: ["spa", "eng"],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "images",
      static: false,
    },
    accept: ["image/*"],
  },

  schema: {
    collections: [
      {
        name: "siteSettings",
        label: "Ajustes del inicio",
        path: "src/content/siteSettings",
        format: "json",
        ui: singletonUi,
        fields: [
          {
            type: "object",
            name: "hero",
            label: "Inicio — sección principal (hero)",
            fields: [
              { type: "string", name: "label", label: "Etiqueta superior", required: true },
              { type: "string", name: "title", label: "Título principal", required: true },
              {
                type: "string",
                name: "description",
                label: "Descripción",
                required: true,
                ui: { component: "textarea" },
              },
              {
                type: "object",
                name: "primaryCta",
                label: "Botón principal",
                fields: ctaLinkFields,
              },
              {
                type: "object",
                name: "secondaryCta",
                label: "Botón secundario",
                fields: ctaLinkFields,
              },
              {
                type: "string",
                name: "badges",
                label: "Frases de confianza (badges)",
                list: true,
              },
              {
                type: "image",
                name: "image",
                label: "Foto principal (opcional)",
                ui: imageFieldUi,
              },
              {
                type: "string",
                name: "imageAlt",
                label: "Texto alternativo de la foto (SEO y accesibilidad)",
                description:
                  "Describe la imagen para Google y lectores de pantalla. Ej.: «María Vega, psicóloga en su consulta en Málaga».",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "imagePlaceholder",
                label: "Texto del marcador (si no hay foto)",
              },
            ],
          },
          {
            type: "object",
            name: "therapyApproach",
            label: "Inicio — enfoque terapéutico",
            fields: [
              { type: "string", name: "label", label: "Etiqueta superior", required: true },
              { type: "string", name: "title", label: "Título", required: true },
              {
                type: "string",
                name: "description",
                label: "Descripción",
                required: true,
                ui: { component: "textarea" },
              },
              {
                type: "object",
                name: "pillars",
                label: "Pilares del enfoque",
                list: true,
                fields: [
                  { type: "string", name: "title", label: "Título", required: true },
                  {
                    type: "string",
                    name: "description",
                    label: "Descripción",
                    required: true,
                    ui: { component: "textarea" },
                  },
                  {
                    type: "string",
                    name: "icon",
                    label: "Icono (lucide, ej. lucide:heart)",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "servicesSection",
            label: "Inicio — sección de servicios",
            fields: [
              { type: "string", name: "label", label: "Etiqueta superior", required: true },
              { type: "string", name: "title", label: "Título", required: true },
            ],
          },
          {
            type: "object",
            name: "experienceSection",
            label: "Inicio — sección de experiencia",
            fields: [
              { type: "string", name: "label", label: "Etiqueta superior", required: true },
              { type: "string", name: "title", label: "Título", required: true },
            ],
          },
          {
            type: "object",
            name: "trainingSection",
            label: "Inicio — sección de formación",
            fields: [
              { type: "string", name: "label", label: "Etiqueta superior", required: true },
              { type: "string", name: "title", label: "Título", required: true },
              {
                type: "string",
                name: "clinicalTitle",
                label: "Subtítulo formación clínica",
                required: true,
              },
              {
                type: "string",
                name: "complementaryTitle",
                label: "Subtítulo formación complementaria",
                required: true,
              },
            ],
          },
          {
            type: "object",
            name: "cta",
            label: "Inicio — llamada a la acción final",
            fields: [
              { type: "string", name: "title", label: "Título", required: true },
              {
                type: "string",
                name: "description",
                label: "Descripción",
                required: true,
                ui: { component: "textarea" },
              },
              ...ctaLinkFields,
            ],
          },
          {
            type: "object",
            name: "courseHighlight",
            label: "Inicio — destacado de cursos",
            fields: [
              { type: "string", name: "label", label: "Etiqueta superior", required: true },
              { type: "string", name: "ctaLabel", label: "Texto del botón", required: true },
              {
                type: "string",
                name: "ctaHref",
                label: "Enlace del botón",
                description: "Normalmente /cursos",
                required: true,
              },
            ],
          },
          {
            type: "object",
            name: "coursesPage",
            label: "Cursos — cabecera del listado",
            fields: [
              { type: "string", name: "label", label: "Etiqueta superior", required: true },
              { type: "string", name: "title", label: "Título (H1)", required: true },
              {
                type: "string",
                name: "intro",
                label: "Texto introductorio",
                required: true,
                ui: { component: "textarea" },
              },
              { type: "string", name: "seoTitle", label: "Título SEO", required: true },
              {
                type: "string",
                name: "seoDescription",
                label: "Descripción SEO",
                required: true,
                ui: { component: "textarea" },
              },
            ],
          },
        ],
      },
      {
        name: "contactPage",
        label: "Contacto",
        path: "src/content/contactPage",
        format: "json",
        ui: singletonUi,
        fields: [
          { type: "string", name: "seoTitle", label: "Título SEO", required: true },
          {
            type: "string",
            name: "seoDescription",
            label: "Descripción SEO",
            required: true,
            ui: { component: "textarea" },
          },
          {
            type: "object",
            name: "hero",
            label: "Cabecera de la página",
            fields: [
              {
                type: "string",
                name: "label",
                label: "Etiqueta superior",
                description: "Ej.: «Contacto»",
                required: true,
              },
              { type: "string", name: "title", label: "Título (H1)", required: true },
              {
                type: "string",
                name: "intro",
                label: "Texto introductorio",
                required: true,
                ui: { component: "textarea" },
              },
            ],
          },
          {
            type: "object",
            name: "firstConsultation",
            label: "Bloque «La primera consulta»",
            fields: [
              { type: "string", name: "title", label: "Título", required: true },
              {
                type: "string",
                name: "paragraphs",
                label: "Párrafos",
                list: true,
                ui: { component: "textarea" },
              },
              {
                type: "object",
                name: "calendarCta",
                label: "Enlace al calendario de citas",
                fields: [
                  { type: "string", name: "prefix", label: "Texto antes del enlace", required: true },
                  { type: "string", name: "linkLabel", label: "Texto del enlace", required: true },
                  { type: "string", name: "linkHref", label: "URL del enlace", required: true },
                  { type: "string", name: "suffix", label: "Texto después del enlace", required: true },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "contactDetails",
            label: "Bloque «Datos de contacto»",
            fields: [
              { type: "string", name: "title", label: "Título", required: true },
              {
                type: "string",
                name: "location",
                label: "Ubicación",
                description: "Email y WhatsApp se configuran en variables de entorno del sitio.",
                required: true,
              },
            ],
          },
          {
            type: "object",
            name: "formSection",
            label: "Bloque «Envíame un mensaje»",
            fields: [
              { type: "string", name: "title", label: "Título del formulario", required: true },
              { type: "string", name: "submitLabel", label: "Texto del botón enviar", required: true },
              {
                type: "string",
                name: "privacyNote",
                label: "Aviso bajo el formulario",
                required: true,
                ui: { component: "textarea" },
              },
            ],
          },
        ],
      },
      {
        name: "profile",
        label: "Conóceme",
        path: "src/content/profile",
        format: "json",
        ui: singletonUi,
        fields: [
          {
            type: "object",
            name: "hero",
            label: "Cabecera con foto",
            fields: [
              { type: "string", name: "label", label: "Etiqueta superior", required: true },
              { type: "string", name: "title", label: "Título (H1)", required: true },
              {
                type: "string",
                name: "intro",
                label: "Párrafos de presentación",
                list: true,
                ui: { component: "textarea" },
              },
              {
                type: "image",
                name: "photo",
                label: "Foto principal",
                ui: imageFieldUi,
              },
              {
                type: "string",
                name: "photoAlt",
                label: "Texto alternativo de la foto principal",
                description:
                  "Describe la imagen para Google y lectores de pantalla. Ej.: «María Vega, psicóloga general sanitaria en Málaga».",
                required: true,
                ui: { component: "textarea" },
              },
              {
                type: "image",
                name: "secondaryPhoto",
                label: "Foto secundaria (opcional)",
                ui: imageFieldUi,
              },
              {
                type: "string",
                name: "secondaryPhotoAlt",
                label: "Texto alternativo de la foto secundaria",
                description: "Solo si has subido una foto secundaria.",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "photoPlaceholder",
                label: "Texto del marcador (si no hay foto)",
              },
            ],
          },
          {
            type: "object",
            name: "approach",
            label: "Sección «Mi enfoque»",
            fields: [
              { type: "string", name: "label", label: "Etiqueta superior", required: true },
              { type: "string", name: "title", label: "Título", required: true },
              {
                type: "string",
                name: "paragraphs",
                label: "Párrafos",
                list: true,
                ui: { component: "textarea" },
              },
            ],
          },
          {
            type: "object",
            name: "cta",
            label: "Llamada a la acción final",
            fields: [
              { type: "string", name: "title", label: "Título", required: true },
              {
                type: "string",
                name: "description",
                label: "Descripción",
                required: true,
                ui: { component: "textarea" },
              },
              ...ctaLinkFields,
            ],
          },
        ],
      },
      {
        name: "services",
        label: "Servicios",
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
          {
            type: "image",
            name: "thumbnail",
            label: "Miniatura para la página de inicio (opcional)",
            ui: imageFieldUi,
          },
          {
            type: "string",
            name: "thumbnailAlt",
            label: "Texto alternativo de la miniatura",
            description: "Describe la miniatura para Google y lectores de pantalla.",
            ui: { component: "textarea" },
          },
          {
            type: "image",
            name: "image",
            label: "Imagen lateral en la página del servicio (opcional)",
            ui: imageFieldUi,
          },
          {
            type: "string",
            name: "imageAlt",
            label: "Texto alternativo de la imagen del servicio",
            description:
              "Describe la imagen para Google y lectores de pantalla. Ej.: «Sesión de terapia de ansiedad en consulta».",
            ui: { component: "textarea" },
          },
          { type: "rich-text", name: "body", label: "Contenido", isBody: true },
        ],
      },
      {
        name: "resources",
        label: "Recursos",
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
            type: "image",
            name: "image",
            label: "Imagen",
            ui: imageFieldUi,
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
      {
        name: "courses",
        label: "Cursos",
        path: "src/content/courses",
        format: "mdx",
        ui: {
          filename: {
            readonly: true,
            slugify: (values) => values?.slug ?? "",
          },
        },
        fields: [
          { type: "string", name: "title", label: "Título", required: true },
          {
            type: "string",
            name: "slug",
            label: "Slug URL",
            description: "Ej.: curso-duelo → /curso-duelo",
            required: true,
          },
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
            label: "Descripción breve (cabecera y tarjeta)",
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
          { type: "boolean", name: "published", label: "Publicado (visible en listado)" },
          {
            type: "string",
            name: "heroLabel",
            label: "Etiqueta superior de la página del curso",
          },
          {
            type: "string",
            name: "audienceIntro",
            label: "Texto «Para quién es» bajo la cabecera",
            ui: { component: "textarea" },
          },
          {
            type: "string",
            name: "paymentLink",
            label: "Enlace de pago (Stripe Payment Link)",
          },
          {
            type: "image",
            name: "image",
            label: "Imagen (tarjeta en listado)",
            ui: imageFieldUi,
          },
          {
            type: "string",
            name: "imageAlt",
            label: "Texto alternativo de la imagen",
            ui: { component: "textarea" },
          },
          { type: "string", name: "ctaLabel", label: "Texto del botón CTA" },
          { type: "rich-text", name: "body", label: "Contenido", isBody: true },
        ],
      },
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
