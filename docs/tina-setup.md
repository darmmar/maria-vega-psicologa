# Cómo editar el contenido de la web (TinaCMS)



Esta web usa [Tina Cloud](https://app.tina.io) para que María pueda editar textos desde el navegador, sin instalar nada en el ordenador. Los cambios se guardan automáticamente en GitHub y Vercel actualiza el sitio.



---



## Para David (configuración técnica, una sola vez)



### 1. Obtener credenciales en Tina Cloud



1. Entra en [app.tina.io](https://app.tina.io) con la cuenta del proyecto.

2. Abre el proyecto vinculado al repositorio `darmmar/maria-vega-psicologa`.

3. Ve a **Project setup** (o **Tokens**) y copia:

   - **Client ID** → variable `NEXT_PUBLIC_TINA_CLIENT_ID` (recomendado) o `TINA_CLIENT_ID`

   - **Read-only token** (tipo *Content* / *Read*) → variable `TINA_TOKEN`

   - **Search token** (opcional, para búsqueda en el panel) → variable `TINA_SEARCH_TOKEN`



> No pegues estos valores en el código ni en commits. Solo en Vercel y en un `.env` local privado.



### 2. Variables de entorno en Vercel (checklist exacto)



En [vercel.com](https://vercel.com) → proyecto **maria-vega-psicologa** → **Settings** → **Environment Variables**:



| Variable | Valor | Obligatoria | Entornos |

|----------|-------|-------------|----------|

| `NEXT_PUBLIC_TINA_CLIENT_ID` | Client ID de Tina Cloud | **Sí** (recomendado) | **Production + Preview** |

| `TINA_TOKEN` | Read-only / Content token de Tina Cloud | **Sí** | **Production + Preview** |

| `TINA_CLIENT_ID` | Mismo Client ID (alias) | Opcional si ya tienes `NEXT_PUBLIC_TINA_CLIENT_ID` | Production + Preview |

| `GITHUB_BRANCH` | `main` | Recomendada | Production + Preview |

| `TINA_SEARCH_TOKEN` | Search token de Tina Cloud | Opcional | Production + Preview |



#### Pasos en Vercel (con capturas mentales)



1. **Settings** → **Environment Variables** → **Add New**

2. **Key:** escribe exactamente `NEXT_PUBLIC_TINA_CLIENT_ID` (copiar/pegar, sin espacios)

3. **Value:** pega el Client ID desde app.tina.io (empieza por algo tipo `abc123...`)

4. **Environments:** marca **Production** y **Preview** (ambas casillas)

5. Repite para `TINA_TOKEN` con el **Read-only token** (no el Search token)

6. Guarda cada variable

7. Ve a **Deployments** → último deploy fallido → menú **⋯** → **Redeploy** (obligatorio tras añadir o cambiar vars)



#### Errores frecuentes



| Error | Causa |

|-------|-------|

| `Missing clientId, token` | Falta alguna variable o el build no las recibe |

| Variable puesta solo en Production | Los deploys de Preview (PRs, ramas) fallan igual |

| `TINA_READ_TOKEN` en lugar de `TINA_TOKEN` | Nombre incorrecto — debe ser exactamente `TINA_TOKEN` |

| Search token en `TINA_TOKEN` | Usar el token **Read-only / Content**, no el de búsqueda |

| Valor vacío o con espacios | Copiar de nuevo desde Tina, sin saltos de línea |

| Client ID y token intercambiados | Client ID → `NEXT_PUBLIC_TINA_CLIENT_ID`, token → `TINA_TOKEN` |

| No redeploy tras guardar | Vercel no re-ejecuta el build hasta un redeploy manual o nuevo push |

| Seguir docs Tina con `NEXT_PUBLIC_*` pero config antigua | Este repo acepta **ambos** nombres para Client ID |



#### Qué lee el proyecto (`tina/config.ts`)



```ts

clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID ?? process.env.TINA_CLIENT_ID

token:    process.env.TINA_TOKEN

branch:   NEXT_PUBLIC_TINA_BRANCH ?? GITHUB_BRANCH ?? VERCEL_GIT_COMMIT_REF ?? "main"

```



Si cualquiera de `clientId` o `token` es `null` en build, `tinacms build` falla.



### 3. Comando de build en Vercel



Vercel usa por defecto `pnpm run build`. El script `build` ejecuta `scripts/vercel-build.mjs`, que:



1. Comprueba que existen las variables Tina

2. Imprime **cuáles faltan** si algo va mal

3. Ejecuta `tinacms build && astro build`



No hace falta cambiar el Build Command en el dashboard (dejar `pnpm run build` o vacío).



- **Output Directory:** `dist` (por defecto de Astro)

- **Config Tina:** `tina/config.ts` (no `.tina/`)



> `pnpm cms:build` y `pnpm build` son equivalentes en producción. `pnpm build:astro` solo construye Astro (sin panel `/admin`).



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

- Si `/admin` no carga o pide credenciales raras, avisa a David (suele faltar `NEXT_PUBLIC_TINA_CLIENT_ID` / `TINA_TOKEN` en Vercel o falta redeploy).



---



## Edición local (solo desarrollo)



Para probar cambios en el ordenador antes de subirlos:



1. Crea un archivo `.env` en la raíz del proyecto (no se sube a Git) con:



```env

NEXT_PUBLIC_TINA_CLIENT_ID=tu-client-id

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

| `scripts/vercel-build.mjs` | Valida env vars Tina antes del build en Vercel |

| `public/admin/` | Panel generado por `tinacms build` en cada deploy |

| `package.json` → `build` | Build de producción con validación Tina + Astro |

| `.env.example` | Plantilla con nombres exactos de variables |



Para regenerar `tina/tina-lock.json` tras cambiar el esquema:



```bash

pnpm exec tinacms build --local --skip-cloud-checks

```



Luego commit y push de `tina/tina-lock.json`.



### 5. Error: «Branch 'main' is not on TinaCloud»



Si el build de Vercel pasa la comprobación de variables pero falla con:



```text

ERROR: Branch 'main' is not on TinaCloud. Please make sure that branch 'main' exists...

Branch is not on TinaCloud

```



**Causa habitual:** Tina Cloud aún no ha indexado la rama `main`, o el proyecto se creó indexando otra rama (p. ej. `feat/initial-astro-website`).



#### Comprobar en el repositorio (ya hecho en este proyecto)



- `tina/tina-lock.json` debe existir y estar en `main` en GitHub.

- `tina/config.ts` debe resolver la rama así: `GITHUB_BRANCH` → `VERCEL_GIT_COMMIT_REF` → `"main"`.



#### Pasos en Tina Cloud (David — 2–3 clics)



1. Abre [app.tina.io](https://app.tina.io) → proyecto **maria-vega-psicologa** (ID: `bedea9d3-b5cc-4ca8-be3b-c575755f262f`).

2. Ve a **Configuration** (o **Project setup** → **Branch**):  
   [https://app.tina.io/projects/bedea9d3-b5cc-4ca8-be3b-c575755f262f/configuration](https://app.tina.io/projects/bedea9d3-b5cc-4ca8-be3b-c575755f262f/configuration)

3. En **Branch**, selecciona **`main`** (no una rama `feat/...`). Guarda si hay botón **Save**.

4. Comprueba que **`main`** aparece en la lista de ramas indexadas con estado **Indexed** (puede tardar 2–5 minutos tras un push de `tina/tina-lock.json`).

5. Si sigue en *Pending* o no aparece: en GitHub confirma que `main` tiene `tina/tina-lock.json`, luego haz un push trivial a ese archivo (o redeploy en Vercel cuando `main` esté indexada).



#### Si el proyecto se creó con otra rama



Al vincular el repo desde una rama de feature, Tina Cloud puede indexar solo esa rama. **Cambia la rama por defecto a `main`** en el paso 3 anterior; no hace falta recrear el proyecto.



#### Variables relacionadas en Vercel



| Variable | Valor recomendado |

|----------|-------------------|

| `GITHUB_BRANCH` | `main` |

| `NEXT_PUBLIC_TINA_BRANCH` | `main` (opcional, refuerzo) |



En producción, `VERCEL_GIT_COMMIT_REF` ya es `main` cuando despliegas desde `main`.


