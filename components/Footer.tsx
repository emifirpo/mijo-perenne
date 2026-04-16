"use client";

import LogoMark from "./LogoMark";
import CampoButton from "./CampoButton";
import TextReveal from "./TextReveal";

function WAIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer
      id="contacto"
      data-navdark="true"
      style={{ backgroundColor: "#1C0F07" }}
    >
      {/* ── CTA de contacto ─────────────────────────────────────────── */}
      <div
        className="max-w-[1250px] mx-auto px-5 md:px-10 pt-20 md:pt-28 pb-16 md:pb-20"
        style={{ position: "relative" }}
      >
        {/* Watermark LogoMark — fondo izquierdo */}
        <LogoMark
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-6%",
            bottom: "10%",
            width: "40vw",
            maxWidth: "420px",
            minWidth: "200px",
            height: "auto",
            color: "#F0E8C4",
            opacity: 0.04,
            pointerEvents: "none",
          }}
        />

        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 pb-14 md:pb-18"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          {/* Columna izquierda — copy */}
          <div>
            <p
              className="font-sans uppercase mb-5"
              style={{ fontSize: "0.6rem", letterSpacing: "0.22em", color: "var(--color-dorado)" }}
            >
              Contacto directo
            </p>
            <TextReveal
              as="h2"
              className="font-sans mb-6"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.4rem)",
                color: "var(--color-text-on-dark)",
                letterSpacing: "-0.03em",
                lineHeight: 1.0,
              }}
            >
              Hablemos de cómo el mijo perenne
              <br />
              <span style={{ color: "var(--color-dorado)" }}>puede cambiar tu campo.</span>
            </TextReveal>
            <p
              className="font-sans mb-10"
              style={{
                fontSize: "clamp(0.9375rem, 1.2vw, 1.0625rem)",
                lineHeight: 1.85,
                color: "var(--color-text-on-dark-secondary)",
                maxWidth: "42ch",
              }}
            >
              Sandro responde personalmente. Contanos tu zona, la superficie
              y cuándo pensás implantar. Respuesta en 24–48hs.
            </p>

            {/* Datos clave */}
            <div className="flex flex-col gap-5">
              {[
                { label: "Zona", value: "Jacinto Arauz, La Pampa" },
                { label: "Coordenadas", value: "−38.12° S · −63.56° O" },
                { label: "Cosecha propia", value: "Diciembre · cada año en campo propio" },
              ].map((d) => (
                <div key={d.label}>
                  <p
                    className="font-sans uppercase mb-1"
                    style={{ fontSize: "0.58rem", letterSpacing: "0.2em", color: "var(--color-dorado)" }}
                  >
                    {d.label}
                  </p>
                  <p
                    className="font-sans"
                    style={{ fontSize: "0.9375rem", color: "var(--color-text-on-dark-secondary)" }}
                  >
                    {d.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Columna derecha — CTAs */}
          <div className="flex flex-col justify-center gap-4">
            {/* WhatsApp — CTA principal */}
            <a
              href="https://wa.me/5492916481785?text=Hola%20Sandro%2C%20me%20interesa%20la%20semilla%20de%20mijo%20perenne"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 font-sans font-semibold w-full"
              style={{
                background: "var(--color-dorado)",
                borderRadius: "9999px",
                padding: "18px 28px",
                fontSize: "1rem",
                color: "#1C0F07",
                minHeight: "60px",
                transition: "opacity 0.22s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.88")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              <WAIcon />
              Escribir por WhatsApp
            </a>

            {/* Separador */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
              <span
                className="font-sans"
                style={{ fontSize: "0.72rem", color: "var(--color-text-on-dark-muted)", letterSpacing: "0.06em" }}
              >
                o consultá sobre tu implantación
              </span>
              <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
            </div>

            {/* Botón secundario — consulta genérica */}
            <CampoButton
              href="https://wa.me/5492916481785?text=Hola%20Sandro%2C%20me%20interesa%20el%20asesoramiento%20para%20implantar%20mijo%20perenne"
              label="Consultar asesoría"
              variant="subtle"
              external
              style={{ justifyContent: "center", width: "100%" }}
            />

            {/* Nota de respuesta */}
            <p
              className="font-sans text-center"
              style={{ fontSize: "0.75rem", color: "var(--color-text-on-dark-muted)", marginTop: "4px" }}
            >
              Respuesta en 24–48hs · Est. 2007
            </p>
          </div>
        </div>

        {/* ── Footer meta ─────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-10">

          {/* Marca */}
          <div>
            <p
              className="font-sans font-semibold"
              style={{ fontSize: "1.05rem", color: "var(--color-text-on-dark)", letterSpacing: "-0.02em" }}
            >
              Mijo Grand
            </p>
            <p
              className="font-sans mt-1"
              style={{
                fontSize: "0.58rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--color-text-on-dark-muted)",
              }}
            >
              Semilla de Mijo Perenne · Jacinto Arauz, La Pampa
            </p>
          </div>

          {/* Coordenadas */}
          <p
            className="font-sans"
            style={{ fontSize: "0.75rem", color: "var(--color-text-on-dark-muted)", letterSpacing: "0.08em" }}
          >
            −38.12° S · −63.56° O
          </p>

          {/* WA link rápido */}
          <a
            href="https://wa.me/5492916481785"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans"
            style={{
              fontSize: "0.875rem",
              color: "var(--color-dorado)",
              opacity: 0.8,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.8")}
          >
            WhatsApp
          </a>
        </div>

        {/* Copyright */}
        <div
          className="mt-8 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-2"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="font-sans" style={{ fontSize: "0.68rem", color: "var(--color-text-on-dark-muted)" }}>
            © {new Date().getFullYear()} Mijo Grand · Todos los derechos reservados
          </p>
          <p
            className="font-sans uppercase"
            style={{ fontSize: "0.5rem", letterSpacing: "0.25em", color: "rgba(240,235,225,0.10)" }}
          >
            Panicum coloratum · Sudoeste Bonaerense
          </p>
        </div>
      </div>
    </footer>
  );
}
