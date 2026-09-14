// tina/config.ts
import { defineConfig } from "tinacms";

// tina/shared/env.ts
var branch = process.env.PUBLIC_TINA_BRANCH ?? process.env.NEXT_PUBLIC_TINA_BRANCH ?? process.env.GITHUB_BRANCH ?? process.env.CF_PAGES_BRANCH ?? process.env.VERCEL_GIT_COMMIT_REF ?? process.env.HEAD ?? "main";
var clientId = process.env.PUBLIC_TINA_CLIENT_ID ?? process.env.NEXT_PUBLIC_TINA_CLIENT_ID ?? process.env.TINA_CLIENT_ID ?? null;
var token = process.env.TINA_TOKEN ?? null;
var searchIndexerToken = process.env.TINA_SEARCH_TOKEN;

// tina/shared/helpers.ts
var imageFieldUi = {
  format(value) {
    if (!value) return value;
    if (value.startsWith("/")) return value;
    if (value.startsWith("images/")) return `/${value}`;
    return `/images/${value}`;
  },
  parse(value) {
    if (!value) return value;
    return value.startsWith("/") ? value.slice(1) : value;
  }
};
var ctaLinkFields = [
  { type: "string", name: "label", label: "Texto del bot\xF3n", required: true },
  { type: "string", name: "href", label: "Enlace", required: true }
];
var singletonUi = {
  allowedActions: {
    create: false,
    delete: false
  }
};

