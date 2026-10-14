import { Fragment, useImperativeHandle, useRef, useState, type Ref } from "react";
import portrait from "@/assets/portrait.jpg";
import { HERO_HEADLINE, PROFILE } from "@/constants/portfolio";
import useLineSplit from "@/hooks/use-line-split";
import { gsap, useGSAP } from "@/lib/gsap";
import { createHeroScene } from "../scenes/hero-scene";

type HeadlineWord = { text: string; tagline: boolean };

const HEADLINE_WORDS: HeadlineWord[] = [
  ...HERO_HEADLINE.lines.map((text) => ({ text, tagline: false })),
  { text: HERO_HEADLINE.tagline, tagline: true },
].flatMap(({ text, tagline }) =>
  text.split(" ").map((word) => ({ text: word, tagline }))
);

const FIRST_TAGLINE_WORD = HEADLINE_WORDS.findIndex((word) => word.tagline);

/** Word indices per source line, used until the rendered lines are measured. */
const SOURCE_LINES = [...HERO_HEADLINE.lines, HERO_HEADLINE.tagline].reduce<
  number[][]
>((lines, text) => {
  const start = lines.flat().length;
  lines.push(text.split(" ").map((_, i) => start + i));
  return lines;
}, []);

/** One headline line inside its own reveal mask. */
function HeadlineLine({ indices }: { indices: number[] }) {
  const { tagline } = HEADLINE_WORDS[indices[0]];
  const className = tagline
    ? `it text-[clamp(34px,4.6vw,92px)] leading-[1.05] mobile:text-[clamp(28px,7.4vw,56px)] ${
        indices[0] === FIRST_TAGLINE_WORD ? "mt-[.1em]" : ""
      }`
    : "disp text-[clamp(52px,7.4vw,150px)] mobile:text-[clamp(44px,12.5vw,96px)]";

  return (
    <span className="mask">
      <span data-hero-line className={className}>
        {indices.map((index, i) => (
          <Fragment key={index}>
            {i > 0 && " "}
            <span data-word>{HEADLINE_WORDS[index].text}</span>
          </Fragment>
        ))}
      </span>
    </span>
  );
}

export type HeroSectionHandle = {
  /** Reveals the headline and portrait; called as the splash clears. */
  playIntro: () => void;
};

type HeroSectionProps = {
  ready: boolean;
  ref?: Ref<HeroSectionHandle>;
};

function HeroSection({ ready, ref }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const introPlayedRef = useRef(false);
  const [webgl, setWebgl] = useState(false);

  // A phrase that wraps would otherwise share one mask, and the tight display
  // leading makes its lines collide; give every rendered line its own mask.
  const lines = useLineSplit(headlineRef, ready, { responsive: true });

  const { contextSafe } = useGSAP(
    () => {
      const canvas = canvasRef.current;
      if (!ready || !canvas) return;

      const disposeScene = createHeroScene(canvas, portrait);
      if (disposeScene) setWebgl(true);

      const scrollTrigger = {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      };
      gsap.to(copyRef.current, {
        y: () => window.innerHeight * 0.32,
        ease: "none",
        scrollTrigger,
      });
      gsap.to(canvas, {
        scale: 0.84,
        opacity: 0.35,
        yPercent: 8,
        ease: "none",
        scrollTrigger: { ...scrollTrigger },
      });

      // Hidden until the splash hands over (set after the scrub tween so it
      // keeps the fully visible state as its starting point).
      gsap.set(canvas, { opacity: 0, scale: 1.08 });

      return () => disposeScene?.();
    },
    { dependencies: [ready], scope: sectionRef }
  );

  // Lines stay hidden until the intro; lines re-split afterwards (on resize)
  // simply render in place.
  useGSAP(
    () => {
      if (!lines || introPlayedRef.current) return;
      gsap.set("[data-hero-line]", { yPercent: 110 });
    },
    { dependencies: [lines], scope: sectionRef }
  );

  useImperativeHandle(
    ref,
    () => ({
      playIntro: contextSafe(() => {
        introPlayedRef.current = true;
        gsap.to("[data-hero-line]", {
          yPercent: 0,
          duration: 1.3,
          stagger: 0.12,
          ease: "expo.out",
        });
        gsap.to(canvasRef.current, {
          opacity: 1,
          scale: 1,
          duration: 2.2,
          ease: "expo.out",
        });
      }),
    }),
    [contextSafe]
  );

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative h-screen min-h-[620px] overflow-hidden bg-surface-0"
    >
      <div
        ref={canvasRef}
        className="absolute top-0 right-0 h-full w-[60%] will-change-transform mobile:h-[74%] mobile:w-full [&>canvas]:block [&>canvas]:size-full"
      >
        <img
          src={portrait}
          alt={`Portrait of ${PROFILE.name}`}
          className={`size-full object-cover object-[center_20%] [mask-image:linear-gradient(to_right,transparent,#000_35%)] ${
            webgl ? "hidden" : ""
          }`}
        />
      </div>
      <div
        ref={copyRef}
        className="absolute bottom-[15vh] left-gx z-[2] mobile:right-gx mobile:bottom-[13vh]"
      >
        <h1 ref={headlineRef} className="text-[2em] font-normal">
          {(lines ?? SOURCE_LINES).map((indices) => (
            <HeadlineLine key={indices[0]} indices={indices} />
          ))}
        </h1>
      </div>
    </section>
  );
}

export default HeroSection;
