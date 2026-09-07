import type { Collection } from "tinacms";
import { ctaLinkFields, imageFieldUi, singletonUi } from "../shared/helpers";

export const profileCollection: Collection = {
  name: "profile",
  label: "Página Conóceme (/conoceme)",
  path: "src/content/profile",
  format: "json",
  ui: singletonUi,
  fields: [
    {
      type: "object",
      name: "hero",
      label: "1. Cabecera y presentación personal",
      fields: [
        {
          type: "string",
          name: "label",
          label: "Etiqueta superior",
          description: "Ej: «Conóceme», «Sobre mí».",
          required: true,
        },
        {
          type: "string",
          name: "title",
          label: "Título principal (H1)",
          description: "Ej: «Hola, soy María Vega».",
          required: true,
        },
        {
          type: "string",
          name: "intro",
          label: "Párrafos de presentación",
          description: "Añade cada párrafo haciendo clic en «Añadir elemento».",
          list: true,
          ui: { component: "textarea" },
        },
        {
          type: "image",
          name: "photo",
          label: "Foto principal (retrato profesional)",
          ui: imageFieldUi,
        },
        {
          type: "string",
          name: "photoAlt",
          label: "Descripción de la foto (para accesibilidad y SEO)",
          description:
            "Describe la imagen para Google y lectores de pantalla. Ej.: «María Vega, psicóloga general sanitaria en Málaga».",
          required: true,
          ui: { component: "textarea" },
        },
        {
          type: "image",
          name: "secondaryPhoto",
          label: "Foto secundaria de apoyo (opcional)",
          description: "Foto horizontal adicional (ej: detalle de la consulta o espacio de trabajo).",
          ui: imageFieldUi,
        },
        {
          type: "string",
          name: "secondaryPhotoAlt",
          label: "Descripción de la foto secundaria",
          ui: { component: "textarea" },
        },
        {
          type: "string",
          name: "photoPlaceholder",
          label: "Texto de reemplazo si no hay foto",
          description: "Texto que se muestra si no se ha subido una fotografía.",
        },
      ],
    },
    {
      type: "object",
      name: "approach",
      label: "2. Sección «Mi forma de trabajar / Enfoque»",
      fields: [
        {
          type: "string",
          name: "label",
          label: "Etiqueta superior",
          description: "Ej: «Enfoque terapéutico».",
          required: true,
        },
        {
          type: "string",
          name: "title",
          label: "Título de la sección",
          description: "Ej: «Un espacio seguro, cercano y basado en la evidencia».",
          required: true,
        },
        {
          type: "string",
          name: "paragraphs",
          label: "Párrafos explicativos del enfoque",
          list: true,
          ui: { component: "textarea" },
        },
      ],
    },
    {
      type: "object",
      name: "cta",
      label: "3. Bloque final de llamada a la acción (Contacto / Reserva)",
      fields: [
        {
          type: "string",
          name: "title",
          label: "Título de cierre",
          description: "Ej: «¿Damos el primer paso juntas?».",
          required: true,
        },
        {
          type: "string",
          name: "description",
          label: "Texto explicativo",
          required: true,
          ui: { component: "textarea" },
        },
        ...ctaLinkFields,
      ],
    },
  ],
};