// tina/collections/site-settings.ts
var siteSettingsCollection = {
  name: "siteSettings",
  label: "Inicio \xB7 Portada y ajustes globales",
  path: "src/content/siteSettings",
  format: "json",
  ui: {
    ...singletonUi,
    router: () => "/"
  },
  fields: [
    {
      type: "object",
      name: "brand",
      label: "Identidad visual (Logotipo y Favicon)",
      fields: [
        {
          type: "image",
          name: "logo",
          label: "Logotipo de la marca (Monograma)",
          description: "Imagen del logotipo (monograma MV). Se utiliza en la cabecera superior y en el pie de p\xE1gina.",
          ui: imageFieldUi
        },
        {
          type: "string",
          name: "logoAlt",
          label: "Texto alternativo del logotipo",
          description: "Descripci\xF3n para accesibilidad y buscadores (ej: \xABMar\xEDa Vega Psicolog\xEDa \u2014 Logotipo\xBB)."
        },
        {
          type: "image",
          name: "favicon",
          label: "Icono de la pesta\xF1a del navegador (Favicon)",
          description: "Icono que aparece en la pesta\xF1a del navegador junto al t\xEDtulo.",
          ui: imageFieldUi
        }
      ]
    },
    {
      type: "object",
      name: "hero",
      label: "1. Portada \u2014 Cabecera principal (Hero)",
      fields: [
        {
          type: "string",
          name: "label",
          label: "Etiqueta superior peque\xF1a",
          description: "Texto peque\xF1o sobre el t\xEDtulo principal (ej: \xABPsicolog\xEDa en M\xE1laga\xBB).",
          required: true
        },
        {
          type: "string",
          name: "title",
          label: "T\xEDtulo principal (H1)",
          description: "T\xEDtulo de gran tama\xF1o que encabeza la p\xE1gina de inicio.",
          required: true
        },
        {
          type: "string",
          name: "description",
          label: "Texto de presentaci\xF3n",
          description: "P\xE1rrafo introductorio debajo del t\xEDtulo principal.",
          required: true,
          ui: { component: "textarea" }
        },
        {
          type: "object",
          name: "primaryCta",
          label: "Bot\xF3n de acci\xF3n principal",
          fields: ctaLinkFields
        },
        {
          type: "object",
          name: "secondaryCta",
          label: "Bot\xF3n secundario",
          fields: ctaLinkFields
        },
        {
          type: "string",
          name: "badges",
          label: "Frases destacadas de confianza (con icono de verificaci\xF3n)",
          description: "Frases cortas (ej: \xABAtenci\xF3n presencial en M\xE1laga\xBB, \xABTerapia online\xBB, \xABColegiada sanitaria\xBB).",
          list: true
        },
        {
          type: "image",
          name: "image",
          label: "Foto principal de la portada (opcional)",
          ui: imageFieldUi
        },
        {
          type: "string",
          name: "imageAlt",
          label: "Descripci\xF3n de la foto (para accesibilidad y SEO)",
          description: "Describe la imagen para Google y lectores de pantalla. Ej.: \xABMar\xEDa Vega, psic\xF3loga en su consulta de M\xE1laga\xBB.",
          ui: { component: "textarea" }
        },
        {
          type: "string",
          name: "imagePlaceholder",
          label: "Texto provisional (si a\xFAn no se ha subido foto)"
        }
      ]
    },
    {
      type: "object",
      name: "therapyApproach",
      label: "2. Portada \u2014 Secci\xF3n \xABMi enfoque\xBB",
      fields: [
        {
          type: "string",
          name: "label",
          label: "Etiqueta superior",
          description: "Ej: \xABEnfoque terap\xE9utico\xBB.",
          required: true
        },
        { type: "string", name: "title", label: "T\xEDtulo de la secci\xF3n", required: true },
        {
          type: "string",
          name: "description",
          label: "Descripci\xF3n del enfoque",
          required: true,
          ui: { component: "textarea" }
        },
        {
          type: "object",
          name: "pillars",
          label: "Tarjetas de pilares o principios de trabajo",
          list: true,
          ui: {
            itemProps: (item) => ({
              label: item?.title || "Nuevo principio de trabajo"
            })
          },
          fields: [
            { type: "string", name: "title", label: "T\xEDtulo del pilar", required: true },
            {
              type: "string",
              name: "description",
              label: "Descripci\xF3n del pilar",
              required: true,
              ui: { component: "textarea" }
            },
            {
              type: "string",
              name: "icon",
              label: "Icono",
              description: "Nombre del icono (ejemplos: lucide:heart, lucide:brain, lucide:sparkles, lucide:sun, lucide:user)."
            }
          ]
        }
      ]
    },
    {
      type: "object",
      name: "servicesSection",
      label: "3. Portada \u2014 Secci\xF3n de servicios y especialidades",
      fields: [
        { type: "string", name: "label", label: "Etiqueta superior (ej: \xABEspecialidades\xBB)", required: true },
        { type: "string", name: "title", label: "T\xEDtulo principal (ej: \xAB\xBFEn qu\xE9 puedo ayudarte?\xBB)", required: true },
        {
          type: "object",
          name: "items",
          label: "Tarjetas de especialidades cl\xEDnicas",
          list: true,
          ui: {
            itemProps: (item) => ({
              label: item?.title || "Especialidad"
            })
          },
          fields: [
            { type: "string", name: "title", label: "T\xEDtulo", required: true },
            { type: "string", name: "shortDescription", label: "Descripci\xF3n breve", required: true, ui: { component: "textarea" } },
            { type: "string", name: "href", label: "Enlace (ej: /duelo)", required: true },
            { type: "string", name: "icon", label: "Icono vectorial (ej: lucide:sparkles)" },
            { type: "image", name: "thumbnail", label: "Miniatura (opcional)", ui: imageFieldUi },
            { type: "string", name: "thumbnailAlt", label: "Texto alternativo de la miniatura" }
          ]
        }
      ]
    },
    {
      type: "object",
      name: "experienceSection",
      label: "4. Portada \u2014 Secci\xF3n de experiencia y trayectoria",
      fields: [
        { type: "string", name: "label", label: "Etiqueta superior (ej: \xABTrayectoria\xBB)", required: true },
        { type: "string", name: "title", label: "T\xEDtulo principal (ej: \xABExperiencia profesional\xBB)", required: true },
        {
          type: "object",
          name: "items",
          label: "\xC1reas de experiencia",
          list: true,
          ui: {
            itemProps: (item) => ({
              label: item?.area || "\xC1rea"
            })
          },
          fields: [
            { type: "string", name: "area", label: "Puesto o \xE1rea de experiencia", required: true }
          ]
        }
      ]
    },
    {
      type: "object",
      name: "trainingSection",
      label: "5. Portada \u2014 Secci\xF3n de formaci\xF3n y cualificaci\xF3n",
      fields: [
        { type: "string", name: "label", label: "Etiqueta superior (ej: \xABCualificaci\xF3n\xBB)", required: true },
        { type: "string", name: "title", label: "T\xEDtulo principal (ej: \xABFormaci\xF3n acad\xE9mica y cl\xEDnica\xBB)", required: true },
        {
          type: "string",
          name: "clinicalTitle",
          label: "Subt\xEDtulo para el bloque cl\xEDnico",
          description: "Ej: \xABFormaci\xF3n cl\xEDnica especializada\xBB.",
          required: true
        },
        {
          type: "object",
          name: "clinicalItems",
          label: "Titulaciones sanitarias y cl\xEDnicas",
          list: true,
          ui: {
            itemProps: (item) => ({ label: item?.degree || "Titulaci\xF3n cl\xEDnica" })
          },
          fields: [
            { type: "string", name: "degree", label: "T\xEDtulo / Grado / M\xE1ster", required: true },
            { type: "string", name: "institution", label: "Instituci\xF3n / Universidad", required: true },
            { type: "string", name: "year", label: "A\xF1o (opcional)" }
          ]
        },
        {
          type: "string",
          name: "complementaryTitle",
          label: "Subt\xEDtulo para el bloque complementario",
          description: "Ej: \xABFormaci\xF3n complementaria y continua\xBB.",
          required: true
        },
        {
          type: "object",
          name: "complementaryItems",
          label: "Titulaciones complementarias",
          list: true,
          ui: {
            itemProps: (item) => ({ label: item?.degree || "Titulaci\xF3n complementaria" })
          },
          fields: [
            { type: "string", name: "degree", label: "T\xEDtulo / Grado / M\xE1ster", required: true },
            { type: "string", name: "institution", label: "Instituci\xF3n / Universidad", required: true },
            { type: "string", name: "year", label: "A\xF1o (opcional)" }
          ]
        }
      ]
    },
    {
      type: "object",
      name: "cta",
      label: "6. Portada \u2014 Bloque final de contacto (Llamada a la acci\xF3n)",
      fields: [
        {
          type: "string",
          name: "title",
          label: "T\xEDtulo destacado (ej: \xAB\xBFHablamos?\xBB)",
          required: true
        },
        {
          type: "string",
          name: "description",
          label: "Texto de invitaci\xF3n",
          required: true,
          ui: { component: "textarea" }
        },
        ...ctaLinkFields
      ]
    },
    {
      type: "object",
      name: "courseHighlight",
      label: "7. Portada \u2014 Bloque promocional de Cursos",
      fields: [
        { type: "string", name: "label", label: "Etiqueta superior (ej: \xABFormaci\xF3n\xBB)", required: true },
        {
          type: "string",
          name: "title",
          label: "T\xEDtulo del bloque de curso",
          description: "Ej: \xABFormaci\xF3n cl\xEDnica en duelo\xBB. Si se deja vac\xEDo, toma el t\xEDtulo del curso."
        },
        {
          type: "string",
          name: "description",
          label: "Descripci\xF3n del bloque",
          description: "Texto explicativo del curso. Si se deja vac\xEDo, toma la descripci\xF3n del curso.",
          ui: { component: "textarea" }
        },
        { type: "string", name: "ctaLabel", label: "Texto del bot\xF3n", required: true },
        {
          type: "string",
          name: "ctaHref",
          label: "Enlace del bot\xF3n (normalmente /cursos)",
          required: true
        }
      ]
    },
    {
      type: "object",
      name: "faqSection",
      label: "8. Portada \u2014 Preguntas Frecuentes",
      fields: [
        { type: "string", name: "label", label: "Etiqueta superior (ej: \xABPreguntas frecuentes\xBB)", required: true },
        { type: "string", name: "title", label: "T\xEDtulo principal (ej: \xABRespuestas sobre el proceso de terapia\xBB)", required: true },
        {
          type: "string",
          name: "description",
          label: "Descripci\xF3n breve",
          required: true,
          ui: { component: "textarea" }
        },
        {
          type: "object",
          name: "items",
          label: "Preguntas y respuestas",
          list: true,
          ui: {
            itemProps: (item) => ({ label: item?.question || "Nueva pregunta" })
          },
          fields: [
            { type: "string", name: "question", label: "Pregunta", required: true },
            { type: "string", name: "answer", label: "Respuesta", required: true, ui: { component: "textarea" } }
          ]
        }
      ]
    },
    {
      type: "object",
      name: "coursesPage",
      label: "9. Cat\xE1logo de Cursos \u2014 Cabecera de la p\xE1gina (/cursos)",
      fields: [
        { type: "string", name: "label", label: "Etiqueta superior (ej: \xABFormaciones\xBB)", required: true },
        { type: "string", name: "title", label: "T\xEDtulo principal (H1, ej: \xABCursos y talleres\xBB)", required: true },
        {
          type: "string",
          name: "intro",
          label: "Texto de introducci\xF3n al cat\xE1logo",
          required: true,
          ui: { component: "textarea" }
        },
        {
          type: "image",
          name: "image",
          label: "Imagen de portada / cabecera",
          description: "Foto destacada de la cabecera para la p\xE1gina de cursos.",
          ui: imageFieldUi
        },
        {
          type: "string",
          name: "imageAlt",
          label: "Descripci\xF3n de la foto (accesibilidad y SEO)"
        },
        { type: "string", name: "seoTitle", label: "T\xEDtulo SEO para Google", required: true },
        {
          type: "string",
          name: "seoDescription",
          label: "Descripci\xF3n SEO para Google",
          required: true,
          ui: { component: "textarea" }
        }
      ]
    },
    {
      type: "object",
      name: "resourcesPage",
      label: "10. Cat\xE1logo de Recursos \u2014 Cabecera de la p\xE1gina (/recursos)",
      fields: [
        { type: "string", name: "label", label: "Etiqueta superior (ej: \xABRecursos\xBB)", required: true },
        { type: "string", name: "title", label: "T\xEDtulo principal (H1, ej: \xABRecursos psicoeducativos\xBB)", required: true },
        {
          type: "string",
          name: "intro",
          label: "Texto de introducci\xF3n al cat\xE1logo",
          required: true,
          ui: { component: "textarea" }
        },
        {
          type: "image",
          name: "image",
          label: "Imagen de portada / cabecera",
          description: "Foto destacada de la cabecera para la p\xE1gina de recursos.",
          ui: imageFieldUi
        },
        {
          type: "string",
          name: "imageAlt",
          label: "Descripci\xF3n de la foto (accesibilidad y SEO)"
        },
        { type: "string", name: "seoTitle", label: "T\xEDtulo SEO para Google", required: true },
        {
          type: "string",
          name: "seoDescription",
          label: "Descripci\xF3n SEO para Google",
          required: true,
          ui: { component: "textarea" }
        }
      ]
    },
    {
      type: "object",
      name: "contact",
      label: "9. Ajustes Globales \u2014 Datos de Contacto (Visibles en toda la web)",
      fields: [
        { type: "string", name: "email", label: "Email de contacto p\xFAblico", required: true },
        {
          type: "string",
          name: "phone",
          label: "Tel\xE9fono de contacto (opcional)",
          description: "Formato internacional est\xE1ndar recomendado: +34 600 000 000"
        },
        {
          type: "string",
          name: "whatsapp",
          label: "Enlace directo de WhatsApp",
          description: "Formato recomendado: https://wa.me/34600000000 (reemplaza con tu n\xFAmero)."
        },
        {
          type: "string",
          name: "instagram",
          label: "Perfil de Instagram",
          description: "Ej: https://instagram.com/mariavegapsicologia"
        },
        { type: "string", name: "telegram", label: "Enlace de Telegram (opcional)" },
        { type: "string", name: "tiktok", label: "Enlace de TikTok (opcional)" },
        { type: "string", name: "linkedin", label: "Enlace de LinkedIn (opcional)" },
        {
          type: "string",
          name: "googleMapsEmbedUrl",
          label: "Mapa interactivo de Google Maps (URL de inserci\xF3n)",
          description: 'En Google Maps: Compartir \u2192 Insertar un mapa \u2192 copiar \xFAnicamente la direcci\xF3n que est\xE1 entre comillas en src="...". Se mostrar\xE1 en la tarjeta de ubicaci\xF3n de la p\xE1gina de contacto.'
        },
        {
          type: "string",
          name: "googleMapsLink",
          label: "Enlace directo de Google Maps (\xABC\xF3mo llegar\xBB)",
          description: "Enlace para que el usuario abra la app de Google Maps en su m\xF3vil o navegador (ej: enlace directo a la ficha del negocio)."
        }
      ]
    },
    {
      type: "object",
      name: "legal",
      label: "10. Ajustes Globales \u2014 Datos Legales, Ubicaci\xF3n y Profesionales",
      fields: [
        {
          type: "string",
          name: "collegiateNumber",
          label: "N\xFAmero de Colegiada Oficial (ej: AO-10293)",
          description: "Aparecer\xE1 en los datos estructurados para Google (Schema.org) y en el pie legal."
        },
        {
          type: "string",
          name: "businessName",
          label: "Nombre fiscal o nombre profesional",
          description: "Ej: Mar\xEDa Vega o Mar\xEDa del Roc\xEDo Vega Garc\xEDa."
        },
        { type: "string", name: "taxId", label: "NIF / CIF" },
        {
          type: "string",
          name: "address",
          label: "Direcci\xF3n f\xEDsica de la consulta (Visible en Contacto, Legal y SEO)",
          description: "Ej: Calle Zamarrilla 15, M\xE1laga. Esta es la direcci\xF3n oficial \xFAnica que se usa en toda la web y para el posicionamiento local en Google."
        }
      ]
    },
    {
      type: "object",
      name: "seo",
      label: "11. Portada \u2014 Metadatos SEO (Google y Redes Sociales)",
      fields: [
        {
          type: "string",
          name: "homeTitle",
          label: "T\xEDtulo de la Portada para Google (Title tag)",
          description: "T\xEDtulo principal para los resultados de Google (ej: \xABPsic\xF3loga en M\xE1laga y Terapia Online\xBB).",
          required: true
        },
        {
          type: "string",
          name: "homeDescription",
          label: "Descripci\xF3n de la Portada para Google (Meta description)",
          description: "Descripci\xF3n breve y atractiva que resume la consulta y servicios en Google.",
          required: true,
          ui: { component: "textarea" }
        }
      ]
    },
    {
      type: "object",
      name: "booking",
      label: "12. Reservas y Citas \u2014 Enlaces a Cal.com",
      fields: [
        {
          type: "string",
          name: "calComUrl",
          label: "Enlace a Agenda General de Cal.com",
          description: "URL para agendar cita general (ej: https://cal.com/maria-vega). Usado en la cabecera, pie y contacto."
        },
        {
          type: "string",
          name: "presencialUrl",
          label: "Enlace directo Cal.com \u2014 Sesi\xF3n Presencial",
          description: "URL directa para reservar terapia presencial (ej: https://cal.com/maria-vega/presencial)."
        },
        {
          type: "string",
          name: "onlineUrl",
          label: "Enlace directo Cal.com \u2014 Sesi\xF3n Online",
          description: "URL directa para reservar terapia online (ej: https://cal.com/maria-vega/online)."
        }
      ]
    }
  ]
};

