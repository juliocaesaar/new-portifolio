import { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import OpenSourceSection from "@/components/OpenSourceSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

export default function Home() {
  // Set up intersection observer to animate elements when they come into view
  useEffect(() => {
    useIntersectionObserver();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      
      <main>
        <HeroSection />
        <div className="relative">
          <AnimatedBackground />
          <AboutSection />
        </div>
        <div className="relative">
          <AnimatedBackground />
          <ExperienceSection />
        </div>
        <div className="relative">
          <AnimatedBackground />
          <ProjectsSection />
        </div>
        <div className="relative">
          <AnimatedBackground />
          <OpenSourceSection />
        </div>
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
}
