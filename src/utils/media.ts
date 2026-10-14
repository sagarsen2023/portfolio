const matches = (query: string) =>
  typeof window !== "undefined" && window.matchMedia(query).matches;

/** Evaluated once on load, like the motion setup that depends on it. */
export const prefersReducedMotion = matches("(prefers-reduced-motion: reduce)");

/** True for mouse / trackpad users; gates the cursor and hover-driven effects. */
export const hasFinePointer = matches("(hover: hover) and (pointer: fine)");

const device =
  typeof navigator !== "undefined"
    ? (navigator as Navigator & { deviceMemory?: number })
    : undefined;

/**
 * Budget hardware (≤4 cores or ≤4 GB of memory). These get a lighter version
 * of the site: static hero portrait, no blur filters, fewer moving layers.
 */
export const isLowEndDevice =
  !!device &&
  ((device.hardwareConcurrency ?? 8) <= 4 || (device.deviceMemory ?? 8) <= 4);
