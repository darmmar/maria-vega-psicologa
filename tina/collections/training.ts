import type { Collection } from "tinacms";

export const trainingCollection: Collection = {
  name: "training",
  label: "Formación Académica (Portada y Conóceme)",
  path: "src/content/training",
  format: "json",
  fields: [
    {
      type: "string",
      name: "degree",
      label: "Título o formación obtenida",
      description: "Ej: «Grado en Psicología», «Máster en Psicología General Sanitaria».",
      required: true,
    },
    {
      type: "string",
      name: "institution",
      label: "Universidad o centro de estudios",
      description: "Ej: «Universidad de Málaga», «Colegio Oficial de Psicología».",
      required: true,
    },
    {
      type: "string",
      name: "year",
      label: "Año de finalización o período (opcional)",
      description: "Ej: «2021» o «2019 - 2021».",
    },
    {
      type: "string",
      name: "category",
      label: "Categoría de la formación",
      description: "Elige si pertenece al bloque clínico principal o al complementario.",
      required: true,
      options: [
        { value: "clinical", label: "Formación clínica principal" },
        { value: "complementary", label: "Formación complementaria y continua" },
      ],
    },
    {
      type: "number",
      name: "order",
      label: "Orden de aparición",
      description: "1 para el primero, 2 para el segundo, etc.",
    },
    {
      type: "boolean",
      name: "published",
      label: "Mostrar en la web (activo/inactivo)",
    },
  ],
};
