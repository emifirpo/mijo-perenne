"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import TextReveal from "./TextReveal";

// ── Medios verificados ────────────────────────────────────────────────────────
const MEDIA = [
  { nombre: "Más Campo",       logo: "/logo-mascampo-c.png",   w: 120, h: 30, invert: false },
  { nombre: "La Nación Campo", logo: "/logo-lanacion.svg",     w: 108, h: 44, invert: false },
  { nombre: "SudOeste BA",     logo: "/logo-sudoesteba-c.png", w: 130, h: 28, invert: false },
  { nombre: "INTA",            logo: "/logo-inta-c.png",       w: 110, h: 28, invert: true  },
];

// ── Referencias con link ──────────────────────────────────────────────────────
const REFS = [
  {
    badge: "Nota de campo",
    nombre: "SudOeste BA",
    titulo: "Un ganadero alimenta a sus vacas con un cultivo poco conocido",
    detalle: "Cobertura del establecimiento La Margarita (Jacinto Aráuz – Villa Iris). De 5 hectáreas en 2007 a 200 en producción permanente.",
    fecha: "Jul 2023",
    href: "https://www.sudoesteba.com/2023-07-16/un-ganadero-en-su-campo-entre-jacinto-arauz-y-villa-iris-alimenta-a-las-vacas-con-un-cultivo-poco-conocido-6301/",
  },
  {
    badge: "Nota técnica",
    nombre: "Más Campo",
    titulo: "Mijo Forrajero: adaptación y rendimiento en el sudoeste",
    detalle: "3.500 kg/ha de materia seca en promedio · resistente a sequía, heladas y enfermedades · hasta 700 g de aumento de peso vivo diario.",
    fecha: "Jul 2023",
    href: "https://mascampo.com.ar/mijo-forrajero/",
  },
  {
    badge: "Investigación",
    nombre: "INTA Guatraché · EEA Anguil",
    titulo: "La fertilización estratégica mejora 16% la producción de mijo perenne",
    detalle: "Con 40 kg N/ha + fósforo el cultivo supera 4.900–7.900 kg/ha en año 2 y genera entre 600 y 900 raciones anuales por hectárea.",
    fecha: "Nov 2025",
    href: "https://www.argentina.gob.ar/noticias/la-fertilizacion-estrategica-mejora-16-la-produccion-de-mijo-perenne",
  },
  {
    badge: "Medios nacionales",
    nombre: "La Nación Campo",
    titulo: "Descubrió que podía usar un supercultivo con un solo 'enemigo'",
    detalle: "La Nación cubrió el caso como referencia de innovación forrajera en la región pampeana semiárida.",
    fecha: "Jul 2023",
    href: "https://www.lanacion.com.ar/economia/campo/agricultura/es-muy-noble-un-ganadero-alimenta-sus-vacas-con-un-cultivo-poco-difundido-y-que-tiene-un-solo-nid13072023/",
  },
];

// ── Citas verificadas — fuentes indicadas en cada una ────────────────────────
const QUOTES = [
  {
    text: "Esta especie forrajera es un cultivo muy noble, adaptable y resistente a las enfermedades.",
    fuente: "Más Campo · SudOeste BA",
    fecha: "Julio 2023",
    href: "https://www.sudoesteba.com/2023-07-16/un-ganadero-en-su-campo-entre-jacinto-arauz-y-villa-iris-alimenta-a-las-vacas-con-un-cultivo-poco-conocido-6301/",
  },
  {
    text: "Empecé con la producción de mijo forrajero perenne en 2007, con semillas que me facilitó el municipio de Puan.",
    fuente: "SudOeste BA",
    fecha: "Julio 2023",
    href: "https://www.sudoesteba.com/2023-07-16/un-ganadero-en-su-campo-entre-jacinto-arauz-y-villa-iris-alimenta-a-las-vacas-con-un-cultivo-poco-conocido-6301/",
  },
];

// ── Galería — imágenes disponibles en /public ─────────────────────────────────
const GALLERY = [
  { src: "/problema-01.jpg", alt: "Cultivo de mijo perenne — establecimiento La Margarita" },
  { src: "/sandro.jpg",      alt: "Sandro Grand en el campo" },
  { src: "/problema-02.jpg", alt: "Semilla cosechada en diciembre" },
  { src: "/problema-03.jpg", alt: "Rodeo Hereford sobre mijo perenne" },
];

