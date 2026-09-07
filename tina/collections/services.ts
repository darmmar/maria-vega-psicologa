import type { Collection } from "tinacms";
import { imageFieldUi } from "../shared/helpers";
import { richTextBodyField } from "../shared/rich-text";

export const servicesCollection: Collection = {
  name: "services",
  label: "Servicios de Terapia",
  path: "src/content/servicios",
  format: "mdx",
  ui: {
    filename: {
      readonly: true,
      slugify: (values) => values?.slug ?? "",
    },
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Nombre del servicio",
      description: "Título principal (ej: Terapia de duelo, Ansiedad y estrés, etc.).",
      required: true,
    },
    {
      type: "string",
      name: "slug",
      label: "Identificador en la URL (Slug)",
      description:
        "Texto para la dirección web (ej: terapia-duelo generará /terapia-duelo). Usa solo minúsculas y guiones.",
      required: true,
    },
    {
      type: "string",
      name: "shortDescription",
      label: "Descripción breve (para las tarjetas del catálogo)",
      description:
        "Resumen breve que aparece en la cuadrícula de servicios de la portada y el pie de página.",
      required: true,
      ui: { component: "textarea" },
    },
    {
      type: "string",
      name: "description",
      label: "Descripción de la cabecera",
      description:
        "Texto explicativo que aparece bajo el título en la cabecera de la página del servicio.",
      required: true,
      ui: { component: "textarea" },
    },
    {
      type: "boolean",
      name: "published",
      label: "Publicar servicio (visible en la web)",
      description: "Activa o desactiva la visibilidad de este servicio en las listas de la web.",
    },
    {
      type: "number",
      name: "order",
      label: "Orden de aparición",
      description: "Número para ordenar las tarjetas (1 para el primero, 2 para el segundo...).",
    },
    {
      type: "string",
      name: "icon",
      label: "Icono representativo",
      description:
        "Puedes poner un emoji (ej: 🛋️, 🌱, 🧠, 💬) o el identificador de un icono Lucide (ej: lucide:heart, lucide:wind, lucide:monitor).",
    },
    {
      type: "string",
      name: "ctaLabel",
      label: "Texto del botón de acción inferior (opcional)",
      description: "Por defecto: «Reservar cita».",
    },
    {
      type: "string",
      name: "ctaHref",
      label: "Enlace del botón inferior (opcional)",
      description: "Por defecto: /reserva.",
    },
    {
      type: "image",
      name: "thumbnail",
      label: "Miniatura para la tarjeta en la portada (opcional)",
      ui: imageFieldUi,
    },
    {
      type: "string",
      name: "thumbnailAlt",
      label: "Descripción de la miniatura (para accesibilidad y SEO)",
      description: "Describe brevemente la miniatura para Google y personas con discapacidad visual.",
      ui: { component: "textarea" },
    },
    {
      type: "image",
      name: "image",
      label: "Foto o ilustración lateral en la página del servicio (opcional)",
      ui: imageFieldUi,
    },
    {
      type: "string",
      name: "imageAlt",
      label: "Descripción de la foto lateral (para accesibilidad y SEO)",
      description:
        "Describe la imagen para Google y lectores de pantalla. Ej.: «Sesión de terapia presencial en consulta».",
      ui: { component: "textarea" },
    },
    {
      type: "string",
      name: "seoTitle",
      label: "Título SEO para Google (opcional)",
      description: "Título para la pestaña del navegador y Google. Si se deja vacío, se usará el nombre del servicio.",
    },
    {
      type: "string",
      name: "seoDescription",
      label: "Descripción SEO para Google (opcional)",
      description:
        "Descripción breve para los resultados de búsqueda de Google. Si se deja vacía, se usará la descripción general.",
      ui: { component: "textarea" },
    },
    richTextBodyField,
  ],
};
