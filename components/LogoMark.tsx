/**
 * LogoMark — Panícula de mijo perenne sobre horizonte pampeano.
 * Logo D: 7 rayos trapezoidales + 2 franjas curvas de la pampa.
 *
 * Usa fill="currentColor" → heredar color del padre con CSS `color`.
 * viewBox recortado al mark (sin wordmark).
 */

import type { SVGProps } from "react";

type LogoMarkProps = SVGProps<SVGSVGElement>;

export default function LogoMark({ style, ...props }: LogoMarkProps) {
  return (
    <svg
      viewBox="44 30 112 92"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", ...style }}
      {...props}
    >
      {/* 7 rayos trapezoidales — panícula */}
      <polygon points="97.35,95.64 64.70,79.33 77.05,62.35 102.65,88.36" fill="currentColor" />
      <polygon points="96.36,94.65 64.47,60.96 81.46,48.61 103.64,89.35" fill="currentColor" />
      <polygon points="95.72,93.39 73.64,44.84 93.61,38.35 104.28,90.61" fill="currentColor" />
      <polygon points="95.50,92.00 89.50,34.00 110.50,34.00 104.50,92.00" fill="currentColor" />
      <polygon points="95.72,90.61 106.39,38.35 126.36,44.84 104.28,93.39" fill="currentColor" />
      <polygon points="96.36,89.35 118.54,48.61 135.53,60.96 103.64,94.65" fill="currentColor" />
      <polygon points="97.35,88.36 122.95,62.35 135.30,79.33 102.65,95.64" fill="currentColor" />

      {/* Franja superior — horizonte alto */}
      <path
        d="M 52,98 Q 76,89 100,93 Q 124,97 148,88 L 148,95 Q 124,104 100,100 Q 76,96 52,105 Z"
        fill="currentColor"
      />

      {/* Franja inferior — suelo de la pampa */}
      <path
        d="M 48,110 Q 74,100 100,105 Q 126,110 152,100 L 152,108 Q 126,118 100,113 Q 74,108 48,118 Z"
        fill="currentColor"
      />
    </svg>
  );
}
