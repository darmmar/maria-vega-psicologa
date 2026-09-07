import type { Collection } from "tinacms";
import { ctaLinkFields, imageFieldUi, singletonUi } from "../shared/helpers";

export const siteSettingsCollection: Collection = {
  name: "siteSettings",
  label: "Ajustes Globales y Portada",
  path: "src/content/siteSettings",
  format: "json",
  ui: singletonUi,
  fields: [
    {
      type: "object",
      name: "hero",
      label: "1. Portada — Cabecera principal (Hero)",
      fields: [
        {
          type: "string",
          name: "label",
          label: "Etiqueta superior pequeña",
          description: "Texto pequeño sobre el título principal (ej: «Psicología en Málaga»).",
          required: true,
        },
        {
          type: "string",
          name: "title",
          label: "Título principal (H1)",
          description: "Título de gran tamaño que encabeza la página de inicio.",
          required: true,
        },
        {
          type: "string",
          name: "description",
          label: "Texto de presentación",
          description: "Párrafo introductorio debajo del título principal.",
          required: true,
          ui: { component: "textarea" },
        },
        {
          type: "object",
          name: "primaryCta",
          label: "Botón de acción principal",
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
          label: "Frases destacadas de confianza (con icono de verificación)",
          description: "Frases cortas (ej: «Atención presencial en Málaga», «Terapia online», «Colegiada sanitaria»).",
          list: true,
        },
        {
          type: "image",
          name: "image",
          label: "Foto principal de la portada (opcional)",
          ui: imageFieldUi,
        },
        {
          type: "string",
          name: "imageAlt",
          label: "Descripción de la foto (para accesibilidad y SEO)",
          description:
            "Describe la imagen para Google y lectores de pantalla. Ej.: «María Vega, psicóloga en su consulta de Málaga».",
          ui: { component: "textarea" },
        },
        {
          type: "string",
          name: "imagePlaceholder",
          label: "Texto provisional (si aún no se ha subido foto)",
        },
      ],
    },
    {
      type: "object",
      name: "therapyApproach",
      label: "2. Portada — Sección «Mi enfoque»",
      fields: [
        {
          type: "string",
          name: "label",
          label: "Etiqueta superior",
          description: "Ej: «Enfoque terapéutico».",
          required: true,
        },
        { type: "string", name: "title", label: "Título de la sección", required: true },
        {
          type: "string",
          name: "description",
          label: "Descripción del enfoque",
          required: true,
          ui: { component: "textarea" },
        },
        {
          type: "object",
          name: "pillars",
          label: "Tarjetas de pilares o principios de trabajo",
          list: true,
          ui: {
            itemProps: (item) => ({
              label: item?.title || "Nuevo principio de trabajo",
            }),
          },
          fields: [
            { type: "string", name: "title", label: "Título del pilar", required: true },
            {
              type: "string",
              name: "description",
              label: "Descripción del pilar",
              required: true,
              ui: { component: "textarea" },
            },
            {
              type: "string",
              name: "icon",
              label: "Icono",
              description: "Nombre del icono (ejemplos: lucide:heart, lucide:brain, lucide:sparkles, lucide:sun, lucide:user).",
            },
          ],
        },
      ],
    },
    {
      type: "object",
      name: "servicesSection",
      label: "3. Portada — Título de la sección de servicios",
      fields: [
        { type: "string", name: "label", label: "Etiqueta superior (ej: «Especialidades»)", required: true },
        { type: "string", name: "title", label: "Título principal (ej: «¿En qué puedo ayudarte?»)", required: true },
      ],
    },
    {
      type: "object",
      name: "experienceSection",
      label: "4. Portada — Título de la sección de experiencia",
      fields: [
        { type: "string", name: "label", label: "Etiqueta superior (ej: «Trayectoria»)", required: true },
        { type: "string", name: "title", label: "Título principal (ej: «Experiencia profesional»)", required: true },
      ],
    },
    {
      type: "object",
      name: "trainingSection",
      label: "5. Portada — Títulos de la sección de formación",
      fields: [
        { type: "string", name: "label", label: "Etiqueta superior (ej: «Cualificación»)", required: true },
        { type: "string", name: "title", label: "Título principal (ej: «Formación académica y clínica»)", required: true },
        {
          type: "string",
          name: "clinicalTitle",
          label: "Subtítulo para el bloque clínico",
          description: "Ej: «Formación clínica especializada».",
          required: true,
        },
        {
          type: "string",
          name: "complementaryTitle",
          label: "Subtítulo para el bloque complementario",
          description: "Ej: «Formación complementaria y continua».",
          required: true,
        },
      ],
    },
    {
      type: "object",
      name: "cta",
      label: "6. Portada — Bloque final de contacto (Llamada a la acción)",
      fields: [
        {
          type: "string",
          name: "title",
          label: "Título destacado (ej: «¿Hablamos?»)",
          required: true,
        },
        {
          type: "string",
          name: "description",
          label: "Texto de invitación",
          required: true,
          ui: { component: "textarea" },
        },
        ...ctaLinkFields,
      ],
    },
    {
      type: "object",
      name: "courseHighlight",
      label: "7. Portada — Bloque promocional de Cursos",
      fields: [
        { type: "string", name: "label", label: "Etiqueta superior (ej: «Formación»)", required: true },
        { type: "string", name: "ctaLabel", label: "Texto del botón", required: true },
        {
          type: "string",
          name: "ctaHref",
          label: "Enlace del botón (normalmente /cursos)",
          required: true,
        },
      ],
    },
    {
      type: "object",
      name: "coursesPage",
      label: "8. Catálogo de Cursos — Cabecera de la página (/cursos)",
      fields: [
        { type: "string", name: "label", label: "Etiqueta superior (ej: «Formaciones»)", required: true },
        { type: "string", name: "title", label: "Título principal (H1, ej: «Cursos y talleres»)", required: true },
        {
          type: "string",
          name: "intro",
          label: "Texto de introducción al catálogo",
          required: true,
          ui: { component: "textarea" },
        },
        { type: "string", name: "seoTitle", label: "Título SEO para Google", required: true },
        {
          type: "string",
          name: "seoDescription",
          label: "Descripción SEO para Google",
          required: true,
          ui: { component: "textarea" },
        },
      ],
    },
    {
      type: "object",
      name: "contact",
      label: "9. Ajustes Globales — Datos de Contacto (Visibles en toda la web)",
      fields: [
        { type: "string", name: "email", label: "Email de contacto público", required: true },
        { type: "string", name: "phone", label: "Teléfono de contacto (opcional)" },
        {
          type: "string",
          name: "whatsapp",
          label: "Enlace directo de WhatsApp",
          description: "Formato recomendado: https://wa.me/34600000000 (reemplaza con tu número).",
        },
        {
          type: "string",
          name: "instagram",
          label: "Perfil de Instagram",
          description: "Ej: https://instagram.com/mariavegapsicologia",
        },
        { type: "string", name: "telegram", label: "Enlace de Telegram (opcional)" },
        { type: "string", name: "tiktok", label: "Enlace de TikTok (opcional)" },
        { type: "string", name: "linkedin", label: "Enlace de LinkedIn (opcional)" },
        {
          type: "string",
          name: "googleMapsEmbedUrl",
          label: "Mapa interactivo de Google Maps (URL de inserción)",
          description: "En Google Maps: Compartir → Insertar un mapa → copiar únicamente la dirección que está entre comillas en src=\"...\". Se mostrará en la tarjeta de ubicación de la página de contacto.",
        },
        {
          type: "string",
          name: "googleMapsLink",
          label: "Enlace directo de Google Maps («Cómo llegar»)",
          description: "Enlace para que el usuario abra la app de Google Maps en su móvil o navegador (ej: enlace directo a la ficha del negocio).",
        },
      ],
    },
    {
      type: "object",
      name: "legal",
      label: "10. Ajustes Globales — Datos Legales, Ubicación y Profesionales",
      fields: [
        {
          type: "string",
          name: "collegiateNumber",
          label: "Número de Colegiada Oficial (ej: AO-10293)",
          description: "Aparecerá en los datos estructurados para Google (Schema.org) y en el pie legal.",
        },
        {
          type: "string",
          name: "businessName",
          label: "Nombre fiscal o nombre profesional",
          description: "Ej: María Vega o María del Rocío Vega García.",
        },
        { type: "string", name: "taxId", label: "NIF / CIF" },
        {
          type: "string",
          name: "address",
          label: "Dirección física de la consulta (Visible en Contacto, Legal y SEO)",
          description: "Ej: Calle Zamarrilla 15, Málaga. Esta es la dirección oficial única que se usa en toda la web y para el posicionamiento local en Google.",
        },
      ],
    },
  ],
};
