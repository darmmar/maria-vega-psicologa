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
  // 1. Portada y ajustes del sitio
  siteSettingsCollection,

  // 2. Páginas principales en el orden exacto del menú de navegación
  profileCollection, // Conóceme (/conoceme)
  servicesCollection, // Servicios de Terapia (/psicologa-malaga)
  resourcesCollection, // Recursos y Blog (/recursos)
  coursesCollection, // Cursos (/cursos)
  bookingPageCollection, // Reservas (/reserva)
  contactPageCollection, // Contacto (/contacto)

  // 3. Colecciones de contenido transversal / complementario
  faqCollection, // Preguntas Frecuentes Generales
  experienceCollection, // Experiencia profesional
  trainingCollection, // Formación académica
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
