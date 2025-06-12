import { useEffect, lazy, Suspense } from "react"; // Importar lazy e Suspense
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AnimatedBackground from "@/components/AnimatedBackground";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

// Lazy load components
const AboutSection = lazy(() => import("@/components/AboutSection"));
const ExperienceSection = lazy(() => import("@/components/ExperienceSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const OpenSourceSection = lazy(() => import("@/components/OpenSourceSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

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
        <Suspense fallback={<div>Loading About...</div>}> {/* Adicionar Suspense */}
          <div className="relative">
            <AnimatedBackground />
            <AboutSection />
          </div>
        </Suspense>
        <Suspense fallback={<div>Loading Experience...</div>}> {/* Adicionar Suspense */}
          <div className="relative">
            <AnimatedBackground />
            <ExperienceSection />
          </div>
        </Suspense>
        <Suspense fallback={<div>Loading Projects...</div>}> {/* Adicionar Suspense */}
          <div className="relative">
            <AnimatedBackground />
            <ProjectsSection />
          </div>
        </Suspense>
        <Suspense fallback={<div>Loading Open Source...</div>}> {/* Adicionar Suspense */}
          <div className="relative">
            <AnimatedBackground />
            <OpenSourceSection />
          </div>
        </Suspense>
        <Suspense fallback={<div>Loading Contact...</div>}> {/* Adicionar Suspense */}
          <ContactSection />
        </Suspense>
      </main>
      
      <Suspense fallback={<div>Loading Footer...</div>}> {/* Adicionar Suspense */}
        <Footer />
      </Suspense>
    </div>
  );
}
