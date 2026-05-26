/**

 * Production build for Vercel.

 * Validates Tina Cloud env vars before `tinacms build` so missing config

 * fails with a clear message instead of "Missing clientId, token".

 *

 * By default skips Tina Cloud schema/index checks so deploys do not fail when

 * the remote index is behind or manual reindex is unavailable. Set

 * TINA_RUN_CLOUD_CHECKS=1 to run full Tina Cloud validation (local debugging).

 */

import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, rmSync } from "node:fs";
import { join } from "node:path";



const clientIdRaw =

  process.env.NEXT_PUBLIC_TINA_CLIENT_ID ?? process.env.TINA_CLIENT_ID;

const tokenRaw = process.env.TINA_TOKEN;



const clientId = clientIdRaw?.trim();

const token = tokenRaw?.trim();



const missing = [];

const empty = [];



if (!clientIdRaw) {

  missing.push("NEXT_PUBLIC_TINA_CLIENT_ID (or TINA_CLIENT_ID)");

} else if (!clientId) {

  empty.push("NEXT_PUBLIC_TINA_CLIENT_ID (or TINA_CLIENT_ID)");

}



if (!tokenRaw) {

  missing.push("TINA_TOKEN");

} else if (!token) {

  empty.push("TINA_TOKEN");

}



if (missing.length > 0 || empty.length > 0) {

  console.error("\n❌ TinaCMS build: variables de entorno incorrectas:\n");

  for (const name of missing) {

    console.error(`   • Falta: ${name}`);

  }

  for (const name of empty) {

    console.error(`   • Vacía (sin valor): ${name}`);

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

  • Valor vacío (variable creada pero sin pegar el token/Client ID)

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



const runCloudChecks =

  process.env.TINA_RUN_CLOUD_CHECKS === "1" ||

  process.env.TINA_RUN_CLOUD_CHECKS === "true";



const tinaArgs = ["build"];

if (!runCloudChecks) {

  console.log(

    "↳ Tina: omitiendo comprobaciones de nube e indexación de búsqueda (deploy estable)",

  );

  tinaArgs.push("--skip-cloud-checks", "--skip-search-index");

} else {

  console.log(

    "↳ Tina: comprobaciones completas de Tina Cloud activadas (TINA_RUN_CLOUD_CHECKS)",

  );

}



const adminDir = join(process.cwd(), "public", "admin");
const adminIndex = join(adminDir, "index.html");
const adminAssets = join(adminDir, "assets");

function removeStaleAdminArtifacts() {
  if (existsSync(adminIndex)) {
    console.log("↳ Eliminando public/admin/index.html (artefacto previo)");
    rmSync(adminIndex, { force: true });
  }
  if (existsSync(adminAssets)) {
    console.log("↳ Eliminando public/admin/assets/ (artefacto previo)");
    rmSync(adminAssets, { recursive: true, force: true });
  }
}

function assertProductionAdminHtml() {
  if (!existsSync(adminIndex)) {
    console.error(
      "\n❌ TinaCMS build: no se generó public/admin/index.html\n",
    );
    process.exit(1);
  }

  const html = readFileSync(adminIndex, "utf8");
  const devMarkers = [
    { pattern: /localhost/i, label: "localhost (modo dev de tinacms dev)" },
    { pattern: /@vite\/client/, label: "@vite/client (Vite dev server)" },
  ];

  for (const { pattern, label } of devMarkers) {
    if (pattern.test(html)) {
      console.error(`
❌ TinaCMS build: public/admin/index.html sigue en modo desarrollo (${label}).

No despliegues tras \`pnpm cms\` sin un build completo de producción.
Ejecuta \`pnpm run build\` (o deja que Vercel lo haga) para regenerar /admin.
`);
      process.exit(1);
    }
  }

  if (!html.includes("/admin/assets/")) {
    console.error(`
❌ TinaCMS build: public/admin/index.html no referencia /admin/assets/.

El panel no cargará en producción. Revisa tinacms build y tina/config.ts.
`);
    process.exit(1);
  }

  console.log("✓ public/admin/index.html — rutas de producción OK");
}

console.log("✓ Tina env vars present — preparing admin build");
removeStaleAdminArtifacts();

console.log("↳ Running tinacms build");
run("tinacms", tinaArgs);

assertProductionAdminHtml();

console.log("✓ Tina build OK — running astro build");
run("astro", ["build"]);


