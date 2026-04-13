"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";

// ─── Data ────────────────────────────────────────────────────────────────────

const CARDS = [
  {
    num: "01",
    subtitulo: "Jul · Ago · Sep",
    titulo: "El bache estival",
    texto:
      "Las pasturas naturales detienen su crecimiento y el rodeo presiona sobre un forraje que no alcanza. El ganadero compra lo que el campo no da.",
    // Warm white — contrasts against the cream page bg
    bg: "#FFFFFF",
  },
  {
    num: "02",
    subtitulo: "Cada campaña",
    titulo: "El costo de resiembra",
    texto:
      "Semilla, laboreo, implantación, espera. Cada año, el mismo ciclo. Una gramínea anual le saca rentabilidad antes de que el ternero llegue a la balanza.",
    // Tinted cream — second tier
    bg: "#F8F3E4",
  },
  {
    num: "03",
    subtitulo: "Siempre presente",
    titulo: "La contingencia climática",
    texto:
      "Sequía, helada, verano corto. Las pasturas sin raíz establecida no resisten. El mijo perenne ya tiene tres metros de raíz cuando el bache empieza.",
    // Warm earth — third tier
    bg: "#F0E8CC",
  },
] as const;

// ─── Scroll thresholds ───────────────────────────────────────────────────────

// Section scrolls 220vh total
// Card 0 appears almost immediately, 1 and 2 at thirds of the scroll
const THRESHOLDS = [0.03, 0.38, 0.70] as const;

// ─── Component ───────────────────────────────────────────────────────────────

export default function Problema() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // How many cards are currently revealed (0–3)
  const [visibleCount, setVisibleCount] = useState(0);
  // Which card's body text is expanded (-1 = none)
  const [activeCard, setActiveCard] = useState(-1);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    let vc = 0;
    let ac = -1;
    if (v >= THRESHOLDS[0]) { vc = 1; ac = 0; }
    if (v >= THRESHOLDS[1]) { vc = 2; ac = 1; }
    if (v >= THRESHOLDS[2]) { vc = 3; ac = 2; }
    setVisibleCount(vc);
    setActiveCard(ac);
  });

  return (
    <section
      ref={sectionRef}
      id="problema"
      style={{ height: "220vh", position: "relative" }}
    >
      {/* ── Sticky viewport ─────────────────────────────────────────────── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100dvh",
          overflow: "hidden",
          background: "var(--color-base)",
        }}
      >
        {/* ── Section title ─────────────────────────────────────────────── */}
        <div
          style={{
            maxWidth: "1250px",
            margin: "0 auto",
            padding:
              "clamp(2.5rem,5.5vh,4.5rem) clamp(1.5rem,4.5vw,3rem) 0",
          }}
        >
          <p
            className="tag-label"
            style={{ marginBottom: "0.75rem" }}
          >
            El problema
          </p>
          <h2
            className="font-serif"
            style={{
              fontSize: "clamp(2rem,4vw,3.5rem)",
              fontWeight: 700,
              color: "var(--color-text-primary)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              maxWidth: "18ch",
            }}
          >
            El verdadero costo
            <br />
            del bache forrajero.
          </h2>
          <p
            className="font-sans"
            style={{
              marginTop: "0.75rem",
              fontSize: "clamp(0.875rem,1vw,0.9375rem)",
              color: "var(--color-text-muted)",
              maxWidth: "42ch",
              lineHeight: 1.65,
            }}
          >
            Tres realidades que cada ganadero de la región
            conoce de memoria.
          </p>
        </div>

        {/* ── Cards stack ───────────────────────────────────────────────── */}
        <div
          style={{
            maxWidth: "1250px",
            margin: "0 auto",
            padding:
              "clamp(1.5rem,3vh,2.5rem) clamp(1.5rem,4.5vw,3rem) 0",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <AnimatePresence>
              {CARDS.map((card, i) => {
                if (visibleCount <= i) return null;
                const isActive = activeCard === i;

                return (
                  <motion.div
                    layout
                    key={card.num}
                    initial={{ opacity: 0, y: 36 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 24 }}
                    transition={{
                      duration: 0.65,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{
                      borderRadius: "12px",
                      background: card.bg,
                      border: "1px solid rgba(0,0,0,0.07)",
                      overflow: "hidden",
                    }}
                  >
                    {/* ── Card header row ─────────────────────────────── */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding:
                          "clamp(1rem,2.2vh,1.4rem) clamp(1.25rem,2.5vw,2rem)",
                        gap: "clamp(0.75rem,1.5vw,1.1rem)",
                        minHeight: "68px",
                      }}
                    >
                      {/* Number */}
                      <span
                        className="font-sans"
                        style={{
                          fontSize: "clamp(1.1rem,2vw,1.6rem)",
                          fontWeight: 700,
                          letterSpacing: "-0.055em",
                          lineHeight: 1,
                          color: "var(--color-dorado)",
                          flexShrink: 0,
                        }}
                      >
                        {card.num}
                      </span>

                      {/* Vertical divider */}
                      <span
                        style={{
                          width: "1px",
                          height: "22px",
                          background: "rgba(0,95,2,0.12)",
                          flexShrink: 0,
                        }}
                      />

                      {/* Title */}
                      <span
                        className="font-serif"
                        style={{
                          fontSize: "clamp(1.15rem,2vw,1.55rem)",
                          fontWeight: 600,
                          color: "var(--color-text-primary)",
                          letterSpacing: "-0.02em",
                          lineHeight: 1.1,
                        }}
                      >
                        {card.titulo}
                      </span>

                      {/* Period tag — right-aligned */}
                      <span
                        className="font-sans"
                        style={{
                          marginLeft: "auto",
                          fontSize: "0.55rem",
                          letterSpacing: "0.2em",
                          color: "var(--color-text-muted)",
                          textTransform: "uppercase",
                          fontWeight: 500,
                          flexShrink: 0,
                        }}
                      >
                        {card.subtitulo}
                      </span>
                    </div>

                    {/* ── Card body (expand/collapse) ──────────────────── */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          key="body"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.45,
                            ease: [0.16, 1, 0.3, 1],
                            opacity: { duration: 0.3 },
                          }}
                          style={{ overflow: "hidden" }}
                        >
                          {/* Thin divider above text */}
                          <div
                            style={{
                              height: "1px",
                              background:
                                "rgba(0,95,2,0.06)",
                              marginInline:
                                "clamp(1.25rem,2.5vw,2rem)",
                            }}
                          />
                          <p
                            className="font-sans"
                            style={{
                              padding:
                                "clamp(0.875rem,1.8vh,1.25rem) clamp(1.25rem,2.5vw,2rem) clamp(1.25rem,2.5vh,1.75rem)",
                              fontSize:
                                "clamp(0.875rem,1.05vw,0.9375rem)",
                              lineHeight: 1.78,
                              color:
                                "var(--color-text-secondary)",
                              maxWidth: "60ch",
                            }}
                          >
                            {card.texto}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
