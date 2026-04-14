import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "./components/SmoothScrollProvider";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mijo Grand — Semilla de Mijo Perenne · Jacinto Arauz",
  colorScheme: "light",
  description:
    "Productor y proveedor de semilla de mijo perenne (Panicum coloratum) en el sudoeste bonaerense. Más de 17 años implantando y cosechando en campo propio. Jacinto Arauz, La Pampa.",
  keywords: ["mijo perenne", "panicum coloratum", "semilla", "Jacinto Arauz", "La Pampa", "forraje", "ganadería"],
  openGraph: {
    title: "Mijo Grand — Semilla de Mijo Perenne",
    description: "El forraje que se siembra una vez y vuelve solo. Cada año.",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={jakarta.variable}
      suppressHydrationWarning
    >
      <body className="min-h-dvh antialiased" suppressHydrationWarning>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
