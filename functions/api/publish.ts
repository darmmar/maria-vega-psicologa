interface Env {
  GITHUB_DISPATCH_TOKEN?: string;
  GITHUB_REPO_OWNER?: string;
  GITHUB_REPO_NAME?: string;
  CF_PAGES_BRANCH?: string;
  PUBLISH_SECRET?: string;
}

// GET: Consulta el estado y si es posible publicar desde esta rama
export const onRequestGet: PagesFunction<Env> = async (context) => {
  const branch = context.env.CF_PAGES_BRANCH || "local";
  const isDev = branch === "dev" || branch === "local";

  return new Response(
    JSON.stringify({
      currentBranch: branch,
      canPublish: isDev,
      message: isDev
        ? "Listo para publicar cambios a producción (main)."
        : `Esta función solo se ejecuta en el entorno de desarrollo (dev). Rama actual: ${branch}.`,
    }),
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    }
  );
};

// POST: Desencadena el flujo de fusión de dev a main en GitHub Actions
export const onRequestPost: PagesFunction<Env> = async (context) => {
  const currentBranch = context.env.CF_PAGES_BRANCH || "local";

  // 1. Solo permitir ejecución desde la rama dev (o local en desarrollo)
  if (currentBranch !== "dev" && currentBranch !== "local") {
    return new Response(
      JSON.stringify({
        ok: false,
        error: `Acción bloqueada: la publicación solo se permite desde la rama «dev». La rama actual es «${currentBranch}».`,
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // 2. Comprobar token secreto de GitHub en el servidor (Cloudflare Pages Secret)
  const token = context.env.GITHUB_DISPATCH_TOKEN?.trim();
  if (!token) {
    return new Response(
      JSON.stringify({
        ok: false,
        error:
          "Falta la variable de entorno GITHUB_DISPATCH_TOKEN en el panel de Cloudflare Pages. Añade un Personal Access Token con permisos de contenido.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const owner = context.env.GITHUB_REPO_OWNER?.trim() || "darmmar";
  const repo = context.env.GITHUB_REPO_NAME?.trim() || "maria-vega-psicologa";

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
            "¡Publicación iniciada con éxito! GitHub Actions está fusionando los cambios de «dev» a «main» y Cloudflare Pages desplegará la web en ~1-2 minutos.",
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
