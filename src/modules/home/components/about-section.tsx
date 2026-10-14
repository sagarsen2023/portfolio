import { useRef } from "react";
import RevealWords from "@/components/reveal-words";
import { ABOUT_TEXT, PROFILE } from "@/constants/portfolio";
import useWordReveal from "@/hooks/use-word-reveal";
import { gsap, useGSAP } from "@/lib/gsap";

function AboutSection({ ready }: { ready: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  useWordReveal(paragraphRef, ready);
  useWordReveal(subRef, ready);

  useGSAP(
    () => {
      if (!ready) return;
      gsap.from("[data-reveal]", {
        yPercent: 110,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: { trigger: subRef.current, start: "top 85%" },
      });
    },
    { dependencies: [ready], scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-surface-1 px-gx pt-[24vh] pb-[22vh]"
    >
      <div className="ml-[clamp(0px,11vw,200px)] max-w-[900px] mobile:ml-0">
        <p className="label">
          <b>(</b> About <b>)</b>
        </p>
        <p
          ref={paragraphRef}
          className="mt-7 mb-[12vh] text-[clamp(28px,3.4vw,48px)] leading-[1.08] text-pretty"
        >
          <RevealWords text={ABOUT_TEXT} emphasisClassName="text-accent italic" />
        </p>
        <div ref={subRef}>
          <div className="mask">
            <p data-reveal className="label">
              {PROFILE.role} at {PROFILE.company} · {PROFILE.location}.
            </p>
          </div>
          <p className="it mt-3.5 text-[clamp(40px,5.6vw,96px)] leading-none">
            <RevealWords text="Design to deployment." />
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
