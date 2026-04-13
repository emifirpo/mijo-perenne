"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import LogoMark from "./LogoMark";

const VIDEOS = ["/campo-01.mp4", "/campo-02.mp4"];

export default function Hero() {
  const [activeIdx, setActiveIdx] = useState(0);
  const videoRef0 = useRef<HTMLVideoElement>(null);
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRefs = [videoRef0, videoRef1];

  useEffect(() => {
    videoRef0.current?.play().catch(() => {});
  }, []);

  const handleEnded = useCallback((idx: number) => {
    const next = 1 - idx;
    setActiveIdx(next);
    setTimeout(() => {
      const v = videoRefs[next].current;
      if (v) { v.currentTime = 0; v.play().catch(() => {}); }
    }, 60);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      id="inicio"
      className="relative flex flex-col overflow-hidden"
      style={{ minHeight: "100dvh", width: "100%", backgroundColor: "#050c06" }}
    >
      {/* ── Video background ── */}
      {VIDEOS.map((src, i) => (
        <video
          key={src}
          ref={videoRefs[i]}
          src={src}
          muted
          playsInline
          preload={i === 0 ? "auto" : "metadata"}
          onEnded={() => handleEnded(i)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
            display: "block",
            opacity: activeIdx === i ? 1 : 0,
            transition: "opacity 1.2s ease-in-out",
            zIndex: 0,
          }}
        />
      ))}

      {/* ── Overlay base — contraste mínimo WCAG AA ── */}
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: "rgba(3,8,4,0.38)" }}
      />

      {/* ── Logo D — watermark fondo, derecha, fusionado con la oscuridad ── */}
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
          zIndex: 2,
        }}
      />

      {/* ── Gradiente cinematográfico — quema top + bottom ── */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: `linear-gradient(
            180deg,
            rgba(3,8,4,0.72) 0%,
            rgba(3,8,4,0.10) 30%,
            rgba(3,8,4,0.06) 55%,
            rgba(3,8,4,0.60) 82%,
            rgba(3,8,4,0.92) 100%
          )`,
        }}
      />

      {/* ── Contenido principal ── */}
      <div className="relative z-10 flex flex-col justify-end md:justify-center flex-1 pb-16 md:pb-0">
        <div className="max-w-[1250px] mx-auto w-full px-6 md:px-10 md:text-center">

          {/* Eyebrow — coordenadas */}
          <motion.div
            className="flex items-center gap-2.5 mb-6 md:justify-center"
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

          {/* H1 — DM Sans, bold, protagonista */}
          <motion.h1
            className="font-sans"
            style={{
              fontSize: "clamp(2.4rem, 6.5vw, 5.5rem)",
              fontWeight: 800,
              lineHeight: 0.92,
              color: "#F0EBE1",
              letterSpacing: "-0.03em",
            }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.82, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            El forraje que vuelve solo.{" "}
            <em
              className="not-italic"
              style={{
                color: "var(--color-dorado)",
              }}
            >
              Cada año.
            </em>
          </motion.h1>

          {/* Bajada */}
          <motion.p
            className="font-sans mt-6 max-w-md md:max-w-lg md:mx-auto"
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
            Sandro Grand produce y vende semilla de mijo perenne en el sudoeste bonaerense. 17 años implantando en campo propio.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap items-center gap-3 mt-8 md:justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.52 }}
          >
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 font-sans font-semibold"
              style={{
                background: "#F0EBE1",
                borderRadius: "9999px",
                padding: "13px 24px 13px 13px",
                fontSize: "0.9375rem",
                color: "#0a1f0b",
                minHeight: "52px",
                transition: "background 0.25s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "#ffffff")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "#F0EBE1")
              }
            >
              <span
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "#005F02",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 6h8M6 2l4 4-4 4" stroke="#F0EBE1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              Consultar disponibilidad
            </a>

            <a
              href="https://wa.me/5492954000000?text=Hola%20Sandro%2C%20me%20interesa%20el%20mijo%20perenne"
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

          {/* Stats — fila separada, debajo de los CTAs */}
          <motion.div
            className="flex items-center gap-8 mt-8 pt-7 md:justify-center"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.72 }}
          >
            {[
              { n: "200", u: "hectáreas" },
              { n: "17+", u: "años en la zona" },
              { n: "100%", u: "semilla propia" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col">
                <span
                  className="font-sans"
                  style={{ fontSize: "clamp(1.3rem, 2.2vw, 1.75rem)", fontWeight: 700, color: "#F0EBE1", lineHeight: 1, letterSpacing: "-0.03em" }}
                >
                  {s.n}
                </span>
                <span
                  className="font-sans mt-1"
                  style={{ fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(240,235,225,0.35)" }}
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
