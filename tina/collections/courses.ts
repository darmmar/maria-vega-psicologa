import type { Collection } from "tinacms";
import { imageFieldUi } from "../shared/helpers";
import { richTextBodyField } from "../shared/rich-text";

export const coursesCollection: Collection = {
  name: "courses",
  label: "Cursos y Formaciones",
  path: "src/content/cursos",
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
      label: "Título del curso o formación",
      description: "Título principal que se mostrará en grande en la cabecera y en el catálogo.",
      required: true,
    },
    {
      type: "string",
      name: "slug",
      label: "Identificador en la URL (Slug)",
      description:
        "Texto para la dirección web (ej: curso-duelo generará /curso-duelo). Usa solo minúsculas y guiones.",
      required: true,
    },
    {
      type: "string",
      name: "shortDescription",
      label: "Subtítulo / Descripción en cabecera",
      description:
        "Frase descriptiva que aparece inmediatamente debajo del título en la cabecera y en las tarjetas del catálogo.",
      required: true,
      ui: { component: "textarea" },
    },
    {
      type: "string",
      name: "description",
      label: "Descripción general",
      description: "Resumen completo del curso para presentación y motores de búsqueda.",
      required: true,
      ui: { component: "textarea" },
    },
    {
      type: "boolean",
      name: "published",
      label: "Publicar curso (visible en el catálogo de la web)",
      description: "Si está desactivado, el curso no aparecerá en el listado de /cursos.",
    },
    {
      type: "string",
      name: "heroLabel",
      label: "Etiqueta superior en la cabecera (opcional)",
      description:
        "Texto pequeño sobre el título principal (ej: «Formación profesional», «Taller online», «Edición 2026»).",
    },
    {
      type: "string",
      name: "audienceIntro",
      label: "Texto destacado complementario bajo la descripción (opcional)",
      description:
        "Párrafo secundario bajo la descripción en la cabecera. Puedes usarlo para cualquier detalle clave del curso: para quién está dirigido, requisitos previos, modalidad, fechas o plazas.",
      ui: { component: "textarea" },
    },
    {
      type: "string",
      name: "paymentLink",
      label: "Enlace de pago o inscripción externa (opcional)",
      description:
        "Si indicas un enlace (ej: Stripe Payment Link o pasarela externa), el botón principal de la cabecera llevará al pago. Si lo dejas vacío, el botón invitará a pedir información por el formulario de contacto.",
    },
    {
      type: "string",
      name: "ctaLabel",
      label: "Texto del botón principal de la cabecera (opcional)",
      description:
        "Por defecto: «Solicitar información» (o «Inscribirme en la formación» si hay enlace de pago).",
    },
    {
      type: "image",
      name: "image",
      label: "Imagen de portada (tarjeta en catálogo de cursos)",
      description: "Foto o carátula ilustrativa que aparecerá en el listado de /cursos.",
      ui: imageFieldUi,
    },
    {
      type: "string",
      name: "imageAlt",
      label: "Descripción de la imagen (para accesibilidad y SEO)",
      description: "Describe brevemente la imagen para Google.",
      ui: { component: "textarea" },
    },
    {
      type: "string",
      name: "seoTitle",
      label: "Título SEO para Google (opcional)",
      description: "Título para la pestaña del navegador y resultados de Google.",
    },
    {
      type: "string",
      name: "seoDescription",
      label: "Descripción SEO para Google (opcional)",
      description: "Descripción breve para resultados de búsqueda.",
      ui: { component: "textarea" },
    },
    richTextBodyField,
  ],
};