// tina/collections/profile.ts
var profileCollection = {
  name: "profile",
  label: "Con\xF3ceme \xB7 Presentaci\xF3n personal",
  path: "src/content/profile",
  format: "json",
  ui: {
    ...singletonUi,
    router: () => "/conoceme"
  },
  fields: [
    {
      type: "object",
      name: "hero",
      label: "1. Cabecera y presentaci\xF3n personal",
      fields: [
        {
          type: "string",
          name: "label",
          label: "Etiqueta superior",
          description: "Ej: \xABCon\xF3ceme\xBB, \xABSobre m\xED\xBB.",
          required: true
        },
        {
          type: "string",
          name: "title",
          label: "T\xEDtulo principal (H1)",
          description: "Ej: \xABHola, soy Mar\xEDa Vega\xBB.",
          required: true
        },
        {
          type: "string",
          name: "intro",
          label: "P\xE1rrafos de presentaci\xF3n",
          description: "A\xF1ade cada p\xE1rrafo haciendo clic en \xABA\xF1adir elemento\xBB.",
          list: true,
          ui: { component: "textarea" }
        },
        {
          type: "image",
          name: "photo",
          label: "Foto principal (retrato profesional)",
          ui: imageFieldUi
        },
        {
          type: "string",
          name: "photoAlt",
          label: "Descripci\xF3n de la foto (para accesibilidad y SEO)",
          description: "Describe la imagen para Google y lectores de pantalla. Ej.: \xABMar\xEDa Vega, psic\xF3loga general sanitaria en M\xE1laga\xBB.",
          required: true,
          ui: { component: "textarea" }
        },
        {
          type: "image",
          name: "secondaryPhoto",
          label: "Foto secundaria de apoyo (opcional)",
          description: "Foto horizontal adicional (ej: detalle de la consulta o espacio de trabajo).",
          ui: imageFieldUi
        },
        {
          type: "string",
          name: "secondaryPhotoAlt",
          label: "Descripci\xF3n de la foto secundaria",
          ui: { component: "textarea" }
        },
        {
          type: "string",
          name: "photoPlaceholder",
          label: "Texto de reemplazo si no hay foto",
          description: "Texto que se muestra si no se ha subido una fotograf\xEDa."
        }
      ]
    },
    {
      type: "object",
      name: "approach",
      label: "2. Secci\xF3n \xABMi forma de trabajar / Enfoque\xBB",
      fields: [
        {
          type: "string",
          name: "label",
          label: "Etiqueta superior",
          description: "Ej: \xABEnfoque terap\xE9utico\xBB.",
          required: true
        },
        {
          type: "string",
          name: "title",
          label: "T\xEDtulo de la secci\xF3n",
          description: "Ej: \xABUn espacio seguro, cercano y basado en la evidencia\xBB.",
          required: true
        },
        {
          type: "string",
          name: "paragraphs",
          label: "P\xE1rrafos explicativos del enfoque",
          list: true,
          ui: { component: "textarea" }
        }
      ]
    },
    {
      type: "object",
      name: "trainingSection",
      label: "3. Secci\xF3n \xABFormaci\xF3n acad\xE9mica y cl\xEDnica\xBB",
      fields: [
        {
          type: "string",
          name: "label",
          label: "Etiqueta superior",
          description: "Ej: \xABCualificaci\xF3n\xBB.",
          required: true
        },
        {
          type: "string",
          name: "title",
          label: "T\xEDtulo de la secci\xF3n",
          description: "Ej: \xABFormaci\xF3n acad\xE9mica\xBB.",
          required: true
        },
        {
          type: "string",
          name: "clinicalTitle",
          label: "T\xEDtulo del bloque de formaci\xF3n sanitaria",
          description: "Ej: \xABFormaci\xF3n Sanitaria y Habilitaci\xF3n Cl\xEDnica\xBB.",
          required: true
        },
        {
          type: "object",
          name: "clinicalItems",
          label: "Titulaciones sanitarias y cl\xEDnicas",
          list: true,
          ui: {
            itemProps: (item) => ({ label: item?.degree || "Titulaci\xF3n cl\xEDnica" })
          },
          fields: [
            { type: "string", name: "degree", label: "T\xEDtulo / Grado / M\xE1ster", required: true },
            { type: "string", name: "institution", label: "Instituci\xF3n / Universidad", required: true },
            { type: "string", name: "year", label: "A\xF1o (opcional)" }
          ]
        },
        {
          type: "string",
          name: "complementaryTitle",
          label: "T\xEDtulo del bloque de formaci\xF3n continuada",
          description: "Ej: \xABFormaci\xF3n Continuada y Especializaci\xF3n\xBB.",
          required: true
        },
        {
          type: "object",
          name: "complementaryItems",
          label: "Titulaciones complementarias",
          list: true,
          ui: {
            itemProps: (item) => ({ label: item?.degree || "Titulaci\xF3n complementaria" })
          },
          fields: [
            { type: "string", name: "degree", label: "T\xEDtulo / Grado / M\xE1ster", required: true },
            { type: "string", name: "institution", label: "Instituci\xF3n / Universidad", required: true },
            { type: "string", name: "year", label: "A\xF1o (opcional)" }
          ]
        }
      ]
    },
    {
      type: "object",
      name: "experienceSection",
      label: "4. Secci\xF3n \xABTrayectoria y experiencia cl\xEDnica\xBB",
      fields: [
        {
          type: "string",
          name: "label",
          label: "Etiqueta superior",
          description: "Ej: \xABTrayectoria\xBB.",
          required: true
        },
        {
          type: "string",
          name: "title",
          label: "T\xEDtulo de la secci\xF3n",
          description: "Ej: \xABExperiencia cl\xEDnica\xBB.",
          required: true
        },
        {
          type: "object",
          name: "items",
          label: "\xC1reas de experiencia y trayectoria",
          list: true,
          ui: {
            itemProps: (item) => ({ label: item?.area || "\xC1rea de experiencia" })
          },
          fields: [
            { type: "string", name: "area", label: "Puesto o \xE1rea de experiencia", required: true }
          ]
        }
      ]
    },
    {
      type: "object",
      name: "cta",
      label: "5. Bloque final de llamada a la acci\xF3n (Contacto / Reserva)",
      fields: [
        {
          type: "string",
          name: "title",
          label: "T\xEDtulo de cierre",
          description: "Ej: \xAB\xBFDamos el primer paso juntas?\xBB.",
          required: true
        },
        {
          type: "string",
          name: "description",
          label: "Texto explicativo",
          required: true,
          ui: { component: "textarea" }
        },
        ...ctaLinkFields
      ]
    },
    {
      type: "string",
      name: "seoTitle",
      label: "T\xEDtulo SEO para Google (opcional)",
      description: "T\xEDtulo para la pesta\xF1a del navegador y Google. Si se deja vac\xEDo, se usar\xE1 \xABCon\xF3ceme\xBB."
    },
    {
      type: "string",
      name: "seoDescription",
      label: "Descripci\xF3n SEO para Google (opcional)",
      description: "Descripci\xF3n breve para los resultados de b\xFAsqueda de Google.",
      ui: { component: "textarea" }
    }
  ]
};

