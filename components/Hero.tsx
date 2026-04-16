"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import LogoMark from "./LogoMark";
import CampoButton from "./CampoButton";
import TextReveal from "./TextReveal";

const PHOTO = "/vacas.png";

// Tiempos en que la photo de fondo se oscurece por scroll
const FADE_START = 0.15; // 15% del viewport
const FADE_END   = 0.80; // 80% del viewport

export default function Hero() {
  const photoRef   = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const rafRef     = useRef<number | null>(null);

  /* ── RAF scroll handler ──────────────────────────────────────────────────
     Aplica directamente al DOM sin setState → cero re-renders en scroll.
     1. Fade overlay (negro) controlado por scroll
     2. Parallax del contenido (sube 0.28×)
     3. Parallax diferencial de las 3 capas de la foto
  ──────────────────────────────────────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const vh = window.innerHeight;
        const sy = window.scrollY;

        // 1. Fade overlay
        const progress = (sy / vh - FADE_START) / (FADE_END - FADE_START);
        if (overlayRef.current) {
          overlayRef.current.style.opacity = String(Math.min(1, Math.max(0, progress)));
        }

        // 2. Parallax del contenido
        if (contentRef.current) {
          contentRef.current.style.transform = `translateY(-${sy * 0.28}px)`;
        }

        // 3. Parallax suave de la foto de fondo
        if (photoRef.current) photoRef.current.style.transform = `translateY(${sy * 0.18}px)`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // estado inicial
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      id="inicio"
      className="hero-section"
      data-navdark="true"
    >
      {/* ═══ FOTO DE FONDO ═══ */}
      <div
        ref={photoRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-12%",
          left: 0,
          right: 0,
          bottom: "-12%",
          backgroundImage: `url(${PHOTO})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          willChange: "transform",
          zIndex: 0,
        }}
      />

      {/* ════════════════════════════════════════════════════
          OVERLAYS (igual que antes, encima de las capas)
      ════════════════════════════════════════════════════ */}

      {/* Overlay base — contraste mínimo WCAG AA */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          background: "rgba(3,8,4,0.35)",
          pointerEvents: "none",
        }}
      />

      {/* LogoMark — watermark tenue derecha */}
      <LogoMark
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "-6%",
          bottom: "6%",
          width: "54vw",
          maxWidth: "560px",
          minWidth: "280px",
          height: "auto",
          color: "#F0E8C4",
          opacity: 0.045,
          pointerEvents: "none",
          zIndex: 4,
        }}
      />

      {/* Gradiente cinematográfico — quema top y bottom */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 4,
          pointerEvents: "none",
          background: `linear-gradient(
            180deg,
            rgba(3,8,4,0.78) 0%,
            rgba(3,8,4,0.12) 28%,
            rgba(3,8,4,0.06) 52%,
            rgba(3,8,4,0.55) 80%,
            rgba(3,8,4,0.92) 100%
          )`,
        }}
      />

      {/* Fade a negro — driven by scroll, mutado via ref */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 18,
          backgroundColor: "#030804",
          opacity: 0,
          pointerEvents: "none",
        }}
      />

      {/* ════════════════════════════════════════════════════
          CONTENIDO — parallax via ref, encima del fade
      ════════════════════════════════════════════════════ */}
      <div
        ref={contentRef}
        className="flex flex-col justify-end md:justify-center pb-16 md:pb-0"
        style={{
          position: "relative",
          zIndex: 10,
          height: "100dvh",
          willChange: "transform",
        }}
      >
        <div className="max-w-[1250px] mx-auto w-full px-6 md:px-10">

          {/* Eyebrow — coordenadas */}
          <motion.div
            className="flex items-center gap-2.5 mb-6"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span
                className="animate-ping-gold absolute inline-flex h-full w-full rounded-full"
                style={{ backgroundColor: "var(--color-dorado)" }}
              />
              <span
                className="relative inline-flex rounded-full h-1.5 w-1.5"
                style={{ backgroundColor: "var(--color-dorado)" }}
              />
            </span>
            <span
              className="font-sans"
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(240,235,225,0.48)",
              }}
            >
              -38.12° S · -63.56° O · Jacinto Arauz, La Pampa
            </span>
          </motion.div>

          {/* H1 — Demo 10 scatter/converge reveal */}
          <TextReveal
            as="h1"
            className="font-sans"
            style={{
              fontSize: "clamp(3.1rem, 8.5vw, 7.2rem)",
              fontWeight: 800,
              lineHeight: 0.92,
              color: "#F0EBE1",
              letterSpacing: "-0.03em",
            }}
            delay={0.25}
          >
            El forraje que vuelve solo.{" "}
            <em
              className="not-italic"
              style={{ color: "var(--color-dorado)" }}
            >
              Cada año.
            </em>
          </TextReveal>

          {/* Bajada */}
          <motion.p
            className="font-sans mt-6 max-w-md"
            style={{
              fontSize: "clamp(0.9375rem, 1.3vw, 1.0625rem)",
              fontWeight: 400,
              lineHeight: 1.75,
              color: "rgba(240,235,225,0.58)",
            }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38 }}
          >
            Sandro Grand siembra y cosecha mijo perenne en el sudoeste bonaerense
            desde 2007. Si querés implantarlo en tu campo, te guía en el proceso.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap items-center gap-3 mt-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.52 }}
          >
            <CampoButton
              href="#contacto"
              label="Hablar con Sandro"
              variant="primary"
            />

            <a
              href="https://wa.me/5492916481785?text=Hola%20Sandro%2C%20me%20interesa%20el%20mijo%20perenne"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 font-sans font-medium"
              style={{
                borderRadius: "9999px",
                padding: "13px 22px",
                fontSize: "0.9375rem",
                color: "rgba(240,235,225,0.68)",
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(255,255,255,0.05)",
                minHeight: "52px",
                backdropFilter: "blur(8px)",
                transition: "all 0.25s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(255,255,255,0.26)";
                el.style.color = "#F0EBE1";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(255,255,255,0.14)";
                el.style.color = "rgba(240,235,225,0.68)";
              }}
            >
              <WAIcon />
              WhatsApp
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex items-center gap-8 mt-8 pt-7"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.72 }}
          >
            {[
              { n: "200",  u: "hectáreas" },
              { n: "17+",  u: "años en la zona" },
              { n: "100%", u: "semilla propia" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col">
                <span
                  className="font-sans"
                  style={{
                    fontSize: "clamp(1.3rem, 2.2vw, 1.75rem)",
                    fontWeight: 700,
                    color: "#F0EBE1",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {s.n}
                </span>
                <span
                  className="font-sans mt-1"
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(240,235,225,0.35)",
                  }}
                >
                  {s.u}
                </span>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function WAIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
