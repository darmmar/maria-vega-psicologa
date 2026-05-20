import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
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
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-md text-ink hover:text-sage transition-colors"
      >
        {open ? (
          <X width={24} height={24} strokeWidth={1.5} aria-hidden="true" />
        ) : (
          <Menu width={24} height={24} strokeWidth={1.5} aria-hidden="true" />
        )}
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
            className="fixed inset-x-0 top-16 bottom-0 z-[9999] bg-white overflow-y-auto"
          >
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