// tina/collections/services-page.ts
var servicesPageCollection = {
  name: "servicesPage",
  label: "Servicios \xB7 Cabecera y modalidades",
  path: "src/content/servicesPage",
  format: "json",
  ui: {
    ...singletonUi,
    router: () => "/servicios"
  },
  fields: [
    {
      type: "object",
      name: "hero",
      label: "1. Cabecera de la p\xE1gina",
      fields: [
        {
          type: "string",
          name: "label",
          label: "Etiqueta superior (badge)",
          description: "Texto peque\xF1o sobre el t\xEDtulo. Ej: \xABServicios y Especialidades\xBB.",
          required: true
        },
        {
          type: "string",
          name: "title",
          label: "T\xEDtulo principal (H1)",
          description: "T\xEDtulo grande de la p\xE1gina. Ej: \xABAcompa\xF1amiento psicol\xF3gico para tu momento vital\xBB.",
          required: true
        },
        {
          type: "string",
          name: "description",
          label: "Descripci\xF3n introductoria",
          description: "P\xE1rrafo explicativo bajo el t\xEDtulo principal.",
          required: true,
          ui: { component: "textarea" }
        }
      ]
    },
    {
      type: "object",
      name: "modalitiesSection",
      label: "2. Modalidades de atenci\xF3n (Presencial y Online)",
      fields: [
        {
          type: "string",
          name: "label",
          label: "Etiqueta de la secci\xF3n",
          description: "Ej: \xABModalidades de atenci\xF3n\xBB.",
          required: true
        },
        {
          type: "string",
          name: "title",
          label: "T\xEDtulo de la secci\xF3n (H2)",
          description: "Ej: \xAB\xBFC\xF3mo prefieres realizar tus sesiones?\xBB.",
          required: true
        },
        {
          type: "object",
          name: "items",
          label: "Tarjetas de modalidad",
          list: true,
          ui: {
            itemProps: (item) => ({
              label: item?.title || "Nueva modalidad de atenci\xF3n"
            })
          },
          fields: [
            {
              type: "string",
              name: "title",
              label: "T\xEDtulo de la modalidad",
              description: "Ej: \xABConsulta presencial en M\xE1laga\xBB o \xABTerapia online por videollamada\xBB.",
              required: true
            },
            {
              type: "string",
              name: "badge",
              label: "Etiqueta destacada (opcional)",
              description: "Texto destacado arriba a la derecha. Ej: \xABRecomendada\xBB (dejar vac\xEDo si no aplica)."
            },
            {
              type: "string",
              name: "icon",
              label: "Icono principal",
              description: "Identificador de Lucide (ej: lucide:map-pin, lucide:monitor, lucide:video).",
              required: true
            },
            {
              type: "string",
              name: "description",
              label: "Descripci\xF3n",
              description: "Texto explicativo detallando las ventajas o caracter\xEDsticas de la modalidad.",
              required: true,
              ui: { component: "textarea" }
            },
            {
              type: "string",
              name: "schedule",
              label: "\u23F0 Horario disponible",
              description: "Ej: \xABLunes de 17:00 a 20:00 (con cita previa)\xBB o \xABMartes a domingo de 16:00 a 21:00\xBB.",
              required: true
            },
            {
              type: "string",
              name: "feature",
              label: "Caracter\xEDstica adicional o garant\xEDa",
              description: "Ej: \xABPrivacidad y confidencialidad absoluta\xBB o \xABConexi\xF3n segura desde donde est\xE9s\xBB.",
              required: true
            },
            {
              type: "string",
              name: "featureIcon",
              label: "Icono de la caracter\xEDstica",
              description: "Identificador de Lucide (ej: lucide:shield-check, lucide:video, lucide:lock).",
              required: true
            },
            {
              type: "string",
              name: "primaryButtonText",
              label: "Texto del bot\xF3n principal (Reservar)",
              description: "Ej: \xABReservar presencial\xBB o \xABReservar online\xBB.",
              required: true
            },
            {
              type: "string",
              name: "primaryButtonHref",
              label: "Enlace del bot\xF3n principal",
              description: "Ruta de destino (ej: /reserva).",
              required: true
            },
            {
              type: "string",
              name: "secondaryButtonText",
              label: "Texto del bot\xF3n secundario (M\xE1s info)",
              description: "Ej: \xABM\xE1s informaci\xF3n\xBB.",
              required: true
            },
            {
              type: "string",
              name: "secondaryButtonHref",
              label: "Enlace del bot\xF3n secundario",
              description: "Ruta de destino (ej: /terapia-presencial o /terapia-online).",
              required: true
            }
          ]
        }
      ]
    },
    {
      type: "object",
      name: "specialtiesSection",
      label: "3. Secci\xF3n de \xE1reas y especialidades",
      fields: [
        {
          type: "string",
          name: "label",
          label: "Etiqueta superior",
          description: "Ej: \xAB\xC1reas de acompa\xF1amiento\xBB.",
          required: true
        },
        {
          type: "string",
          name: "title",
          label: "T\xEDtulo de la secci\xF3n (H2)",
          description: "Ej: \xAB\xBFEn qu\xE9 situaciones puedo acompa\xF1arte?\xBB.",
          required: true
        },
        {
          type: "string",
          name: "description",
          label: "Descripci\xF3n de apoyo",
          description: "P\xE1rrafo introductorio para las tarjetas de especialidad cl\xEDnica.",
          required: true,
          ui: { component: "textarea" }
        },
        {
          type: "object",
          name: "items",
          label: "Tarjetas de especialidades cl\xEDnicas",
          list: true,
          ui: {
            itemProps: (item) => ({
              label: item?.title || "Nueva especialidad"
            })
          },
          fields: [
            {
              type: "string",
              name: "title",
              label: "T\xEDtulo de la especialidad",
              description: "Ej: \xABDuelo y p\xE9rdidas\xBB o \xABAnsiedad y regulaci\xF3n emocional\xBB.",
              required: true
            },
            {
              type: "string",
              name: "shortDescription",
              label: "Descripci\xF3n breve",
              description: "Resumen breve para la tarjeta.",
              required: true,
              ui: { component: "textarea" }
            },
            {
              type: "string",
              name: "slug",
              label: "Identificador de enlace (Slug)",
              description: "Ruta de la p\xE1gina (ej: duelo, ansiedad, infanto-juvenil, adicciones)."
            },
            {
              type: "string",
              name: "icon",
              label: "Icono vectorial (opcional si hay miniatura)",
              description: "Identificador Lucide (ej: lucide:heart-crack, lucide:sparkles)."
            },
            {
              type: "image",
              name: "thumbnail",
              label: "Imagen en miniatura (opcional)",
              ui: imageFieldUi
            },
            {
              type: "string",
              name: "thumbnailAlt",
              label: "Texto alternativo de la miniatura"
            }
          ]
        }
      ]
    },
    {
      type: "object",
      name: "cta",
      label: "4. Bloque final de llamada a la acci\xF3n (Contacto)",
      fields: [
        {
          type: "string",
          name: "title",
          label: "T\xEDtulo destacado",
          required: true
        },
        {
          type: "string",
          name: "description",
          label: "Texto de invitaci\xF3n",
          required: true,
          ui: { component: "textarea" }
        },
        ...ctaLinkFields
      ]
    },
    {
      type: "string",
      name: "seoTitle",
      label: "4. T\xEDtulo SEO (Meta Title)",
      description: "T\xEDtulo para la pesta\xF1a del navegador y Google.",
      required: true
    },
    {
      type: "string",
      name: "seoDescription",
      label: "5. Descripci\xF3n SEO (Meta Description)",
      description: "Descripci\xF3n breve para motores de b\xFAsqueda.",
      required: true,
      ui: { component: "textarea" }
    }
  ]
};

// tina/shared/rich-text.ts
var richTextBodyField = {
  type: "rich-text",
  name: "body",
  label: "Contenido principal de la p\xE1gina",
  description: "Escribe aqu\xED el texto del art\xEDculo o servicio. Puedes usar los bloques desplegables de abajo para a\xF1adir botones, testimonios, acordeones o notas.",
  isBody: true,
  templates: [
    {
      name: "BotonCTA",
      label: "Bot\xF3n de acci\xF3n (CTA)",
      ui: {
        itemProps: (item) => ({
          label: item?.label ? `Bot\xF3n: ${item.label}` : "Bot\xF3n CTA"
        })
      },
      fields: [
        {
          type: "string",
          name: "label",
          label: "Texto del bot\xF3n",
          description: "Ej: \xABReservar primera sesi\xF3n\xBB, \xABSaber m\xE1s\xBB",
          required: true
        },
        {
          type: "string",
          name: "href",
          label: "Enlace de destino",
          description: "Ej: /reserva, /contacto o un enlace web externo completo",
          required: true
        },
        {
          type: "string",
          name: "variant",
          label: "Estilo visual del bot\xF3n",
          options: [
            { value: "primary", label: "Principal (Verde s\xF3lido)" },
            { value: "secondary", label: "Secundario (Fondo claro con borde)" },
            { value: "accent", label: "Destacado (Tono c\xE1lido/rosado)" }
          ]
        },
        {
          type: "string",
          name: "align",
          label: "Alineaci\xF3n en la p\xE1gina",
          options: [
            { value: "left", label: "Izquierda" },
            { value: "center", label: "Centrado" },
            { value: "right", label: "Derecha" }
          ]
        },
        {
          type: "string",
          name: "size",
          label: "Tama\xF1o del bot\xF3n",
          options: [
            { value: "md", label: "Normal / Mediano" },
            { value: "lg", label: "Grande" }
          ]
        }
      ]
    },
    {
      name: "Testimonio",
      label: "Cita o testimonio",
      ui: {
        itemProps: (item) => ({
          label: item?.author ? `Testimonio: ${item.author}` : "Cita o testimonio"
        })
      },
      fields: [
        {
          type: "string",
          name: "quote",
          label: "Testimonio / Frase",
          description: "Texto del testimonio o cita que ir\xE1 entre comillas",
          required: true,
          ui: { component: "textarea" }
        },
        {
          type: "string",
          name: "author",
          label: "Nombre o iniciales de la persona",
          required: true
        },
        {
          type: "string",
          name: "role",
          label: "Detalle o contexto adicional (opcional)",
          description: "Ej: \xABPaciente de terapia presencial\xBB, \xABAlumna del taller\xBB"
        }
      ]
    },
    {
      name: "Acordeon",
      label: "Bloque desplegable (FAQ o detalles adicionales)",
      ui: {
        itemProps: (item) => ({
          label: item?.title || "Bloque desplegable"
        })
      },
      fields: [
        {
          type: "string",
          name: "title",
          label: "T\xEDtulo visible del desplegable",
          description: "La pregunta o tema que se ver\xE1 inicialmente",
          required: true
        },
        {
          type: "string",
          name: "content",
          label: "Contenido desplegable",
          description: "El texto explicativo que se mostrar\xE1 al hacer clic",
          required: true,
          ui: { component: "textarea" }
        }
      ]
    },
    {
      name: "Alerta",
      label: "Caja de nota destacada / Aviso",
      ui: {
        itemProps: (item) => ({
          label: item?.title || (item?.text ? `${item.text.slice(0, 30)}...` : "Nota destacada")
        })
      },
      fields: [
        {
          type: "string",
          name: "title",
          label: "T\xEDtulo de la nota (opcional)"
        },
        {
          type: "string",
          name: "text",
          label: "Texto de la nota",
          required: true,
          ui: { component: "textarea" }
        },
        {
          type: "string",
          name: "type",
          label: "Estilo / Color de la caja",
          options: [
            { value: "info", label: "Informaci\xF3n (Tono salvia suave)" },
            { value: "success", label: "\xC9xito o confirmaci\xF3n (Tono verde)" },
            { value: "warning", label: "Atenci\xF3n o aviso importante (Tono \xE1mbar)" }
          ]
        }
      ]
    }
  ]
};

