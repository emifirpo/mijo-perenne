"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import dynamic from "next/dynamic";
import TextReveal from "./TextReveal";

const ScrollyVideo = dynamic(
  () => import("scrolly-video/dist/ScrollyVideo.cjs.jsx"),
  { ssr: false }
);

const CampoWireframe = dynamic(() => import("./CampoWireframe"), { ssr: false });

const PASOS = [
  {
    num: "01",
    periodo: "Oct – Nov",
    titulo: "Implantación",
    texto: "Una sola siembra. Semilla propia seleccionada, laboreo mínimo. En 6-8 semanas el cultivo está establecido.",
    detalle: "5-8 kg/ha · profundidad 1-2 cm",
  },
  {
    num: "02",
    periodo: "Dic – Ene",
    titulo: "Cosecha y pastoreo",
    texto: "El mijo alcanza su pico en pleno verano. El rodeo pasta sobre forraje verde cuando el resto del campo está seco.",
    detalle: "3.500 kg/ha MS · proteína 12-15%",
  },
  {
    num: "03",
    periodo: "Año siguiente",
    titulo: "Rebrote sin costo",
    texto: "Sin semilla, sin laboreo, sin gasto. El sistema radicular garantiza el rebrote desde septiembre. Año tras año.",
    detalle: "Perenne por décadas · costo cero",
  },
];

// ── Paso individual con dot + contenido animado ──────────────────────────────
function PasoItem({ paso, index }: { paso: typeof PASOS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="relative flex gap-0 items-stretch">
      {/* Dot sobre la línea */}
      <div className="relative flex flex-col items-center" style={{ width: "52px", flexShrink: 0 }}>
        <motion.div
          className="relative z-10 flex items-center justify-center"
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "var(--color-dark)",
            border: "2px solid var(--color-dorado)",
            marginTop: "4px",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "var(--color-dorado)",
            }}
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.3, delay: index * 0.15 + 0.2 }}
          />
        </motion.div>
      </div>

      {/* Contenido del paso */}
      <motion.div
        className="flex-1 pb-14"
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.65, delay: index * 0.15 + 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Número + Periodo */}
        <div className="flex items-baseline gap-4 mb-4">
          <span
            className="font-sans font-semibold"
            style={{
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              lineHeight: 1,
              color: "rgba(179,168,106,0.18)",
              letterSpacing: "-0.04em",
            }}
          >
            {paso.num}
          </span>
          <span
            className="font-sans uppercase"
            style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--color-dorado)" }}
          >
            {paso.periodo}
          </span>
        </div>

        <TextReveal
          as="h3"
          className="font-sans font-semibold mb-3"
          style={{
            fontSize: "clamp(1.3rem, 2.2vw, 1.7rem)",
            color: "var(--color-text-on-dark)",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          {paso.titulo}
        </TextReveal>

        <p
          className="font-sans mb-5"
          style={{
            fontSize: "0.9375rem",
            lineHeight: 1.75,
            color: "var(--color-text-on-dark-secondary)",
            maxWidth: "52ch",
          }}
        >
          {paso.texto}
        </p>

        <span className="pill-badge pill-badge-gold">{paso.detalle}</span>
      </motion.div>
    </div>
  );
}

