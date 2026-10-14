import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { hasFinePointer } from "@/utils/media";

const HOVER_TARGETS = "a,button,input,[data-cursor-hover]";
const FOLLOW = 0.2;

/** Dot that tracks the pointer exactly, plus a ring that trails and stretches. */
function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Setters write transforms directly: no tween objects per frame.
    const dotX = gsap.quickSetter(dot, "x", "px");
    const dotY = gsap.quickSetter(dot, "y", "px");
    const ringX = gsap.quickSetter(ring, "x", "px");
    const ringY = gsap.quickSetter(ring, "y", "px");
    const ringRotation = gsap.quickSetter(ring, "rotation", "deg");
    const ringScaleX = gsap.quickSetter(ring, "scaleX");
    const ringScaleY = gsap.quickSetter(ring, "scaleY");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let x = mouseX;
    let y = mouseY;
    let angle = 0;
    let settled = false;

    const onPointerMove = (event: PointerEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      dotX(mouseX);
      dotY(mouseY);
      settled = false;
    };

    const follow = () => {
      if (settled) return;
      const vx = (mouseX - x) * FOLLOW;
      const vy = (mouseY - y) * FOLLOW;
      x += vx;
      y += vy;
      const velocity = Math.min(Math.hypot(vx, vy), 45);
      if (velocity > 0.4) angle = Math.atan2(vy, vx) * 57.3;

      ringX(x);
      ringY(y);
      ringRotation(angle);
      ringScaleX(1 + velocity / 45);
      ringScaleY(1 - velocity / 140);
      // Stop writing once the ring has caught up with a resting pointer.
      settled = velocity < 0.05;
    };

    const onPointerOver = (event: PointerEvent) => {
      const target = event.target as Element | null;
      ring.toggleAttribute("data-hover", !!target?.closest?.(HOVER_TARGETS));
    };

    const root = document.documentElement;
    const hide = () => gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    const show = () => gsap.to([dot, ring], { opacity: 1, duration: 0.3 });

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver, { passive: true });
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
        <i className="block size-full rounded-full border border-[rgba(242,239,234,.55)] [transition:scale_.4s_var(--ease-expo),background-color_.4s,border-color_.4s] group-data-[hover]:scale-[1.7] group-data-[hover]:border-[rgba(242,239,234,.9)] group-data-[hover]:bg-[rgba(242,239,234,.07)]" />
      </div>
    </>
  );
}

export default CustomCursor;
