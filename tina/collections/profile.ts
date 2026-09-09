import type { Collection } from "tinacms";
import { ctaLinkFields, imageFieldUi, singletonUi } from "../shared/helpers";

export const profileCollection: Collection = {
  name: "profile",
  label: "Conóceme · Presentación personal",
  path: "src/content/profile",
  format: "json",
  ui: {
    ...singletonUi,
    router: () => "/conoceme",
  },
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
      name: "trainingSection",
      label: "3. Sección «Formación académica y clínica»",
      fields: [
        {
          type: "string",
          name: "label",
          label: "Etiqueta superior",
          description: "Ej: «Cualificación».",
          required: true,
        },
        {
          type: "string",
          name: "title",
          label: "Título de la sección",
          description: "Ej: «Formación académica».",
          required: true,
        },
        {
          type: "string",
          name: "clinicalTitle",
          label: "Título del bloque de formación sanitaria",
          description: "Ej: «Formación Sanitaria y Habilitación Clínica».",
          required: true,
        },
        {
          type: "object",
          name: "clinicalItems",
          label: "Titulaciones sanitarias y clínicas",
          list: true,
          ui: {
            itemProps: (item) => ({ label: item?.degree || "Titulación clínica" }),
          },
          fields: [
            { type: "string", name: "degree", label: "Título / Grado / Máster", required: true },
            { type: "string", name: "institution", label: "Institución / Universidad", required: true },
            { type: "string", name: "year", label: "Año (opcional)" },
          ],
        },
        {
          type: "string",
          name: "complementaryTitle",
          label: "Título del bloque de formación continuada",
          description: "Ej: «Formación Continuada y Especialización».",
          required: true,
        },
        {
          type: "object",
          name: "complementaryItems",
          label: "Titulaciones complementarias",
          list: true,
          ui: {
            itemProps: (item) => ({ label: item?.degree || "Titulación complementaria" }),
          },
          fields: [
            { type: "string", name: "degree", label: "Título / Grado / Máster", required: true },
            { type: "string", name: "institution", label: "Institución / Universidad", required: true },
            { type: "string", name: "year", label: "Año (opcional)" },
          ],
        },
      ],
    },
    {
      type: "object",
      name: "experienceSection",
      label: "4. Sección «Trayectoria y experiencia clínica»",
      fields: [
        {
          type: "string",
          name: "label",
          label: "Etiqueta superior",
          description: "Ej: «Trayectoria».",
          required: true,
        },
        {
          type: "string",
          name: "title",
          label: "Título de la sección",
          description: "Ej: «Experiencia clínica».",
          required: true,
        },
        {
          type: "object",
          name: "items",
          label: "Áreas de experiencia y trayectoria",
          list: true,
          ui: {
            itemProps: (item) => ({ label: item?.area || "Área de experiencia" }),
          },
          fields: [
            { type: "string", name: "area", label: "Puesto o área de experiencia", required: true },
          ],
        },
      ],
    },
    {
      type: "object",
      name: "cta",
      label: "5. Bloque final de llamada a la acción (Contacto / Reserva)",
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
    {
      type: "string",
      name: "seoTitle",
      label: "Título SEO para Google (opcional)",
      description: "Título para la pestaña del navegador y Google. Si se deja vacío, se usará «Conóceme».",
    },
    {
      type: "string",
      name: "seoDescription",
      label: "Descripción SEO para Google (opcional)",
      description: "Descripción breve para los resultados de búsqueda de Google.",
      ui: { component: "textarea" },
    },
  ],
};
