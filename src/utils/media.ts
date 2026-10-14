const matches = (query: string) =>
  typeof window !== "undefined" && window.matchMedia(query).matches;

/** Evaluated once on load, like the motion setup that depends on it. */
export const prefersReducedMotion = matches("(prefers-reduced-motion: reduce)");

/** True for mouse / trackpad users; gates the cursor and hover-driven effects. */
export const hasFinePointer = matches("(hover: hover) and (pointer: fine)");