// ── Componente principal ─────────────────────────────────────────────────────
export default function Ciclo() {
  const cicloRef = useRef<HTMLDivElement>(null);
  const [videoPercentage, setVideoPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = cicloRef.current;
      if (!el) return;
      const scrolled = Math.max(0, -el.getBoundingClientRect().top);
      const maxScroll = el.offsetHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      setVideoPercentage(Math.min(1, scrolled / maxScroll));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Inyectar CSS con !important para neutralizar el transform inline de ScrollyVideo.
  // La librería setea top:50%;left:50%;transform:translate(-50%,-50%) como inline
  // style en cada frame. Un stylesheet !important gana sobre inline styles sin
  // !important — solución permanente sin mutar el DOM en cada frame.
  useEffect(() => {
    const style = document.createElement("style");
    style.id = "scrolly-fix";
    style.textContent = `
      [data-scrolly-container] video,
      [data-scrolly-container] canvas {
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        width: 100% !important;
        height: 100% !important;
        min-width: 0 !important;
        min-height: 0 !important;
        transform: none !important;
        object-fit: cover !important;
        object-position: center center !important;
      }
    `;
    if (!document.getElementById("scrolly-fix")) {
      document.head.appendChild(style);
    }
    return () => document.getElementById("scrolly-fix")?.remove();
  }, []);

  // ── Timeline refs ───────────────────────────────────────────────────────────
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 30%"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Progreso como número para pasarle al campo 3D
  const [timelineProgress, setTimelineProgress] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", setTimelineProgress);

  return (
    <>
      {/* ── SECCIÓN 1: ScrollyVideo con scroll manual ── */}
      <div
        id="ciclo"
        ref={cicloRef}
        data-navdark="true"
        style={{ position: "relative", height: "280vh" }}
      >
        <div style={{ position: "sticky", top: 0, height: "100dvh", overflow: "hidden", backgroundColor: "#030804" }}>

          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <ScrollyVideo
              src="/ciclo-bg.mp4"
              sticky={false}
              full={false}
              cover={true}
              trackScroll={false}
              videoPercentage={videoPercentage}
              transitionSpeed={8}
              useWebCodecs={false}
            />
          </div>

          <div className="absolute inset-0 z-[1]" style={{ background: "rgba(2,10,3,0.48)" }} />
          <div className="absolute inset-0 z-[2]" style={{ background: `linear-gradient(180deg, rgba(2,10,3,0.72) 0%, rgba(2,10,3,0.05) 28%, rgba(2,10,3,0.05) 62%, rgba(0,95,2,0.88) 100%)` }} />

          <div className="absolute inset-0 z-[5] flex flex-col justify-end">
            <div className="max-w-[1250px] mx-auto w-full px-5 md:px-10 pb-14 md:pb-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
                <div>
                  <p className="tag-label mb-4" style={{ color: "var(--color-dorado)" }}>El ciclo</p>
                  <TextReveal
                    as="h2"
                    className="font-sans"
                    style={{ fontSize: "clamp(2.2rem, 5vw, 4.2rem)", color: "#F0E8C4", letterSpacing: "-0.03em", lineHeight: 1.0 }}
                  >
                    De la siembra al rebrote,<br />
                    <em className="not-italic" style={{ color: "var(--color-dorado)" }}>sin volver a empezar.</em>
                  </TextReveal>
                </div>
                <p className="font-sans" style={{ fontSize: "clamp(0.9375rem, 1.3vw, 1.0625rem)", lineHeight: 1.8, color: "rgba(240,232,196,0.62)", maxWidth: "42ch" }}>
                  Una gramínea perenne que se implanta una vez y persiste por décadas.
                  Tres momentos que definen un sistema forrajero que no depende del precio de la semilla.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECCIÓN 2: Timeline animado ───────────────────────────── */}
      <section
        className="relative pb-10 md:pb-14"
        data-navdark="true"
        style={{ backgroundColor: "#1C0F07", overflow: "visible" }}
      >
        <div className="absolute inset-0 dot-grid-dark opacity-40 pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 max-w-[1250px] mx-auto px-5 md:px-10">
          <div
            style={{ borderTop: "1px solid var(--color-dark-border)", paddingTop: "2.5rem" }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

              {/* Columna izquierda: timeline animado */}
              <div ref={timelineRef} className="relative">
                {/* Línea vertical gold — se dibuja con el scroll */}
                <div
                  className="absolute top-0 bottom-0"
                  style={{ left: "25px", width: "2px", background: "rgba(179,168,106,0.12)" }}
                  aria-hidden="true"
                >
                  <motion.div
                    className="absolute top-0 left-0 w-full"
                    style={{
                      height: "100%",
                      background: "var(--color-dorado)",
                      scaleY: lineScaleY,
                      transformOrigin: "top",
                      opacity: 0.7,
                    }}
                  />
                </div>

                {/* Pasos */}
                {PASOS.map((paso, i) => (
                  <PasoItem key={i} paso={paso} index={i} />
                ))}
              </div>

              {/* Columna derecha: campo 3D — sticky, desborda por top/bottom/right */}
              <div
                className="hidden lg:block"
                style={{ position: "relative", overflow: "visible" }}
              >
                <div
                  style={{
                    position: "sticky",
                    top: 0,
                    // Desborda la sección: sube, baja y sale por la derecha
                    marginTop: "-6rem",
                    marginRight: "-14vw",
                    height: "100dvh",
                    overflow: "visible",
                  }}
                >
                  <div style={{ position: "relative", width: "100%", height: "100%" }}>
                    <CampoWireframe progress={timelineProgress} />
                    {/* Leyenda */}
                    <div
                      className="absolute flex items-center gap-5 font-sans"
                      style={{
                        bottom: "6%",
                        left: "8%",
                        fontSize: "0.58rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "rgba(179,168,106,0.4)",
                        pointerEvents: "none",
                      }}
                    >
                      <span>En pie</span>
                      <span style={{ width: "28px", height: "1px", background: "rgba(179,168,106,0.28)", display: "inline-block", verticalAlign: "middle" }} />
                      <span>Cosechado</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
