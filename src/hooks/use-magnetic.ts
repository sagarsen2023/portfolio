import { gsap, useGSAP } from "@/lib/gsap";
import { hasFinePointer } from "@/utils/media";

/**
 * Pulls every `[data-magnetic]` element towards the pointer when it comes
 * close, then springs it back. Elements are collected once `enabled` is true.
 */
export default function useMagnetic(enabled: boolean) {
  useGSAP(
    () => {
      if (!enabled || !hasFinePointer) return;

      const items = gsap.utils
        .toArray<HTMLElement>("[data-magnetic]")
        .map((el) => ({
          el,
          x: gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" }),
          y: gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" }),
          active: false,
        }));

      let pointerX = 0;
      let pointerY = 0;
      let pending = false;

      // Measured at most once per frame, and only after the pointer moved.
      const update = () => {
        pending = false;
        gsap.ticker.remove(update);

        items.forEach((item) => {
          const rect = item.el.getBoundingClientRect();
          if (!rect.width) return;

          const offsetX = Number(gsap.getProperty(item.el, "x"));
          const offsetY = Number(gsap.getProperty(item.el, "y"));
          const dx = pointerX - (rect.left - offsetX + rect.width / 2);
          const dy = pointerY - (rect.top - offsetY + rect.height / 2);
          const reach = 80 + Math.max(rect.width, rect.height) / 2;

          if (Math.hypot(dx, dy) < reach) {
            item.active = true;
            item.x(dx * 0.35);
            item.y(dy * 0.35);
          } else if (item.active) {
            item.active = false;
            gsap.to(item.el, {
              x: 0,
              y: 0,
              duration: 0.8,
              ease: "elastic.out(1,.45)",
            });
          }
        });
      };

      const onPointerMove = (event: PointerEvent) => {
        pointerX = event.clientX;
        pointerY = event.clientY;
        if (!pending) {
          pending = true;
          gsap.ticker.add(update);
        }
      };

      window.addEventListener("pointermove", onPointerMove, { passive: true });
      return () => {
        window.removeEventListener("pointermove", onPointerMove);
        gsap.ticker.remove(update);
      };
    },
    { dependencies: [enabled] }
  );
}
