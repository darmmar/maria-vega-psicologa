import type { TinaField } from "tinacms";

export const richTextBodyField: TinaField = {
  type: "rich-text",
  name: "body",
  label: "Contenido principal de la página",
  description:
    "Escribe aquí el texto del artículo o servicio. Puedes usar los bloques desplegables de abajo para añadir botones, testimonios, acordeones o notas.",
  isBody: true,
  templates: [
    {
      name: "BotonCTA",
      label: "Botón de acción (CTA)",
      ui: {
        itemProps: (item) => ({
          label: item?.label ? `Botón: ${item.label}` : "Botón CTA",
        }),
      },
      fields: [
        {
          type: "string",
          name: "label",
          label: "Texto del botón",
          description: "Ej: «Reservar primera sesión», «Saber más»",
          required: true,
        },
        {
          type: "string",
          name: "href",
          label: "Enlace de destino",
          description: "Ej: /reserva, /contacto o un enlace web externo completo",
          required: true,
        },
        {
          type: "string",
          name: "variant",
          label: "Estilo visual del botón",
          options: [
            { value: "primary", label: "Principal (Verde sólido)" },
            { value: "secondary", label: "Secundario (Fondo claro con borde)" },
            { value: "accent", label: "Destacado (Tono cálido/rosado)" },
          ],
        },
        {
          type: "string",
          name: "align",
          label: "Alineación en la página",
          options: [
            { value: "left", label: "Izquierda" },
            { value: "center", label: "Centrado" },
            { value: "right", label: "Derecha" },
          ],
        },
        {
          type: "string",
          name: "size",
          label: "Tamaño del botón",
          options: [
            { value: "md", label: "Normal / Mediano" },
            { value: "lg", label: "Grande" },
          ],
        },
      ],
    },
    {
      name: "Testimonio",
      label: "Cita o testimonio",
      ui: {
        itemProps: (item) => ({
          label: item?.author ? `Testimonio: ${item.author}` : "Cita o testimonio",
        }),
      },
      fields: [
        {
          type: "string",
          name: "quote",
          label: "Testimonio / Frase",
          description: "Texto del testimonio o cita que irá entre comillas",
          required: true,
          ui: { component: "textarea" },
        },
        {
          type: "string",
          name: "author",
          label: "Nombre o iniciales de la persona",
          required: true,
        },
        {
          type: "string",
          name: "role",
          label: "Detalle o contexto adicional (opcional)",
          description: "Ej: «Paciente de terapia presencial», «Alumna del taller»",
        },
      ],
    },
    {
      name: "Acordeon",
      label: "Bloque desplegable (FAQ o detalles adicionales)",
      ui: {
        itemProps: (item) => ({
          label: item?.title || "Bloque desplegable",
        }),
      },
      fields: [
        {
          type: "string",
          name: "title",
          label: "Título visible del desplegable",
          description: "La pregunta o tema que se verá inicialmente",
          required: true,
        },
        {
          type: "string",
          name: "content",
          label: "Contenido desplegable",
          description: "El texto explicativo que se mostrará al hacer clic",
          required: true,
          ui: { component: "textarea" },
        },
      ],
    },
    {
      name: "Alerta",
      label: "Caja de nota destacada / Aviso",
      ui: {
        itemProps: (item) => ({
          label: item?.title || (item?.text ? `${item.text.slice(0, 30)}...` : "Nota destacada"),
        }),
      },
      fields: [
        {
          type: "string",
          name: "title",
          label: "Título de la nota (opcional)",
        },
        {
          type: "string",
          name: "text",
          label: "Texto de la nota",
          required: true,
          ui: { component: "textarea" },
        },
        {
          type: "string",
          name: "type",
          label: "Estilo / Color de la caja",
          options: [
            { value: "info", label: "Información (Tono salvia suave)" },
            { value: "success", label: "Éxito o confirmación (Tono verde)" },
            { value: "warning", label: "Atención o aviso importante (Tono ámbar)" },
          ],
        },
      ],
    },
  ],
};
