import type { CollectionEntry, CollectionKey } from "astro:content";
import type { TinaRichTextContent } from "@tinacms/astro/types";
import { requestWithMetadata } from "@tinacms/astro/data";
import client from "../../../tina/__generated__/client";

export type EditableEntry<K extends CollectionKey> = CollectionEntry<K> & {
  data: CollectionEntry<K>["data"] & { body?: TinaRichTextContent };
  tinaBody?: TinaRichTextContent;
};

/** Visitors use the content shipped with this deployment. Only the editor
 * queries Tina and consumes its request-scoped, unsaved preview overlay. */
export async function editableEntry<K extends CollectionKey>(
  entry: CollectionEntry<K>,
  editing = false,
  primary = false,
): Promise<EditableEntry<K>> {
  if (!editing) return entry as EditableEntry<K>;
  const relativePath = entry.filePath?.replaceAll("\\", "/").split("/").at(-1);
  if (!relativePath) throw new Error(`Missing source path for ${entry.collection}/${entry.id}`);

  // Every collection has the same generated document-query signature.
  const query = client.queries[entry.collection as keyof typeof client.queries] as (
    variables: { relativePath: string },
  ) => Promise<{ data: Record<string, Record<string, unknown>>; query: string; variables: { relativePath: string } }>;
  const response = await query({ relativePath });
  const { data } = await requestWithMetadata(response, primary ? { priority: "primary" } : undefined);
  const document = data[entry.collection];
  if (!document) throw new Error(`Tina returned no document for ${entry.collection}/${relativePath}`);

  const merged: Record<string, unknown> = { ...entry.data, ...document };
  if ("tags" in merged && !Array.isArray(merged.tags)) {
    merged.tags = Array.isArray((entry.data as Record<string, unknown>).tags)
      ? (entry.data as Record<string, unknown>).tags
      : [];
  }
  for (const key of ["publishedAt", "dateModified"]) {
    if (typeof merged[key] === "string") merged[key] = new Date(merged[key]);
  }
  return { ...entry, data: merged, tinaBody: document.body } as EditableEntry<K>;
}
