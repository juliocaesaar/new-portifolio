import { useState, useEffect } from "react";
import { debounce } from "@/lib/utils";

export function useScrollSpy(
  sectionIds: string[],
  options?: { threshold?: number }
) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { threshold = 0.3 } = options || {};

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const checkVisibility = debounce(() => {
      const scrollPosition = window.scrollY + window.innerHeight * threshold;

      // Find the last section that is above our current position
      for (let i = elements.length - 1; i >= 0; i--) {
        const section = elements[i];
        if (section.offsetTop <= scrollPosition) {
          setActiveId(section.id);
          return;
        }
      }

      // If no section is found, default to the first one
      setActiveId(elements[0].id);
    }, 100);

    checkVisibility();
    window.addEventListener("scroll", checkVisibility);
    window.addEventListener("resize", checkVisibility);

    return () => {
      window.removeEventListener("scroll", checkVisibility);
      window.removeEventListener("resize", checkVisibility);
    };
  }, [sectionIds, threshold]);

  return activeId;
}