// tina/collections/services.ts
var servicesCollection = {
  name: "services",
  label: "Servicios \xB7 Fichas de especialidades",
  path: "src/content/servicios",
  format: "mdx",
  ui: {
    router: ({ document }) => document._sys?.filename ? `/${document._sys.filename}` : "/servicios",
    filename: {
      readonly: true,
      slugify: (values) => values?.slug ?? ""
    }
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Nombre del servicio",
      description: "T\xEDtulo principal (ej: Terapia de duelo, Ansiedad y estr\xE9s, etc.).",
      required: true
    },
    {
      type: "string",
      name: "slug",
      label: "Identificador en la URL (Slug)",
      description: "Texto para la direcci\xF3n web (ej: terapia-duelo generar\xE1 /terapia-duelo). Usa solo min\xFAsculas y guiones.",
      required: true
    },
    {
      type: "string",
      name: "heroLabel",
      label: "Sobre-t\xEDtulo de la cabecera (Badge / Categor\xEDa)",
      description: "Texto peque\xF1o sobre el t\xEDtulo (por defecto: \xABPsicolog\xEDa\xBB)."
    },
    {
      type: "string",
      name: "shortDescription",
      label: "Descripci\xF3n breve (para las tarjetas del cat\xE1logo)",
      description: "Resumen breve que aparece en la cuadr\xEDcula de servicios de la portada y el pie de p\xE1gina.",
      required: true,
      ui: { component: "textarea" }
    },
    {
      type: "string",
      name: "description",
      label: "Descripci\xF3n de la cabecera",
      description: "Texto explicativo que aparece bajo el t\xEDtulo en la cabecera de la p\xE1gina del servicio.",
      required: true,
      ui: { component: "textarea" }
    },
    {
      type: "boolean",
      name: "published",
      label: "Publicar servicio (visible en la web)",
      description: "Activa o desactiva la visibilidad de este servicio en las listas de la web."
    },
    {
      type: "number",
      name: "order",
      label: "Orden de aparici\xF3n",
      description: "N\xFAmero para ordenar las tarjetas (1 para el primero, 2 para el segundo...)."
    },
    {
      type: "string",
      name: "icon",
      label: "Icono representativo (Lucide o SVG)",
      description: "Nombre de cualquier icono Lucide (ej: heart-handshake, sun-medium, compass, life-buoy, sparkles, map-pin, monitor) o c\xF3digo SVG personalizado (<svg...)."
    },
    {
      type: "string",
      name: "ctaTitle",
      label: "T\xEDtulo de la llamada a la acci\xF3n inferior (opcional)",
      description: "Por defecto: \xAB\xBFHablamos?\xBB."
    },
    {
      type: "string",
      name: "ctaDescription",
      label: "Descripci\xF3n de la llamada a la acci\xF3n inferior (opcional)",
      description: "Por defecto: \xABEl primer paso es contactar. Sin compromiso.\xBB.",
      ui: { component: "textarea" }
    },
    {
      type: "string",
      name: "ctaLabel",
      label: "Texto del bot\xF3n de acci\xF3n inferior (opcional)",
      description: "Por defecto: \xABContactar\xBB."
    },
    {
      type: "string",
      name: "ctaHref",
      label: "Enlace del bot\xF3n inferior (opcional)",
      description: "Por defecto: /contacto."
    },
    {
      type: "image",
      name: "thumbnail",
      label: "Miniatura para la tarjeta en la portada (opcional)",
      ui: imageFieldUi
    },
    {
      type: "string",
      name: "thumbnailAlt",
      label: "Descripci\xF3n de la miniatura (para accesibilidad y SEO)",
      description: "Describe brevemente la miniatura para Google y personas con discapacidad visual.",
      ui: { component: "textarea" }
    },
    {
      type: "image",
      name: "image",
      label: "Foto o ilustraci\xF3n principal del servicio (opcional)",
      description: "Imagen que se muestra en la cabecera / hero y en el cuerpo del servicio.",
      ui: imageFieldUi
    },
    {
      type: "string",
      name: "imageAlt",
      label: "Descripci\xF3n de la foto principal (para accesibilidad y SEO)",
      description: "Describe la imagen para Google y lectores de pantalla. Ej.: \xABSesi\xF3n de terapia presencial en consulta\xBB.",
      ui: { component: "textarea" }
    },
    {
      type: "image",
      name: "heroImage",
      label: "Foto espec\xEDfica de cabecera / Hero (opcional)",
      description: "Si se especifica, sustituye a la foto principal en la cabecera de la p\xE1gina. Si se deja vac\xEDa, se usar\xE1 la foto principal.",
      ui: imageFieldUi
    },
    {
      type: "string",
      name: "heroImageAlt",
      label: "Descripci\xF3n de la foto de cabecera (para accesibilidad y SEO)"
    },
    {
      type: "string",
      name: "seoTitle",
      label: "T\xEDtulo SEO para Google (opcional)",
      description: "T\xEDtulo para la pesta\xF1a del navegador y Google. Si se deja vac\xEDo, se usar\xE1 el nombre del servicio."
    },
    {
      type: "string",
      name: "seoDescription",
      label: "Descripci\xF3n SEO para Google (opcional)",
      description: "Descripci\xF3n breve para los resultados de b\xFAsqueda de Google. Si se deja vac\xEDa, se usar\xE1 la descripci\xF3n general.",
      ui: { component: "textarea" }
    },
    richTextBodyField
  ]
};

// tina/collections/resources.ts
var resourcesCollection = {
  name: "resources",
  label: "Recursos \xB7 Art\xEDculos psicoeducativos",
  path: "src/content/recursos",
  format: "mdx",
  ui: {
    router: ({ document }) => document._sys?.filename ? `/recursos/${document._sys.filename}` : "/recursos",
    filename: {
      readonly: true,
      slugify: (values) => values?.slug ?? ""
    }
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "T\xEDtulo del art\xEDculo",
      description: "T\xEDtulo principal que se mostrar\xE1 en grande en la cabecera.",
      required: true
    },
    {
      type: "string",
      name: "heroLabel",
      label: "Sobre-t\xEDtulo de la cabecera (Badge / Categor\xEDa)",
      description: "Texto peque\xF1o sobre el t\xEDtulo (por defecto: \xABRecurso\xBB)."
    },
    {
      type: "string",
      name: "slug",
      label: "Identificador en la URL (Slug)",
      description: "Texto para la direcci\xF3n web (ej: duelo-y-culpa generar\xE1 /recursos/duelo-y-culpa).",
      required: true
    },
    {
      type: "string",
      name: "description",
      label: "Resumen / Entradilla del art\xEDculo",
      description: "Breve resumen que aparece en las tarjetas del blog y bajo el t\xEDtulo principal.",
      required: true,
      ui: { component: "textarea" }
    },
    {
      type: "boolean",
      name: "published",
      label: "Publicar art\xEDculo (visible en la web)",
      description: "Marca esta casilla cuando el art\xEDculo est\xE9 listo para el p\xFAblico."
    },
    {
      type: "boolean",
      name: "featured",
      label: "Destacar art\xEDculo en la parte superior",
      description: "Si se activa, este art\xEDculo aparecer\xE1 como lectura recomendada principal."
    },
    {
      type: "datetime",
      name: "publishedAt",
      label: "Fecha de publicaci\xF3n",
      description: "Fecha visible para los lectores."
    },
    {
      type: "image",
      name: "image",
      label: "Imagen de portada del art\xEDculo (opcional)",
      ui: imageFieldUi
    },
    {
      type: "string",
      name: "tags",
      label: "Etiquetas / Tem\xE1ticas",
      description: "Palabras clave sobre los temas tratados (ej: Ansiedad, Duelo, Autocuidado, ACT).",
      list: true,
      ui: { component: "tags" }
    },
    {
      type: "string",
      name: "ctaLabel",
      label: "Texto del bot\xF3n final del art\xEDculo (opcional)",
      description: "Ej: \xABPedir cita\xBB o \xABSaber m\xE1s sobre terapia\xBB."
    },
    {
      type: "string",
      name: "ctaHref",
      label: "Enlace del bot\xF3n final (opcional)",
      description: "Direcci\xF3n a la que llevar\xE1 el bot\xF3n (ej: /reserva o /contacto)."
    },
    {
      type: "string",
      name: "seoTitle",
      label: "T\xEDtulo SEO para Google (opcional)",
      description: "T\xEDtulo optimizado para buscadores."
    },
    {
      type: "string",
      name: "seoDescription",
      label: "Descripci\xF3n SEO para Google (opcional)",
      description: "Descripci\xF3n optimizada para buscadores.",
      ui: { component: "textarea" }
    },
    richTextBodyField
  ]
};

