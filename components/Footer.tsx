"use client";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#1C0F07",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* CTA strip — dark, like Exergy3 bottom */}
      <div className="max-w-[1250px] mx-auto px-5 md:px-10 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center mb-8"
          style={{ borderBottom: "1px solid var(--color-dark-border)", paddingBottom: "2rem" }}
        >
          <div>
            <p
              className="font-sans uppercase mb-4"
              style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--color-dorado)" }}
            >
              Sandro Grand · Jacinto Arauz
            </p>
            <h2
              className="font-sans"
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                color: "var(--color-text-on-dark)",
                letterSpacing: "-0.03em",
                lineHeight: 1.0,
                maxWidth: "20ch",
              }}
            >
              Hablemos de cómo el mijo perenne puede cambiar tu campo.
            </h2>
          </div>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 font-sans font-medium self-start md:self-center"
            style={{
              background: "var(--color-dorado)",
              borderRadius: "9999px",
              padding: "14px 26px 14px 14px",
              fontSize: "0.9375rem",
              color: "var(--color-dark)",
              whiteSpace: "nowrap",
              transition: "opacity 0.25s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
          >
            <span
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                background: "#3A1F0E",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 6h8M6 2l4 4-4 4" stroke="var(--color-dorado)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            Consultar disponibilidad
          </a>
        </div>

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

          {/* Marca */}
          <div>
            <p
              className="font-sans font-semibold"
              style={{ fontSize: "1.1rem", color: "var(--color-text-on-dark)", letterSpacing: "-0.02em" }}
            >
              Sandro Grand
            </p>
            <p
              className="font-sans mt-1"
              style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-text-on-dark-muted)" }}
            >
              Semilla de Mijo Perenne · Est. 2007
            </p>
          </div>

          {/* Centro */}
          <div className="flex items-center gap-6">
            <p className="font-sans" style={{ fontSize: "0.8125rem", color: "var(--color-text-on-dark-muted)" }}>
              Jacinto Arauz, La Pampa · Argentina
            </p>
            <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "var(--color-dark-border)", display: "inline-block" }} />
            <p className="font-sans" style={{ fontSize: "0.75rem", color: "var(--color-text-on-dark-muted)", letterSpacing: "0.08em" }}>
              -38.12° S · -63.56° O
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/5492954000000"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans"
              style={{ fontSize: "0.875rem", color: "var(--color-dorado)", opacity: 0.85, transition: "opacity 0.2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
            >
              WhatsApp
            </a>
            <a
              href="#contacto"
              className="font-sans"
              style={{ fontSize: "0.875rem", color: "var(--color-text-on-dark-muted)", transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-text-on-dark)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-text-on-dark-muted)")}
            >
              Contacto
            </a>
          </div>
        </div>

        <div
          className="mt-8 pt-6 flex items-center justify-between"
          style={{ borderTop: "1px solid var(--color-dark-border)" }}
        >
          <p className="font-sans" style={{ fontSize: "0.7rem", color: "var(--color-text-on-dark-muted)" }}>
            © {new Date().getFullYear()} Sandro Grand · Todos los derechos reservados
          </p>
          <p
            className="font-sans uppercase"
            style={{ fontSize: "0.5rem", letterSpacing: "0.25em", color: "rgba(240,235,225,0.12)" }}
          >
            Panicum coloratum · Sudoeste Bonaerense
          </p>
        </div>
      </div>
    </footer>
  );
}
