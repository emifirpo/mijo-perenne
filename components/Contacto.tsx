"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import LogoMark from "./LogoMark";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";

const schema = z.object({
  nombre: z.string().min(2, "Ingresá tu nombre"),
  zona: z.string().min(2, "Ingresá tu localidad"),
  contacto: z.string().min(6, "Ingresá tu teléfono o email").refine(
    (v) => /^[\d\s+\-()]{7,}$/.test(v) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    "Ingresá un teléfono o email válido"
  ),
  mensaje: z.string().optional(),
});

type FormData = z.infer<typeof schema>;
type Status = "idle" | "loading" | "success" | "error";

export default function Contacto() {
  const [status, setStatus] = useState<Status>("idle");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "var(--radius-sm)",
    color: "var(--color-text-on-dark)",
    fontFamily: "var(--font-jakarta)",
    fontSize: "0.9375rem",
    lineHeight: 1.5,
    outline: "none",
    transition: "border-color 0.2s",
    minHeight: "52px",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.75rem",
    color: "var(--color-text-on-dark-muted)",
    letterSpacing: "0.08em",
    marginBottom: "8px",
    fontFamily: "var(--font-jakarta)",
  };

  return (
    <section
      id="contacto"
      className="py-10 md:py-14"
      style={{ backgroundColor: "var(--color-dark)", position: "relative", overflow: "hidden" }}
    >
      {/* Logo D — watermark fondo izquierdo, opacado */}
      <LogoMark
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-10%",
          bottom: "-5%",
          width: "48vw",
          maxWidth: "480px",
          minWidth: "240px",
          height: "auto",
          color: "#F0E8C4",
          opacity: 0.05,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div className="max-w-[1250px] mx-auto px-5 md:px-10" style={{ position: "relative", zIndex: 1 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0}}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="tag-label mb-4">Contacto directo</p>
            <h2
              className="font-sans mb-5"
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                color: "var(--color-text-on-dark)",
                letterSpacing: "-0.03em",
                lineHeight: 1.0,
              }}
            >
              Consultá disponibilidad
              <br />
              <span style={{ color: "var(--color-dorado)" }}>de semilla.</span>
            </h2>
            <p
              className="font-sans mb-6"
              style={{
                fontSize: "clamp(0.9375rem, 1.3vw, 1.0625rem)",
                lineHeight: 1.8,
                color: "var(--color-text-on-dark-secondary)",
                maxWidth: "380px",
              }}
            >
              Sandro responde personalmente. Contanos tu zona, la superficie y cuándo pensás implantar. Respuesta en 24-48hs.
            </p>

            <div className="flex flex-col gap-4">
              {[
                { label: "Zona", value: "Jacinto Arauz, La Pampa" },
                { label: "Coordenadas", value: "-38.12° S · -63.56° O" },
                { label: "Semilla disponible", value: "Cosecha diciembre · consultar stock" },
              ].map((d) => (
                <div key={d.label}>
                  <p className="font-sans uppercase mb-1" style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--color-dorado)" }}>
                    {d.label}
                  </p>
                  <p className="font-sans" style={{ fontSize: "0.9375rem", color: "var(--color-text-on-dark-secondary)" }}>
                    {d.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0}}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {status === "success" ? (
              <div
                className="flex flex-col items-center justify-center text-center p-12"
                style={{
                  background: "var(--color-dark-2)",
                  border: "1px solid var(--color-dark-border)",
                  borderRadius: "var(--radius-card)",
                  minHeight: "400px",
                }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center mb-6"
                  style={{ background: "var(--color-dorado)", borderRadius: "50%" }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="var(--color-dark)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 10l5 5 9-9" />
                  </svg>
                </div>
                <h3 className="font-sans mb-3" style={{ fontSize: "1.7rem", color: "var(--color-text-on-dark)", letterSpacing: "-0.02em" }}>
                  Consulta recibida.
                </h3>
                <p className="font-sans mb-8" style={{ fontSize: "0.9375rem", color: "var(--color-text-on-dark-secondary)", lineHeight: 1.7 }}>
                  Sandro te responde en 24-48hs.<br />También podés escribirle directo.
                </p>
                <a
                  href="https://wa.me/5492954000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-sans font-medium"
                  style={{
                    background: "var(--color-dorado)",
                    borderRadius: "9999px",
                    padding: "12px 22px",
                    fontSize: "0.9375rem",
                    color: "var(--color-dark)",
                  }}
                >
                  Abrir WhatsApp
                </a>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
                noValidate
                style={{
                  background: "var(--color-dark-2)",
                  border: "1px solid var(--color-dark-border)",
                  borderRadius: "var(--radius-card)",
                  padding: "clamp(24px, 4vw, 40px)",
                }}
              >
                <div>
                  <label style={labelStyle} htmlFor="nombre">Nombre *</label>
                  <input id="nombre" type="text" placeholder="Tu nombre" {...register("nombre")} style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "var(--color-dorado)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                  {errors.nombre && <p style={{ fontSize: "0.8rem", color: "#f87171", marginTop: "6px" }}>{errors.nombre.message}</p>}
                </div>

                <div>
                  <label style={labelStyle} htmlFor="zona">Localidad / Zona *</label>
                  <input id="zona" type="text" placeholder="Ej: General Acha, La Pampa" {...register("zona")} style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "var(--color-dorado)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                  {errors.zona && <p style={{ fontSize: "0.8rem", color: "#f87171", marginTop: "6px" }}>{errors.zona.message}</p>}
                </div>

                <div>
                  <label style={labelStyle} htmlFor="contacto">Teléfono o email *</label>
                  <input id="contacto" type="text" placeholder="Tu teléfono o correo" {...register("contacto")} style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "var(--color-dorado)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                  {errors.contacto && <p style={{ fontSize: "0.8rem", color: "#f87171", marginTop: "6px" }}>{errors.contacto.message}</p>}
                </div>

                <div>
                  <label style={labelStyle} htmlFor="mensaje">Mensaje (opcional)</label>
                  <textarea id="mensaje" rows={3} placeholder="Superficie a implantar, zona, época..." {...register("mensaje")}
                    style={{ ...inputStyle, minHeight: "88px", resize: "vertical" }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--color-dorado)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center gap-2 font-sans font-medium"
                  style={{
                    background: "var(--color-dorado)",
                    borderRadius: "9999px",
                    padding: "14px 24px",
                    fontSize: "0.9375rem",
                    color: "var(--color-dark)",
                    minHeight: "54px",
                    opacity: status === "loading" ? 0.75 : 1,
                    cursor: status === "loading" ? "not-allowed" : "pointer",
                    border: "none",
                    transition: "opacity 0.2s",
                  }}
                >
                  {status === "loading" ? "Enviando…" : "Consultar disponibilidad"}
                </button>

                {status === "error" && (
                  <p style={{ fontSize: "0.875rem", color: "#f87171", textAlign: "center" }}>
                    Error al enviar. Escribí directamente por WhatsApp.
                  </p>
                )}

                <div className="flex items-center gap-3 my-1">
                  <div className="flex-1 h-px" style={{ background: "var(--color-dark-border)" }} />
                  <span className="font-sans" style={{ fontSize: "0.75rem", color: "var(--color-text-on-dark-muted)" }}>o</span>
                  <div className="flex-1 h-px" style={{ background: "var(--color-dark-border)" }} />
                </div>

                <a
                  href="https://wa.me/5492954000000?text=Hola%20Sandro%2C%20me%20interesa%20la%20semilla%20de%20mijo%20perenne"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 font-sans font-medium"
                  style={{
                    borderRadius: "9999px",
                    padding: "13px 24px",
                    fontSize: "0.9375rem",
                    color: "var(--color-text-on-dark-secondary)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    minHeight: "52px",
                    transition: "border-color 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(255,255,255,0.25)";
                    el.style.color = "var(--color-text-on-dark)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(255,255,255,0.12)";
                    el.style.color = "var(--color-text-on-dark-secondary)";
                  }}
                >
                  <WAIcon />
                  Escribir por WhatsApp
                </a>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function WAIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
