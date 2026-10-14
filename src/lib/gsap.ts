import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Mobile browsers resize the viewport as the address bar shows and hides;
// re-measuring every trigger on that is a common source of scroll jank.
ScrollTrigger.config({ ignoreMobileResize: true });

/**
 * Plays looping animations only while `trigger` is on screen, so marquees and
 * ambient motion cost nothing elsewhere on the page.
 */
function playWhileVisible(trigger: Element, animations: gsap.core.Animation[]) {
  const sync = (self: ScrollTrigger) =>
    animations.forEach((animation) => animation.paused(!self.isActive));
  const visibility = ScrollTrigger.create({
    trigger,
    start: "top bottom",
    end: "bottom top",
    onToggle: sync,
    // Toggle callbacks are muted while ScrollTrigger refreshes; resync after.
    onRefresh: sync,
  });
  sync(visibility);
  return visibility;
}

export { gsap, ScrollTrigger, useGSAP, playWhileVisible };
