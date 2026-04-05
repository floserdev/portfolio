import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatusCards from "@/components/StatusCards";
import Projects from "@/components/Projects";
import Technologies from "@/components/Technologies";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="max-w-[50rem] w-full mx-auto pt-16 flex-1 px-6 md:px-0">
        <Hero />
        <StatusCards />
        <Projects />
        <Technologies />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
