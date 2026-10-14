import { useRef, type CSSProperties } from "react";
import { useSetAtom } from "jotai";
import CircleArrow from "@/components/circle-arrow";
import RevealWords from "@/components/reveal-words";
import { PROJECTS } from "@/constants/portfolio";
import useWordReveal from "@/hooks/use-word-reveal";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { hasFinePointer, prefersReducedMotion } from "@/utils/media";
import type { Project } from "@/types/portfolio";
import {
  activeProjectAtom,
  projectIndexVisibleAtom,
} from "../../../context/store";
import {
  renderCurl,
  resetCurl,
  sizeCurl,
  type Corner,
  type CurlElements,
} from "../scenes/page-curl";

const PART = "overflow-hidden pb-[.1em]";

// Projects are a stack of pages, earliest on top. Scrolling down peels the
// current page up from its bottom corner and turns it over; scrolling up
// brings the previous page back, curling in from its top corner.
const TURN_OVER = { corner: "bottom", duration: 1.25, ease: "power2.inOut" } as const;
const TURN_BACK = { corner: "top", duration: 1.05, ease: "power3.out" } as const;
const FLIP_STAGGER = 0.16;

const range = (from: number, to: number) =>
  Array.from({ length: to - from }, (_, i) => from + i);

function ProjectShot({ project }: { project: Project }) {
  return (
    <div data-media className="[perspective:1200px]">
      <div
        data-shot
        className="relative aspect-video overflow-hidden rounded-[10px] border border-[rgba(242,239,234,.07)] shadow-[0_60px_120px_-30px_rgba(0,0,0,.85)] will-change-transform"
      >
        {project.image ? (
          <img
            data-shot-inner
            src={project.image}
            loading="lazy"
            alt={`${project.title} screenshot`}
            className="absolute -inset-[4%] h-[108%] w-[108%] max-w-none object-cover"
          />
        ) : (
          <div
            data-shot-inner
            role="img"
            aria-label={`${project.title} placeholder`}
            style={{ "--h": project.hue } as CSSProperties}
            className="shot-placeholder absolute -inset-[4%] h-[108%] w-[108%]"
          >
            <span className="absolute bottom-[10%] left-[9%] font-mono text-[10px] tracking-[.2em] text-[rgba(242,239,234,.45)] uppercase">
              [ {project.name} — screenshot 16:9 ]
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/** One project printed on an opaque "page" that can be turned on desktop. */
function ProjectPage({ project }: { project: Project }) {
  return (
    <div
      data-page
      style={{ "--pbg": project.background } as CSSProperties}
      className="absolute inset-0 mobile:relative mobile:inset-auto"
    >
      <article
        data-page-sheet
        aria-label={project.title}
        className="relative flex h-full flex-col overflow-hidden bg-(--pbg) pt-[110px] pr-[calc(var(--spacing-gx)+90px)] pb-14 pl-gx will-change-transform mobile:h-auto mobile:min-h-screen mobile:px-gx mobile:pt-[100px] mobile:pb-16"
      >
        <div className="relative z-[2] flex justify-between gap-5">
          <div data-part className={PART}>
            <p className="label">
              <b>{project.number}</b> / Case study
            </p>
          </div>
          <div data-part className={PART}>
            <p className="label">{project.category}</p>
          </div>
        </div>

        <div className="relative z-[2] grid flex-1 grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-center gap-[5vw] mobile:grid-cols-1 mobile:content-center mobile:gap-11">
          <div>
            <div data-part className={PART}>
              <p className="font-mono text-[11px] leading-[1.6] tracking-[.2em] text-accent uppercase">
                {project.name}
              </p>
            </div>
            <div data-part className={PART}>
              <h3 className="it mt-[22px] mb-[18px] text-[clamp(44px,5.2vw,96px)] leading-[.95] text-balance">
                {project.title}
              </h3>
            </div>
            <div data-part className={PART}>
              <p className="it max-w-[24em] text-[clamp(18px,1.6vw,26px)] leading-[1.3] text-[rgba(242,239,234,.72)]">
                {project.description}
              </p>
            </div>
            <div data-part className="pb-[.1em]">
              <div className="mt-11 flex flex-wrap items-center gap-8">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener"
                  className="group flex items-center gap-[18px] font-mono text-[11px] tracking-[.25em] uppercase"
                >
                  View live project
                  <CircleArrow arrow="→" slide />
                </a>
              </div>
            </div>
          </div>
          <ProjectShot project={project} />
        </div>

        <div
          aria-hidden="true"
          className="disp pointer-events-none absolute -right-[1vw] -bottom-[8vw] z-[1] text-[34vw] leading-[.8] opacity-5"
        >
          {project.number}
        </div>

      </article>

      {/* The curl (desktop only), positioned on the fold line by page-curl.ts:
          the shadow on the page beneath, and the back of the paper. */}
      <div
        data-page-fold
        aria-hidden="true"
        className="pointer-events-none invisible absolute top-0 left-0 z-[5] origin-top-left mobile:hidden"
      >
        <div data-page-cast className="absolute" />
        <div className="[filter:drop-shadow(0_0_22px_rgba(0,0,0,.6))]">
          <div data-page-flap className="absolute" />
        </div>
      </div>
    </div>
  );
}

/**
 * "The approach" intro followed by the project showcase: pinned on desktop,
 * where scrolling turns the projects like pages; stacked slides on mobile.
 */
function WorkSection({ ready }: { ready: boolean }) {
  const introRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const setActiveProject = useSetAtom(activeProjectAtom);
  const setIndexVisible = useSetAtom(projectIndexVisibleAtom);

  // Declared before the showcase pin so its trigger is measured first.
  useWordReveal(headingRef, ready);

  useGSAP(
    () => {
      const intro = introRef.current;
      const section = projectsRef.current;
      if (!ready || !intro || !section) return;

      gsap.from(gsap.utils.toArray("[data-approach-reveal]", intro), {
        yPercent: 100,
        opacity: 0,
        duration: 1.3,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: intro, start: "top 65%" },
      });

      ScrollTrigger.create({
        trigger: intro,
        start: "top 40%",
        endTrigger: section,
        end: "bottom 60%",
        // Measure after the showcase pin below so its spacing is included.
        refreshPriority: -1,
        onToggle: (self) => setIndexVisible(self.isActive),
        // Toggle callbacks are muted while ScrollTrigger refreshes; resync after.
        onRefresh: (self) => setIndexVisible(self.isActive),
      });

      const pageEls = gsap.utils.toArray<HTMLElement>("[data-page]", section);
      const count = pageEls.length;
      setActiveProject(0);

      const mm = gsap.matchMedia();
      mm.add("(min-width: 901px)", () => {
        const stage = stageRef.current;
        if (!stage) return;

        const pages = pageEls.map((el, i) => {
          const part = (name: string) =>
            el.querySelector(`[data-page-${name}]`) as HTMLElement;
          // Earlier pages lie on top.
          gsap.set(el, { zIndex: count - i });
          return {
            els: {
              page: el,
              sheet: part("sheet"),
              fold: part("fold"),
              flap: part("flap"),
              cast: part("cast"),
            } satisfies CurlElements,
            // 0 = lying flat, 1 = turned over.
            turned: 0,
            corner: TURN_OVER.corner as Corner,
            tween: null as gsap.core.Tween | null,
          };
        });

        let width = stage.clientWidth;
        let height = stage.clientHeight;
        const draw = (page: (typeof pages)[number]) =>
          renderCurl(page.els, page.turned, page.corner, width, height);
        const observer = new ResizeObserver(() => {
          width = stage.clientWidth;
          height = stage.clientHeight;
          pages.forEach((page) => {
            sizeCurl(page.els, width, height);
            draw(page);
          });
        });
        observer.observe(stage);

        let current = 0;
        const turnTo = (next: number) => {
          if (next === current) return;
          const forward = next > current;
          const motion = forward ? TURN_OVER : TURN_BACK;
          // Skipping ahead flips several pages in quick succession, nearest first.
          const order = forward ? range(current, next) : range(next, current).reverse();

          order.forEach((index, step) => {
            const page = pages[index];
            // A page caught mid-turn keeps the corner it is already held by.
            if (page.turned <= 0 || page.turned >= 1) page.corner = motion.corner;
            page.tween?.kill();
            page.tween = gsap.to(page, {
              turned: forward ? 1 : 0,
              duration: prefersReducedMotion ? 0 : motion.duration,
              ease: motion.ease,
              delay: step * FLIP_STAGGER,
              onUpdate: () => draw(page),
            });
          });

          current = next;
          setActiveProject(next);
        };

        setActiveProject(0);

        ScrollTrigger.create({
          trigger: stage,
          start: "top top",
          end: () => "+=" + window.innerHeight * count,
          pin: true,
          onUpdate: (self) =>
            turnTo(Math.min(count - 1, Math.floor(self.progress * count))),
        });

        return () => {
          observer.disconnect();
          pages.forEach((page) => {
            page.tween?.kill();
            resetCurl(page.els);
          });
        };
      });
      mm.add("(max-width: 900px)", () => {
        pageEls.forEach((page) =>
          gsap.from(gsap.utils.toArray("[data-part] > *", page), {
            yPercent: 100,
            opacity: 0,
            stagger: 0.06,
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: { trigger: page, start: "top 70%" },
          }),
        );
      });

      // Pointer tilt: the frame rotates towards the cursor while the
      // oversized image inside drifts the other way.
      const cleanups: (() => void)[] = [];
      if (hasFinePointer) {
        gsap.utils
          .toArray<HTMLElement>("[data-media]", section)
          .forEach((media) => {
            const frame = media.querySelector<HTMLElement>("[data-shot]");
            const inner = media.querySelector<HTMLElement>("[data-shot-inner]");
            if (!frame || !inner) return;

            gsap.set(frame, { transformPerspective: 1200 });
            const rotateX = gsap.quickTo(frame, "rotationX", {
              duration: 0.8,
              ease: "power3.out",
            });
            const rotateY = gsap.quickTo(frame, "rotationY", {
              duration: 0.8,
              ease: "power3.out",
            });
            const moveX = gsap.quickTo(inner, "x", {
              duration: 1,
              ease: "power3.out",
            });
            const moveY = gsap.quickTo(inner, "y", {
              duration: 1,
              ease: "power3.out",
            });

            const onMove = (event: PointerEvent) => {
              const rect = media.getBoundingClientRect();
              const x = (event.clientX - rect.left) / rect.width - 0.5;
              const y = (event.clientY - rect.top) / rect.height - 0.5;
              rotateY(x * 12);
              rotateX(-y * 12);
              moveX(-x * 28);
              moveY(-y * 28);
            };
            const onLeave = () => {
              rotateX(0);
              rotateY(0);
              moveX(0);
              moveY(0);
            };

            media.addEventListener("pointermove", onMove);
            media.addEventListener("pointerleave", onLeave);
            cleanups.push(() => {
              media.removeEventListener("pointermove", onMove);
              media.removeEventListener("pointerleave", onLeave);
            });
          });
      }

      return () => {
        cleanups.forEach((cleanup) => cleanup());
        setIndexVisible(false);
      };
    },
    { dependencies: [ready] },
  );

  return (
    <>
      <section
        ref={introRef}
        id="work"
        className="flex min-h-screen flex-col items-center justify-center gap-[6vh] bg-surface-0 px-gx py-[15vh] text-center"
      >
        <div className="mask">
          <p data-approach-reveal className="label text-accent">
            [ The approach ]
          </p>
        </div>
        <h2
          ref={headingRef}
          className="font-serif text-[clamp(48px,7.5vw,136px)] leading-[.95] font-normal"
        >
          <span className="block">
            <RevealWords text="Software that scales," />
          </span>
          <span className="it block text-muted">
            <RevealWords text="by design." />
          </span>
        </h2>
        <div className="flex flex-col items-center gap-4">
          <span className="label">Selected work</span>
          <span className="relative h-[90px] w-px overflow-hidden bg-surface-3">
            <i className="absolute inset-0 animate-vline bg-fg motion-reduce:animate-none" />
          </span>
        </div>
      </section>

      <section ref={projectsRef} className="relative bg-surface-0">
        <div
          ref={stageRef}
          className="relative h-screen overflow-hidden mobile:h-auto"
        >
          {PROJECTS.map((project) => (
            <ProjectPage key={project.number} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}

export default WorkSection;
