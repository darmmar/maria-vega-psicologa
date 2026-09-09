import React, { useState, useEffect } from "react";
import type { TinaCMS } from "tinacms";

export function registerPublishPlugin(cms: TinaCMS) {
  cms.plugins.add({
    __type: "screen",
    name: "Publicar a Producción",
    Icon: () => (
      <svg style={{ width: "1.1rem", height: "1.1rem" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
      </svg>
    ),
    layout: "popup",
    Component() {
      const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
      const [branchInfo, setBranchInfo] = useState<{
        currentBranch: string;
        canPublish: boolean;
        message: string;
      } | null>(null);
      const [message, setMessage] = useState("");

      useEffect(() => {
        fetch("/api/publish")
          .then((res) => res.json())
          .then((data) => setBranchInfo(data))
          .catch(() =>
            setBranchInfo({
              currentBranch: "desconocida",
              canPublish: false,
              message: "No se pudo consultar el estado del endpoint /api/publish.",
            })
          );
      }, []);

      const handlePublish = async () => {
        if (
          !window.confirm(
            "¿Deseas publicar los cambios ahora? Se fusionará la rama 'dev' en 'main' y se lanzará el despliegue a producción."
          )
        ) {
          return;
        }
        setStatus("loading");
        setMessage("");

        try {
          const res = await fetch("/api/publish", { method: "POST" });
          const data = await res.json();
          if (res.ok && data.ok) {
            setStatus("success");
            setMessage(data.message);
          } else {
            setStatus("error");
            setMessage(data.error || "Ocurrió un error al iniciar la publicación.");
          }
        } catch (err: unknown) {
          setStatus("error");
          setMessage(err instanceof Error ? err.message : String(err));
        }
      };

      return (
        <div style={{ padding: "2rem", maxWidth: "620px", fontFamily: "system-ui, sans-serif" }}>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 600, marginBottom: "0.5rem", color: "#1e2921" }}>
            Publicar cambios de Desarrollo a Producción
          </h2>
          <p style={{ color: "#4b5563", fontSize: "0.95rem", lineHeight: 1.5, marginBottom: "1.5rem" }}>
            Este botón activa el flujo automatizado en GitHub Actions para fusionar todos los cambios
            guardados en la rama <strong>dev</strong> directamente a la rama <strong>main</strong>,
            disparando el despliegue automático de Cloudflare Pages a la web pública.
          </p>

          <div
            style={{
              padding: "1rem",
              borderRadius: "0.5rem",
              background: "#f9fafb",
              border: "1px solid #e5e7eb",
              marginBottom: "1.5rem",
              fontSize: "0.9rem",
              color: "#374151",
            }}
          >
            <div>
              <strong>Entorno / Rama detectada:</strong>{" "}
              <code style={{ background: "#e5e7eb", padding: "2px 6px", borderRadius: "4px" }}>
                {branchInfo?.currentBranch ?? "Comprobando..."}
              </code>
            </div>
            <div
              style={{
                marginTop: "0.5rem",
                color: branchInfo?.canPublish ? "#16a34a" : "#dc2626",
                fontWeight: 500,
              }}
            >
              {branchInfo?.message ?? "Consultando permisos..."}
            </div>
          </div>

          {branchInfo?.canPublish ? (
            <div>
              <button
                type="button"
                onClick={handlePublish}
                disabled={status === "loading"}
                style={{
                  backgroundColor: status === "loading" ? "#9ca3af" : "#475b4c",
                  color: "#ffffff",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "0.5rem",
                  border: "none",
                  fontWeight: 600,
                  fontSize: "1rem",
                  cursor: status === "loading" ? "not-allowed" : "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                {status === "loading" ? "Iniciando publicación en GitHub..." : "Publicar ahora en Producción"}
              </button>
            </div>
          ) : (
            <div style={{ color: "#6b7280", fontSize: "0.9rem" }}>
              El botón de publicación solo se habilita cuando el panel se ejecuta en la rama <strong>dev</strong>.
            </div>
          )}

          {status === "success" && (
            <div
              style={{
                marginTop: "1.5rem",
                padding: "1rem",
                borderRadius: "0.5rem",
                background: "#dcfce7",
                color: "#166534",
                border: "1px solid #bbf7d0",
                fontSize: "0.95rem",
              }}
            >
              {message}
            </div>
          )}

          {status === "error" && (
            <div
              style={{
                marginTop: "1.5rem",
                padding: "1rem",
                borderRadius: "0.5rem",
                background: "#fee2e2",
                color: "#991b1b",
                border: "1px solid #fecaca",
                fontSize: "0.95rem",
              }}
            >
              ❌ {message}
            </div>
          )}
        </div>
      );
    },
  });
}
