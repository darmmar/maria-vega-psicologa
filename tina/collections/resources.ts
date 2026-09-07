import type { Collection } from "tinacms";
import { imageFieldUi } from "../shared/helpers";
import { richTextBodyField } from "../shared/rich-text";

export const resourcesCollection: Collection = {
  name: "resources",
  label: "Recursos y Artículos del Blog (/recursos)",
  path: "src/content/recursos",
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
      label: "Título del artículo",
      description: "Título principal que se mostrará en grande en la cabecera.",
      required: true,
    },
    {
      type: "string",
      name: "slug",
      label: "Identificador en la URL (Slug)",
      description: "Texto para la dirección web (ej: duelo-y-culpa generará /recursos/duelo-y-culpa).",
      required: true,
    },
    {
      type: "string",
      name: "description",
      label: "Resumen / Entradilla del artículo",
      description: "Breve resumen que aparece en las tarjetas del blog y bajo el título principal.",
      required: true,
      ui: { component: "textarea" },
    },
    {
      type: "boolean",
      name: "published",
      label: "Publicar artículo (visible en la web)",
      description: "Marca esta casilla cuando el artículo esté listo para el público.",
    },
    {
      type: "boolean",
      name: "featured",
      label: "Destacar artículo en la parte superior",
      description: "Si se activa, este artículo aparecerá como lectura recomendada principal.",
    },
    {
      type: "datetime",
      name: "publishedAt",
      label: "Fecha de publicación",
      description: "Fecha visible para los lectores.",
    },
    {
      type: "image",
      name: "image",
      label: "Imagen de portada del artículo (opcional)",
      ui: imageFieldUi,
    },
    {
      type: "string",
      name: "tags",
      label: "Etiquetas / Temáticas",
      description: "Palabras clave sobre los temas tratados (ej: Ansiedad, Duelo, Autocuidado, ACT).",
      list: true,
      ui: { component: "tags" },
    },
    {
      type: "string",
      name: "ctaLabel",
      label: "Texto del botón final del artículo (opcional)",
      description: "Ej: «Pedir cita» o «Saber más sobre terapia».",
    },
    {
      type: "string",
      name: "ctaHref",
      label: "Enlace del botón final (opcional)",
      description: "Dirección a la que llevará el botón (ej: /reserva o /contacto).",
    },
    {
      type: "string",
      name: "seoTitle",
      label: "Título SEO para Google (opcional)",
      description: "Título optimizado para buscadores.",
    },
    {
      type: "string",
      name: "seoDescription",
      label: "Descripción SEO para Google (opcional)",
      description: "Descripción optimizada para buscadores.",
      ui: { component: "textarea" },
    },
    richTextBodyField,
  ],
};
