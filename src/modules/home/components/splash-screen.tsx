import { useMemo, useRef, type RefObject } from "react";
import { PROFILE } from "@/constants/portfolio";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/utils/media";

const SHEEN_ID = "splash-sheen";
const GLYPH_SIZE = 200;
const WORD_GAP = 48;

type SplashScreenProps = {
  ready: boolean;
  /** Element the drawn name flies into as the splash clears. */
  logoTargetRef: RefObject<HTMLElement | null>;
  /** Called mid-exit, when the page underneath should start revealing. */
  onReveal: () => void;
  onComplete: () => void;
};

/**
 * Draws the name stroke by stroke, fills it with a sheen, then flies it into
 * the header wordmark while the backdrop wipes up.
 */
function SplashScreen({
  ready,
  logoTargetRef,
  onReveal,
  onComplete,
}: SplashScreenProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const groupRef = useRef<SVGGElement>(null);
  const gradientRef = useRef<SVGLinearGradientElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const roleLineRef = useRef<HTMLElement>(null);
  const glyphs = useMemo(
    () => [...PROFILE.name].filter((char) => char !== " "),
    []
  );

  useGSAP(
    (context, contextSafe) => {
      if (!ready || !contextSafe) return;

      // GSAP runs timeline callbacks inside the context that created them.
      // The parent's callbacks animate other components, so step outside the
      // splash context or their animations would be reverted with it.
      const reveal = () => context.ignore(onReveal);
      const finish = () =>
        context.ignore(() => {
          document.documentElement.classList.remove("is-loading");
          onComplete();
        });

      if (prefersReducedMotion) {
        finish();
        reveal();
        return;
      }

      const svg = svgRef.current;
      const group = groupRef.current;
      const gradient = gradientRef.current;
      const logo = logoRef.current;
      if (!svg || !group || !gradient || !logo) return;

      // Lay the glyphs out by hand so each letter can be drawn on its own.
      const letters = Array.from(group.querySelectorAll("text"));
      let x = 0;
      let index = 0;
      for (const char of PROFILE.name) {
        if (char === " ") {
          x += WORD_GAP;
          continue;
        }
        const letter = letters[index++];
        letter.setAttribute("x", String(x));
        x += letter.getComputedTextLength() - 1;
      }

      const box = group.getBBox();
      svg.setAttribute(
        "viewBox",
        `${box.x - 4} ${box.y - 4} ${box.width + 8} ${box.height + 8}`
      );
      const first = letters[0].getBBox();
      gradient.setAttribute("y1", String(first.y));
      gradient.setAttribute("y2", String(first.y + first.height));
      gsap.set(logo, { xPercent: -50, yPercent: -50 });

      const exit = contextSafe(() => {
        const from = svg.getBoundingClientRect();
        const to = logoTargetRef.current?.getBoundingClientRect() ?? from;
        gsap
          .timeline({ onComplete: finish })
          .to(roleRef.current, { opacity: 0, y: -10, duration: 0.3 })
          .to(
            logo,
            {
              x: `+=${to.left + to.width / 2 - (from.left + from.width / 2)}`,
              y: `+=${to.top + to.height / 2 - (from.top + from.height / 2)}`,
              scale: to.width / from.width,
              duration: 1,
              ease: "expo.inOut",
            },
            0
          )
          .to(letters, { strokeWidth: 0, duration: 0.45 }, 0)
          .to(
            backdropRef.current,
            { clipPath: "inset(0 0 100% 0)", duration: 0.95, ease: "expo.inOut" },
            0.12
          )
          .add(reveal, 0.55)
          .add(
            () => document.documentElement.classList.remove("is-loading"),
            0.95
          )
          .to(logo, { opacity: 0, duration: 0.12 }, 1);
      });

      gsap
        .timeline()
        .to(letters, {
          strokeDashoffset: 0,
          duration: 0.8,
          stagger: 0.06,
          ease: "power2.inOut",
        })
        .to(letters, { fillOpacity: 1, duration: 0.45, ease: "power2.out" })
        .add(() => {
          letters[0].style.fill = `url(#${SHEEN_ID})`;
        }, "<")
        .fromTo(
          gradient,
          {
            attr: {
              x1: first.x - first.width * 1.2,
              x2: first.x - first.width * 0.2,
            },
          },
          {
            attr: {
              x1: first.x + first.width * 1.2,
              x2: first.x + first.width * 2.2,
            },
            duration: 0.8,
            ease: "power2.inOut",
          },
          "<"
        )
        .to(roleRef.current, { opacity: 1, duration: 0.5 }, "<.1")
        .to(
          roleLineRef.current,
          { scaleX: 1, duration: 0.6, ease: "expo.out" },
          "<.12"
        )
        .to({}, { duration: 0.2 })
        .add(exit);
    },
    { dependencies: [ready] }
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9500]"
    >
      <div
        ref={backdropRef}
        className="pointer-events-auto absolute inset-0 bg-surface-0"
      />
      <div
        ref={logoRef}
        className="absolute top-1/2 left-1/2 w-[min(84vw,1180px)]"
      >
        <svg
          ref={svgRef}
          xmlns="http://www.w3.org/2000/svg"
          className="block h-auto w-full overflow-visible"
        >
          <defs>
            <linearGradient
              ref={gradientRef}
              id={SHEEN_ID}
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1="0"
              x2="100"
              y2="200"
            >
              <stop offset="0" stopColor="#ffffff" />
              <stop offset=".42" stopColor="#ffffff" />
              <stop offset=".5" stopColor="#8f8f8f" />
              <stop offset=".58" stopColor="#ffffff" />
              <stop offset="1" stopColor="#ffffff" />
            </linearGradient>
          </defs>
          <g ref={groupRef}>
            {glyphs.map((glyph, i) => (
              <text
                key={i}
                y={0}
                fontSize={GLYPH_SIZE}
                className="fill-white stroke-white font-display [fill-opacity:0] [stroke-dasharray:1600] [stroke-dashoffset:1600] [stroke-width:.9]"
              >
                {glyph}
              </text>
            ))}
          </g>
        </svg>
        <div
          ref={roleRef}
          className="absolute top-full right-0 mt-[1.6vw] font-serif text-[clamp(12px,1.25vw,18px)] tracking-[.38em] uppercase italic opacity-0"
        >
          {PROFILE.role}
          <i
            ref={roleLineRef}
            className="mt-2.5 block h-px origin-left bg-accent [transform:scaleX(0)]"
          />
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;
