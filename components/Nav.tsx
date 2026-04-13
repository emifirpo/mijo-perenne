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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight - 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Over dark hero → white text. Over light content → dark text.
  const logoColor   = scrolled ? "#182A1A" : "#F0EBE1";
  const linkColor   = scrolled ? "rgba(24,42,26,0.65)" : "rgba(240,235,225,0.75)";
  const hoverColor  = scrolled ? "#182A1A" : "#F0EBE1";
  const pillBg      = scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.07)";
  const pillBorder  = scrolled ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.12)";
  const ctaBg       = scrolled ? "#182A1A" : "var(--color-dorado)";
  const ctaDotBg    = scrolled ? "var(--color-dorado)" : "#182A1A";
  const ctaDotPing  = scrolled ? "#182A1A" : "var(--color-dorado)";
  const burgerBg    = scrolled ? "rgba(0,0,0,0.07)" : "rgba(255,255,255,0.1)";
  const burgerBdr   = scrolled ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.15)";
  const burgerLine  = scrolled ? "#182A1A" : "#F0EBE1";

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-8"
        style={{ height: "72px" }}
      >
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-2.5 z-10" aria-label="Inicio">
          {/* Mark — panícula, color-adaptive */}
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
            Sandro Grand
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
              -38.12° S · -63.56° O · Jacinto Arauz, La Pampa
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
