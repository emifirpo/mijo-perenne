import { ImageResponse } from "next/og";

export const alt = "Mijo Grand — Semilla de Mijo Perenne · Jacinto Arauz, La Pampa";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * LogoMark inline — 7 rayos trapezoidales + 2 franjas de la pampa.
 * Mismo SVG que components/LogoMark.tsx, sin dependencias externas.
 */
function LogoMarkSVG({ size: s, color }: { size: number; color: string }) {
  return (
    <svg
      width={s}
      height={Math.round(s * (92 / 112))}
      viewBox="44 30 112 92"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 7 rayos trapezoidales — panícula */}
      <polygon points="97.35,95.64 64.70,79.33 77.05,62.35 102.65,88.36" fill={color} />
      <polygon points="96.36,94.65 64.47,60.96 81.46,48.61 103.64,89.35" fill={color} />
      <polygon points="95.72,93.39 73.64,44.84 93.61,38.35 104.28,90.61" fill={color} />
      <polygon points="95.50,92.00 89.50,34.00 110.50,34.00 104.50,92.00" fill={color} />
      <polygon points="95.72,90.61 106.39,38.35 126.36,44.84 104.28,93.39" fill={color} />
      <polygon points="96.36,89.35 118.54,48.61 135.53,60.96 103.64,94.65" fill={color} />
      <polygon points="97.35,88.36 122.95,62.35 135.30,79.33 102.65,95.64" fill={color} />
      {/* Franja superior — horizonte */}
      <path
        d="M 52,98 Q 76,89 100,93 Q 124,97 148,88 L 148,95 Q 124,104 100,100 Q 76,96 52,105 Z"
        fill={color}
      />
      {/* Franja inferior — suelo */}
      <path
        d="M 48,110 Q 74,100 100,105 Q 126,110 152,100 L 152,108 Q 126,118 100,113 Q 74,108 48,118 Z"
        fill={color}
      />
    </svg>
  );
}

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          overflow: "hidden",
          outline: "6px solid #004A01",
        }}
      >
        {/* ══════════════════════════════════════
            LEFT PANEL — crema, texto
        ══════════════════════════════════════ */}
        <div
          style={{
            width: 460,
            height: "100%",
            backgroundColor: "#F5EDD8",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "52px",
            flexShrink: 0,
          }}
        >
          {/* Top: logo mark + wordmark */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <LogoMarkSVG size={44} color="#005F02" />
            <span
              style={{
                color: "#005F02",
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: "-0.03em",
                fontFamily: "Georgia, serif",
              }}
            >
              Mijo Grand
            </span>
          </div>

          {/* Bottom: title block */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* Eyebrow */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 22,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 2,
                  backgroundColor: "#B3A86A",
                  display: "flex",
                }}
              />
              <span
                style={{
                  color: "#B3A86A",
                  fontSize: 12,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  fontFamily: "Arial, sans-serif",
                  fontWeight: 600,
                }}
              >
                Panicum coloratum
              </span>
            </div>

            {/* Main title */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                color: "#005F02",
                fontSize: 66,
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 0.95,
                fontFamily: "Georgia, serif",
                marginBottom: 24,
              }}
            >
              <span>Semilla de</span>
              <span>Mijo Perenne</span>
            </div>

            {/* Tagline */}
            <div
              style={{
                display: "flex",
                color: "rgba(0,95,2,0.55)",
                fontSize: 15,
                lineHeight: 1.6,
                fontFamily: "Arial, sans-serif",
                fontStyle: "italic",
                marginBottom: 28,
              }}
            >
              El forraje que se siembra una vez y vuelve solo. Cada año.
            </div>

            {/* Meta */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  color: "rgba(0,95,2,0.38)",
                  fontSize: 12,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                Est. 2007
              </span>
              <span
                style={{
                  width: 3,
                  height: 3,
                  borderRadius: "50%",
                  backgroundColor: "rgba(179,168,106,0.5)",
                  display: "flex",
                }}
              />
              <span
                style={{
                  color: "rgba(0,95,2,0.38)",
                  fontSize: 12,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                Jacinto Arauz, La Pampa
              </span>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════
            RIGHT PANEL — verde pampa, logo gráfico
        ══════════════════════════════════════ */}
        <div
          style={{
            flex: 1,
            height: "100%",
            backgroundColor: "#005F02",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Ghost — segunda capa, grande y desplazada, muy tenue */}
          <div
            style={{
              position: "absolute",
              top: -80,
              right: -100,
              display: "flex",
              opacity: 0.06,
            }}
          >
            <LogoMarkSVG size={620} color="#F0EBE1" />
          </div>

          {/* Marca principal — centrada, cream/gold */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LogoMarkSVG size={420} color="#C5BC82" />
          </div>

          {/* Coordenadas — esquina inferior derecha */}
          <div
            style={{
              position: "absolute",
              bottom: 28,
              right: 36,
              display: "flex",
            }}
          >
            <span
              style={{
                color: "rgba(240,232,196,0.28)",
                fontSize: 11,
                letterSpacing: "0.12em",
                fontFamily: "Arial, sans-serif",
              }}
            >
              −38.12° S · −63.56° O
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
