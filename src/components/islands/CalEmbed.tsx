import { useEffect, useState, useRef } from "react";

declare global {
  interface Window {
    Cal?: any;
  }
}

interface Props {
  calLink?: string;
  defaultUsername?: string;
  className?: string;
}

function initCalScript() {
  if (typeof window === "undefined") return;
  if (window.Cal) return;

  (function (C: any, A: string, L: string) {
    const p = function (a: any, ar: any) {
      a.q.push(ar);
    };
    const d = C.document;
    C.Cal =
      C.Cal ||
      function () {
        const cal = C.Cal;
        const ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api: any = function () {
            p(api, arguments);
          };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
  })(window, "https://app.cal.com/embed/embed.js", "init");

  window.Cal("init", { origin: "https://cal.com" });
  window.Cal("ui", {
    styles: { branding: { brandColor: "#3F5346" } },
    hideEventTypeDetails: false,
    layout: "month_view",
  });
}

export default function CalEmbed({
  calLink: initialCalLink = "maria-vega",
  defaultUsername = "maria-vega",
  className = "",
}: Props) {
  const [selectedType, setSelectedType] = useState<"presencial" | "online" | "all">("all");
  const containerRef = useRef<HTMLDivElement>(null);

  // Leer parámetro ?tipo= de la URL al cargar
  useEffect(() => {
    initCalScript();

    const checkUrlParam = () => {
      const params = new URLSearchParams(window.location.search);
      const tipo = params.get("tipo");
      if (tipo === "presencial") {
        setSelectedType("presencial");
      } else if (tipo === "online") {
        setSelectedType("online");
      }
    };

    checkUrlParam();

    // Escuchar eventos personalizados desde las tarjetas superiores
    const handleCustomSelect = (e: any) => {
      if (e.detail === "presencial" || e.detail === "online" || e.detail === "all") {
        setSelectedType(e.detail);
      }
    };

    window.addEventListener("cal-select-type", handleCustomSelect);
    window.addEventListener("popstate", checkUrlParam);

    return () => {
      window.removeEventListener("cal-select-type", handleCustomSelect);
      window.removeEventListener("popstate", checkUrlParam);
    };
  }, []);

  // Calcular el enlace exacto según la modalidad
  const activeLink =
    selectedType === "presencial"
      ? `${defaultUsername}/terapia-presencial`
      : selectedType === "online"
      ? `${defaultUsername}/terapia-online`
      : initialCalLink || defaultUsername;

  // Montar el calendario con la API inline de Cal
  useEffect(() => {
    if (!containerRef.current) return;
    initCalScript();

    if (window.Cal) {
      window.Cal("inline", {
        elementOrSelector: containerRef.current,
        calLink: activeLink,
        layout: "month_view",
        config: {
          theme: "light",
        },
      });
    }
  }, [activeLink]);

  const handleTabClick = (type: "presencial" | "online" | "all") => {
    setSelectedType(type);

    // Actualizar URL sin recargar para que el enlace sea compartible
    const url = new URL(window.location.href);
    if (type === "all") {
      url.searchParams.delete("tipo");
    } else {
      url.searchParams.set("tipo", type);
    }
    window.history.replaceState({}, "", url.toString());
  };

  const externalUrl = `https://cal.com/${activeLink}`;

  return (
    <div className={`cal-booking-wrapper ${className}`}>
      {/* Selector de pestañas / modalidades */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6 p-1.5 bg-warm-100/70 rounded-2xl border border-ink-border/20 max-w-xl mx-auto">
        <button
          type="button"
          onClick={() => handleTabClick("all")}
          className={`flex-1 min-w-[120px] py-2.5 px-4 text-xs sm:text-sm font-medium rounded-xl transition-all duration-200 ${
            selectedType === "all"
              ? "bg-white text-ink shadow-sm font-semibold border border-ink-border/20"
              : "text-ink-muted hover:text-ink hover:bg-white/50"
          }`}
        >
          ✨ Ambas opciones
        </button>

        <button
          type="button"
          onClick={() => handleTabClick("presencial")}
          className={`flex-1 min-w-[140px] py-2.5 px-4 text-xs sm:text-sm font-medium rounded-xl transition-all duration-200 ${
            selectedType === "presencial"
              ? "bg-sage text-white shadow-sm font-semibold"
              : "text-ink-muted hover:text-ink hover:bg-white/50"
          }`}
        >
          📍 Presencial (Málaga)
        </button>

        <button
          type="button"
          onClick={() => handleTabClick("online")}
          className={`flex-1 min-w-[140px] py-2.5 px-4 text-xs sm:text-sm font-medium rounded-xl transition-all duration-200 ${
            selectedType === "online"
              ? "bg-sage text-white shadow-sm font-semibold"
              : "text-ink-muted hover:text-ink hover:bg-white/50"
          }`}
        >
          💻 Online (Videollamada)
        </button>
      </div>

      {/* Nota informativa de la modalidad activa */}
      <div className="text-center text-xs sm:text-sm text-ink-muted mb-6 max-w-xl mx-auto px-4 font-body">
        {selectedType === "presencial" && (
          <p>
            Mostrando citas para <strong>Consulta Presencial en Málaga</strong> (C/ Zamarrilla 15).
            Lunes de 11:00 a 14:00 y de 16:00 a 20:00.
          </p>
        )}
        {selectedType === "online" && (
          <p>
            Mostrando citas para <strong>Terapia Online por videollamada</strong>.
            Martes a jueves (11:00-14:00 y 16:00-20:00) y viernes (10:00-14:00).
          </p>
        )}
        {selectedType === "all" && (
          <p>
            Elige en el calendario entre consulta presencial u online para ver los días y horas disponibles.
          </p>
        )}
      </div>

      {/* Contenedor del calendario embebido */}
      <div
        key={activeLink}
        ref={containerRef}
        className="cal-embed-container w-full"
        style={{ minHeight: "650px", width: "100%" }}
      />

      {/* Enlace alternativo discreto */}
      <div className="mt-4 pt-4 border-t border-ink-border/10 text-center">
        <a
          href={externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-sage hover:underline inline-flex items-center gap-1 font-body"
        >
          ¿Prefieres abrir el calendario en una pestaña nueva? Abrir en Cal.com ↗
        </a>
      </div>
    </div>
  );
}
