import { useRef } from "react";
import LocalClock from "@/components/local-clock";
import RevealWords from "@/components/reveal-words";
import { LINKS, PROFILE, SERVICES } from "@/constants/portfolio";
import useWordReveal from "@/hooks/use-word-reveal";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { createGlobeScene } from "../scenes/globe-scene";

const pad = (n: number) => String(n).padStart(2, "0");

const toggleFullscreen = (el: HTMLElement | null) => {
  if (document.fullscreenElement) document.exitFullscreen();
  else el?.requestFullscreen?.();
};

/**
 * "What I do": a card with a point globe that grows to fill the viewport while
 * pinned, then steps through each service as the page scrolls.
 */
function ServicesSection({ ready }: { ready: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const arrowPathRef = useRef<SVGPathElement>(null);
  const uiRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);

  // Declared before the pin below so its trigger is measured first.
  useWordReveal(headRef, ready);

  useGSAP(
    (_, contextSafe) => {
      const card = cardRef.current;
      const canvas = canvasRef.current;
      const arrowPath = arrowPathRef.current;
      if (!ready || !card || !canvas || !arrowPath || !contextSafe) return;

      const disposeGlobe = createGlobeScene(canvas, card);

      gsap.set(card, { xPercent: -50, yPercent: -50 });
      gsap.set(uiRef.current, { autoAlpha: 0 });

      const length = arrowPath.getTotalLength();
      gsap.set(arrowPath, { strokeDasharray: length, strokeDashoffset: length });
      ScrollTrigger.create({
        trigger: card,
        start: "top 75%",
        once: true,
        onEnter: contextSafe(() =>
          gsap.to(arrowPath, {
            strokeDashoffset: 0,
            duration: 1.6,
            ease: "expo.out",
            delay: 0.3,
          })
        ),
      });

      gsap.from(labelRef.current, {
        yPercent: 100,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: headRef.current, start: "top 85%" },
      });

      const rows = gsap.utils.toArray<HTMLElement>("[data-service-row]");
      gsap.set(rows, { autoAlpha: 0 });

      // The card is laid out at its full-screen size and starts scaled down to
      // the design's resting size, so growing it is a pure GPU transform: no
      // per-frame layout, shadow repaint or WebGL buffer resize.
      const restingScale = () => {
        const mobile = window.matchMedia("(max-width: 900px)").matches;
        const vw = window.innerWidth / 100;
        const vh = window.innerHeight / 100;
        const width = mobile ? 88 * vw : 60 * vw;
        const height = mobile ? 56 * vh : Math.min(34 * vw, 56 * vh);
        return { x: width / card.offsetWidth, y: height / card.offsetHeight };
      };
      // Undo the card's uneven scale on the arrow so it never looks squashed.
      const arrowScaleX = () => {
        const { x, y } = restingScale();
        return y / x;
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: "top top",
          end: () => "+=" + window.innerHeight * 6.5,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      tl.fromTo(
        card,
        { scaleX: () => restingScale().x, scaleY: () => restingScale().y },
        { scaleX: 1, scaleY: 1, ease: "power2.inOut", duration: 1 }
      )
        .fromTo(
          arrowRef.current,
          { opacity: 1, scaleX: arrowScaleX },
          { opacity: 0, scaleX: arrowScaleX, duration: 0.25 },
          0
        )
        .to(uiRef.current, { autoAlpha: 1, duration: 0.3 }, 0.85);

      let at = 1.25;
      rows.forEach((row, i) => {
        const q = gsap.utils.selector(row);
        const [title] = q("[data-service-title]");
        const [tagline] = q("[data-service-tagline]");
        const [pill] = q("[data-service-pill]");
        const [dot] = q("[data-service-pill] > i");
        const [count] = q("[data-service-count]");

        tl.set(row, { autoAlpha: 1 }, at)
          .fromTo(
            title,
            { yPercent: 110, skewY: 7 },
            { yPercent: 0, skewY: 0, duration: 0.5, ease: "power3.out" },
            at
          )
          .fromTo(
            tagline,
            { yPercent: -110, skewY: -7 },
            { yPercent: 0, skewY: 0, duration: 0.5, ease: "power3.out" },
            at + 0.08
          )
          .fromTo(
            pill,
            { scaleY: 0, transformOrigin: "50% 100%" },
            { scaleY: 1, duration: 0.5, ease: "expo.out" },
            at
          )
          .fromTo(count, { opacity: 0 }, { opacity: 1, duration: 0.3 }, at + 0.2)
          .fromTo(
            dot,
            { top: "18%" },
            { top: "82%", duration: 1.3, ease: "none" },
            at
          );

        if (i < rows.length - 1) {
          tl.to(
            title,
            { yPercent: -110, duration: 0.4, ease: "power3.in" },
            at + 1
          )
            .to(
              tagline,
              { yPercent: 110, duration: 0.4, ease: "power3.in" },
              at + 1
            )
            .to(
              pill,
              {
                scaleY: 0,
                transformOrigin: "50% 0%",
                duration: 0.4,
                ease: "power3.in",
              },
              at + 1
            )
            .to(count, { opacity: 0, duration: 0.2 }, at + 1)
            .set(row, { autoAlpha: 0 }, at + 1.42);
        }
        at += 1.5;
      });
      tl.to({}, { duration: 0.5 });

      return () => disposeGlobe?.();
    },
    { dependencies: [ready], scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative bg-fg text-ink"
    >
      <div
        ref={headRef}
        className="flex flex-col items-center gap-[22px] overflow-hidden px-gx pt-[18vh] pb-[5vh] text-center"
      >
        <p ref={labelRef} className="label text-ink-muted [&_b]:text-ink">
          <b>(</b> What I do <b>)</b>
        </p>
        <h2 className="flex flex-wrap items-baseline justify-center gap-x-[.25em] text-[clamp(40px,5vw,88px)] leading-[.95] font-normal">
          <span className="disp leading-none">
            <RevealWords text="Five disciplines," />
          </span>{" "}
          <span className="it text-ink">
            <RevealWords text="one engineer." />
          </span>
        </h2>
        <p className="max-w-[30em] font-serif text-[clamp(18px,1.5vw,24px)] leading-[1.35] text-pretty text-ink-muted">
          <RevealWords text="From the interface you touch to the infrastructure you never see. Scroll to see how each layer fits together." />
        </p>
      </div>

      <div ref={stageRef} className="relative h-screen overflow-hidden">
        <div
          ref={cardRef}
          className="absolute top-1/2 left-1/2 z-[2] h-[calc(100%-32px)] w-[calc(100%-32px)] overflow-hidden rounded-[14px] bg-black text-fg shadow-[0_86px_200px_-50px_rgba(0,0,0,.45)] will-change-transform [&:fullscreen]:rounded-none"
        >
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="absolute inset-0 block size-full"
          />
          <svg
            ref={arrowRef}
            viewBox="0 0 100 100"
            aria-hidden="true"
            className="absolute top-[9%] right-[6%] w-[clamp(70px,8.75vw,140px)] origin-top-right fill-none stroke-accent [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:5]"
          >
            <path ref={arrowPathRef} d="M18 18 L80 80 M80 34 L80 80 L34 80" />
          </svg>

          <div ref={uiRef} className="absolute inset-0">
            <div
              aria-hidden="true"
              className="absolute top-5 left-1/2 flex -translate-x-1/2 gap-1 rounded-full border border-[rgba(242,239,234,.08)] bg-[rgba(26,26,26,.75)] p-1 backdrop-blur-[10px]"
            >
              <button
                type="button"
                tabIndex={-1}
                className="grid size-[34px] place-items-center rounded-full bg-[rgba(242,239,234,.1)]"
              >
                <span className="size-2.5 rounded-[2px] border border-current" />
              </button>
              <button
                type="button"
                tabIndex={-1}
                className="grid size-[34px] place-items-center rounded-full"
              >
                <span className="size-2.5 rounded-full border border-current" />
              </button>
            </div>

            <div className="absolute inset-0 grid place-items-center">
              {SERVICES.map((service, i) => (
                <div
                  key={service.title}
                  data-service-row
                  className="grid w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-[clamp(16px,2.4vw,44px)] px-[5%] [grid-area:1/1] mobile:grid-cols-1 mobile:justify-items-center mobile:gap-3"
                >
                  <div className="disp text-right text-[clamp(36px,6vw,112px)] mobile:text-center">
                    <span className="ln">
                      <span data-service-title>{service.title}</span>
                    </span>
                  </div>
                  <div
                    data-service-pill
                    className="relative h-[clamp(140px,17vw,280px)] w-[clamp(56px,5.4vw,96px)] overflow-hidden rounded-full border border-[rgba(242,239,234,.22)] bg-[linear-gradient(180deg,rgba(166,255,0,0),rgba(166,255,0,.14))] backdrop-blur-[6px] mobile:h-[84px] mobile:w-10"
                  >
                    <i className="absolute top-1/2 left-1/2 aspect-square w-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_30px_var(--color-accent)]" />
                  </div>
                  <div className="it text-[clamp(24px,3.3vw,60px)] leading-[.95] text-accent uppercase mobile:text-center">
                    <span className="ln">
                      <span data-service-tagline>{service.tagline}</span>
                    </span>
                  </div>
                  <span
                    data-service-count
                    className="absolute top-[calc(50%+clamp(90px,10.5vw,170px))] left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[.25em] text-muted mobile:hidden"
                  >
                    {pad(i + 1)} / {pad(SERVICES.length)}
                  </span>
                </div>
              ))}
            </div>

            <div className="absolute inset-x-0 bottom-[76px] flex justify-center mobile:bottom-[120px]">
              <button
                type="button"
                data-magnetic
                aria-label="Toggle fullscreen"
                onClick={() => toggleFullscreen(cardRef.current)}
                className="inline-flex h-10 items-center gap-2.5 rounded-full border border-[rgba(242,239,234,.3)] bg-[rgba(5,5,5,.5)] px-[18px] font-mono text-[10px] tracking-[.25em] uppercase backdrop-blur-[10px]"
              >
                ⛶ Fullscreen
              </button>
            </div>

            <div className="absolute right-7 bottom-6 left-7 grid grid-cols-4 gap-5 font-display text-[13px] leading-[1.3] tracking-[.06em] uppercase mobile:grid-cols-[1fr_1fr] mobile:text-[11px]">
              <div>
                <span className="text-muted">Social:</span>{" "}
                <a href={LINKS.github} target="_blank" rel="noopener">
                  GitHub
                </a>{" "}
                /{" "}
                <a href={LINKS.linkedin} target="_blank" rel="noopener">
                  LinkedIn
                </a>
              </div>
              <div className="text-center mobile:text-left">
                <span className="text-muted">Location:</span>{" "}
                {PROFILE.location} —{" "}
                <LocalClock timeZone={PROFILE.timeZone} className="text-fg" />
              </div>
              <div className="text-center mobile:text-left">
                <span className="text-muted">Stack:</span> {PROFILE.stack}
              </div>
              <div className="text-right mobile:text-left">
                <span className="text-muted">Contact:</span>{" "}
                <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
