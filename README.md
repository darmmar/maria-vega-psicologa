# María Vega Psicología

Sitio web profesional y panel de gestión de contenidos de María Vega, Psicóloga General Sanitaria en Málaga.

## Stack Tecnológico

* **Framework:** [Astro 5](https://astro.build/) (Static Site Generation — `output: "static"`)
* **CMS:** [TinaCMS Cloud](https://tina.io/) (Edición en `/admin` con commits directos a GitHub)
* **Estilos:** TailwindCSS + Tipografía DM Sans y Lora
* **Hosting & CDN:** [Cloudflare Pages](https://pages.cloudflare.com/) (Free Tier comercial con ancho de banda ilimitado)
* **Gestor de paquetes:** `pnpm` (`packageManager: pnpm@11.3.0`)
* **Entorno Node:** Node 24 (`.nvmrc: 24`, `engines: >=24.0.0`)

## Estructura del Proyecto

* `src/pages/` — Rutas y páginas públicas en Astro.
* `src/content/` — Colecciones de datos y contenido (fuente única de verdad).
* `public/` — Assets estáticos, `_headers` (seguridad HSTS/CSP) y `_redirects` (redirecciones 301).
* `scripts/build.mjs` — Pipeline de compilación de producción con validación estricta de TinaCMS.
* `tina/` — Esquema y configuración de Tina Cloud.

## Desarrollo Local

```bash
# Instalar dependencias
pnpm install

# Modo desarrollo con Astro
pnpm run dev

# Modo desarrollo con panel TinaCMS local
pnpm run cms

# Compilar para producción (idéntico a Cloudflare Pages)
pnpm run build

# Previsualizar el build
pnpm run preview
```

## Despliegue

Los despliegues son continuos y automáticos mediante la integración nativa de **Cloudflare Pages**:
* Cada `git push` a la rama `main` o cada guardado de María desde `/admin` compila y publica automáticamente.
