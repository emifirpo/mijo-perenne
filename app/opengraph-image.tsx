import { ImageResponse } from "next/og";

export const alt = "Mijo Grand — Semilla de Mijo Perenne · Jacinto Arauz, La Pampa";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#030804",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Radial glow — top-left */}
        <div
          style={{
            position: "absolute",
            top: -200,
            left: -200,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,95,2,0.28) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Noise/grain overlay (subtle border) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            border: "1px solid rgba(179,168,106,0.10)",
            display: "flex",
          }}
        />

        {/* ── Logo mark — decorative, top-right ── */}
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            display: "flex",
            opacity: 0.07,
          }}
        >
          <svg
            width="420"
            height="420"
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="-4" y="-14" width="8" height="14" rx="4"
              fill="#F0EBE1"
              transform="translate(32,35) rotate(-50)"
            />
            <rect
              x="-4" y="-18" width="8" height="18" rx="4"
              fill="#F0EBE1"
              transform="translate(32,35) rotate(-24)"
            />
            <rect
              x="-4" y="-22" width="8" height="22" rx="4"
              fill="#F0EBE1"
              transform="translate(32,35) rotate(0)"
            />
            <rect
              x="-4" y="-18" width="8" height="18" rx="4"
              fill="#F0EBE1"
              transform="translate(32,35) rotate(24)"
            />
            <rect
              x="-4" y="-14" width="8" height="14" rx="4"
              fill="#F0EBE1"
              transform="translate(32,35) rotate(50)"
            />
            <circle cx="32" cy="35" r="4.5" fill="#F0EBE1" />
            <rect x="28.5" y="35" width="7" height="13" rx="3.5" fill="#F0EBE1" />
          </svg>
        </div>

        {/* ── Main content — vertically centered ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            paddingLeft: 96,
            paddingRight: 96,
            paddingTop: 72,
            paddingBottom: 72,
          }}
        >
          {/* Tag label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 32,
            }}
          >
            {/* Panícula mark — small, inline */}
            <svg
              width="32"
              height="32"
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="-4" y="-14" width="8" height="14" rx="4"
                fill="#B3A86A"
                transform="translate(32,35) rotate(-50)"
              />
              <rect
                x="-4" y="-18" width="8" height="18" rx="4"
                fill="#B3A86A"
                transform="translate(32,35) rotate(-24)"
              />
              <rect
                x="-4" y="-22" width="8" height="22" rx="4"
                fill="#B3A86A"
                transform="translate(32,35) rotate(0)"
              />
              <rect
                x="-4" y="-18" width="8" height="18" rx="4"
                fill="#B3A86A"
                transform="translate(32,35) rotate(24)"
              />
              <rect
                x="-4" y="-14" width="8" height="14" rx="4"
                fill="#B3A86A"
                transform="translate(32,35) rotate(50)"
              />
              <circle cx="32" cy="35" r="4.5" fill="#B3A86A" />
              <rect x="28.5" y="35" width="7" height="13" rx="3.5" fill="#B3A86A" />
            </svg>

            <span
              style={{
                color: "rgba(179,168,106,0.7)",
                fontSize: 15,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontFamily: "Arial, sans-serif",
                fontWeight: 500,
              }}
            >
              Panicum coloratum · Jacinto Arauz, La Pampa
            </span>
          </div>

          {/* Title */}
          <div
            style={{
              color: "#F0E8C4",
              fontSize: 96,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 0.95,
              marginBottom: 32,
              fontFamily: "Georgia, serif",
            }}
          >
            Mijo Grand
          </div>

          {/* Gold divider */}
          <div
            style={{
              width: 64,
              height: 2,
              backgroundColor: "#B3A86A",
              marginBottom: 32,
              display: "flex",
            }}
          />

          {/* Tagline */}
          <div
            style={{
              color: "rgba(240,232,196,0.72)",
              fontSize: 26,
              lineHeight: 1.55,
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              maxWidth: 640,
              marginBottom: 48,
            }}
          >
            El forraje que se siembra una vez y vuelve solo. Cada año.
          </div>

          {/* Bottom meta */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 24,
            }}
          >
            <span
              style={{
                color: "rgba(179,168,106,0.5)",
                fontSize: 14,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontFamily: "Arial, sans-serif",
              }}
            >
              Semilla de Mijo Perenne
            </span>
            <span
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                backgroundColor: "rgba(179,168,106,0.3)",
                display: "flex",
              }}
            />
            <span
              style={{
                color: "rgba(179,168,106,0.5)",
                fontSize: 14,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontFamily: "Arial, sans-serif",
              }}
            >
              Est. 2007
            </span>
          </div>
        </div>

        {/* Bottom border accent */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            backgroundColor: "#B3A86A",
            opacity: 0.4,
            display: "flex",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
