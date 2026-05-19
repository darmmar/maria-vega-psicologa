export type SiteConfig = {
  siteName: string;
  professionalName: string;
  professionalTitle: string;
  description: string;
  siteUrl: string;
  location: {
    city: string;
    province: string;
    country: string;
  };
  contact: {
    email?: string;
    phone?: string;
    whatsapp?: string;
    instagram?: string;
    linkedin?: string;
  };
  booking: {
    calComUrl?: string;
  };
  payments: {
    courseDueloPaymentLink?: string;
  };
  legal: {
    collegiateNumber?: string;
    businessName?: string;
    taxId?: string;
    address?: string;
  };
};

export const siteConfig: SiteConfig = {
  siteName: "María Vega Psicología",
  professionalName: "María Vega",
  professionalTitle: "Psicóloga General Sanitaria",
  description:
    "Psicóloga en Málaga y terapia online. Terapia basada en evidencia científica para problemas emocionales, relacionales, duelo, ansiedad, autocuidado y adicciones.",
  siteUrl: "https://example.com",
  location: {
    city: "Málaga",
    province: "Málaga",
    country: "España",
  },
  contact: {
    email: "",
    phone: "",
    whatsapp: "",
    instagram: "",
    linkedin: "",
  },
  booking: {
    calComUrl: "",
  },
  payments: {
    courseDueloPaymentLink: "",
  },
  legal: {
    collegiateNumber: "",
    businessName: "",
    taxId: "",
    address: "",
  },
};
