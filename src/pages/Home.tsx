import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AnimatedBackground from "@/components/AnimatedBackground";

const AboutSection = lazy(() => import("@/components/AboutSection"));
const ExperienceSection = lazy(() => import("@/components/ExperienceSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />

      <main>
        <HeroSection />
        <Suspense fallback={null}>
          <div className="relative overflow-hidden">
            <AnimatedBackground />
            <ProjectsSection />
          </div>
        </Suspense>
        <Suspense fallback={null}>
          <div className="relative overflow-hidden">
            <AnimatedBackground />
            <AboutSection />
          </div>
        </Suspense>
        <Suspense fallback={null}>
          <div className="relative overflow-hidden">
            <AnimatedBackground />
            <ExperienceSection />
          </div>
        </Suspense>
        <Suspense fallback={null}>
          <ContactSection />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
