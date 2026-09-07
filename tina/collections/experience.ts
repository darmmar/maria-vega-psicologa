import type { Collection } from "tinacms";

export const experienceCollection: Collection = {
  name: "experience",
  label: "Experiencia Profesional (Portada)",
  path: "src/content/experience",
  format: "json",
  fields: [
    {
      type: "string",
      name: "area",
      label: "Puesto o área de experiencia",
      description:
        "Ej: «Psicóloga General Sanitaria en consulta privada», «Atención especializada en duelo», etc.",
      required: true,
    },
    {
      type: "number",
      name: "order",
      label: "Orden de aparición en la lista",
      description: "1 para el primero, 2 para el segundo, etc.",
    },
    {
      type: "boolean",
      name: "published",
      label: "Mostrar en la web (activo/inactivo)",
    },
  ],
};
