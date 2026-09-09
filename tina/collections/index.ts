import type { Collection } from "tinacms";
import { siteSettingsCollection } from "./site-settings";
import { profileCollection } from "./profile";
import { servicesPageCollection } from "./services-page";
import { servicesCollection } from "./services";
import { resourcesCollection } from "./resources";
import { coursesCollection } from "./courses";
import { bookingPageCollection } from "./booking-page";
import { contactPageCollection } from "./contact-page";
import { faqCollection } from "./faq";
import { experienceCollection } from "./experience";
import { trainingCollection } from "./training";

export const collections: Collection[] = [
  // ──────────────────────────────────────────
  // PÁGINA: INICIO  (/)
  // ──────────────────────────────────────────
  siteSettingsCollection, // Portada e Inicio

  // ──────────────────────────────────────────
  // PÁGINA: CONÓCEME  (/conoceme)
  // ──────────────────────────────────────────
  profileCollection,    // Conóceme — Cabecera y presentación
  experienceCollection, // Conóceme — Trayectoria y experiencia
  trainingCollection,   // Conóceme — Formación académica

  // ──────────────────────────────────────────
  // PÁGINA: SERVICIOS  (/servicios)
  // ──────────────────────────────────────────
  servicesPageCollection, // Servicios — Cabecera y modalidades
  servicesCollection,     // Servicios — Fichas de cada área

  // ──────────────────────────────────────────
  // PÁGINA: RECURSOS  (/recursos)
  // ──────────────────────────────────────────
  resourcesCollection,  // Recursos — Artículos psicoeducativos

  // ──────────────────────────────────────────
  // PÁGINA: CURSOS  (/cursos)
  // ──────────────────────────────────────────
  coursesCollection,    // Cursos — Formaciones profesionales

  // ──────────────────────────────────────────
  // PÁGINA: RESERVAR CITA  (/reserva)
  // ──────────────────────────────────────────
  bookingPageCollection, // Reservas — Página de citas
  faqCollection,         // Reservas — Preguntas frecuentes

  // ──────────────────────────────────────────
  // PÁGINA: CONTACTO  (/contacto)
  // ──────────────────────────────────────────
  contactPageCollection, // Contacto — Página de contacto
];

export {
  siteSettingsCollection,
  profileCollection,
  servicesPageCollection,
  servicesCollection,
  resourcesCollection,
  coursesCollection,
  bookingPageCollection,
  contactPageCollection,
  faqCollection,
  experienceCollection,
  trainingCollection,
};
