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
    calComUsername?: string;
    eventSlugs: {
      presencial: string;
      online: string;
    };
    availability: {
      presencial: string;
      online: string;
    };
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

const DEFAULT_SITE_URL = "https://mariavegapsicologa.vercel.app";

function envString(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function parseCalComConfig(rawUrl: string | undefined): {
  calComUrl: string;
  calComUsername: string;
} {
  const trimmed = rawUrl?.trim();
  if (!trimmed) {
    return { calComUrl: "", calComUsername: "" };
  }

  try {
    const normalizedUrl = trimmed.replace(/\/+$/, "");
    const parsed = new URL(normalizedUrl);
    const username = parsed.pathname.replace(/^\/+|\/+$/g, "").split("/")[0] ?? "";

    return {
      calComUrl: normalizedUrl,
      calComUsername: username,
    };
  } catch {
    return { calComUrl: "", calComUsername: "" };
  }
}

const calComConfig = parseCalComConfig(import.meta.env.PUBLIC_CALCOM_URL);

export const siteConfig: SiteConfig = {
  siteName: "María Vega Psicología",
  professionalName: "María Vega",
  professionalTitle: "Psicóloga General Sanitaria",
  description:
    "Psicóloga en Málaga y terapia online. Terapia basada en evidencia científica para problemas emocionales, relacionales, duelo, ansiedad, autocuidado y adicciones.",
  siteUrl: envString(import.meta.env.PUBLIC_SITE_URL) ?? DEFAULT_SITE_URL,
  location: {
    city: "Málaga",
    province: "Málaga",
    country: "España",
  },
  contact: {
    email: envString(import.meta.env.PUBLIC_CONTACT_EMAIL) ?? "",
    phone: "",
    whatsapp: envString(import.meta.env.PUBLIC_WHATSAPP_URL) ?? "",
    instagram: envString(import.meta.env.PUBLIC_INSTAGRAM_URL) ?? "",
    linkedin: "",
  },
  booking: {
    calComUrl: calComConfig.calComUrl,
    calComUsername: calComConfig.calComUsername,
    eventSlugs: {
      presencial: "terapia-presencial",
      online: "terapia-online",
    },
    availability: {
      presencial: "Lunes, 17:00–20:00 (Málaga)",
      online: "Martes a domingo, 16:00–21:00",
    },
  },
  payments: {
    courseDueloPaymentLink: envString(import.meta.env.PUBLIC_STRIPE_COURSE_PAYMENT_LINK) ?? "",
  },
  legal: {
    collegiateNumber: envString(import.meta.env.PUBLIC_COLLEGIATE_NUMBER) ?? "",
    businessName: envString(import.meta.env.PUBLIC_BUSINESS_NAME) ?? "",
    taxId: envString(import.meta.env.PUBLIC_TAX_ID) ?? "",
    address: envString(import.meta.env.PUBLIC_ADDRESS) ?? "",
  },
};
