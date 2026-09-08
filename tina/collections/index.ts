import type { Collection } from "tinacms";
import { siteSettingsCollection } from "./site-settings";
import { profileCollection } from "./profile";
import { servicesCollection } from "./services";
import { resourcesCollection } from "./resources";
import { coursesCollection } from "./courses";
import { bookingPageCollection } from "./booking-page";
import { contactPageCollection } from "./contact-page";
import { faqCollection } from "./faq";
import { experienceCollection } from "./experience";
import { trainingCollection } from "./training";

export const collections: Collection[] = [
  // 1. Páginas fijas del sitio web
  siteSettingsCollection, // 🏠 Portada y Ajustes Globales
  profileCollection, // 👤 Página Conóceme
  bookingPageCollection, // 📅 Página de Reservas
  contactPageCollection, // ✉️ Página de Contacto

  // 2. Catálogo y publicaciones dinámicas
  servicesCollection, // 🩺 Servicios de Terapia
  resourcesCollection, // ✍️ Artículos y Recursos
  coursesCollection, // 🎓 Cursos y Formación
  faqCollection, // ❓ Preguntas Frecuentes (FAQ)

  // 3. Bloques de trayectoria y cualificación
  experienceCollection, // 💼 Trayectoria y Experiencia
  trainingCollection, // 📜 Formación Académica
];

export {
  siteSettingsCollection,
  profileCollection,
  servicesCollection,
  resourcesCollection,
  coursesCollection,
  bookingPageCollection,
  contactPageCollection,
  faqCollection,
  experienceCollection,
  trainingCollection,
};
