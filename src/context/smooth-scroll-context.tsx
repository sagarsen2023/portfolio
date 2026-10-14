import Lenis from "lenis";
import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/utils/media";

type ScrollTarget = number | string | HTMLElement;

type SmoothScrollProviderProps = {
  children: React.ReactNode;
};

type SmoothScrollProviderState = {
  lenis: Lenis | null;
  scrollTo: (target: ScrollTarget) => void;
};

const initialState: SmoothScrollProviderState = {
  lenis: null,
  scrollTo: () => null,
};

const SmoothScrollContext =
  createContext<SmoothScrollProviderState>(initialState);

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  // Lenis drives the page scroll from GSAP's ticker so ScrollTrigger and the
  // smoothed scroll position never drift apart.
  useLayoutEffect(() => {
    const instance = new Lenis({
      lerp: prefersReducedMotion ? 1 : 0.12,
      smoothWheel: !prefersReducedMotion,
    });
    const raf = (time: number) => instance.raf(time * 1000);

    instance.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    // The instance owns DOM listeners, so it is created here and published.
    // oxlint-disable-next-line react/set-state-in-effect
    setLenis(instance);

    return () => {
      gsap.ticker.remove(raf);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  const scrollTo = useCallback(
    (target: ScrollTarget) =>
      lenis?.scrollTo(target, { duration: 1.8, easing: easeOutQuart }),
    [lenis]
  );

  const value = useMemo(() => ({ lenis, scrollTo }), [lenis, scrollTo]);

  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSmoothScroll = () => useContext(SmoothScrollContext);
