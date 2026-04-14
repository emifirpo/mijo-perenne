"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useMotionValueEvent } from "framer-motion";
import Image from "next/image";

/* ── Datos del timeline ─────────────────────────────────────── */
const MILESTONES = [
  {
    year: "2007",
    title: "La apuesta inicial",
    desc: "Implantó su primer lote de mijo perenne. No como experiencia piloto — como apuesta productiva real en campo propio.",
    img: "/problema-01.jpg",
    pos: "center top",
  },
  {
    year: "2011",
    title: "Primera cosecha propia",
    desc: "La semilla cosechada en diciembre. Desde ese año, sin comprar semilla externa. El ciclo cerró.",
    img: "/problema-02.jpg",
    pos: "center",
    video: "/cosecha-2011.mp4",
  },
  {
    year: "2015",
    title: "100 hectáreas",
    desc: "El cultivo probado en sequías, heladas y baches estivales. La escala llegó sola, sin forzarla.",
    img: "/tractor.png",
    pos: "center",
    video: "/campo-01.mp4",
  },
  {
    year: "2019",
    title: "Referente del sudoeste",
    desc: "Productores vecinos empezaron a llamar. El asesoramiento nació de la demanda, no de un plan.",
    img: "/comunidad.png",
    pos: "center 20%",
  },
  {
    year: "2023",
    title: "INTA · FAO",
    desc: "El Panicum coloratum reconocido por INTA Guatraché y FAO como alternativa forrajera clave en la región pampeana.",
    img: "/inta-jornada-2023.jpg",
    pos: "center top",
    videos: ["/inta-jornada-v1.mp4", "/inta-jornada-v2.mp4"],
  },
  {
    year: "Hoy",
    title: "El ciclo completo",
    desc: "200 hectáreas en producción permanente. Produce, cosecha y vende semilla propia desde el campo donde todo empezó.",
    img: "/problema-01.jpg",
    pos: "center top",
    video: "/hereford-hoy.mp4",
  },
];

const PILL_H  = 30;
const CARD_PT = 20;
const LINE_TOP = CARD_PT + PILL_H / 2;

/* Reproduce una lista de videos en secuencia (sin loop, avanza al siguiente) */
function SequentialVideo({ videos }: { videos: string[] }) {
  const [idx, setIdx] = useState(0);
  return (
    <video
      key={idx}
      src={videos[idx]}
      autoPlay
      muted
      playsInline
      onEnded={() => setIdx((prev) => (prev + 1) % videos.length)}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  );
}

