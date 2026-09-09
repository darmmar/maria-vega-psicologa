import { useEffect, useState, useRef } from "react";

declare global {
  interface Window {
    Cal?: any;
  }
}

interface Props {
  calLink?: string;
  defaultUsername?: string;
  combinedEventSlug?: string;
  presencialEventSlug?: string;
  onlineEventSlug?: string;
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
  combinedEventSlug,
  presencialEventSlug,
  onlineEventSlug,
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

  // Calcular el enlace exacto según la modalidad seleccionada
  const presencialSlug = presencialEventSlug?.trim() || "terapia-presencial";
  const onlineSlug = onlineEventSlug?.trim() || "terapia-online";
  const combinedSlug = combinedEventSlug?.trim();

  const activeLink =
    selectedType === "presencial"
      ? `${defaultUsername}/${presencialSlug}`
      : selectedType === "online"
      ? `${defaultUsername}/${onlineSlug}`
      : combinedSlug
      ? `${defaultUsername}/${combinedSlug}`
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
      {/* Selector de pestañas / modalidades sin emojis, con iconos SVG profesionales */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6 p-1.5 bg-warm-100/70 rounded-2xl border border-ink-border/20 max-w-xl mx-auto">
        <button
          type="button"
          onClick={() => handleTabClick("all")}
          className={`flex-1 min-w-[130px] inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs sm:text-sm font-medium rounded-xl transition-all duration-200 ${
            selectedType === "all"
              ? "bg-sage text-white shadow-soft font-semibold"
              : "text-ink-muted hover:text-ink hover:bg-white/60"
          }`}
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.253 3.75m-18 0h19.5m-19.5 0v12.75c0 1.036.84 1.875 1.875 1.875h15.75c1.035 0 1.875-.84 1.875-1.875V7.5M4.5 19.5h15" />
          </svg>
          <span>Agenda completa</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabClick("presencial")}
          className={`flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs sm:text-sm font-medium rounded-xl transition-all duration-200 ${
            selectedType === "presencial"
              ? "bg-sage text-white shadow-soft font-semibold"
              : "text-ink-muted hover:text-ink hover:bg-white/60"
          }`}
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg>
          <span>Presencial (Málaga)</span>
        </button>

        <button
          type="button"
          onClick={() => handleTabClick("online")}
          className={`flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs sm:text-sm font-medium rounded-xl transition-all duration-200 ${
            selectedType === "online"
              ? "bg-sage text-white shadow-soft font-semibold"
              : "text-ink-muted hover:text-ink hover:bg-white/60"
          }`}
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9A2.25 2.25 0 0 0 13.5 5.25h-9A2.25 2.25 0 0 0 2.25 7.5v9A2.25 2.25 0 0 0 4.5 18.75Z" />
          </svg>
          <span>Online (Videollamada)</span>
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
            {combinedSlug ? (
              <>
                Mostrando <strong>calendario conjunto</strong> con disponibilidad para ambas modalidades (presencial en Málaga y online por videollamada).
              </>
            ) : (
              <>
                Elige en el calendario la modalidad que prefieras o pulsa directamente en <strong>Presencial</strong> u <strong>Online</strong> para abrir los días y horas de cada una.
              </>
            )}
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
