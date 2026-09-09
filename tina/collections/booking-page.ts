import type { Collection } from "tinacms";
import { singletonUi } from "../shared/helpers";

export const bookingPageCollection: Collection = {
  name: "bookingPage",
  label: "Reservas · Página principal",
  path: "src/content/bookingPage",
  format: "json",
  ui: {
    ...singletonUi,
    router: () => "/reserva",
  },
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
      name: "sessionsSection",
      label: "2. Cabecera del bloque «Tipos de sesión»",
      fields: [
        { type: "string", name: "label", label: "Etiqueta superior (ej: «Tipos de sesión»)" },
        { type: "string", name: "title", label: "Título (ej: «¿Qué tipo de cita necesitas?»)" },
      ],
    },
    {
      type: "object",
      name: "sessions",
      label: "3. Tarjetas de tipos de sesión (Presencial, Online, etc.)",
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
      type: "object",
      name: "calendarSection",
      label: "4. Cabecera del calendario interactivo",
      fields: [
        { type: "string", name: "label", label: "Etiqueta superior (ej: «Calendario en vivo»)" },
        { type: "string", name: "title", label: "Título (ej: «Elige tu cita online o presencial»)" },
      ],
    },
    {
      type: "string",
      name: "calComUsername",
      label: "5. Calendario interactivo incrustado de Cal.com (opcional)",
      description:
        "Escribe aquí tu nombre de usuario de Cal.com (ej: maria-vega) si quieres mostrar el calendario interactivo directamente integrado dentro de la página. Si lo dejas vacío, los pacientes reservarán pulsando los botones de las tarjetas de arriba.",
    },
    {
      type: "string",
      name: "combinedEventSlug",
      label: "Slug del evento de agenda conjunta en Cal.com (opcional)",
      description:
        "Si creas un evento unificado en Cal.com con ambas ubicaciones (ej: sesion-terapia o primera-consulta), indícalo aquí para que la pestaña 'Agenda completa' cargue directamente el calendario mensual único.",
    },
    {
      type: "object",
      name: "faqSection",
      label: "6. Cabecera de Preguntas Frecuentes",
      fields: [
        { type: "string", name: "label", label: "Etiqueta superior (ej: «FAQ»)" },
        { type: "string", name: "title", label: "Título (ej: «Preguntas sobre las citas»)" },
      ],
    },
    {
      type: "object",
      name: "faqItems",
      label: "7. Preguntas frecuentes sobre citas y reservas",
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
      type: "object",
      name: "cta",
      label: "8. Bloque final de contacto alternativo",
      fields: [
        { type: "string", name: "title", label: "Título (ej: «¿Prefieres contactar primero?»)" },
        { type: "string", name: "description", label: "Descripción", ui: { component: "textarea" } },
        { type: "string", name: "label", label: "Texto del botón (ej: «Ir a contacto»)" },
        { type: "string", name: "href", label: "Enlace del botón (ej: /contacto)" },
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
