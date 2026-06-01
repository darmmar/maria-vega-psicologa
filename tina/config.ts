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

const richTextBodyField = {
  type: "rich-text" as const,
  name: "body",
  label: "Contenido",
  isBody: true,
  templates: [
    {
      name: "BotonCTA",
      label: "Botón de llamada a la acción (CTA)",
      fields: [
        { type: "string" as const, name: "label", label: "Texto del botón", required: true },
        { type: "string" as const, name: "href", label: "Enlace (Ej.: /contacto, /reserva o link externo)", required: true },
        {
          type: "string" as const,
          name: "variant",
          label: "Estilo del botón",
          options: [
            { value: "primary", label: "Principal (Verde)" },
            { value: "secondary", label: "Secundario (Transparente con borde)" },
            { value: "accent", label: "Destacado (Rosa/Blush)" },
          ],
        },
        {
          type: "string" as const,
          name: "align",
          label: "Alineación",
          options: [
            { value: "left", label: "Izquierda" },
            { value: "center", label: "Centro" },
            { value: "right", label: "Derecha" },
          ],
        },
        {
          type: "string" as const,
          name: "size",
          label: "Tamaño",
          options: [
            { value: "md", label: "Mediano" },
            { value: "lg", label: "Grande" },
          ],
        },
      ],
    },
    {
      name: "Testimonio",
      label: "Testimonio de paciente",
      fields: [
        { type: "string" as const, name: "quote", label: "Testimonio / Cita", required: true, ui: { component: "textarea" } },
        { type: "string" as const, name: "author", label: "Nombre / Iniciales", required: true },
        { type: "string" as const, name: "role", label: "Descripción corta (Ej. Paciente Terapia Online)" },
      ],
    },
    {
      name: "Acordeon",
      label: "Acordeón desplegable (FAQ / Detalles)",
      fields: [
        { type: "string" as const, name: "title", label: "Título / Pregunta", required: true },
        { type: "string" as const, name: "content", label: "Contenido / Respuesta", required: true, ui: { component: "textarea" } },
      ],
    },
    {
      name: "Alerta",
      label: "Caja de nota / Alerta destacada",
      fields: [
        { type: "string" as const, name: "title", label: "Título (Opcional)" },
        { type: "string" as const, name: "text", label: "Texto descriptivo", required: true, ui: { component: "textarea" } },
        {
          type: "string" as const,
          name: "type",
          label: "Tipo de caja",
          options: [
            { value: "info", label: "Información (Verde suave)" },
            { value: "success", label: "Éxito (Esmeralda suave)" },
            { value: "warning", label: "Advertencia (Ámbar suave)" },
          ],
        },
      ],
    },
  ],
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
          {
            type: "object",
            name: "contact",
            label: "Ajustes globales — Datos de contacto",
            fields: [
              { type: "string", name: "email", label: "Email de contacto", required: true },
              { type: "string", name: "phone", label: "Teléfono (opcional)" },
              { type: "string", name: "whatsapp", label: "URL de WhatsApp (ej: https://wa.me/34600000000)" },
              { type: "string", name: "instagram", label: "URL de Instagram" },
              { type: "string", name: "telegram", label: "URL de Telegram (opcional)" },
              { type: "string", name: "tiktok", label: "URL de TikTok (opcional)" },
              { type: "string", name: "linkedin", label: "URL de LinkedIn (opcional)" },
              { type: "string", name: "googleMapsEmbedUrl", label: "URL de Google Maps (Iframe Embed - src)", description: "La URL src que viene dentro de <iframe src=\"...\"> al compartir mapa en Google Maps" },
              { type: "string", name: "googleMapsLink", label: "Enlace directo de Google Maps (Cómo llegar)" },
            ],
          },
          {
            type: "object",
            name: "legal",
            label: "Ajustes globales — Datos legales",
            fields: [
              { type: "string", name: "collegiateNumber", label: "Número de Colegiada (ej: AO-12345)" },
              { type: "string", name: "businessName", label: "Nombre Fiscal / Nombre del autónomo" },
              { type: "string", name: "taxId", label: "NIF / CIF" },
              { type: "string", name: "address", label: "Dirección física de la consulta" },
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
        path: "src/content/servicios",
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
          richTextBodyField,
        ],
      },
      {
        name: "resources",
        label: "Recursos",
        path: "src/content/recursos",
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
          richTextBodyField,
        ],
      },
      {
        name: "courses",
        label: "Cursos",
        path: "src/content/cursos",
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
          richTextBodyField,
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
      {
        name: "bookingPage",
        label: "Reserva — página",
        path: "src/content/bookingPage",
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
            label: "Cabecera",
            fields: [
              { type: "string", name: "label", label: "Etiqueta superior", required: true },
              { type: "string", name: "title", label: "Título (H1)", required: true },
              {
                type: "string",
                name: "intro",
                label: "Descripción",
                required: true,
                ui: { component: "textarea" },
              },
            ],
          },
          {
            type: "object",
            name: "sessions",
            label: "Tipos de sesión",
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
              { type: "string", name: "duration", label: "Duración", required: true },
              { type: "string", name: "format", label: "Formato", required: true },
              { type: "string", name: "icon", label: "Icono (lucide, ej. lucide:monitor)", required: true },
              { type: "string", name: "bookingUrl", label: "URL de reserva (Cal.com)", required: true },
              { type: "string", name: "badge", label: "Etiqueta (opcional)" },
            ],
          },
          {
            type: "string",
            name: "calComUsername",
            label: "Usuario de Cal.com (opcional)",
            description: "Pega tu usuario de Cal.com (ej: maria-vega) si deseas mostrar el calendario interactivo incrustado en la web. Déjalo en blanco para ocultar la sección del calendario.",
          },
          {
            type: "object",
            name: "faqItems",
            label: "Preguntas frecuentes específicas de reserva",
            list: true,
            fields: [
              { type: "string", name: "question", label: "Pregunta", required: true },
              {
                type: "string",
                name: "answer",
                label: "Respuesta",
                required: true,
                ui: { component: "textarea" },
              },
            ],
          },
        ],
      },
      {
        name: "experience",
        label: "Experiencia profesional",
        path: "src/content/experience",
        format: "json",
        fields: [
          { type: "string", name: "area", label: "Área de experiencia", required: true },
          { type: "number", name: "order", label: "Orden de visualización" },
          { type: "boolean", name: "published", label: "Publicado" },
        ],
      },
      {
        name: "training",
        label: "Formación académica",
        path: "src/content/training",
        format: "json",
        fields: [
          { type: "string", name: "degree", label: "Título / Formación", required: true },
          { type: "string", name: "institution", label: "Institución", required: true },
          { type: "string", name: "year", label: "Año" },
          {
            type: "string",
            name: "category",
            label: "Categoría",
            required: true,
            options: [
              { value: "clinical", label: "Formación clínica" },
              { value: "complementary", label: "Formación complementaria" },
            ],
          },
          { type: "number", name: "order", label: "Orden" },
          { type: "boolean", name: "published", label: "Publicado" },
        ],
      },
    ],
  },
});
