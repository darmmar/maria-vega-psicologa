import type { Collection } from "tinacms";
import { singletonUi } from "../shared/helpers";

export const bookingPageCollection: Collection = {
  name: "bookingPage",
  label: "Página de Reservas (/reserva)",
  path: "src/content/bookingPage",
  format: "json",
  ui: singletonUi,
  fields: [
    {
      type: "object",
      name: "hero",
      label: "1. Cabecera de la página",
      fields: [
        {
          type: "string",
          name: "label",
          label: "Etiqueta superior",
          description: "Texto pequeño sobre el título (ej: «Reservas», «Citas online y presenciales»).",
          required: true,
        },
        {
          type: "string",
          name: "title",
          label: "Título principal (H1)",
          description: "Título grande (ej: «Elige tu sesión y reserva tu cita»).",
          required: true,
        },
        {
          type: "string",
          name: "intro",
          label: "Texto de introducción",
          description: "Explicación previa al listado de opciones de consulta.",
          required: true,
          ui: { component: "textarea" },
        },
      ],
    },
    {
      type: "object",
      name: "sessions",
      label: "2. Tarjetas de tipos de sesión (Presencial, Online, etc.)",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.title
            ? `${item.title}${item.duration ? ` (${item.duration})` : ""}`
            : "Nueva tarjeta de sesión",
        }),
      },
      fields: [
        {
          type: "string",
          name: "title",
          label: "Nombre de la sesión",
          description: "Ej: Terapia individual presencial, Primera sesión online, etc.",
          required: true,
        },
        {
          type: "string",
          name: "description",
          label: "Explicación de la sesión",
          description: "A quién va dirigida y qué incluye.",
          required: true,
          ui: { component: "textarea" },
        },
        {
          type: "string",
          name: "duration",
          label: "Duración de la sesión",
          description: "Ej: 50 minutos / 1 hora.",
          required: true,
        },
        {
          type: "string",
          name: "format",
          label: "Modalidad",
          description: "Ej: Presencial en Málaga / Online por videollamada.",
          required: true,
        },
        {
          type: "string",
          name: "icon",
          label: "Icono",
          description: "Icono representativo (ej: lucide:user, lucide:map-pin, lucide:video, lucide:monitor).",
          required: true,
        },
        {
          type: "string",
          name: "bookingUrl",
          label: "Enlace de reserva directa (Cal.com)",
          description:
            "Enlace directo al evento en Cal.com (ej: https://cal.com/tu-usuario/terapia-presencial).",
          required: true,
        },
        {
          type: "string",
          name: "badge",
          label: "Etiqueta destacada (opcional)",
          description: "Texto destacado sobre la tarjeta (ej: «Más habitual», «Recomendada para empezar»).",
        },
      ],
    },
    {
      type: "string",
      name: "calComUsername",
      label: "3. Calendario interactivo incrustado de Cal.com (opcional)",
      description:
        "Escribe aquí tu nombre de usuario de Cal.com (ej: maria-vega) si quieres mostrar el calendario interactivo directamente integrado dentro de la página. Si lo dejas vacío, los pacientes reservarán pulsando los botones de las tarjetas de arriba.",
    },
    {
      type: "object",
      name: "faqItems",
      label: "4. Preguntas frecuentes sobre citas y reservas",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.question || "Nueva pregunta frecuente",
        }),
      },
      fields: [
        {
          type: "string",
          name: "question",
          label: "Pregunta",
          required: true,
        },
        {
          type: "string",
          name: "answer",
          label: "Respuesta",
          required: true,
          ui: { component: "textarea" },
        },
      ],
    },
    {
      type: "string",
      name: "seoTitle",
      label: "Título SEO para Google",
      description: "Título para la pestaña del navegador y resultados de búsqueda.",
      required: true,
    },
    {
      type: "string",
      name: "seoDescription",
      label: "Descripción SEO para Google",
      description: "Descripción breve para buscadores.",
      required: true,
      ui: { component: "textarea" },
    },
  ],
};
