import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { isLowEndDevice } from "@/utils/media";

// Blur is the expensive part of the effect; budget devices rise and fade only.
const HIDDEN = isLowEndDevice
  ? { yPercent: 45, opacity: 0.15 }
  : { yPercent: 45, opacity: 0.15, filter: "blur(6px)" };
const SHOWN = isLowEndDevice
  ? { yPercent: 0, opacity: 1 }
  : { yPercent: 0, opacity: 1, filter: "blur(0px)" };

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

      gsap.fromTo(el.querySelectorAll("[data-reveal-word]"), HIDDEN, {
        ...SHOWN,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "bottom 45%",
          scrub: 0.5,
        },
      });
    },
    { dependencies: [enabled] }
  );
}
