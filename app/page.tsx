import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";

// Lazy load below-the-fold components
const Stats = dynamic(() => import("@/components/sections/Stats"));
const About = dynamic(() => import("@/components/sections/About"));
const Projects = dynamic(() => import("@/components/sections/Projects"));
const Services = dynamic(() => import("@/components/sections/Services"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const TechStack = dynamic(() => import("@/components/sections/TechStack"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

// Enable Incremental Static Regeneration (ISR) - Revalidate page every 1 day (86,400 seconds)
export const revalidate = 86400;

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

