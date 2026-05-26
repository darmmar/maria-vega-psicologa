# TinaCMS en este proyecto

## Editar contenido (María)

1. Abre **https://mariavegapsicologa.vercel.app/admin** e inicia sesión con GitHub.
2. Elige una colección (Contacto, Servicios, Recursos, Cursos, etc.), edita y pulsa **Save**.
3. Tina guarda en GitHub; **Vercel despliega solo** tras el commit (1–2 minutos).

No hace falta instalar nada en el ordenador para editar en producción.

## Desarrollo local (David)

- **`pnpm cms`** — Tina + Astro en local. Solo para probar cambios de esquema o contenido en tu máquina. No subas `public/admin/` generado en dev.
- **`pnpm build`** — Igual que Vercel: valida variables Tina, genera `/admin` de producción y construye Astro (`scripts/vercel-build.mjs`).
- Tras cambiar **`tina/config.ts`**: `pnpm tina:sync`, commitea **`tina/tina-lock.json`** y haz push.

## Variables en Vercel (Production + Preview)

| Variable | Uso |
|----------|-----|
| `NEXT_PUBLIC_TINA_CLIENT_ID` | Client ID desde [app.tina.io](https://app.tina.io) |
| `TINA_TOKEN` | Token Content / Read-only (no el Search token) |
| `GITHUB_BRANCH` | `main` (recomendado) |

Valores en **app.tina.io → Project setup / Tokens**. Tras cambiar variables, **Redeploy** en Vercel.

## Despliegue

**Push a `main`** → Vercel ejecuta `pnpm build` automáticamente.

Si `/admin` muestra *Failed loading TinaCMS assets*, el build no generó el panel de producción (faltan env vars o quedó un `index.html` de dev). Revisa variables y el log de build en Vercel.
