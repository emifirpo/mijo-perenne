"use client";

import { motion } from "framer-motion";
import MijoPlantSVG from "./MijoPlantSVG";
import TecnicoSVG from "./TecnicoSVG";
import CampoButton from "./CampoButton";

/* ── Tipado de la paleta por card ─────────────────────────────── */
interface CardTheme {
  label: string;
  subtitulo: string;
  descripcion: string;
  cta: string;
  href: string;
  bg: string;
  labelColor: string;
  iconStroke: string;
  titleColor: string;
  bodyColor: string;
  dividerColor: string;
  svgColor: string;
  svgOpacity: number;
  hoverBorder: string;
  hoverShadow: string;
  buttonVariant: "primary" | "dark" | "subtle";
}

const CARDS: CardTheme[] = [
  {
    label: "Semilla propia",
    subtitulo: "Alta germinación, cosechada en campo propio, disponible diciembre.",
    descripcion: "Panicum coloratum seleccionado durante 17 años en el sudoeste bonaerense. Una sola compra para una pastura que persiste décadas.",
    cta: "Consultar disponibilidad",
    href: "#contacto",
    /* Verde pampa oscuro — identidad principal */
    bg: "#1A3D20",
    labelColor: "rgba(240,232,196,0.55)",
    iconStroke: "var(--color-dorado)",
    titleColor: "#D4C87A",
    bodyColor: "rgba(240,232,196,0.70)",
    dividerColor: "rgba(179,168,106,0.22)",
    svgColor: "#2D6035",
    svgOpacity: 0.9,
    hoverBorder: "rgba(179,168,106,0.32)",
    hoverShadow: "0 32px 64px rgba(0,0,0,0.45), 0 0 0 1px rgba(179,168,106,0.22)",
    buttonVariant: "subtle",
  },
  {
    label: "Asesoría",
    subtitulo: "Protocolos probados en campo real, no en laboratorio.",
    descripcion: "17 años implantando en el límite entre Buenos Aires y La Pampa. Evaluación de zona, protocolo a medida y seguimiento del establecimiento.",
    cta: "Hablar con Sandro",
    href: "https://wa.me/5492916481785",
    /* Dorado invertido — categoría diferente, lectura inmediata */
    bg: "#B3A86A",
    labelColor: "rgba(26,61,32,0.55)",
    iconStroke: "rgba(26,61,32,0.65)",
    titleColor: "#1A3D20",
    bodyColor: "rgba(26,61,32,0.72)",
    dividerColor: "rgba(26,61,32,0.18)",
    svgColor: "#1A3D20",
    svgOpacity: 0.14,
    hoverBorder: "rgba(26,61,32,0.30)",
    hoverShadow: "0 32px 64px rgba(0,0,0,0.30), 0 0 0 1px rgba(26,61,32,0.22)",
    buttonVariant: "dark",
  },
];

/* ── Variantes Framer Motion ──────────────────────────────────── */
const cardVariants = {
  rest: { scale: 1, boxShadow: "0 0px 0px rgba(0,0,0,0)" },
  hover: { scale: 1.014 },
};

const borderGlowVariants = {
  rest: { opacity: 0 },
  hover: { opacity: 1 },
};

const svgWatermarkVariants = {
  rest: (op: number) => ({ opacity: op }),
  hover: (op: number) => ({ opacity: Math.min(op + 0.18, 1) }),
};

export default function Oferta() {
  return (
    <section id="oferta" data-navdark="true" style={{ backgroundColor: "#071209" }}>
      <div className="max-w-[1250px] mx-auto px-5 md:px-10 pt-24 md:pt-36 pb-24 md:pb-36">

        {/* Encabezado */}
        <motion.div
          className="mb-10 md:mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="tag-label mb-5" style={{ color: "var(--color-dorado)" }}>Lo que ofrezco</p>
          <h2
            className="font-sans"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              color: "#F0E8C4",
              letterSpacing: "-0.03em",
              lineHeight: 1.0,
              maxWidth: "18ch",
            }}
          >
            La semilla que produce,{" "}
            <span style={{ color: "var(--color-dorado)" }}>cosecha y vende el mismo campo.</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {CARDS.map((card, i) => (
            <motion.div
              key={i}
              className="relative flex flex-col overflow-hidden"
              style={{
                background: card.bg,
                borderRadius: "16px",
                padding: "clamp(28px, 4vw, 48px)",
                minHeight: "clamp(380px, 40vw, 520px)",
                cursor: "default",
              }}
              variants={cardVariants}
              initial="rest"
              whileHover="hover"
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              // Animación de entrada escalonada
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
            >
              {/* Entrada independiente */}
              <motion.div
                style={{ position: "absolute", inset: 0, borderRadius: "16px" }}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Borde de hover — color específico por card */}
              <motion.div
                aria-hidden="true"
                variants={borderGlowVariants}
                transition={{ duration: 0.28 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "16px",
                  border: `1px solid ${card.hoverBorder}`,
                  pointerEvents: "none",
                  zIndex: 20,
                }}
              />

              {/* Watermark SVG */}
              <motion.div
                aria-hidden="true"
                custom={card.svgOpacity}
                variants={svgWatermarkVariants}
                transition={{ duration: 0.32 }}
                style={{
                  position: "absolute",
                  right: i === 0 ? "-3%" : "-4%",
                  bottom: i === 0 ? "-3%" : "-6%",
                  width: i === 0 ? "50%" : "64%",
                  pointerEvents: "none",
                  color: card.svgColor,
                }}
              >
                {i === 0
                  ? <MijoPlantSVG style={{ width: "100%", height: "auto", display: "block" }} />
                  : <TecnicoSVG   style={{ width: "100%", height: "auto", display: "block" }} />
                }
              </motion.div>

              {/* ── Contenido ── */}
              <div className="relative z-10 flex items-start justify-between">
                <span
                  className="font-sans font-medium uppercase"
                  style={{ fontSize: "0.6rem", letterSpacing: "0.22em", color: card.labelColor }}
                >
                  {card.label}
                </span>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M9 2v14M2 9h14" stroke={card.iconStroke} strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>

              <div className="relative z-10 mt-auto pt-16">
                <p
                  className="font-sans font-semibold mb-4"
                  style={{
                    fontSize: "clamp(1.25rem, 2.2vw, 1.65rem)",
                    color: card.titleColor,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.25,
                    maxWidth: "26ch",
                  }}
                >
                  {card.subtitulo}
                </p>
                <p
                  className="font-sans mb-8"
                  style={{
                    fontSize: "clamp(0.875rem, 1.2vw, 0.9375rem)",
                    lineHeight: 1.75,
                    color: card.bodyColor,
                    maxWidth: "44ch",
                  }}
                >
                  {card.descripcion}
                </p>

                <div style={{ height: "1px", background: card.dividerColor, marginBottom: "24px" }} />

                <CampoButton
                  href={card.href}
                  label={card.cta}
                  variant={card.buttonVariant}
                  external={card.href.startsWith("http")}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="font-sans mt-8"
          style={{ fontSize: "0.72rem", color: "rgba(240,232,196,0.35)", letterSpacing: "0.08em" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Jacinto Arauz, La Pampa · −38.12° S · −63.56° O · Est. 2007
        </motion.p>

      </div>
    </section>
  );
}
