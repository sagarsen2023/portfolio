import { useEffect, useLayoutEffect, useState, type RefObject } from "react";

type LineSplitOptions = {
  /** Re-measure when the viewport width changes (e.g. fluid font sizes). */
  responsive?: boolean;
};

/**
 * Groups the `[data-word]` elements inside `ref` into the lines they wrap
 * onto, returning word indices per line. While the result is `null` the
 * caller should render the words unsplit so they can be measured.
 */
export default function useLineSplit(
  ref: RefObject<HTMLElement | null>,
  enabled: boolean,
  { responsive = false }: LineSplitOptions = {}
) {
  const [lines, setLines] = useState<number[][] | null>(null);

  useLayoutEffect(() => {
    const container = ref.current;
    if (!enabled || lines || !container) return;

    // Viewport positions, not offsetTop: a transformed ancestor (mid-reveal)
    // would become the offset parent and make separate lines look level.
    const grouped: number[][] = [];
    let top = 0;
    let parent: Element | null = null;
    container
      .querySelectorAll<HTMLElement>("[data-word]")
      .forEach((word, i) => {
        const rect = word.getBoundingClientRect();
        if (
          word.parentElement !== parent ||
          Math.abs(rect.top - top) > rect.height / 2
        ) {
          grouped.push([]);
        }
        top = rect.top;
        parent = word.parentElement;
        grouped[grouped.length - 1].push(i);
      });
    setLines(grouped);
  }, [enabled, lines, ref]);

  // Dropping the split renders the words flat again; the effect above then
  // re-measures before the browser paints.
  useEffect(() => {
    if (!enabled || !responsive) return;
    let width = window.innerWidth;
    const onResize = () => {
      if (window.innerWidth === width) return;
      width = window.innerWidth;
      setLines(null);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [enabled, responsive]);

  return lines;
}
