import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { hasFinePointer } from "@/utils/media";

const HOVER_TARGETS = "a,button,input,[data-cursor-hover]";

/** Dot that tracks the pointer exactly, plus a ring that trails and stretches. */
function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    const onPointerMove = (event: PointerEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      gsap.set(dot, { x: mouseX, y: mouseY });
    };

    const follow = () => {
      const prevX = ringX;
      const prevY = ringY;
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      const vx = ringX - prevX;
      const vy = ringY - prevY;
      const velocity = Math.min(Math.hypot(vx, vy), 45);
      gsap.set(ring, {
        x: ringX,
        y: ringY,
        rotation:
          velocity > 0.4
            ? Math.atan2(vy, vx) * 57.3
            : gsap.getProperty(ring, "rotation"),
        scaleX: 1 + velocity / 45,
        scaleY: 1 - velocity / 140,
      });
    };

    const onPointerOver = (event: PointerEvent) => {
      const target = event.target as Element | null;
      ring.toggleAttribute("data-hover", !!target?.closest?.(HOVER_TARGETS));
    };

    const root = document.documentElement;
    const hide = () => gsap.to([dot, ring], { opacity: 0 });
    const show = () => gsap.to([dot, ring], { opacity: 1 });

    window.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerover", onPointerOver);
    root.addEventListener("pointerleave", hide);
    root.addEventListener("pointerenter", show);
    gsap.ticker.add(follow);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      root.removeEventListener("pointerleave", hide);
      root.removeEventListener("pointerenter", show);
      gsap.ticker.remove(follow);
    };
  });

  if (!hasFinePointer) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[10001] -mt-[3px] -ml-[3px] size-1.5 rounded-full bg-white mix-blend-difference"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="group pointer-events-none fixed top-0 left-0 z-[10000] -mt-[21px] -ml-[21px] size-[42px]"
      >
        <i className="block size-full rounded-full border border-[rgba(242,239,234,.55)] [transition:scale_.5s_var(--ease-expo),background-color_.5s,border-color_.5s] group-data-[hover]:scale-[1.7] group-data-[hover]:border-[rgba(242,239,234,.9)] group-data-[hover]:bg-[rgba(242,239,234,.07)]" />
      </div>
    </>
  );
}

export default CustomCursor;
