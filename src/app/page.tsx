import { About } from "@/components/About";
import { Curtain } from "@/components/Curtain";
import { DemoBadge } from "@/components/DemoBadge";
import { Experiences } from "@/components/Experiences";
import { Footer } from "@/components/Footer";
import { GallerySection } from "@/components/GallerySection";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Location } from "@/components/Location";
import { Motion } from "@/components/Motion";
import { Reservations } from "@/components/Reservations";
import { Rooms } from "@/components/Rooms";
import { photoSrc } from "@/lib/photos";

export default function Home() {
  return (
    <>
      <Curtain />
      <Header />
      <main>
        <Hero heroSrc={photoSrc("hero")} />
        <About />
        <Rooms />
        <GallerySection />
        <Experiences />
        <Location />
        <Reservations />
      </main>
      <Footer />
      <DemoBadge />
      <Motion />
    </>
  );
}
