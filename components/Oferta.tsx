"use client";

import { motion } from "framer-motion";

const CARDS = [
  {
    tag: "Semilla propia",
    titulo: "Semilla de Mijo Perenne",
    descripcion: "Panicum coloratum seleccionado y cosechado en campo propio. Disponibilidad estacional — cosecha diciembre.",
    items: ["Alta tasa de germinación garantizada", "Cosecha diciembre · envío a todo el país", "Asesoramiento técnico incluido"],
    cta: "Consultar disponibilidad",
    href: "#contacto",
    nota: "Cosecha diciembre",
    primary: true,
  },
  {
    tag: "Servicio técnico",
    titulo: "Asesoramiento",
    descripcion: "17 años implantando mijo perenne en el sudoeste bonaerense. Protocolos probados en campo real, no en laboratorio.",
    items: ["Evaluación de suelo y zona", "Protocolo de implantación a medida", "Seguimiento de establecimiento"],
    cta: "Hablar con Sandro",
    href: "https://wa.me/5492954000000",
    nota: null,
    primary: false,
  },
];

export default function Oferta() {
  return (
    <section
      id="oferta"
      style={{ backgroundColor: "#071209", position: "relative", overflow: "hidden" }}
    >
      {/* Fondo sutil: dot grid */}
      <div className="absolute inset-0 dot-grid-dark opacity-30 pointer-events-none" aria-hidden="true" />

      {/* Glow central decorativo — centrado verticalmente para no marcar la juntura superior */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "1100px",
          height: "700px",
          background: "radial-gradient(ellipse at 50% 50%, rgba(0,95,2,0.32) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div className="relative z-10 max-w-[1250px] mx-auto px-5 md:px-10 py-24 md:py-36">

        {/* ── Header centrado ── */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
        >
          <p className="tag-label mb-5" style={{ color: "var(--color-dorado)" }}>Lo que ofrezco</p>
          <h2
            className="font-serif mx-auto"
            style={{
              fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
              color: "#F0E8C4",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              fontWeight: 700,
              maxWidth: "18ch",
            }}
          >
            La semilla que produce,{" "}
            <em className="not-italic" style={{ color: "var(--color-dorado)" }}>cosecha y vende el mismo campo.</em>
          </h2>

          {/* Disponibilidad badge */}
          <motion.div
            className="inline-flex items-center gap-2 mt-7"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span
              className="font-sans"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "0.75rem",
                letterSpacing: "0.06em",
                color: "rgba(240,232,196,0.55)",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "var(--color-dorado)",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              Disponibilidad limitada · Cosecha diciembre · Envío a todo el país
            </span>
          </motion.div>
        </motion.div>

        {/* Separador */}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", maxWidth: "700px", margin: "2.5rem auto 3.5rem" }} />

        {/* ── Cards centradas ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))",
            gap: "16px",
            maxWidth: "860px",
            margin: "0 auto",
          }}
        >
          {CARDS.map((card, i) => (
            <motion.div
              key={i}
              className="relative flex flex-col"
              style={{
                padding: card.primary ? "32px" : "32px",
                background: card.primary
                  ? "linear-gradient(145deg, #0D2110 0%, #071209 100%)"
                  : "rgba(255,255,255,0.03)",
                border: card.primary
                  ? "1px solid rgba(179,168,106,0.35)"
                  : "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px",
                boxShadow: card.primary
                  ? "0 0 0 1px rgba(179,168,106,0.08), 0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(179,168,106,0.12)"
                  : "0 8px 32px rgba(0,0,0,0.3)",
              }}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Glow top-edge en card primaria */}
              {card.primary && (
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "20%",
                    right: "20%",
                    height: "1px",
                    background: "linear-gradient(90deg, transparent, rgba(179,168,106,0.7), transparent)",
                    borderRadius: "1px",
                  }}
                />
              )}

              {/* Header de card */}
              <div className="flex items-center justify-between mb-6">
                <span
                  className="font-sans font-medium uppercase"
                  style={{ fontSize: "0.6rem", letterSpacing: "0.22em", color: "var(--color-dorado)" }}
                >
                  {card.tag}
                </span>
                {card.nota && (
                  <span
                    className="font-sans"
                    style={{
                      fontSize: "0.65rem",
                      color: "rgba(179,168,106,0.7)",
                      background: "rgba(179,168,106,0.08)",
                      border: "1px solid rgba(179,168,106,0.18)",
                      borderRadius: "9999px",
                      padding: "4px 11px",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {card.nota}
                  </span>
                )}
              </div>

              <h3
                className="font-serif font-bold mb-3"
                style={{
                  fontSize: "clamp(1.4rem, 2vw, 1.75rem)",
                  color: "#F0E8C4",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                {card.titulo}
              </h3>

              <p
                className="font-sans mb-6"
                style={{
                  fontSize: "0.9375rem",
                  lineHeight: 1.75,
                  color: "rgba(240,232,196,0.55)",
                }}
              >
                {card.descripcion}
              </p>

              <ul className="flex flex-col gap-3 mb-8">
                {card.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 font-sans"
                    style={{
                      fontSize: "0.875rem",
                      color: "rgba(240,232,196,0.65)",
                      lineHeight: 1.5,
                    }}
                  >
                    <svg
                      width="14" height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      style={{ marginTop: "2px", flexShrink: 0 }}
                      aria-hidden="true"
                    >
                      <circle cx="7" cy="7" r="6" stroke="rgba(179,168,106,0.4)" strokeWidth="1" />
                      <path d="M4.5 7l2 2 3-3" stroke="var(--color-dorado)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-auto">
                <a
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-2 font-sans font-semibold w-full justify-center transition-all duration-200"
                  style={{
                    borderRadius: "10px",
                    padding: "14px 24px 14px 16px",
                    fontSize: "0.9375rem",
                    minHeight: "52px",
                    background: card.primary
                      ? "var(--color-dorado)"
                      : "rgba(255,255,255,0.06)",
                    color: card.primary ? "#071209" : "#F0E8C4",
                    border: card.primary ? "none" : "1px solid rgba(255,255,255,0.12)",
                    letterSpacing: "-0.01em",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.opacity = "0.88";
                    el.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.opacity = "1";
                    el.style.transform = "translateY(0)";
                  }}
                >
                  <span
                    style={{
                      width: "26px",
                      height: "26px",
                      borderRadius: "6px",
                      background: card.primary ? "rgba(7,18,9,0.15)" : "rgba(179,168,106,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2 6h8M6 2l4 4-4 4"
                        stroke={card.primary ? "#071209" : "var(--color-dorado)"}
                        strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {card.cta}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Nota de cierre */}
        <motion.p
          className="font-sans text-center mt-10"
          style={{ fontSize: "0.8125rem", color: "rgba(240,232,196,0.28)", letterSpacing: "0.04em" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Jacinto Arauz, La Pampa · −38.12° S · −63.56° O · Est. 2007
        </motion.p>
      </div>
    </section>
  );
}
