"use client";

import type { AnchorHTMLAttributes } from "react";

/**
 * CampoButton — botón pill unificado del sitio.
 *
 * Variantes:
 *   "primary"  → píldora crema sobre fondos oscuros (Hero, secciones dark)
 *   "dark"     → píldora verde oscuro sobre fondos claros (Solucion, Sandro)
 *   "subtle"   → glass transparente para cards con fondo verde oscuro (Oferta)
 *
 * Uso:
 *   <CampoButton href="#contacto" label="Consultar disponibilidad" />
 *   <CampoButton href="/wa" variant="dark" label="Hablar con Sandro" external />
 */

type Variant = "primary" | "dark" | "subtle";

interface CampoButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  label: string;
  variant?: Variant;
  external?: boolean;
}

const VARIANTS: Record<
  Variant,
  {
    pill: React.CSSProperties;
    dot: React.CSSProperties;
    arrowStroke: string;
    hoverBg?: string;
    hoverOpacity?: number;
  }
> = {
  primary: {
    pill: {
      background: "#F0EBE1",
      color: "#0a1f0b",
    },
    dot: { background: "#1A3D20" },
    arrowStroke: "#F0EBE1",
    hoverBg: "#ffffff",
  },
  dark: {
    pill: {
      background: "#005F02",
      color: "#F0EBE1",
    },
    dot: { background: "var(--color-dorado)" },
    arrowStroke: "#182A1A",
    hoverOpacity: 0.88,
  },
  subtle: {
    pill: {
      background: "rgba(255,255,255,0.07)",
      border: "1px solid rgba(240,232,196,0.18)",
      color: "rgba(240,232,196,0.88)",
      backdropFilter: "blur(4px)",
    },
    dot: { background: "var(--color-dorado)" },
    arrowStroke: "#182A1A",
    hoverBg: "rgba(255,255,255,0.12)",
  },
};

export default function CampoButton({
  label,
  variant = "primary",
  external = false,
  style,
  className,
  ...props
}: CampoButtonProps) {
  const v = VARIANTS[variant];

  return (
    <a
      className={`inline-flex items-center gap-2 font-sans font-semibold${className ? ` ${className}` : ""}`}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      style={{
        borderRadius: "9999px",
        padding: "12px 22px 12px 12px",
        fontSize: "0.9375rem",
        minHeight: "52px",
        textDecoration: "none",
        transition: "background 0.22s, opacity 0.22s, border-color 0.22s",
        ...v.pill,
        ...style,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        if (v.hoverBg) el.style.background = v.hoverBg;
        if (v.hoverOpacity !== undefined) el.style.opacity = String(v.hoverOpacity);
        if (variant === "subtle") el.style.borderColor = "rgba(240,232,196,0.32)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        if (v.hoverBg) el.style.background = (v.pill.background as string) ?? "";
        if (v.hoverOpacity !== undefined) el.style.opacity = "1";
        if (variant === "subtle") el.style.borderColor = "rgba(240,232,196,0.18)";
      }}
      {...props}
    >
      {/* Dot icon */}
      <span
        style={{
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          ...v.dot,
        }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path
            d="M2 6h8M6 2l4 4-4 4"
            stroke={v.arrowStroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {label}
    </a>
  );
}