export default function Sandro() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);

  /* ── Layout state (responsive) ── */
  const [isMobile, setIsMobile]           = useState(false);
  const [cardW, setCardW]                 = useState(360);
  const [gap, setGap]                     = useState(48);
  const [padX, setPadX]                   = useState(80);
  const [trackPadLeft, setTrackPadLeft]   = useState(80);
  const [scrollAmt, setScrollAmt]         = useState(1200);
  const [isDark, setIsDark]               = useState(false);
  const [darkThreshold, setDarkThreshold] = useState(0.92);

  useEffect(() => {
    const calc = () => {
      const vw     = window.innerWidth;
      const mobile = vw < 768;
      setIsMobile(mobile);

      // Constantes responsivas
      const px  = mobile ? 20 : 80;
      const cw  = mobile ? Math.round(vw * 0.78) : 360;   // 78% del viewport en mobile — peekabooa siguiente card
      const g   = mobile ? 16 : 48;
      setPadX(px);
      setCardW(cw);
      setGap(g);

      // trackPadLeft: alineado con el título en desktop, fijo en mobile
      const aligned = mobile
        ? px
        : Math.max(px, (vw - 1250) / 2 + px);
      setTrackPadLeft(aligned);

      // scrollAmt con cálculo puro (sin leer DOM — setState es async)
      const n         = MILESTONES.length;
      const lastRight = aligned + n * cw + (n - 1) * g;   // borde derecho del último card
      const margin    = 40;
      const amt       = Math.max(0, lastRight - vw + margin);
      setScrollAmt(amt);

      // Umbral: "Hoy" completamente visible → threshold = (amt - margin) / amt
      const threshold = amt > 0 ? (amt - margin) / amt : 0.95;
      setDarkThreshold(Math.min(0.99, Math.max(0.8, threshold)));
    };

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  /* ── Scroll ── */
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollAmt]);

  // wrapperBg: interpolado manualmente para leer darkThreshold actualizado
  // #F5EDD8 = rgb(245,237,216) · #071209 = rgb(7,18,9)
  const wrapperBg = useMotionValue("#F5EDD8");

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const start = Math.max(0.7, darkThreshold - 0.05);
    setIsDark(v >= darkThreshold);

    if (v <= start) {
      wrapperBg.set("#F5EDD8");
    } else if (v >= 1.0) {
      wrapperBg.set("#071209");
    } else {
      const t = (v - start) / (1.0 - start);
      const r = Math.round(245 + (7   - 245) * t);
      const g2 = Math.round(237 + (18  - 237) * t);
      const b = Math.round(216 + (9   - 216) * t);
      wrapperBg.set(`rgb(${r},${g2},${b})`);
    }
  });

  /* ── Colores dinámicos ── */
  const colorTitle    = isDark ? "#F0E8C4"              : "var(--color-text-primary)";
  const colorSecond   = isDark ? "rgba(240,232,196,0.6)": "var(--color-text-secondary)";
  const colorBody     = isDark ? "rgba(240,232,196,0.55)": "var(--color-text-secondary)";
  const colorLine     = isDark ? "rgba(255,255,255,0.1)" : "var(--color-border)";
  const transition    = "color 1.0s cubic-bezier(0.16,1,0.3,1)";

  const lineWidth = MILESTONES.length * cardW + (MILESTONES.length - 1) * gap;

  return (
    <motion.div
      id="sandro"
      ref={wrapperRef}
      style={{ position: "relative", height: `calc(100dvh + ${scrollAmt}px)`, backgroundColor: wrapperBg }}
    >
      {/* Sticky viewport — transparente para dejar pasar el backgroundColor del wrapper */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100dvh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* ── Header ── */}
        <div
          style={{
            maxWidth: "1250px",
            margin: "0 auto",
            width: "100%",
            padding: isMobile
              ? `clamp(64px, 12vh, 96px) ${padX}px clamp(16px, 2.5vh, 28px)`
              : `clamp(72px, 9vh, 108px) ${padX}px clamp(20px, 3vh, 36px)`,
            flexShrink: 0,
            // Mobile: columna. Desktop: fila con espacio entre título y descripción.
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "flex-end",
            justifyContent: "space-between",
            gap: isMobile ? "10px" : "0",
          }}
        >
          <div>
            <p className="tag-label" style={{ marginBottom: "12px" }}>Quién es Sandro</p>
            <h2
              className="font-sans"
              style={{
                fontSize: isMobile
                  ? "clamp(1.6rem, 7vw, 2rem)"
                  : "clamp(1.8rem, 3.2vw, 2.8rem)",
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.035em",
                color: colorTitle,
                margin: 0,
                transition,
              }}
            >
              Sandro Grand
            </h2>
          </div>

          {/* Descripción: en mobile va debajo del título (columna), en desktop a la derecha */}
          <p
            className="font-sans"
            style={{
              fontSize: isMobile ? "0.8125rem" : "clamp(0.875rem, 1.05vw, 0.9375rem)",
              lineHeight: 1.75,
              color: colorSecond,
              maxWidth: isMobile ? "100%" : "38ch",
              paddingBottom: isMobile ? "0" : "4px",
              transition: `color 1.0s cubic-bezier(0.16,1,0.3,1)`,
            }}
          >
            Productor ganadero de cuarta generación en Jacinto Arauz. 17 años implantando, cosechando y viviendo del mijo perenne en campo propio.
          </p>
        </div>

        {/* ── Timeline track ── */}
        <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
          <motion.div
            ref={trackRef}
            style={{
              x,
              display: "flex",
              alignItems: "flex-start",
              height: "100%",
              paddingLeft: `${trackPadLeft}px`,
              paddingRight: `${padX}px`,
              willChange: "transform",
              position: "relative",
            }}
          >
            {/* Línea horizontal — ancho explícito para cubrir todo el contenido */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: `${trackPadLeft}px`,
                width: `${lineWidth}px`,
                top: `${LINE_TOP}px`,
                height: "1px",
                background: colorLine,
                transition: "background 1.0s cubic-bezier(0.16,1,0.3,1)",
                pointerEvents: "none",
              }}
            />

            {/* Cards */}
            {MILESTONES.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  width: `${cardW}px`,
                  flexShrink: 0,
                  marginRight: i < MILESTONES.length - 1 ? `${gap}px` : 0,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  paddingTop: `${CARD_PT}px`,
                  paddingBottom: isMobile ? "16px" : "clamp(20px, 3vh, 36px)",
                }}
              >
                {/* Year pill */}
                <div style={{ position: "relative", zIndex: 1, marginBottom: isMobile ? "12px" : "clamp(16px, 2.2vh, 24px)", flexShrink: 0 }}>
                  <span
                    className="font-sans font-semibold"
                    style={{
                      display: "inline-block",
                      background: m.year === "Hoy" ? "var(--color-dorado)" : "var(--color-dark)",
                      color: m.year === "Hoy" ? "var(--color-dark)" : "var(--color-text-on-dark)",
                      borderRadius: "9999px",
                      padding: "5px 14px",
                      fontSize: "0.7rem",
                      letterSpacing: "0.04em",
                      lineHeight: `${PILL_H - 10}px`,
                    }}
                  >
                    {m.year}
                  </span>
                </div>

                {/* Título */}
                <p
                  className="font-sans"
                  style={{
                    fontSize: isMobile ? "0.9375rem" : "clamp(0.9375rem, 1.15vw, 1.05rem)",
                    fontWeight: 700,
                    lineHeight: 1.28,
                    color: colorTitle,
                    letterSpacing: "-0.022em",
                    marginBottom: "6px",
                    flexShrink: 0,
                    transition,
                  }}
                >
                  {m.title}
                </p>

                {/* Descripción */}
                <p
                  className="font-sans"
                  style={{
                    fontSize: isMobile ? "0.8125rem" : "clamp(0.8125rem, 0.92vw, 0.875rem)",
                    lineHeight: 1.6,
                    color: colorBody,
                    marginBottom: isMobile ? "12px" : "clamp(14px, 2vh, 22px)",
                    flexShrink: 0,
                    transition: `color 1.0s cubic-bezier(0.16,1,0.3,1)`,
                  }}
                >
                  {m.desc}
                </p>

                {/* Imagen / Video */}
                <div
                  style={{
                    flex: 1,
                    position: "relative",
                    borderRadius: "10px",
                    overflow: "hidden",
                    minHeight: "80px",
                    background: "var(--color-surface-3)",
                  }}
                >
                  {"videos" in m && m.videos ? (
                    <SequentialVideo videos={m.videos} />
                  ) : m.video ? (
                    <video
                      src={m.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <Image
                      src={m.img}
                      alt={m.title}
                      fill
                      sizes="(max-width: 767px) 90vw, (max-width: 1024px) 50vw, 600px"
                      className="object-cover"
                      style={{ objectPosition: m.pos }}
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
}
