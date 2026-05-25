# Cómo editar el contenido de la web (TinaCMS)

Esta web usa [Tina Cloud](https://app.tina.io) para que María pueda editar textos desde el navegador, sin instalar nada en el ordenador. Los cambios se guardan automáticamente en GitHub y Vercel actualiza el sitio.

---

## Para David (configuración técnica, una sola vez)

### 1. Obtener credenciales en Tina Cloud

1. Entra en [app.tina.io](https://app.tina.io) con la cuenta del proyecto.
2. Abre el proyecto vinculado al repositorio `darmmar/maria-vega-psicologa`.
3. Ve a **Project setup** (o **Tokens**) y copia:
   - **Client ID** → variable `TINA_CLIENT_ID`
   - **Read-only token** → variable `TINA_TOKEN`
   - **Search token** (opcional, para búsqueda en el panel) → variable `TINA_SEARCH_TOKEN`

> No pegues estos valores en el código ni en commits. Solo en Vercel y en un `.env` local privado.

### 2. Variables de entorno en Vercel

En [vercel.com](https://vercel.com) → proyecto **maria-vega-psicologa** → **Settings** → **Environment Variables**, añade para **Production** y **Preview**:

| Variable | Valor | Notas |
|----------|-------|-------|
| `TINA_CLIENT_ID` | Client ID de Tina Cloud | Obligatorio |
| `TINA_TOKEN` | Read-only token de Tina Cloud | Obligatorio |
| `GITHUB_BRANCH` | `main` | Rama que usa Tina Cloud |
| `TINA_SEARCH_TOKEN` | Search token de Tina Cloud | Opcional |

### 3. Comando de build en Vercel

Vercel usa por defecto `pnpm run build`. El script `build` del proyecto ya ejecuta `tinacms build && astro build`, así que **no hace falta** cambiar el Build Command en el dashboard (dejar `pnpm run build` o vacío).

- **Output Directory:** `dist` (por defecto de Astro)

> `pnpm cms:build` y `pnpm build` son equivalentes. `pnpm build:astro` solo construye Astro (sin panel `/admin`).

**Variables obligatorias para el build:** `TINA_CLIENT_ID` y `TINA_TOKEN` deben estar en Vercel (Production y Preview). Sin ellas, `tinacms build` puede fallar o generar un `/admin` sin conexión a Tina Cloud.

### 4. Después del primer deploy con variables

1. En Tina Cloud, confirma que la rama `main` aparece como **indexed** (puede tardar unos minutos tras el push de `tina/tina-lock.json`).
2. Abre `https://TU-DOMINIO/admin` e inicia sesión con GitHub (cuenta autorizada en Tina Cloud).

---

## Para María (editar contenido en producción)

1. Abre en el navegador: **`https://maria-vega-psicologa.vercel.app/admin`** (o el dominio definitivo cuando esté configurado).
2. Inicia sesión con tu cuenta de GitHub (la misma que tiene acceso en Tina Cloud).
3. Elige una colección en el menú lateral:
   - **Servicios terapéuticos**
   - **Recursos psicoeducativos**
   - **Cursos**
   - **Preguntas frecuentes**
4. Edita el texto que necesites y pulsa **Save**.
5. Tina crea un commit en GitHub automáticamente. En 1–2 minutos Vercel publicará la versión nueva.

### Qué puedes editar

- **Servicios terapéuticos:** título, descripción, contenido, SEO, botones
- **Recursos psicoeducativos:** artículos, etiquetas, publicado/borrador
- **Cursos:** información del curso, enlace de pago Stripe
- **Preguntas frecuentes:** añadir, editar u ocultar preguntas

### Importante

- No incluyas información clínica de pacientes en ningún campo.
- Si `/admin` no carga o pide credenciales raras, avisa a David (suele faltar `TINA_CLIENT_ID` / `TINA_TOKEN` en Vercel).

---

## Edición local (solo desarrollo)

Para probar cambios en el ordenador antes de subirlos:

1. Crea un archivo `.env` en la raíz del proyecto (no se sube a Git) con:

```env
TINA_CLIENT_ID=tu-client-id
TINA_TOKEN=tu-read-only-token
GITHUB_BRANCH=main
TINA_SEARCH_TOKEN=tu-search-token
```

2. En terminal:

```bash
pnpm cms
```

3. Abre http://localhost:4321/admin

4. Edita y guarda (en local los commits van al repositorio si Tina Cloud está configurado).

---

## Archivos relevantes del proyecto

| Archivo | Función |
|---------|---------|
| `tina/config.ts` | Esquema de colecciones y conexión a Tina Cloud |
| `tina/tina-lock.json` | Esquema compilado; **debe estar en Git** para que Tina indexe la rama |
| `public/admin/` | Panel generado por `tinacms build` en cada deploy |
| `package.json` → `build` | Build de producción con Tina + Astro (Vercel lo usa por defecto) |

Para regenerar `tina/tina-lock.json` tras cambiar el esquema:

```bash
pnpm exec tinacms build --local --skip-cloud-checks
```

Luego commit y push de `tina/tina-lock.json`.
