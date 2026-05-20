import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import type { NavItem } from "@/lib/config/navigation";

interface Props {
  items: NavItem[];
}

export default function MobileMenu({ items }: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      {/* Hamburger button — visible only on mobile */}
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-controls="mobile-menu"
        className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-md text-ink hover:text-sage transition-colors"
      >
        <span className="block w-6 h-0.5 bg-current" />
        <span className="block w-6 h-0.5 bg-current" />
        <span className="block w-6 h-0.5 bg-current" />
      </button>

      {/*
        Panel portaled to document.body to escape the header's stacking context.
        The header uses backdrop-blur-sm (backdrop-filter), which creates a new
        containing block for position:fixed children. Portaling out fixes this.
      */}
      {mounted &&
        open &&
        createPortal(
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            className="fixed inset-0 z-[9999] bg-white overflow-y-auto"
          >
            {/* Top bar with close button */}
            <div className="flex items-center justify-between px-6 h-16 border-b border-ink-border/50">
              <span className="font-display text-lg font-semibold text-sage">
                Navegación
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Cerrar menú"
                className="p-2 rounded-md text-ink hover:text-sage transition-colors"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Navigation links */}
            <nav className="flex flex-col px-6 py-4" aria-label="Menú principal">
              {items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-2xl font-medium text-ink py-4 border-b border-ink-border/50 last:border-0 hover:text-sage transition-colors"
                >
                  {item.label}
                </a>
              ))}

            </nav>
          </div>,
          document.body
        )}
    </>
  );
}
