import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problema from "@/components/Problema";
import Marquee from "@/components/Marquee";
import Solucion from "@/components/Solucion";
import Stats from "@/components/Stats";
import Ciclo from "@/components/Ciclo";
import Sandro from "@/components/Sandro";
import Oferta from "@/components/Oferta";
import Respaldo from "@/components/Respaldo";
import Footer from "@/components/Footer";
import WAButton from "@/components/WAButton";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        {/*
         * Wrapper sobre el hero sticky.
         * position: relative + z-index: 1 → se pinta encima del hero (z-index: 0).
         * background-color → tapa el negro del hero en secciones sin fondo propio
         * (ej. Marquee, que es transparente y muestra lo que hay detrás).
         */}
        <div style={{ position: "relative", zIndex: 1, backgroundColor: "var(--color-base)" }}>
          <Problema />
          <Marquee />
          <Solucion />
          <Stats />
          <Ciclo />
          <Sandro />
          <Oferta />
          <Respaldo />
        </div>
      </main>
      <Footer />
      <WAButton />
    </>
  );
}
