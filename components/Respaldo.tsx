"use client";

import { motion } from "framer-motion";

const REFS = [
  { nombre: "INTA Guatraché", badge: "Estación Experimental", detalle: "Validación técnica del cultivo en la región" },
  { nombre: "FAO 2023", badge: "Informe Regional", detalle: "Forrajes perennes en zonas semiáridas · Sudamérica" },
  { nombre: "La Nación Campo", badge: "Medios", detalle: "Nota sobre productores innovadores del sudoeste bonaerense" },
];

export default function Respaldo() {
  return (
    <section
      id="respaldo"
      className="py-24 md:py-36"
      style={{ backgroundColor: "var(--color-base)" }}
    >
      <div className="max-w-[1250px] mx-auto px-5 md:px-10">

        <motion.div
          className="mb-7"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0}}
            viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
        >
          <p className="tag-label mb-3">Respaldo técnico</p>
          <h2
            className="font-sans"
            style={{
              fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)",
              color: "var(--color-text-primary)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            No lo dice Sandro solo.
          </h2>
        </motion.div>

        {/* Logos strip — Exergy3 customers section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0}}
            viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          {REFS.map((r, i) => (
            <motion.div
              key={i}
              className="flex flex-col py-5 gap-3"
              style={{
                borderTop: `2px solid var(--color-dorado)`,
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0}}
            viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
            >
              {/* Pill badge (Hyper Farms institution tag) */}
              <span className="pill-badge pill-badge-gold self-start">{r.badge}</span>
              <div>
                <p
                  className="font-sans font-semibold mb-1.5"
                  style={{ fontSize: "1.2rem", color: "var(--color-text-primary)", letterSpacing: "-0.02em" }}
                >
                  {r.nombre}
                </p>
                <p
                  className="font-sans"
                  style={{ fontSize: "0.875rem", lineHeight: 1.65, color: "var(--color-text-secondary)" }}
                >
                  {r.detalle}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonio */}
        <motion.div
          className="flex flex-col py-6 md:py-8"
          style={{
            borderTop: "1px solid var(--color-border)",
          }}
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0}}
            viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, delay: 0.35 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <span
                className="font-sans block mb-3"
                style={{ fontSize: "3rem", lineHeight: 0.8, color: "var(--color-dorado)" }}
              >
                &ldquo;
              </span>
              <p
                className="font-sans mb-4"
                style={{
                  fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
                  lineHeight: 1.55,
                  color: "var(--color-text-primary)",
                  fontStyle: "italic",
                }}
              >
                Implantamos el primer lote con semilla de Sandro en 2019. Hoy tenemos 40 hectáreas establecidas que no volvimos a resembrar. El asesoramiento técnico fue clave.
              </p>
              <div>
                <p className="font-sans font-medium" style={{ fontSize: "0.875rem", color: "var(--color-text-primary)" }}>
                  Productor vecino
                </p>
                <p className="font-sans uppercase mt-1" style={{ fontSize: "0.6rem", letterSpacing: "0.18em", color: "var(--color-dorado)" }}>
                  General Acha, La Pampa
                </p>
              </div>
            </div>
            {/* Decorative stat */}
            <div
              className="flex flex-col items-center justify-center shrink-0"
              style={{
                borderLeft: "1px solid var(--color-border)",
                paddingLeft: "2rem",
                minWidth: "140px",
              }}
            >
              <span
                className="font-sans font-semibold"
                style={{ fontSize: "3.5rem", lineHeight: 1, color: "var(--color-text-primary)", letterSpacing: "-0.04em" }}
              >
                40
              </span>
              <span className="font-sans uppercase mt-1" style={{ fontSize: "0.6rem", letterSpacing: "0.15em", color: "var(--color-dorado)" }}>
                hectáreas
              </span>
              <span className="font-sans mt-1 text-center" style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", lineHeight: 1.4 }}>
                sin resembrar desde 2019
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
