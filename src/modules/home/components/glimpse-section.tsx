import { Fragment, useRef } from "react";
import RevealWords from "@/components/reveal-words";
import { GLIMPSE_ROWS, LINKS } from "@/constants/portfolio";
import useWordReveal from "@/hooks/use-word-reveal";
import { gsap, playWhileVisible, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { isLowEndDevice, prefersReducedMotion } from "@/utils/media";

/** "Only the beginning": scroll-boosted marquees of more work and topics. */
function GlimpseSection({ ready }: { ready: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useWordReveal(headingRef, ready);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!ready || !section) return;

      // The glows swell as the section scrolls past and, on capable devices,
      // orbit slowly.
      const orbit = isLowEndDevice
        ? null
        : gsap.to(glowRef.current, {
            rotation: 360,
            duration: 90,
            repeat: -1,
            ease: "none",
          });
      gsap.fromTo(
        glowRef.current,
        { scale: 0.6 },
        {
          scale: 1.3,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      gsap.from("[data-reveal]", {
        yPercent: 100,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: { trigger: headRef.current, start: "top 85%" },
      });

      // Alternate directions per row; scroll velocity briefly speeds them up.
      const tracks = gsap.utils
        .toArray<HTMLElement>("[data-track]")
        .map((track, i) =>
          i % 2
            ? gsap.fromTo(
                track,
                { xPercent: -50 },
                { xPercent: 0, duration: 46, ease: "none", repeat: -1 }
              )
            : gsap.to(track, {
                xPercent: -50,
                duration: 40 + i * 4,
                ease: "none",
                repeat: -1,
              })
        );
      const loops = orbit ? [...tracks, orbit] : tracks;
      if (prefersReducedMotion) loops.forEach((loop) => loop.pause());
      else playWhileVisible(section, loops);

      // The boost decays on the ticker only while there is boost left.
      let boost = 0;
      let decaying = false;
      const decay = () => {
        boost *= 0.9;
        if (boost < 0.01) {
          boost = 0;
          decaying = false;
          gsap.ticker.remove(decay);
        }
        tracks.forEach((tween) => tween.timeScale(1 + boost));
      };
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          boost = Math.max(
            boost,
            Math.min(Math.abs(self.getVelocity()) / 250, 8)
          );
          if (boost > 0.01 && !decaying) {
            decaying = true;
            gsap.ticker.add(decay);
          }
        },
      });

      return () => gsap.ticker.remove(decay);
    },
    { dependencies: [ready], scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-surface-0 pt-[18vh] pb-[10vh]"
    >
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -mt-[55vh] -ml-[55vh] size-[110vh] will-change-transform"
      >
        {/* Soft radial gradients read as blurred light without a blur filter. */}
        <span className="absolute top-[3%] left-[1%] size-[66%] bg-[radial-gradient(closest-side,rgba(166,255,0,.16),transparent)]" />
        <span className="absolute top-[25%] -right-[1%] size-[60%] bg-[radial-gradient(closest-side,rgba(38,140,104,.22),transparent)]" />
        <span className="absolute -bottom-[2%] left-[22%] size-[52%] bg-[radial-gradient(closest-side,rgba(242,239,234,.06),transparent)]" />
      </div>

      <div ref={headRef} className="relative mb-[10vh] px-gx">
        <div className="mask">
          <p data-reveal className="label">
            <b>(</b> More <b>)</b>
          </p>
        </div>
        <h2
          ref={headingRef}
          className="mt-5 font-serif text-[clamp(44px,6vw,110px)] leading-[.95] font-normal"
        >
          <span className="block">
            <RevealWords text="And that's" />
          </span>
          <span className="it block text-muted">
            <RevealWords text="only the beginning." />
          </span>
        </h2>
      </div>

      <div>
        {GLIMPSE_ROWS.map((row, rowIndex) => (
          <div key={rowIndex} className="relative overflow-hidden">
            <div data-track className="flex w-max items-center">
              {[0, 1].map((copy) =>
                row.map((label) => (
                  <Fragment key={`${copy}-${label}`}>
                    <span
                      data-cursor-hover
                      aria-hidden={copy === 1 || undefined}
                      className="px-[.16em] font-display text-[clamp(64px,10vw,190px)] leading-[1.02] whitespace-nowrap text-fg uppercase [-webkit-text-stroke:1px_transparent] [transition:color_.35s,-webkit-text-stroke-color_.35s] hover:text-transparent hover:[-webkit-text-stroke-color:var(--color-fg)]"
                    >
                      {label}
                    </span>
                    <i className="mx-[.8vw] size-3.5 flex-none bg-muted opacity-45" />
                  </Fragment>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex justify-between gap-5 px-gx pt-[10vh] font-mono text-[11px] tracking-[.25em] uppercase">
        <a href={LINKS.github} target="_blank" rel="noopener">
          (And more on) <u className="underline-offset-[5px]">GitHub ↗</u>
        </a>
        <a href={LINKS.github} target="_blank" rel="noopener">
          See all projects →
        </a>
      </div>
    </section>
  );
}

export default GlimpseSection;
