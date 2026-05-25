/**
 * Production build for Vercel.
 * Validates Tina Cloud env vars before `tinacms build` so missing config
 * fails with a clear message instead of "Missing clientId, token".
 */
import { spawnSync } from "node:child_process";

const clientId =
  process.env.NEXT_PUBLIC_TINA_CLIENT_ID ?? process.env.TINA_CLIENT_ID;
const token = process.env.TINA_TOKEN;

const missing = [];
if (!clientId?.trim()) {
  missing.push("NEXT_PUBLIC_TINA_CLIENT_ID (or TINA_CLIENT_ID)");
}
if (!token?.trim()) {
  missing.push("TINA_TOKEN");
}

if (missing.length > 0) {
  console.error("\n❌ TinaCMS build: faltan variables de entorno obligatorias:\n");
  for (const name of missing) {
    console.error(`   • ${name}`);
  }
  console.error(`
Copia los valores desde app.tina.io → tu proyecto → Project setup / Tokens.

En Vercel: Settings → Environment Variables
  • Marca Production Y Preview (no solo una)
  • Nombres exactos (sensible a mayúsculas):
      NEXT_PUBLIC_TINA_CLIENT_ID  ← Client ID (recomendado por Tina)
      TINA_CLIENT_ID              ← alias aceptado por este repo
      TINA_TOKEN                  ← Content / Read-only token (NO "Search token")
  • Tras guardar, redeploy obligatorio (Deployments → … → Redeploy)

Errores frecuentes:
  • TINA_READ_TOKEN en lugar de TINA_TOKEN
  • Variable solo en Production, build de Preview falla
  • Valor vacío o espacios al copiar/pegar
  • Client ID en TINA_TOKEN o token en TINA_CLIENT_ID
`);
  process.exit(1);
}

// Tina docs use NEXT_PUBLIC_TINA_CLIENT_ID; config reads both names.
if (!process.env.NEXT_PUBLIC_TINA_CLIENT_ID && process.env.TINA_CLIENT_ID) {
  process.env.NEXT_PUBLIC_TINA_CLIENT_ID = process.env.TINA_CLIENT_ID;
}
if (!process.env.TINA_CLIENT_ID && process.env.NEXT_PUBLIC_TINA_CLIENT_ID) {
  process.env.TINA_CLIENT_ID = process.env.NEXT_PUBLIC_TINA_CLIENT_ID;
}

function run(command, args) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    shell: true,
    env: process.env,
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

console.log("✓ Tina env vars present — running tinacms build");
run("tinacms", ["build"]);
console.log("✓ Tina build OK — running astro build");
run("astro", ["build"]);
