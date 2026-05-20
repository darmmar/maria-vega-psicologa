import { useState, useEffect } from "react";
import type { NavItem } from "@/lib/config/navigation";

interface Props {
  items: NavItem[];
}

export default function MobileMenu({ items }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => setOpen(false);
    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Botón hamburguesa */}
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-controls="mobile-menu"
        className="p-2 rounded-md text-ink hover:text-sage transition-colors md:hidden"
      >
        <span
          aria-hidden="true"
          className="block w-6 h-0.5 bg-current mb-1.5 transition-all duration-200"
          style={open ? { transform: "translateY(8px) rotate(45deg)" } : {}}
        />
        <span
          aria-hidden="true"
          className="block w-6 h-0.5 bg-current mb-1.5 transition-all duration-200"
          style={open ? { opacity: 0 } : {}}
        />
        <span
          aria-hidden="true"
          className="block w-6 h-0.5 bg-current transition-all duration-200"
          style={open ? { transform: "translateY(-8px) rotate(-45deg)" } : {}}
        />
      </button>

      {/* Overlay full-width */}
      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-label="Menú de navegación"
          className="fixed inset-0 top-[64px] z-40 bg-warm-100 md:hidden"
        >
          <nav className="flex flex-col p-6 gap-1">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-display text-2xl font-medium text-ink py-3 border-b border-ink-border last:border-0 hover:text-sage transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-6">
              <a
                href="/reserva"
                onClick={() => setOpen(false)}
                className="inline-flex w-full justify-center bg-sage text-white font-semibold py-3 px-6 rounded-lg hover:bg-sage-600 transition-colors"
              >
                Reservar cita
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
