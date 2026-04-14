"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import LogoMark from "./LogoMark";

const STATS = [
  { value: 200, suffix: "", unit: "has", label: "en producción permanente" },
  { value: 17, suffix: "+", unit: "años", label: "implantando en esta región" },
  { value: 3500, suffix: "", unit: "kg/ha", label: "rendimiento promedio" },
  { value: 100, suffix: "%", unit: "", label: "semilla propia cosechada" },
];

function useCounter(target: number, isActive: boolean, duration = 1600) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isActive) return;
    const startTime = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isActive, target, duration]);
  return count;
}

function StatItem({ value, suffix, unit, label, delay }: {
  value: number; suffix: string; unit: string; label: string; delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const count = useCounter(value, isInView, 1600 + delay * 150);

  return (
    <motion.div
      ref={ref}
      className="flex flex-col py-7 px-6 md:px-8 border-b md:border-b-0 md:border-r last:border-0"
      style={{ borderColor: "var(--color-dark-border)" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: delay * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-baseline gap-1.5 mb-2">
        <span
          className="font-sans font-semibold"
          style={{
            fontSize: "clamp(2.8rem, 5vw, 4rem)",
            lineHeight: 1,
            color: "var(--color-text-on-dark)",
            letterSpacing: "-0.04em",
          }}
        >
          {count.toLocaleString("es-AR")}
        </span>
        <span
          className="font-sans"
          style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)", color: "var(--color-dorado)" }}
        >
          {suffix}{unit}
        </span>
      </div>
      <p className="font-sans" style={{ fontSize: "0.8125rem", color: "var(--color-text-on-dark-muted)", lineHeight: 1.5 }}>
        {label}
      </p>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section
      id="numeros"
      className="relative py-24"
      data-navdark="true"
      style={{ backgroundColor: "var(--color-dark)", overflow: "hidden", minHeight: "100dvh", display: "flex", flexDirection: "column", justifyContent: "center" }}
    >
      <div className="absolute inset-0 dot-grid-dark opacity-50 pointer-events-none" aria-hidden="true" />

      {/* Logo D — watermark derecha, fusionado con el verde pampa */}
      <LogoMark
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "-8%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "52vw",
          maxWidth: "520px",
          minWidth: "260px",
          height: "auto",
          color: "#F0E8C4",
          opacity: 0.06,
          pointerEvents: "none",
        }}
      />
      <div className="relative z-10 max-w-[1250px] mx-auto px-5 md:px-10 w-full">

        <motion.div
          className="pt-10 pb-8"
          style={{ borderBottom: "1px solid var(--color-dark-border)" }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65 }}
        >
          <p className="tag-label mb-3">Los números</p>
          <h2
            className="font-sans max-w-2xl"
            style={{
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              color: "var(--color-text-on-dark)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            Más de 17 años comprobando que funciona{" "}
            <em className="not-italic" style={{ color: "var(--color-dorado)" }}>en esta zona.</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4">
          {STATS.map((s, i) => (
            <StatItem key={i} {...s} delay={i} />
          ))}
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-5"
          style={{ borderTop: "1px solid var(--color-dark-border)" }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {[
            { key: "Tolerancia hídrica",   val: "Resistente a sequías" },
            { key: "Temperatura mín.",     val: "−18 °C" },
            { key: "Sistema radicular",    val: "Hasta 3 m" },
            { key: "Cosecha",              val: "Diciembre" },
            { key: "Rebrote",              val: "Septiembre" },
          ].map(({ key, val }, i) => (
            <div
              key={i}
              className="flex flex-col py-5 px-0 md:px-6 border-b md:border-b-0 md:border-r last:border-0 col-span-1"
              style={{
                borderColor: "var(--color-dark-border)",
                paddingLeft: i === 0 ? 0 : undefined,
              }}
            >
              <span
                className="font-sans uppercase mb-1.5"
                style={{
                  fontSize: "0.55rem",
                  letterSpacing: "0.18em",
                  color: "rgba(179,168,106,0.5)",
                }}
              >
                {key}
              </span>
              <span
                className="font-sans"
                style={{
                  fontSize: "clamp(0.9rem, 1.2vw, 1.0625rem)",
                  fontWeight: 500,
                  color: "var(--color-text-on-dark)",
                  letterSpacing: "-0.01em",
                }}
              >
                {val}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
