import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Scroll-scrubbed word reveal: each `[data-reveal-word]` inside `ref` rises
 * out of a blur as the element travels up the viewport.
 *
 * Call it in document order relative to pinned sections (like any other
 * ScrollTrigger) so its positions account for the pins above it.
 */
export default function useWordReveal(
  ref: RefObject<HTMLElement | null>,
  enabled: boolean
) {
  useGSAP(
    () => {
      const el = ref.current;
      if (!enabled || !el) return;

      gsap.fromTo(
        el.querySelectorAll("[data-reveal-word]"),
        { yPercent: 45, opacity: 0.15, filter: "blur(8px)" },
        {
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            end: "bottom 42%",
            scrub: 1,
          },
        }
      );
    },
    { dependencies: [enabled] }
  );
}
