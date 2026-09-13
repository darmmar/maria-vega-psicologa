import React, { useState, useEffect } from "react";
import type { TinaCMS } from "tinacms";

export function registerPublishPlugin(cms: TinaCMS) {
  cms.plugins.add({
    __type: "screen",
    name: "Publicar a Producción",
    Icon: () => (
      <svg
        style={{
          width: "1.15rem",
          height: "1.15rem",
          marginRight: "0.75rem",
          display: "inline-block",
          verticalAlign: "middle",
          flexShrink: 0,
        }}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
        />
      </svg>
    ),
    layout: "popup",
    Component() {
      const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
      const [branchInfo, setBranchInfo] = useState<{
        currentBranch: string;
        canPublish: boolean;
        message: string;
      }>(() => {
        const isDevHost =
          typeof window !== "undefined" &&
          (window.location.hostname.includes("dev.") ||
            window.location.hostname === "localhost" ||
            window.location.hostname === "127.0.0.1");

        return {
          currentBranch: isDevHost ? "dev" : "main",
          canPublish: isDevHost,
          message: isDevHost
            ? "Listo para publicar cambios a producción (main)."
            : "Estás en el entorno de producción (main).",
        };
      });
      const [message, setMessage] = useState("");

      useEffect(() => {
        fetch("/api/publish")
          .then(async (res) => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
          })
          .then((data) => {
            if (data && typeof data.currentBranch === "string") {
              setBranchInfo(data);
            }
          })
          .catch((err) => {
            console.warn("Consulta al endpoint /api/publish usando detección local:", err);
          });
      }, []);

      const handlePublish = async () => {
        if (
          !window.confirm(
            "¿Deseas publicar los cambios ahora? Se fusionará la rama 'dev' en 'main' y se lanzará el despliegue a la web oficial."
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

      const isDev = branchInfo.currentBranch === "dev" || branchInfo.currentBranch === "local";

      return (
        <div style={{ padding: "2.25rem", maxWidth: "640px", fontFamily: "system-ui, -apple-system, sans-serif" }}>
          {/* Cabecera */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700, margin: 0, color: "#1e2921", letterSpacing: "-0.01em" }}>
              Publicar a Producción
            </h2>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                fontSize: "0.75rem",
                fontWeight: 600,
                padding: "0.25rem 0.65rem",
                borderRadius: "9999px",
                backgroundColor: isDev ? "#ecfdf5" : "#f1f5f9",
                color: isDev ? "#047857" : "#475569",
                border: isDev ? "1px solid #a7f3d0" : "1px solid #cbd5e1",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: isDev ? "#10b981" : "#64748b",
                }}
              />
              {isDev ? "Entorno: Pruebas (dev)" : "Entorno: Producción"}
            </span>
          </div>

          <p style={{ color: "#4b5563", fontSize: "0.92rem", lineHeight: 1.55, margin: "0 0 1.5rem 0" }}>
            Cuando hayas terminado de editar y revisar el contenido en este panel, pulsa el botón inferior para
            sincronizar y publicar todos los cambios en la web oficial (<strong>mariavegagarcia.es</strong>).
          </p>

          {/* Tarjeta de estado de ramas */}
          <div
            style={{
              padding: "1rem 1.25rem",
              borderRadius: "0.625rem",
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              marginBottom: "1.5rem",
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "0.75rem" }}>
              <div>
                <span style={{ display: "block", fontSize: "0.75rem", color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Rama Origen (Pruebas)
                </span>
                <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f172a" }}>
                  {branchInfo.currentBranch}
                </span>
              </div>
              <div>
                <span style={{ display: "block", fontSize: "0.75rem", color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Rama Destino (Oficial)
                </span>
                <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#0f172a" }}>
                  main
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                paddingTop: "0.65rem",
                borderTop: "1px solid #e2e8f0",
                fontSize: "0.85rem",
                color: branchInfo.canPublish ? "#047857" : "#64748b",
                fontWeight: 500,
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                {branchInfo.canPublish ? (
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4L12 14.01l-3-3" />
                ) : (
                  <circle cx="12" cy="12" r="10" />
                )}
              </svg>
              <span>{branchInfo.message}</span>
            </div>
          </div>

          {/* Botón de acción */}
          {branchInfo.canPublish ? (
            <div>
              <button
                type="button"
                onClick={handlePublish}
                disabled={status === "loading"}
                style={{
                  backgroundColor: status === "loading" ? "#94a3b8" : "#475b4c",
                  color: "#ffffff",
                  padding: "0.75rem 1.4rem",
                  borderRadius: "0.5rem",
                  border: "none",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  cursor: status === "loading" ? "not-allowed" : "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.55rem",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
                  transition: "background-color 0.15s ease",
                }}
              >
                {status === "loading" ? (
                  <>
                    <svg
                      style={{ animation: "spin 1s linear infinite", width: "16px", height: "16px" }}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                      <path d="M12 2a10 10 0 0 1 10 10" />
                    </svg>
                    <span>Lanzando publicación a producción...</span>
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                    </svg>
                    <span>Publicar ahora en Producción</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div
              style={{
                padding: "0.85rem 1rem",
                borderRadius: "0.5rem",
                background: "#f1f5f9",
                color: "#475569",
                fontSize: "0.88rem",
                lineHeight: 1.4,
              }}
            >
              El botón de publicación solo se habilita en el entorno de pruebas (<strong>dev</strong>). En producción los cambios ya están en directo.
            </div>
          )}

          {/* Mensaje de éxito */}
          {status === "success" && (
            <div
              style={{
                marginTop: "1.25rem",
                padding: "1rem 1.25rem",
                borderRadius: "0.5rem",
                background: "#ecfdf5",
                color: "#065f46",
                border: "1px solid #a7f3d0",
                fontSize: "0.92rem",
                display: "flex",
                alignItems: "flex-start",
                gap: "0.65rem",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px" }}>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span>{message}</span>
            </div>
          )}

          {/* Mensaje de error */}
          {status === "error" && (
            <div
              style={{
                marginTop: "1.25rem",
                padding: "1rem 1.25rem",
                borderRadius: "0.5rem",
                background: "#fef2f2",
                color: "#991b1b",
                border: "1px solid #fecaca",
                fontSize: "0.92rem",
                display: "flex",
                alignItems: "flex-start",
                gap: "0.65rem",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px" }}>
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{message}</span>
            </div>
          )}
        </div>
      );
    },
  });
}
