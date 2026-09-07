import type { Collection } from "tinacms";

export const faqCollection: Collection = {
  name: "faq",
  label: "Preguntas Frecuentes Generales",
  path: "src/content/faq",
  format: "json",
  fields: [
    {
      type: "string",
      name: "question",
      label: "Pregunta",
      description: "La pregunta que se planteará el paciente.",
      required: true,
    },
    {
      type: "string",
      name: "answer",
      label: "Respuesta",
      description: "Explicación clara, cercana y detallada.",
      required: true,
      ui: { component: "textarea" },
    },
    {
      type: "number",
      name: "order",
      label: "Orden de aparición",
      description: "Número para ordenar la lista de preguntas.",
    },
    {
      type: "string",
      name: "category",
      label: "Categoría temática (opcional)",
      description: "Ej: Terapia, Reservas, Modalidades, etc.",
    },
    {
      type: "boolean",
      name: "published",
      label: "Visible en la web (activo/inactivo)",
    },
  ],
};
