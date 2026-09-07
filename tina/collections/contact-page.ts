import type { Collection } from "tinacms";
import { singletonUi } from "../shared/helpers";

export const contactPageCollection: Collection = {
  name: "contactPage",
  label: "Página de Contacto (/contacto)",
  path: "src/content/contactPage",
  format: "json",
  ui: singletonUi,
  fields: [
    {
      type: "string",
      name: "seoTitle",
      label: "Título SEO para Google",
      description: "Título visible en la pestaña del navegador y en búsquedas.",
      required: true,
    },
    {
      type: "string",
      name: "seoDescription",
      label: "Descripción SEO para Google",
      description: "Resumen breve para buscadores.",
      required: true,
      ui: { component: "textarea" },
    },
    {
      type: "object",
      name: "hero",
      label: "1. Cabecera de la página",
      fields: [
        {
          type: "string",
          name: "label",
          label: "Etiqueta superior pequeña (opcional)",
          description:
            "Texto pequeño sobre el título principal (ej: «Hablemos» o «Atención personalizada»). Si se deja vacío o se escribe lo mismo que el título, se ocultará para evitar repetir la misma palabra.",
        },
        {
          type: "string",
          name: "title",
          label: "Título principal (H1)",
          description: "Ej: «¿En qué puedo ayudarte?».",
          required: true,
        },
        {
          type: "string",
          name: "intro",
          label: "Texto de introducción",
          description: "Mensaje cercano que invita al paciente a escribir.",
          required: true,
          ui: { component: "textarea" },
        },
      ],
    },
    {
      type: "object",
      name: "firstConsultation",
      label: "2. Bloque explicativo «La primera consulta»",
      fields: [
        {
          type: "string",
          name: "title",
          label: "Título del bloque",
          description: "Ej: «¿Cómo funciona la primera sesión?».",
          required: true,
        },
        {
          type: "string",
          name: "paragraphs",
          label: "Párrafos informativos",
          description: "Añade cada párrafo haciendo clic en «Añadir elemento».",
          list: true,
          ui: { component: "textarea" },
        },
        {
          type: "object",
          name: "calendarCta",
          label: "Enlace hacia el calendario de reservas",
          description: "Frase con enlace al final del bloque para quien prefiera reservar directo.",
          fields: [
            {
              type: "string",
              name: "prefix",
              label: "Texto previo al enlace",
              description: "Ej: «Si prefieres agendar directamente, puedes »",
              required: true,
            },
            {
              type: "string",
              name: "linkLabel",
              label: "Texto clicable del enlace",
              description: "Ej: «ver mi calendario aquí»",
              required: true,
            },
            {
              type: "string",
              name: "linkHref",
              label: "Destino del enlace",
              description: "Normalmente: /reserva",
              required: true,
            },
            {
              type: "string",
              name: "suffix",
              label: "Texto posterior al enlace",
              description: "Ej: « para elegir día y hora.»",
              required: true,
            },
          ],
        },
      ],
    },
    {
      type: "object",
      name: "contactDetails",
      label: "3. Textos del bloque de contacto y mapa",
      description:
        "Los canales directos (email, teléfono, WhatsApp, dirección y mapa) se configuran de forma única en «Ajustes Globales y Portada» para mantener toda la web sincronizada.",
      fields: [
        {
          type: "string",
          name: "title",
          label: "Título del bloque de canales",
          description: "Ej: «Datos de contacto».",
          required: true,
        },
        {
          type: "string",
          name: "mapCardTitle",
          label: "Título de la tarjeta del mapa (opcional)",
          description: "Ej: «Consulta presencial» o «Ubicación». Por defecto: «Consulta presencial».",
        },
        {
          type: "string",
          name: "mapNote",
          label: "Nota informativa bajo el mapa (opcional)",
          description: "Ej: «Atención exclusivamente con cita previa.». Por defecto: «Atención exclusivamente con cita previa.».",
        },
      ],
    },
    {
      type: "object",
      name: "formSection",
      label: "4. Bloque del formulario de mensaje",
      fields: [
        {
          type: "string",
          name: "title",
          label: "Título sobre el formulario",
          description: "Ej: «Escríbeme un mensaje».",
          required: true,
        },
        {
          type: "string",
          name: "submitLabel",
          label: "Texto del botón de enviar",
          description: "Ej: «Enviar mensaje».",
          required: true,
        },
        {
          type: "string",
          name: "privacyNote",
          label: "Nota informativa de privacidad",
          description: "Texto breve bajo el formulario explicando la confidencialidad de los datos.",
          required: true,
          ui: { component: "textarea" },
        },
      ],
    },
  ],
};