// ── Ícono de link externo ─────────────────────────────────────────────────────
function ExternalIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" style={{ display: "inline", marginLeft: "3px", verticalAlign: "middle" }}>
      <path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function Respaldo() {
  return (
    <section
      id="respaldo"
      className="py-24 md:py-36"
      style={{ backgroundColor: "var(--color-base)" }}
    >
      <div className="max-w-[1250px] mx-auto px-5 md:px-10">

        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
        >
          <p className="tag-label mb-3">Respaldo técnico</p>
          <TextReveal
            as="h2"
            className="font-sans"
            style={{
              fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)",
              color: "var(--color-text-primary)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            No lo dice Sandro solo.
          </TextReveal>
        </motion.div>

        {/* ── "Aparecemos en" strip ───────────────────────────────────────────── */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <p
            className="font-sans uppercase mb-6"
            style={{ fontSize: "0.58rem", letterSpacing: "0.22em", color: "var(--color-text-muted)" }}
          >
            Aparecemos en
          </p>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
            {MEDIA.map((m) => (
              <div
                key={m.nombre}
                style={{ display: "inline-flex", alignItems: "center", opacity: 0.35 }}
              >
                <Image
                  src={m.logo}
                  alt={m.nombre}
                  width={m.w * 2}
                  height={m.h * 2}
                  style={{
                    width: "auto",
                    height: `${m.h}px`,
                    objectFit: "contain",
                    filter: m.invert
                      ? "invert(1) grayscale(1) contrast(1.1)"
                      : "grayscale(1) contrast(1.1)",
                  }}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Reference cards — 2×2 ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0 mb-14">
          {REFS.map((r, i) => (
            <motion.a
              key={i}
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-2.5 py-6 group"
              style={{
                borderTop: "1px solid var(--color-border)",
                textDecoration: "none",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.08 + i * 0.07 }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderTopColor = "var(--color-dorado)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderTopColor = "var(--color-border)";
              }}
            >
              {/* Top row: badge + fecha */}
              <div className="flex items-center justify-between gap-3">
                <span className="pill-badge pill-badge-gold">{r.badge}</span>
                <span
                  className="font-sans"
                  style={{ fontSize: "0.65rem", color: "var(--color-text-muted)", letterSpacing: "0.06em" }}
                >
                  {r.fecha}
                  <ExternalIcon />
                </span>
              </div>

              {/* Título */}
              <p
                className="font-sans font-semibold"
                style={{
                  fontSize: "0.9375rem",
                  color: "var(--color-text-primary)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.3,
                  transition: "color 0.2s",
                }}
              >
                {r.titulo}
              </p>

              {/* Detalle */}
              <p
                className="font-sans"
                style={{ fontSize: "0.84rem", lineHeight: 1.65, color: "var(--color-text-secondary)" }}
              >
                {r.detalle}
              </p>

              {/* Fuente */}
              <span
                className="font-sans font-semibold mt-1"
                style={{
                  fontSize: "0.72rem",
                  color: "var(--color-dorado)",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                {r.nombre}
              </span>
            </motion.a>
          ))}
        </div>

        {/* ── Citas verificadas de Sandro Grand ──────────────────────────────── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14 pt-10"
          style={{ borderTop: "1px solid var(--color-border)" }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          {QUOTES.map((q, i) => (
            <motion.div
              key={i}
              className="flex flex-col gap-3"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: 0.15 + i * 0.1 }}
            >
              <span
                style={{ fontSize: "2.2rem", lineHeight: 0.8, color: "var(--color-dorado)", fontFamily: "Georgia, serif" }}
              >
                &ldquo;
              </span>
              <p
                className="font-sans"
                style={{
                  fontSize: "clamp(0.9375rem, 1.25vw, 1.0625rem)",
                  lineHeight: 1.7,
                  color: "var(--color-text-primary)",
                  fontStyle: "italic",
                  flex: 1,
                }}
              >
                {q.text}
              </p>
              <div
                className="flex items-end justify-between gap-4 pt-3"
                style={{ borderTop: "1px solid var(--color-border)" }}
              >
                <div>
                  <p className="font-sans font-semibold" style={{ fontSize: "0.875rem", color: "var(--color-text-primary)" }}>
                    Sandro Grand
                  </p>
                  <p className="font-sans uppercase mt-0.5" style={{ fontSize: "0.58rem", letterSpacing: "0.18em", color: "var(--color-dorado)" }}>
                    Jacinto Arauz, La Pampa
                  </p>
                </div>
                <a
                  href={q.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans shrink-0"
                  style={{
                    fontSize: "0.62rem",
                    letterSpacing: "0.06em",
                    color: "var(--color-text-muted)",
                    opacity: 0.55,
                    transition: "opacity 0.2s",
                    textDecoration: "none",
                    textAlign: "right",
                    lineHeight: 1.5,
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.55")}
                >
                  {q.fuente}<br />{q.fecha}
                  <ExternalIcon />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Galería ─────────────────────────────────────────────────────────── */}
        <motion.div
          className="pt-10"
          style={{ borderTop: "1px solid var(--color-border)" }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, delay: 0.15 }}
        >
          <p
            className="font-sans uppercase mb-5"
            style={{ fontSize: "0.58rem", letterSpacing: "0.22em", color: "var(--color-text-muted)" }}
          >
            El campo · La Margarita
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {GALLERY.map((img, i) => (
              <motion.div
                key={i}
                className="relative overflow-hidden"
                style={{ borderRadius: "10px", aspectRatio: "4/3" }}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: 0.08 + i * 0.08 }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
