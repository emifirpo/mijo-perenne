"use client";

import { motion } from "framer-motion";

export default function Solucion() {
  return (
    <section
      id="cultivo"
      className="py-10 md:py-14"
      style={{ backgroundColor: "var(--color-base)" }}
    >
      <div className="max-w-[1250px] mx-auto px-5 md:px-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

          {/* Texto — card blanca */}
          <motion.div
            className="flex flex-col justify-center py-6 md:py-8 pr-4 md:pr-8"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0}}
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
              <span style={{ color: "var(--color-dorado)" }}>Un costo que no se repite.</span>
            </h2>

            <p
              className="font-sans mb-3"
              style={{
                fontSize: "clamp(0.9375rem, 1.3vw, 1.0625rem)",
                lineHeight: 1.8,
                color: "var(--color-text-secondary)",
              }}
            >
              El Panicum coloratum es una gramínea perenne que se implanta una vez y persiste por décadas. Su sistema radicular profundo le permite rebrotar cada primavera sin laboreo, sin semilla, sin costo adicional.
            </p>
            <p
              className="font-sans mb-5"
              style={{
                fontSize: "clamp(0.9375rem, 1.3vw, 1.0625rem)",
                lineHeight: 1.8,
                color: "var(--color-text-secondary)",
              }}
            >
              Alimento verde para el rodeo en verano — el período más exigente. Cuando las pasturas naturales frenan, el mijo perenne está en plena producción.
            </p>

            {/* Tags — Hyper Farms pill badges */}
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

            <a
              href="#contacto"
              className="inline-flex items-center gap-2 font-sans font-medium self-start"
              style={{
                background: "var(--color-dark)",
                borderRadius: "9999px",
                padding: "12px 22px 12px 12px",
                fontSize: "0.9375rem",
                color: "#F0EBE1",
                minHeight: "52px",
                transition: "opacity 0.25s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              <span
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "var(--color-dorado)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 6h8M6 2l4 4-4 4" stroke="#182A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              Consultar semilla
            </a>
          </motion.div>

          {/* Visual panel — campo (Hyper Farms img-frame treatment) */}
          <motion.div
            className="relative overflow-hidden img-frame-dark"
            style={{
              borderRadius: "var(--radius-card)",
              minHeight: "260px",
              background: "var(--color-dark)",
            }}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0}}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Dot grid — Hyper Farms texture */}
            <div className="absolute inset-0 dot-grid-dark opacity-60 z-0 pointer-events-none" aria-hidden="true" />
            {/* Gradiente campo */}
            <div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(ellipse 80% 70% at 50% 80%,
                    rgba(61,107,67,0.5) 0%, transparent 70%),
                  linear-gradient(180deg, var(--color-dark) 0%, var(--color-dark-2) 100%)
                `,
              }}
            />
            {/* SVG pasturas */}
            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 380" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
              {[...Array(16)].map((_, i) => (
                <path
                  key={i}
                  d={`M${24 + i * 24} 380 Q${20 + i * 24} ${240 + (i % 3) * 18} ${22 + i * 24} ${120 + (i % 4) * 30}`}
                  stroke="rgba(196,154,42,0.7)"
                  strokeWidth="0.7"
                  fill="none"
                />
              ))}
              <path d="M0 240 Q200 220 400 235" stroke="rgba(196,154,42,0.12)" strokeWidth="1" fill="none" />
            </svg>
            <div className="absolute inset-0 flex items-end p-6">
              <p className="font-sans uppercase" style={{ fontSize: "0.5rem", letterSpacing: "0.25em", color: "rgba(240,235,225,0.18)" }}>
                Campo en producción · Jacinto Arauz, La Pampa
              </p>
            </div>

            {/* Card flotante — 200 has */}
            <motion.div
              className="absolute bottom-8 left-6 p-5"
              style={{ background: "var(--color-dorado)", borderRadius: "var(--radius-card)", minWidth: "180px" }}
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1}}
            viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-sans font-semibold" style={{ fontSize: "2.4rem", lineHeight: 1, color: "var(--color-dark)", letterSpacing: "-0.04em" }}>200</p>
              <p className="font-sans font-medium uppercase mt-0.5" style={{ fontSize: "0.55rem", letterSpacing: "0.2em", color: "rgba(24,42,26,0.55)" }}>hectáreas</p>
              <p className="font-sans mt-2" style={{ fontSize: "0.8125rem", lineHeight: 1.4, color: "rgba(24,42,26,0.6)" }}>en producción permanente desde 2007</p>
            </motion.div>

            {/* Floating pill badges — Hyper Farms treatment */}
            <motion.div
              className="absolute top-5 right-5 flex flex-col gap-2 items-end"
              initial={{ opacity: 0, y: -8 }}
              whileInView={{ opacity: 1, y: 0}}
            viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <span className="pill-badge pill-badge-gold">Avalado por INTA</span>
              <span className="pill-badge pill-badge-dark">FAO 2023</span>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