// tina/collections/courses.ts
var coursesCollection = {
  name: "courses",
  label: "Cursos \xB7 Formaciones profesionales",
  path: "src/content/cursos",
  format: "mdx",
  ui: {
    router: ({ document }) => document._sys?.filename === "curso-duelo" ? "/curso-duelo" : document._sys?.filename ? `/cursos/${document._sys.filename}` : "/cursos",
    filename: {
      readonly: true,
      slugify: (values) => values?.slug ?? ""
    }
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "T\xEDtulo del curso o formaci\xF3n",
      description: "T\xEDtulo principal que se mostrar\xE1 en grande en la cabecera y en el cat\xE1logo.",
      required: true
    },
    {
      type: "string",
      name: "slug",
      label: "Identificador en la URL (Slug)",
      description: "Texto para la direcci\xF3n web (ej: curso-duelo generar\xE1 /curso-duelo). Usa solo min\xFAsculas y guiones.",
      required: true
    },
    {
      type: "string",
      name: "shortDescription",
      label: "Subt\xEDtulo / Descripci\xF3n en cabecera",
      description: "Frase descriptiva que aparece inmediatamente debajo del t\xEDtulo en la cabecera y en las tarjetas del cat\xE1logo.",
      required: true,
      ui: { component: "textarea" }
    },
    {
      type: "string",
      name: "description",
      label: "Descripci\xF3n general",
      description: "Resumen completo del curso para presentaci\xF3n y motores de b\xFAsqueda.",
      required: true,
      ui: { component: "textarea" }
    },
    {
      type: "boolean",
      name: "published",
      label: "Publicar curso (visible en el cat\xE1logo de la web)",
      description: "Si est\xE1 desactivado, el curso no aparecer\xE1 en el listado de /cursos."
    },
    {
      type: "string",
      name: "heroLabel",
      label: "Etiqueta superior en la cabecera (opcional)",
      description: "Texto peque\xF1o sobre el t\xEDtulo principal (ej: \xABFormaci\xF3n profesional\xBB, \xABTaller online\xBB, \xABEdici\xF3n 2026\xBB)."
    },
    {
      type: "string",
      name: "audienceIntro",
      label: "Texto destacado complementario bajo la descripci\xF3n (opcional)",
      description: "P\xE1rrafo secundario bajo la descripci\xF3n en la cabecera. Puedes usarlo para cualquier detalle clave del curso: para qui\xE9n est\xE1 dirigido, requisitos previos, modalidad, fechas o plazas.",
      ui: { component: "textarea" }
    },
    {
      type: "string",
      name: "paymentLink",
      label: "Enlace de pago o inscripci\xF3n externa (opcional)",
      description: "Si indicas un enlace (ej: Stripe Payment Link o pasarela externa), el bot\xF3n principal de la cabecera llevar\xE1 al pago. Si lo dejas vac\xEDo, el bot\xF3n invitar\xE1 a pedir informaci\xF3n por el formulario de contacto."
    },
    {
      type: "string",
      name: "ctaLabel",
      label: "Texto del bot\xF3n principal de la cabecera (opcional)",
      description: "Por defecto: \xABSolicitar informaci\xF3n\xBB (o \xABInscribirme en la formaci\xF3n\xBB si hay enlace de pago)."
    },
    {
      type: "image",
      name: "image",
      label: "Imagen de portada (tarjeta en cat\xE1logo de cursos)",
      description: "Foto o car\xE1tula ilustrativa que aparecer\xE1 en el listado de /cursos.",
      ui: imageFieldUi
    },
    {
      type: "string",
      name: "imageAlt",
      label: "Descripci\xF3n de la imagen (para accesibilidad y SEO)",
      description: "Describe brevemente la imagen para Google.",
      ui: { component: "textarea" }
    },
    {
      type: "string",
      name: "seoTitle",
      label: "T\xEDtulo SEO para Google (opcional)",
      description: "T\xEDtulo para la pesta\xF1a del navegador y resultados de Google."
    },
    {
      type: "string",
      name: "seoDescription",
      label: "Descripci\xF3n SEO para Google (opcional)",
      description: "Descripci\xF3n breve para resultados de b\xFAsqueda.",
      ui: { component: "textarea" }
    },
    {
      type: "object",
      name: "bottomCta",
      label: "Llamada a la acci\xF3n final (CTA inferior)",
      fields: [
        {
          type: "string",
          name: "title",
          label: "T\xEDtulo de la llamada a la acci\xF3n",
          description: "Ej: \xAB\xBFTienes preguntas sobre la formaci\xF3n?\xBB."
        },
        {
          type: "string",
          name: "description",
          label: "Texto explicativo",
          description: "Ej: \xABPuedes escribirme para conocer el programa, la modalidad y los requisitos. Sin compromiso.\xBB.",
          ui: { component: "textarea" }
        },
        {
          type: "string",
          name: "ctaLabel",
          label: "Texto del bot\xF3n",
          description: "Por defecto: \xABSolicitar informaci\xF3n\xBB."
        },
        {
          type: "string",
          name: "ctaHref",
          label: "Enlace del bot\xF3n",
          description: "Por defecto: /contacto."
        }
      ]
    },
    richTextBodyField
  ]
};

// tina/collections/contact-page.ts
var contactPageCollection = {
  name: "contactPage",
  label: "Contacto \xB7 P\xE1gina de contacto",
  path: "src/content/contactPage",
  format: "json",
  ui: {
    ...singletonUi,
    router: () => "/contacto"
  },
  fields: [
    {
      type: "string",
      name: "seoTitle",
      label: "T\xEDtulo SEO para Google",
      description: "T\xEDtulo visible en la pesta\xF1a del navegador y en b\xFAsquedas.",
      required: true
    },
    {
      type: "string",
      name: "seoDescription",
      label: "Descripci\xF3n SEO para Google",
      description: "Resumen breve para buscadores.",
      required: true,
      ui: { component: "textarea" }
    },
    {
      type: "object",
      name: "hero",
      label: "1. Cabecera de la p\xE1gina",
      fields: [
        {
          type: "string",
          name: "label",
          label: "Etiqueta superior peque\xF1a (opcional)",
          description: "Texto peque\xF1o sobre el t\xEDtulo principal (ej: \xABHablemos\xBB o \xABAtenci\xF3n personalizada\xBB). Si se deja vac\xEDo o se escribe lo mismo que el t\xEDtulo, se ocultar\xE1 para evitar repetir la misma palabra."
        },
        {
          type: "string",
          name: "title",
          label: "T\xEDtulo principal (H1)",
          description: "Ej: \xAB\xBFEn qu\xE9 puedo ayudarte?\xBB.",
          required: true
        },
        {
          type: "string",
          name: "intro",
          label: "Texto de introducci\xF3n",
          description: "Mensaje cercano que invita al paciente a escribir.",
          required: true,
          ui: { component: "textarea" }
        }
      ]
    },
    {
      type: "object",
      name: "firstConsultation",
      label: "2. Bloque explicativo \xABLa primera consulta\xBB",
      fields: [
        {
          type: "string",
          name: "title",
          label: "T\xEDtulo del bloque",
          description: "Ej: \xAB\xBFC\xF3mo funciona la primera sesi\xF3n?\xBB.",
          required: true
        },
        {
          type: "string",
          name: "paragraphs",
          label: "P\xE1rrafos informativos",
          description: "A\xF1ade cada p\xE1rrafo haciendo clic en \xABA\xF1adir elemento\xBB.",
          list: true,
          ui: { component: "textarea" }
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
              description: "Ej: \xABSi prefieres agendar directamente, puedes \xBB",
              required: true
            },
            {
              type: "string",
              name: "linkLabel",
              label: "Texto clicable del enlace",
              description: "Ej: \xABver mi calendario aqu\xED\xBB",
              required: true
            },
            {
              type: "string",
              name: "linkHref",
              label: "Destino del enlace",
              description: "Normalmente: /reserva",
              required: true
            },
            {
              type: "string",
              name: "suffix",
              label: "Texto posterior al enlace",
              description: "Ej: \xAB para elegir d\xEDa y hora.\xBB",
              required: true
            }
          ]
        }
      ]
    },
    {
      type: "object",
      name: "contactDetails",
      label: "3. Textos del bloque de contacto y mapa",
      description: "Los canales directos (email, tel\xE9fono, WhatsApp, direcci\xF3n y mapa) se configuran de forma \xFAnica en \xABAjustes Globales y Portada\xBB para mantener toda la web sincronizada.",
      fields: [
        {
          type: "string",
          name: "title",
          label: "T\xEDtulo del bloque de canales",
          description: "Ej: \xABDatos de contacto\xBB.",
          required: true
        },
        {
          type: "string",
          name: "email",
          label: "Email de contacto (opcional)",
          description: "Si se deja vac\xEDo, se usar\xE1 el email general de Ajustes Globales."
        },
        {
          type: "string",
          name: "phone",
          label: "Tel\xE9fono de contacto (opcional)",
          description: "Si se deja vac\xEDo, se usar\xE1 el tel\xE9fono de Ajustes Globales."
        },
        {
          type: "string",
          name: "whatsapp",
          label: "Enlace o n\xFAmero de WhatsApp (opcional)",
          description: "Si se deja vac\xEDo, se usar\xE1 el WhatsApp de Ajustes Globales."
        },
        {
          type: "string",
          name: "address",
          label: "Direcci\xF3n de la consulta (opcional)",
          description: "Si se deja vac\xEDo, se usar\xE1 la direcci\xF3n de Ajustes Globales."
        },
        {
          type: "string",
          name: "mapCardTitle",
          label: "T\xEDtulo de la tarjeta del mapa (opcional)",
          description: "Ej: \xABConsulta presencial\xBB o \xABUbicaci\xF3n\xBB. Por defecto: \xABConsulta presencial\xBB."
        },
        {
          type: "string",
          name: "mapNote",
          label: "Nota informativa bajo el mapa (opcional)",
          description: "Ej: \xABAtenci\xF3n exclusivamente con cita previa.\xBB. Por defecto: \xABAtenci\xF3n exclusivamente con cita previa.\xBB."
        }
      ]
    },
    {
      type: "object",
      name: "formSection",
      label: "4. Bloque del formulario de mensaje",
      fields: [
        {
          type: "string",
          name: "title",
          label: "T\xEDtulo sobre el formulario",
          description: "Ej: \xABEscr\xEDbeme un mensaje\xBB.",
          required: true
        },
        {
          type: "string",
          name: "nameLabel",
          label: "Etiqueta del campo Nombre",
          description: "Por defecto: \xABNombre\xBB."
        },
        {
          type: "string",
          name: "namePlaceholder",
          label: "Placeholder del campo Nombre",
          description: "Por defecto: \xABTu nombre\xBB."
        },
        {
          type: "string",
          name: "emailLabel",
          label: "Etiqueta del campo Email",
          description: "Por defecto: \xABEmail\xBB."
        },
        {
          type: "string",
          name: "emailPlaceholder",
          label: "Placeholder del campo Email",
          description: "Por defecto: \xABtu@email.com\xBB."
        },
        {
          type: "string",
          name: "messageLabel",
          label: "Etiqueta del campo Mensaje",
          description: "Por defecto: \xABMensaje\xBB."
        },
        {
          type: "string",
          name: "messagePlaceholder",
          label: "Placeholder del campo Mensaje",
          description: "Por defecto: \xAB\xBFEn qu\xE9 puedo ayudarte?\xBB."
        },
        {
          type: "string",
          name: "privacyConsentText",
          label: "Texto de consentimiento de privacidad",
          description: "Texto junto a la casilla de verificaci\xF3n de privacidad.",
          ui: { component: "textarea" }
        },
        {
          type: "string",
          name: "submitLabel",
          label: "Texto del bot\xF3n de enviar",
          description: "Ej: \xABEnviar mensaje\xBB.",
          required: true
        },
        {
          type: "string",
          name: "privacyNote",
          label: "Nota informativa de privacidad",
          description: "Texto breve bajo el formulario explicando la confidencialidad de los datos.",
          required: true,
          ui: { component: "textarea" }
        }
      ]
    }
  ]
};

