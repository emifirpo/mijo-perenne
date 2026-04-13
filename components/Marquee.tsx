"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const FRASE = "El forraje que se siembra una vez y vuelve solo.";
const SEP   = "·";
const REPS  = 4;

export default function Marquee() {
  const ref = useRef<HTMLElement>(null);

  // Progreso del scroll mientras la sección pasa por el viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Texto se mueve hacia la izquierda al scrollear — movimiento natural atado al gesto
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-18%"]);

  return (
    <section
      ref={ref}
      aria-hidden="true"
      className="relative overflow-hidden flex items-center"
      style={{
        paddingTop: "clamp(1rem, 2vh, 1.75rem)",
        paddingBottom: "clamp(2.5rem, 5vh, 4.5rem)",
        cursor: "default",
      }}
    >
      <motion.div
        style={{ x, whiteSpace: "nowrap", willChange: "transform" }}
        className="flex items-center"
      >
        {Array.from({ length: REPS }).map((_, i) => (
          <span key={i} className="inline-flex items-center">
            <span
              className="font-sans"
              style={{
                fontSize: "clamp(5rem, 13vw, 13rem)",
                fontWeight: 800,
                fontStyle: "normal",
                color: "var(--color-dark)",
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
            >
              {FRASE}
            </span>
            <span
              style={{
                display: "inline-block",
                margin: "0 clamp(2.5rem, 5vw, 5rem)",
                fontSize: "clamp(4rem, 10vw, 10rem)",
                color: "rgba(0,95,2,0.18)",
                fontWeight: 800,
                lineHeight: 1,
              }}
            >
              {SEP}
            </span>
          </span>
        ))}
      </motion.div>
    </section>
  );
}
