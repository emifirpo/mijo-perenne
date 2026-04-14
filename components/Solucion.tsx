"use client";

import { motion } from "framer-motion";
import CampoButton from "./CampoButton";

export default function Solucion() {
  return (
    <section
      id="cultivo"
      className="py-24 md:py-40"
      style={{ backgroundColor: "var(--color-base)" }}
    >
      <div className="max-w-[1250px] mx-auto px-5 md:px-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

          {/* Texto */}
          <motion.div
            className="flex flex-col justify-center py-8 md:py-14 pr-4 md:pr-12"
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

            <CampoButton
              href="#contacto"
              label="Consultar semilla"
              variant="dark"
              className="self-start"
            />
          </motion.div>

          {/* Espacio reservado para diseño */}
          <div className="hidden lg:block" />

        </div>
      </div>
    </section>
  );
}
