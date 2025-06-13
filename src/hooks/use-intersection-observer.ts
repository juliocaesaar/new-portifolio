import { useEffect } from 'react';

export function useIntersectionObserver() {
  useEffect(() => {
    const setupAnimations = () => {
      const elements = document.querySelectorAll("section > div > *:not(div)");
      elements.forEach(element => {
        if (!element.hasAttribute("data-animate")) {
          element.setAttribute("data-animate", "true");
          element.classList.add("opacity-0", "translate-y-4", "transition-all", "duration-700");
        }
      });
    };

    const animateOnScroll = () => {
      const animatedElements = document.querySelectorAll("[data-animate]");

      if (animatedElements.length === 0) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      animatedElements.forEach(element => {
        observer.observe(element);
      });

      return () => {
        animatedElements.forEach(element => {
          observer.unobserve(element);
        });
      };
    };

    // Initialize animations
    setupAnimations();
    const cleanup = animateOnScroll();

    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount
}
