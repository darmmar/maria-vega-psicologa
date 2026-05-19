export type NavItem = {
  label: string;
  href: string;
};

export const mainNav: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Conóceme", href: "/conoceme" },
  { label: "Servicios", href: "/psicologa-malaga" },
  { label: "Recursos", href: "/recursos" },
  { label: "Curso Duelo", href: "/curso-duelo" },
  { label: "Reserva", href: "/reserva" },
  { label: "Contacto", href: "/contacto" },
];

export const legalNav: NavItem[] = [
  { label: "Aviso Legal", href: "/legal/aviso-legal" },
  { label: "Privacidad", href: "/legal/privacidad" },
  { label: "Cookies", href: "/legal/cookies" },
];
