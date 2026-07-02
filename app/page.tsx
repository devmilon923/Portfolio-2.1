import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import TechStack from "@/components/sections/TechStack";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-void">
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Projects />
      <Services />
      <Testimonials />
      <TechStack />
      <Contact />
      <Footer />
    </main>
  );
}