// tina/collections/faq.ts
var faqCollection = {
  name: "faq",
  label: "Inicio \xB7 Preguntas frecuentes",
  path: "src/content/faq",
  format: "json",
  ui: {
    router: () => "/"
  },
  fields: [
    {
      type: "string",
      name: "question",
      label: "Pregunta",
      description: "La pregunta que se plantear\xE1 el paciente.",
      required: true
    },
    {
      type: "string",
      name: "answer",
      label: "Respuesta",
      description: "Explicaci\xF3n clara, cercana y detallada.",
      required: true,
      ui: { component: "textarea" }
    },
    {
      type: "number",
      name: "order",
      label: "Orden de aparici\xF3n",
      description: "N\xFAmero para ordenar la lista de preguntas."
    },
    {
      type: "string",
      name: "category",
      label: "Categor\xEDa tem\xE1tica (opcional)",
      description: "Ej: Terapia, Reservas, Modalidades, etc."
    },
    {
      type: "boolean",
      name: "published",
      label: "Visible en la web (activo/inactivo)"
    }
  ]
};

// tina/collections/experience.ts
var experienceCollection = {
  name: "experience",
  label: "Con\xF3ceme \xB7 Trayectoria y experiencia",
  path: "src/content/experience",
  format: "json",
  ui: {
    router: () => "/conoceme"
  },
  fields: [
    {
      type: "string",
      name: "area",
      label: "Puesto o \xE1rea de experiencia",
      description: "Ej: \xABPsic\xF3loga General Sanitaria en consulta privada\xBB, \xABAtenci\xF3n especializada en duelo\xBB, etc.",
      required: true
    },
    {
      type: "number",
      name: "order",
      label: "Orden de aparici\xF3n en la lista",
      description: "1 para el primero, 2 para el segundo, etc."
    },
    {
      type: "boolean",
      name: "published",
      label: "Mostrar en la web (activo/inactivo)"
    }
  ]
};

// tina/collections/training.ts
var trainingCollection = {
  name: "training",
  label: "Con\xF3ceme \xB7 Formaci\xF3n acad\xE9mica",
  path: "src/content/training",
  format: "json",
  ui: {
    router: () => "/conoceme"
  },
  fields: [
    {
      type: "string",
      name: "degree",
      label: "T\xEDtulo o formaci\xF3n obtenida",
      description: "Ej: \xABGrado en Psicolog\xEDa\xBB, \xABM\xE1ster en Psicolog\xEDa General Sanitaria\xBB.",
      required: true
    },
    {
      type: "string",
      name: "institution",
      label: "Universidad o centro de estudios",
      description: "Ej: \xABUniversidad de M\xE1laga\xBB, \xABColegio Oficial de Psicolog\xEDa\xBB.",
      required: true
    },
    {
      type: "string",
      name: "year",
      label: "A\xF1o de finalizaci\xF3n o per\xEDodo (opcional)",
      description: "Ej: \xAB2021\xBB o \xAB2019 - 2021\xBB."
    },
    {
      type: "string",
      name: "category",
      label: "Categor\xEDa de la formaci\xF3n",
      description: "Elige si pertenece al bloque cl\xEDnico principal o al complementario.",
      required: true,
      options: [
        { value: "clinical", label: "Formaci\xF3n cl\xEDnica principal" },
        { value: "complementary", label: "Formaci\xF3n complementaria y continua" }
      ]
    },
    {
      type: "number",
      name: "order",
      label: "Orden de aparici\xF3n",
      description: "1 para el primero, 2 para el segundo, etc."
    },
    {
      type: "boolean",
      name: "published",
      label: "Mostrar en la web (activo/inactivo)"
    }
  ]
};

// tina/collections/index.ts
var collections = [
  // ──────────────────────────────────────────
  // PÁGINA: INICIO  (/)
  // ──────────────────────────────────────────
  siteSettingsCollection,
  // Portada e Inicio
  faqCollection,
  // Inicio — Preguntas frecuentes
  // ──────────────────────────────────────────
  // PÁGINA: CONÓCEME  (/conoceme)
  // ──────────────────────────────────────────
  profileCollection,
  // Conóceme — Cabecera y presentación
  experienceCollection,
  // Conóceme — Trayectoria y experiencia
  trainingCollection,
  // Conóceme — Formación académica
  // ──────────────────────────────────────────
  // PÁGINA: SERVICIOS  (/servicios)
  // ──────────────────────────────────────────
  servicesPageCollection,
  // Servicios — Cabecera y modalidades
  servicesCollection,
  // Servicios — Fichas de cada área
  // ──────────────────────────────────────────
  // PÁGINA: RECURSOS  (/recursos)
  // ──────────────────────────────────────────
  resourcesCollection,
  // Recursos — Artículos psicoeducativos
  // ──────────────────────────────────────────
  // PÁGINA: CURSOS  (/cursos)
  // ──────────────────────────────────────────
  coursesCollection,
  // Cursos — Formaciones profesionales
  // ──────────────────────────────────────────
  // PÁGINA: CONTACTO  (/contacto)
  // ──────────────────────────────────────────
  contactPageCollection
  // Contacto — Página de contacto
];

