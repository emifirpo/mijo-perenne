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
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";
import WAButton from "@/components/WAButton";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problema />
        <Marquee />
        <Solucion />
        <Stats />
        <Ciclo />
        <Sandro />
        <Oferta />
        <Respaldo />
        <Contacto />
      </main>
      <Footer />
      <WAButton />
    </>
  );
}
