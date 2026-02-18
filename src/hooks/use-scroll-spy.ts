import { useState, useEffect, useRef } from "react";

function getAbsoluteTop(el: HTMLElement): number {
  return el.getBoundingClientRect().top + window.scrollY;
}

export function useScrollSpy(
  sectionIds: string[],
  options?: { threshold?: number }
) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { threshold = 0.3 } = options || {};
  const idsRef = useRef(sectionIds);
  idsRef.current = sectionIds;

  useEffect(() => {
    let ticking = false;

    const checkVisibility = () => {
      const elements = idsRef.current
        .map((id) => document.getElementById(id))
        .filter(Boolean) as HTMLElement[];

      if (elements.length === 0) return;

      // Use getBoundingClientRect for absolute position (offsetTop is relative
      // to the nearest positioned parent, which breaks inside "relative" wrappers)
      const sections = elements.map((el) => ({
        id: el.id,
        top: getAbsoluteTop(el),
        bottom: getAbsoluteTop(el) + el.offsetHeight,
      }));
      sections.sort((a, b) => a.top - b.top);

      const scrollPosition = window.scrollY + window.innerHeight * threshold;

      // Find the most specific section that contains the scroll position.
      // Iterating backwards prefers nested elements (#services inside #experience)
      // only while the scroll position is actually within their bounds.
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].top <= scrollPosition && scrollPosition <= sections[i].bottom) {
          setActiveId(sections[i].id);
          return;
        }
      }

      // Fallback: last section whose top we've scrolled past
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].top <= scrollPosition) {
          setActiveId(sections[i].id);
          return;
        }
      }

      setActiveId(sections[0].id);
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          checkVisibility();
          ticking = false;
        });
        ticking = true;
      }
    };

    checkVisibility();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [threshold]);

  return activeId;
}
