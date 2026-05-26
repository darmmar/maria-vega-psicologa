/** Normaliza rutas de imágenes del CMS (`images/foo.jpg` → `/images/foo.jpg`). */
export function imageSrc(path?: string): string | undefined {
  if (!path) return undefined;
  if (path.startsWith("/")) return path;
  if (path.startsWith("images/")) return `/${path}`;
  return `/images/${path}`;
}
