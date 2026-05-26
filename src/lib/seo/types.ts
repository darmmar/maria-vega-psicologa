export type JsonLdNode = Record<string, unknown>;

export type JsonLdDocument = {
  "@context": "https://schema.org";
  "@graph"?: JsonLdNode[];
} & JsonLdNode;

export type BreadcrumbItem = {
  name: string;
  url: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};
