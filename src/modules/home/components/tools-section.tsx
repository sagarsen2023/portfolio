import { Fragment, useRef } from "react";
import { TOOLS } from "@/constants/portfolio";
import { gsap, playWhileVisible, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/utils/media";

/** "Tools I work with": an endless marquee that slows down under the pointer. */
function ToolsSection({ ready }: { ready: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const marqueeEl = marqueeRef.current;
      if (!ready || !section || !marqueeEl) return;

      // Duration scales with the list so the scroll speed stays constant.
      const marquee = gsap.to("[data-marquee-track]", {
        xPercent: -50,
        duration: TOOLS.length * 2.7,
        ease: "none",
        repeat: -1,
      });
      const slowDown = () => gsap.to(marquee, { timeScale: 0.25, duration: 0.6 });
      const speedUp = () => gsap.to(marquee, { timeScale: 1, duration: 0.6 });
      marqueeEl.addEventListener("pointerenter", slowDown);
      marqueeEl.addEventListener("pointerleave", speedUp);
      if (prefersReducedMotion) marquee.pause();
      else playWhileVisible(section, [marquee]);

      return () => {
        marqueeEl.removeEventListener("pointerenter", slowDown);
        marqueeEl.removeEventListener("pointerleave", speedUp);
      };
    },
    { dependencies: [ready], scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="flex flex-col items-center gap-7 overflow-hidden bg-surface-1 pt-[16vh] pb-[12vh]"
    >
      <p className="label">Tools I work with</p>
      <div
        ref={marqueeRef}
        className="w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]"
      >
        <div data-marquee-track className="flex w-max items-center">
          {[0, 1].map((copy) =>
            TOOLS.map((tool) => (
              <Fragment key={`${copy}-${tool}`}>
                <span
                  data-cursor-hover
                  aria-hidden={copy === 1 || undefined}
                  className="px-[.45em] font-display text-[clamp(32px,4.4vw,72px)] leading-[1.1] text-muted uppercase [transition:color_.4s] hover:text-fg"
                >
                  {tool}
                </span>
                <i className="size-1.5 flex-none rounded-full bg-surface-3" />
              </Fragment>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default ToolsSection;