// tina/plugins/publish-plugin.tsx
import React, { useState, useEffect } from "react";
function registerPublishPlugin(cms) {
  cms.plugins.add({
    __type: "screen",
    name: "Publicar a Producci\xF3n",
    Icon: () => React.createElement(
      "svg",
      {
        style: {
          width: "1.15rem",
          height: "1.15rem",
          marginRight: "0.75rem",
          display: "inline-block",
          verticalAlign: "middle",
          flexShrink: 0
        },
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 1.8
      },
      React.createElement(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
        }
      )
    ),
    layout: "popup",
    Component() {
      const [status, setStatus] = useState("idle");
      const [confirming, setConfirming] = useState(false);
      const [branchInfo, setBranchInfo] = useState(() => {
        const isDevHost = typeof window !== "undefined" && (window.location.hostname.includes("dev.") || window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");
        return {
          currentBranch: isDevHost ? "dev" : "main",
          canPublish: isDevHost,
          message: isDevHost ? "Listo para publicar cambios a producci\xF3n (main)." : "Est\xE1s en el entorno de producci\xF3n (main)."
        };
      });
      const [message, setMessage] = useState("");
      useEffect(() => {
        fetch("/api/publish").then(async (res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        }).then((data) => {
          if (data && typeof data.currentBranch === "string") {
            setBranchInfo(data);
          }
        }).catch((err) => {
          console.warn("Consulta al endpoint /api/publish usando detecci\xF3n local:", err);
        });
      }, []);
      const handlePublish = async () => {
        setStatus("loading");
        setMessage("");
        setConfirming(false);
        try {
          const res = await fetch("/api/publish", {
            method: "POST",
            headers: { "Content-Type": "application/json" }
          });
          const data = await res.json();
          if (res.ok && data.ok) {
            setStatus("success");
            setMessage(data.message);
          } else {
            setStatus("error");
            setMessage(data.error || "Ocurri\xF3 un error al iniciar la publicaci\xF3n.");
          }
        } catch (err) {
          setStatus("error");
          setMessage(err instanceof Error ? err.message : String(err));
        }
      };
      const isDev = branchInfo.currentBranch === "dev" || branchInfo.currentBranch === "local";
      return React.createElement("div", { style: { padding: "2.25rem", maxWidth: "640px", fontFamily: "system-ui, -apple-system, sans-serif" } }, React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" } }, React.createElement("h2", { style: { fontSize: "1.35rem", fontWeight: 700, margin: 0, color: "#1e2921", letterSpacing: "-0.01em" } }, "Publicar a Producci\xF3n"), React.createElement(
        "span",
        {
          style: {
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            fontSize: "0.75rem",
            fontWeight: 600,
            padding: "0.25rem 0.65rem",
            borderRadius: "9999px",
            backgroundColor: isDev ? "#ecfdf5" : "#f1f5f9",
            color: isDev ? "#047857" : "#475569",
            border: isDev ? "1px solid #a7f3d0" : "1px solid #cbd5e1"
          }
        },
        React.createElement(
          "span",
          {
            style: {
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: isDev ? "#10b981" : "#64748b"
            }
          }
        ),
        isDev ? "Entorno: Pruebas (dev)" : "Entorno: Producci\xF3n"
      )), React.createElement("p", { style: { color: "#4b5563", fontSize: "0.92rem", lineHeight: 1.55, margin: "0 0 1.5rem 0" } }, "Cuando hayas terminado de editar y revisar el contenido en este panel, pulsa el bot\xF3n inferior para sincronizar y publicar todos los cambios en la web oficial (", React.createElement("strong", null, "mariavegagarcia.es"), ")."), React.createElement(
        "div",
        {
          style: {
            padding: "1rem 1.25rem",
            borderRadius: "0.625rem",
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            marginBottom: "1.5rem"
          }
        },
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "0.75rem" } }, React.createElement("div", null, React.createElement("span", { style: { display: "block", fontSize: "0.75rem", color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" } }, "Rama Origen (Pruebas)"), React.createElement("span", { style: { fontSize: "0.95rem", fontWeight: 700, color: "#0f172a" } }, branchInfo.currentBranch)), React.createElement("div", null, React.createElement("span", { style: { display: "block", fontSize: "0.75rem", color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" } }, "Rama Destino (Oficial)"), React.createElement("span", { style: { fontSize: "0.95rem", fontWeight: 700, color: "#0f172a" } }, "main"))),
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              paddingTop: "0.65rem",
              borderTop: "1px solid #e2e8f0",
              fontSize: "0.85rem",
              color: branchInfo.canPublish ? "#047857" : "#64748b",
              fontWeight: 500
            }
          },
          React.createElement("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round" }, branchInfo.canPublish ? React.createElement("path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4L12 14.01l-3-3" }) : React.createElement("circle", { cx: "12", cy: "12", r: "10" })),
          React.createElement("span", null, branchInfo.message)
        )
      ), branchInfo.canPublish ? React.createElement("div", null, status === "loading" ? React.createElement(
        "div",
        {
          style: {
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            backgroundColor: "#94a3b8",
            color: "#ffffff",
            padding: "0.75rem 1.4rem",
            borderRadius: "0.5rem",
            fontWeight: 600,
            fontSize: "0.95rem"
          }
        },
        React.createElement(
          "svg",
          {
            style: { animation: "spin 1s linear infinite", width: "16px", height: "16px" },
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2.5"
          },
          React.createElement("circle", { cx: "12", cy: "12", r: "10", strokeOpacity: "0.25" }),
          React.createElement("path", { d: "M12 2a10 10 0 0 1 10 10" })
        ),
        React.createElement("span", null, "Lanzando publicaci\xF3n en GitHub Actions...")
      ) : confirming ? React.createElement(
        "div",
        {
          style: {
            padding: "1rem 1.25rem",
            borderRadius: "0.5rem",
            background: "#f0fdf4",
            border: "1px solid #bbf7d0"
          }
        },
        React.createElement("p", { style: { margin: "0 0 0.85rem 0", fontSize: "0.95rem", fontWeight: 600, color: "#166534" } }, "\xBFConfirmas la publicaci\xF3n inmediata en la web oficial (mariavegagarcia.es)?"),
        React.createElement("div", { style: { display: "flex", gap: "0.75rem", alignItems: "center" } }, React.createElement(
          "button",
          {
            type: "button",
            onClick: handlePublish,
            style: {
              backgroundColor: "#16a34a",
              color: "#ffffff",
              padding: "0.65rem 1.3rem",
              borderRadius: "0.375rem",
              border: "none",
              fontWeight: 600,
              fontSize: "0.92rem",
              cursor: "pointer",
              boxShadow: "0 1px 2px rgba(0,0,0,0.1)"
            }
          },
          "\u2713 S\xED, publicar ahora"
        ), React.createElement(
          "button",
          {
            type: "button",
            onClick: () => setConfirming(false),
            style: {
              backgroundColor: "#ffffff",
              color: "#475569",
              padding: "0.65rem 1.1rem",
              borderRadius: "0.375rem",
              border: "1px solid #cbd5e1",
              fontWeight: 500,
              fontSize: "0.92rem",
              cursor: "pointer"
            }
          },
          "Cancelar"
        ))
      ) : React.createElement(
        "button",
        {
          type: "button",
          onClick: () => setConfirming(true),
          style: {
            backgroundColor: "#475b4c",
            color: "#ffffff",
            padding: "0.75rem 1.4rem",
            borderRadius: "0.5rem",
            border: "none",
            fontWeight: 600,
            fontSize: "0.95rem",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.55rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
            transition: "background-color 0.15s ease"
          }
        },
        React.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, React.createElement("path", { d: "M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" })),
        React.createElement("span", null, "Publicar ahora en Producci\xF3n")
      )) : React.createElement(
        "div",
        {
          style: {
            padding: "0.85rem 1rem",
            borderRadius: "0.5rem",
            background: "#f1f5f9",
            color: "#475569",
            fontSize: "0.88rem",
            lineHeight: 1.4
          }
        },
        "El bot\xF3n de publicaci\xF3n solo se habilita en el entorno de pruebas (",
        React.createElement("strong", null, "dev"),
        "). En producci\xF3n los cambios ya est\xE1n en directo."
      ), status === "success" && React.createElement(
        "div",
        {
          style: {
            marginTop: "1.25rem",
            padding: "1rem 1.25rem",
            borderRadius: "0.5rem",
            background: "#ecfdf5",
            color: "#065f46",
            border: "1px solid #a7f3d0",
            fontSize: "0.92rem",
            display: "flex",
            alignItems: "flex-start",
            gap: "0.65rem"
          }
        },
        React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", style: { flexShrink: 0, marginTop: "2px" } }, React.createElement("path", { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14" }), React.createElement("polyline", { points: "22 4 12 14.01 9 11.01" })),
        React.createElement("span", null, message)
      ), status === "error" && React.createElement(
        "div",
        {
          style: {
            marginTop: "1.25rem",
            padding: "1rem 1.25rem",
            borderRadius: "0.5rem",
            background: "#fef2f2",
            color: "#991b1b",
            border: "1px solid #fecaca",
            fontSize: "0.92rem",
            display: "flex",
            alignItems: "flex-start",
            gap: "0.65rem"
          }
        },
        React.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", style: { flexShrink: 0, marginTop: "2px" } }, React.createElement("circle", { cx: "12", cy: "12", r: "10" }), React.createElement("line", { x1: "12", y1: "8", x2: "12", y2: "12" }), React.createElement("line", { x1: "12", y1: "16", x2: "12.01", y2: "16" })),
        React.createElement("span", null, message)
      ));
    }
  });
}

// tina/config.ts
var isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";
var config_default = defineConfig({
  branch,
  clientId: isLocal ? null : clientId,
  token: isLocal ? null : token,
  cmsCallback: (cms) => {
    registerPublishPlugin(cms);
    return cms;
  },
  search: {
    tina: {
      indexerToken: searchIndexerToken,
      stopwordLanguages: ["spa", "eng"]
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100
  },
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "images",
      static: false
    },
    accept: ["image/*"]
  },
  schema: {
    collections
  }
});
export {
  config_default as default
};
