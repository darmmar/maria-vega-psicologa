/** Normaliza rutas de imágenes del CMS (`images/foo.jpg` → `/images/foo.jpg` o URLs de Tina Cloud). */
export function imageSrc(path?: string | null): string | undefined {
  if (!path) return undefined;
  // Si Tina Cloud devuelve una URL de proxy para un archivo local en git:
  if (path.includes("assets.tina.io") && path.includes("/__file/")) {
    const filename = path.split("/__file/")[1];
    if (filename) return `/images/${decodeURIComponent(filename)}`;
  }
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) return path;
  if (path.startsWith("/")) return path;
  if (path.startsWith("images/")) return `/${path}`;
  return `/images/${path}`;
}

