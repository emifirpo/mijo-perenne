"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import CampoButton from "./CampoButton";

const ScrollyVideo = dynamic(
  () => import("scrolly-video/dist/ScrollyVideo.cjs.jsx"),
  { ssr: false }
);

export default function Solucion() {
  const solucionRef    = useRef<HTMLDivElement>(null);
  const [pct, setPct]  = useState(0);

  /* ── Scroll → videoPercentage ────────────────────────────────────
     Mapea el paso de la sección por el viewport (sin sticky):
       0  cuando el top de la sección toca el fondo de la pantalla
       1  cuando el bottom sale por arriba de la pantalla
     Throttleado con RAF para no saturar React con setState. ──── */
  useEffect(() => {
    let rafPending = false;

    const onScroll = () => {
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(() => {
        rafPending = false;
        const el = solucionRef.current;
        if (!el) return;
        const rect     = el.getBoundingClientRect();
        const vh       = window.innerHeight;
        const progress = (vh - rect.top) / (vh + rect.height);
        setPct(Math.max(0, Math.min(1, progress)));
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // valor inicial
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── CSS fix para ScrollyVideo (guarda contra duplicados) ──────── */
  useEffect(() => {
    if (document.getElementById("scrolly-fix")) return;
    const s = document.createElement("style");
    s.id = "scrolly-fix";
    s.textContent = `
      [data-scrolly-container] video,
      [data-scrolly-container] canvas {
        position: absolute !important;
        top: 0 !important; left: 0 !important;
        right: 0 !important; bottom: 0 !important;
        width: 100% !important; height: 100% !important;
        min-width: 0 !important; min-height: 0 !important;
        transform: none !important;
        object-fit: cover !important;
        object-position: center center !important;
      }
    `;
    document.head.appendChild(s);
  }, []);

  return (
    <section
      id="cultivo"
      ref={solucionRef}
      className="py-24 md:py-40"
      style={{ backgroundColor: "var(--color-base)" }}
    >
      <div className="max-w-[1250px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

          {/* ── Columna texto ─────────────────────────────────────── */}
          <motion.div
            className="flex flex-col justify-center py-8 md:py-14 pr-4 md:pr-12"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="tag-label mb-4">La solución</p>

            <h2
              className="font-sans mb-5"
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                color: "var(--color-text-primary)",
                letterSpacing: "-0.03em",
                lineHeight: 1.0,
              }}
            >
              Una sola siembra.
              <br />
              <span style={{ color: "var(--color-dorado)" }}>
                Un costo que no se repite.
              </span>
            </h2>

            <p
              className="font-sans mb-3"
              style={{
                fontSize: "clamp(0.9375rem, 1.3vw, 1.0625rem)",
                lineHeight: 1.8,
                color: "var(--color-text-secondary)",
              }}
            >
              El Panicum coloratum es una gramínea perenne que se implanta
              una vez y persiste por décadas. Su sistema radicular profundo
              le permite rebrotar cada primavera sin laboreo, sin semilla,
              sin costo adicional.
            </p>
            <p
              className="font-sans mb-5"
              style={{
                fontSize: "clamp(0.9375rem, 1.3vw, 1.0625rem)",
                lineHeight: 1.8,
                color: "var(--color-text-secondary)",
              }}
            >
              Alimento verde para el rodeo en verano — el período más
              exigente. Cuando las pasturas naturales frenan, el mijo
              perenne está en plena producción.
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {[
                "Perenne · una sola siembra",
                "Resistente a −18°C",
                "Rebrote desde septiembre",
                "3.500 kg/ha promedio",
              ].map((tag) => (
                <span key={tag} className="pill-badge pill-badge-gold">
                  {tag}
                </span>
              ))}
            </div>

            <CampoButton
              href="#contacto"
              label="Consultar semilla"
              variant="dark"
              className="self-start"
            />
          </motion.div>

          {/* ── Columna ScrollyVideo ───────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            style={{
              /* height explícita — necesaria para que ScrollyVideo
                 pueda calcular sus dimensiones (height:100% en hijos
                 no funciona con min-height) */
              position: "relative",
              height: "clamp(380px, 60vh, 640px)",
              borderRadius: 16,
              overflow: "hidden",
              background: "#030804",
            }}
          >
            <ScrollyVideo
              src="/solucion-scroll-opt.mp4"
              sticky={false}
              full={false}
              cover={true}
              trackScroll={false}
              videoPercentage={pct}
              transitionSpeed={40}
              useWebCodecs={false}
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
