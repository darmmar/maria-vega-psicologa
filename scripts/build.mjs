import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { loadEnvFile } from "node:process";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";

const require = createRequire(import.meta.url);

for (const file of [".env.local", ".env"]) {
  if (existsSync(file)) loadEnvFile(file);
}

const clientId = (
  process.env.PUBLIC_TINA_CLIENT_ID ||
  process.env.NEXT_PUBLIC_TINA_CLIENT_ID ||
  process.env.TINA_CLIENT_ID
)?.trim();
if (!clientId || !process.env.TINA_TOKEN?.trim()) {
  throw new Error("Configure PUBLIC_TINA_CLIENT_ID and TINA_TOKEN in .env.local or Cloudflare build variables.");
}
process.env.PUBLIC_TINA_CLIENT_ID = clientId;

function run(packageName, command, args) {
  const manifestPath = require.resolve(`${packageName}/package.json`);
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const script = resolve(dirname(manifestPath), manifest.bin[command]);
  const result = spawnSync(process.execPath, [script, ...args], {
    stdio: "inherit",
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

// Workers have no writable filesystem. Disable the cache through the CLI.
const args = ["build", "--no-client-build-cache", "--skip-search-index"];
if (process.env.TINA_RUN_CLOUD_CHECKS !== "1") args.push("--skip-cloud-checks");
run("@tinacms/cli", "tinacms", args);
if (readFileSync("tina/__generated__/client.ts", "utf8").includes("cacheDir:")) {
  throw new Error("Tina generated a filesystem cache. Cloudflare builds require --no-client-build-cache.");
}
const admin = readFileSync("public/admin/index.html", "utf8");
if (!admin.includes("/admin/assets/") || admin.includes("/@vite/client")) {
  throw new Error("Tina did not generate a production admin. Run pnpm build again.");
}
run("astro", "astro", ["build"]);
if (!existsSync("dist/admin/bridge.js")) {
  throw new Error("The Tina integration did not emit dist/admin/bridge.js.");
}
