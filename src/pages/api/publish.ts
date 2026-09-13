export const prerender = false;

import type { APIRoute } from "astro";

interface CloudflareEnv {
  GITHUB_DISPATCH_TOKEN?: string;
  GITHUB_REPO_OWNER?: string;
  GITHUB_REPO_NAME?: string;
  GITHUB_BRANCH?: string;
  PUBLIC_TINA_BRANCH?: string;
  CF_PAGES_BRANCH?: string;
}

function resolveBranch(locals: App.Locals, request: Request): string {
  const runtimeEnv = ((locals as unknown as { runtime?: { env?: CloudflareEnv } })?.runtime?.env) || {};
  const host = request.headers.get("host") || new URL(request.url).hostname;

  if (runtimeEnv.CF_PAGES_BRANCH) return runtimeEnv.CF_PAGES_BRANCH;
  if (runtimeEnv.GITHUB_BRANCH) return runtimeEnv.GITHUB_BRANCH;
  if (runtimeEnv.PUBLIC_TINA_BRANCH) return runtimeEnv.PUBLIC_TINA_BRANCH;
  if (import.meta.env.PUBLIC_TINA_BRANCH) return import.meta.env.PUBLIC_TINA_BRANCH;

  if (
    host.includes("dev.") ||
    host.includes("localhost") ||
    host.includes("127.0.0.1")
  ) {
    return "dev";
  }

  return "main";
}

// GET: Consulta el estado actual del entorno y si es posible publicar a producción
export const GET: APIRoute = async ({ locals, request }) => {
  const currentBranch = resolveBranch(locals, request);
  const isDev = currentBranch === "dev" || currentBranch === "local";

  return new Response(
    JSON.stringify({
      currentBranch,
      canPublish: isDev,
      message: isDev
        ? "Listo para publicar cambios a producción (main)."
        : `Esta función solo se ejecuta en el entorno de desarrollo (dev). Rama actual: ${currentBranch}.`,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    }
  );
};

// POST: Desencadena el flujo de fusión de dev a main en GitHub Actions
export const POST: APIRoute = async ({ locals, request }) => {
  const runtimeEnv = ((locals as unknown as { runtime?: { env?: CloudflareEnv } })?.runtime?.env) || {};
  const currentBranch = resolveBranch(locals, request);

  // 1. Solo permitir publicación desde la rama dev (o local)
  if (currentBranch !== "dev" && currentBranch !== "local") {
    return new Response(
      JSON.stringify({
        ok: false,
        error: `Acción no permitida: la publicación solo se puede iniciar desde el entorno «dev». La rama actual es «${currentBranch}».`,
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // 2. Comprobar token secreto de GitHub
  const token =
    runtimeEnv.GITHUB_DISPATCH_TOKEN?.trim() ||
    process.env.GITHUB_DISPATCH_TOKEN?.trim();

  if (!token) {
    return new Response(
      JSON.stringify({
        ok: false,
        error:
          "Falta la variable secreta GITHUB_DISPATCH_TOKEN en Cloudflare Pages para conectar con la API de GitHub.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const owner =
    runtimeEnv.GITHUB_REPO_OWNER?.trim() ||
    process.env.GITHUB_REPO_OWNER?.trim() ||
    "darmmar";
  const repo =
    runtimeEnv.GITHUB_REPO_NAME?.trim() ||
    process.env.GITHUB_REPO_NAME?.trim() ||
    "maria-vega-psicologa";

  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/dispatches`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "Cloudflare-Pages-Publish-Gateway",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_type: "publish-to-production",
          client_payload: {
            triggered_by: "TinaCMS Admin",
            source_branch: currentBranch,
            target_branch: "main",
            timestamp: new Date().toISOString(),
          },
        }),
      }
    );

    // GitHub responde 204 No Content ante un dispatch exitoso
    if (response.status === 204 || response.ok) {
      return new Response(
        JSON.stringify({
          ok: true,
          message:
            "¡Publicación iniciada con éxito! GitHub Actions está fusionando los cambios de «dev» a «main» y Cloudflare Pages desplegará automáticamente la web oficial en 1-2 minutos.",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    const errorData = await response.text();
    return new Response(
      JSON.stringify({
        ok: false,
        error: `Error de la API de GitHub (Status ${response.status}): ${errorData}`,
      }),
      { status: response.status, headers: { "Content-Type": "application/json" } }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return new Response(
      JSON.stringify({
        ok: false,
        error: `Excepción interna al conectar con GitHub: ${message}`,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
