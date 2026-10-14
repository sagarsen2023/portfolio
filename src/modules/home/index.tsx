import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { CRITICAL_FONTS } from "@/constants/portfolio";
import { useSmoothScroll } from "@/context/smooth-scroll-context";
import useFontsReady from "@/hooks/use-fonts-ready";
import useMagnetic from "@/hooks/use-magnetic";
import { ScrollTrigger } from "@/lib/gsap";
import AboutSection from "./components/about-section";
import AvailabilityBadge from "./components/availability-badge";
import GlimpseSection from "./components/glimpse-section";
import HeroSection, { type HeroSectionHandle } from "./components/hero-section";
import ProjectIndex from "./components/project-index";
import ServicesSection from "./components/services-section";
import SiteFooter from "./components/site-footer";
import SiteHeader from "./components/site-header";
import SplashScreen from "./components/splash-screen";
import ToolsSection from "./components/tools-section";
import WorkSection from "./components/work-section";

function HomeModule() {
  // Text is measured and animations are built only once the display fonts
  // are in, so line breaks and pin distances use the final metrics.
  const ready = useFontsReady(CRITICAL_FONTS);
  const { lenis } = useSmoothScroll();
  const [introDone, setIntroDone] = useState(false);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const heroRef = useRef<HeroSectionHandle>(null);

  // Keep the page still until the splash hands over.
  useLayoutEffect(() => {
    if (!introDone) lenis?.stop();
  }, [lenis, introDone]);

  useMagnetic(ready);

  const handleReveal = useCallback(() => heroRef.current?.playIntro(), []);

  const handleIntroComplete = useCallback(() => {
    setIntroDone(true);
    lenis?.start();
    ScrollTrigger.refresh();
  }, [lenis]);

  return (
    <>
      <SiteHeader logoRef={logoRef} />
      <AvailabilityBadge />
      <ProjectIndex />
      <main>
        <HeroSection ref={heroRef} ready={ready} />
        <AboutSection ready={ready} />
        <ServicesSection ready={ready} />
        <ToolsSection ready={ready} />
        <WorkSection ready={ready} />
        <GlimpseSection ready={ready} />
      </main>
      <SiteFooter ready={ready} />
      {/* Rendered last on purpose: effects run in tree order, so every section
          has built its scroll animations before the intro timeline starts. */}
      {!introDone && (
        <SplashScreen
          ready={ready}
          logoTargetRef={logoRef}
          onReveal={handleReveal}
          onComplete={handleIntroComplete}
        />
      )}
    </>
  );
}

export default HomeModule;
