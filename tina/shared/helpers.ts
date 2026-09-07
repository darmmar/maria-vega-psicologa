import type { TinaField } from "tinacms";

export const imageFieldUi = {
  format(value: string) {
    if (!value) return value;
    if (value.startsWith("/")) return value;
    if (value.startsWith("images/")) return `/${value}`;
    return `/images/${value}`;
  },
  parse(value: string) {
    if (!value) return value;
    return value.startsWith("/") ? value.slice(1) : value;
  },
};

export const ctaLinkFields: TinaField[] = [
  { type: "string", name: "label", label: "Texto del botón", required: true },
  { type: "string", name: "href", label: "Enlace", required: true },
];

export const singletonUi = {
  allowedActions: {
    create: false,
    delete: false,
  },
};
