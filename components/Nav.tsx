"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LogoMark from "./LogoMark";

const NAV_LINKS = [
  { href: "#cultivo", label: "El cultivo" },
  { href: "#sandro", label: "Quién soy" },
  { href: "#oferta", label: "Oferta" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [onDark, setOnDark]     = useState(true); // hero is dark on mount
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const navEl = document.querySelector("nav") as HTMLElement | null;

    const update = () => {
      setScrolled(window.scrollY > 40);

      // elementFromPoint returns the topmost element in z-order — that's the nav
      // itself (z-50). We need to punch through it to hit the section below.
      // Temporarily removing pointer-events makes the nav invisible to the hit test.
      if (navEl) navEl.style.pointerEvents = "none";
      const el = document.elementFromPoint(window.innerWidth / 2, 36);
      if (navEl) navEl.style.pointerEvents = "";

      setOnDark(!!el?.closest("[data-navdark]"));
    };

    update(); // run once on mount to set correct initial state
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // onDark = true  → nav is over a dark section → show light logo/text
  // onDark = false → nav is over a light section → show dark logo/text
  const logoColor   = menuOpen ? "#182A1A" : (onDark ? "#F0EBE1" : "#182A1A");
  const linkColor   = onDark ? "rgba(240,235,225,0.75)" : "rgba(24,42,26,0.65)";
  const hoverColor  = onDark ? "#F0EBE1" : "#182A1A";
  const pillBg      = scrolled ? (onDark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.92)") : "rgba(255,255,255,0.07)";
  const pillBorder  = scrolled ? (onDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)") : "rgba(255,255,255,0.12)";
  const ctaBg       = onDark ? "var(--color-dorado)" : "#182A1A";
  const ctaDotBg    = onDark ? "#182A1A" : "var(--color-dorado)";
  const ctaDotPing  = onDark ? "var(--color-dorado)" : "#182A1A";
  const burgerBg    = menuOpen ? "rgba(0,0,0,0.07)" : (onDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.07)");
  const burgerBdr   = menuOpen ? "rgba(0,0,0,0.12)" : (onDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)");
  const burgerLine  = menuOpen ? "#182A1A" : (onDark ? "#F0EBE1" : "#182A1A");

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-8"
        style={{ height: "72px" }}
      >
        {/* Logo — color adaptativo según sección clara/oscura */}
        <a href="#inicio" className="flex items-center gap-2.5 z-10" aria-label="Inicio">
          <LogoMark
            aria-hidden="true"
            style={{
              height: "32px",
              width: "auto",
              flexShrink: 0,
              color: logoColor,
              transition: "color 0.4s",
            }}
          />
          <span
            className="font-sans font-semibold leading-none"
            style={{ fontSize: "1.05rem", color: logoColor, letterSpacing: "-0.02em", transition: "color 0.4s" }}
          >
            Mijo Grand
          </span>
        </a>

        {/* Pill Nav — desktop */}
        <div
          className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2"
          style={{
            background: pillBg,
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: `1px solid ${pillBorder}`,
            borderRadius: "9999px",
            padding: "5px",
            transition: "all 0.4s ease",
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans font-medium"
              style={{ padding: "8px 20px", borderRadius: "9999px", fontSize: "0.875rem", color: linkColor, transition: "all 0.2s" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = scrolled ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.1)";
                (e.currentTarget as HTMLElement).style.color = hoverColor;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = linkColor;
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA + Burger */}
        <div className="flex items-center gap-3 z-10">
          <a
            href="#contacto"
            className="hidden md:inline-flex items-center gap-2 font-sans font-medium"
            style={{
              background: ctaBg,
              borderRadius: "9999px",
              padding: "10px 18px 10px 10px",
              fontSize: "0.875rem",
              color: "#F0EBE1",
              transition: "all 0.35s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
          >
            <span
              style={{
                width: "26px",
                height: "26px",
                borderRadius: "50%",
                background: ctaDotBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping-gold absolute inline-flex h-full w-full rounded-full" style={{ backgroundColor: ctaDotPing }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: ctaDotPing }} />
              </span>
            </span>
            Consultar
          </a>

          <button
            className="md:hidden flex flex-col justify-center items-center w-11 h-11"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            style={{ background: burgerBg, border: `1px solid ${burgerBdr}`, borderRadius: "50%", transition: "all 0.35s", gap: "5px" }}
          >
            <span className="sr-only">{menuOpen ? "Cerrar" : "Menú"}</span>
            <span className="block h-px transition-all duration-300 origin-center" style={{ width: "18px", backgroundColor: burgerLine, transform: menuOpen ? "translateY(5px) rotate(45deg)" : "none" }} />
            <span className="block h-px transition-all duration-300" style={{ width: "12px", backgroundColor: burgerLine, opacity: menuOpen ? 0 : 1 }} />
            <span className="block h-px transition-all duration-300 origin-center" style={{ width: "18px", backgroundColor: burgerLine, transform: menuOpen ? "translateY(-5px) rotate(-45deg)" : "none" }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-40 flex flex-col pt-20 px-5"
            style={{ background: "rgba(236,243,232,0.98)", backdropFilter: "blur(24px)" }}
          >
            {[...NAV_LINKS, { href: "#contacto", label: "Consultar disponibilidad" }].map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="py-5 border-b font-sans font-medium"
                style={{ fontSize: "clamp(1.6rem, 5vw, 2rem)", color: "var(--color-text-primary)", borderColor: "rgba(0,0,0,0.08)", letterSpacing: "-0.02em" }}
              >
                {link.label}
              </motion.a>
            ))}
            <p className="mt-auto mb-8 font-sans" style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>
              Jacinto Arauz · La Pampa · Est. 2007
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
