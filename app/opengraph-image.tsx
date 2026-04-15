import { ImageResponse } from "next/og";

export const alt = "Mijo Grand — Semilla de Mijo Perenne · Jacinto Arauz, La Pampa";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Panícula SVG mark — reusable inline component
function Panicula({
  size: s,
  color,
  opacity = 1,
}: {
  size: number;
  color: string;
  opacity?: number;
}) {
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      {/* Arms */}
      <rect x="-4" y="-14" width="8" height="14" rx="4" fill={color} transform="translate(32,35) rotate(-50)" />
      <rect x="-4" y="-18" width="8" height="18" rx="4" fill={color} transform="translate(32,35) rotate(-24)" />
      <rect x="-4" y="-22" width="8" height="22" rx="4" fill={color} transform="translate(32,35) rotate(0)" />
      <rect x="-4" y="-18" width="8" height="18" rx="4" fill={color} transform="translate(32,35) rotate(24)" />
      <rect x="-4" y="-14" width="8" height="14" rx="4" fill={color} transform="translate(32,35) rotate(50)" />
      {/* Hub + stem */}
      <circle cx="32" cy="35" r="4.5" fill={color} />
      <rect x="28.5" y="35" width="7" height="13" rx="3.5" fill={color} />
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
          // Thin perimeter border in teal-green
          outline: "6px solid #004A01",
        }}
      >
        {/* ══════════════════════════════════════════
            LEFT PANEL — crema, texto
        ══════════════════════════════════════════ */}
        <div
          style={{
            width: 460,
            height: "100%",
            backgroundColor: "#F5EDD8",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "52px 52px 52px 52px",
            flexShrink: 0,
          }}
        >
          {/* Top: logo mark + name */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {/* Logo mark — green square */}
            <div
              style={{
                width: 44,
                height: 44,
                backgroundColor: "#005F02",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Panicula size={28} color="#F0EBE1" />
            </div>
            <span
              style={{
                color: "#005F02",
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontFamily: "Georgia, serif",
              }}
            >
              Mijo Grand
            </span>
          </div>

          {/* Bottom: title block */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {/* Eyebrow tag */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 20,
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
                color: "#005F02",
                fontSize: 68,
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 0.95,
                fontFamily: "Georgia, serif",
                marginBottom: 22,
              }}
            >
              Semilla de{"\n"}Mijo Perenne
            </div>

            {/* Tagline */}
            <div
              style={{
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

            {/* Meta line */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span
                style={{
                  color: "rgba(0,95,2,0.4)",
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
                  color: "rgba(0,95,2,0.4)",
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

        {/* ══════════════════════════════════════════
            RIGHT PANEL — verde pampa, panícula gráfica
        ══════════════════════════════════════════ */}
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
          {/* Texture ring — faint circle behind */}
          <div
            style={{
              position: "absolute",
              width: 560,
              height: 560,
              borderRadius: "50%",
              border: "1px solid rgba(240,235,225,0.08)",
              display: "flex",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 440,
              height: 440,
              borderRadius: "50%",
              border: "1px solid rgba(240,235,225,0.06)",
              display: "flex",
            }}
          />

          {/* Ghost panícula — offset, very faint, scale */}
          <div
            style={{
              position: "absolute",
              top: -60,
              right: -80,
              display: "flex",
              opacity: 0.06,
            }}
          >
            <Panicula size={520} color="#F0EBE1" />
          </div>

          {/* Main panícula — bold, centered */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Panicula size={400} color="#C5BC82" opacity={0.92} />
          </div>

          {/* Coordinate tag — bottom right */}
          <div
            style={{
              position: "absolute",
              bottom: 28,
              right: 36,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 2,
            }}
          >
            <span
              style={{
                color: "rgba(240,232,196,0.3)",
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
    {
      ...size,
    }
  );
}
