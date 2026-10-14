import { useCallback, useEffect, useRef, useState, type Ref } from "react";
import { NAV_ITEMS, PROFILE } from "@/constants/portfolio";
import { useSmoothScroll } from "@/context/smooth-scroll-context";
import { gsap, useGSAP } from "@/lib/gsap";

type SiteHeaderProps = {
  /** The wordmark the splash logo flies into. */
  logoRef: Ref<HTMLAnchorElement>;
};

/**
 * Fixed header with the full-screen menu. Also owns in-page anchor navigation
 * so links can close the menu before smooth-scrolling to their target.
 */
function SiteHeader({ logoRef }: SiteHeaderProps) {
  const { lenis, scrollTo } = useSmoothScroll();
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    const menu = menuRef.current;
    if (!menu) return;
    const q = gsap.utils.selector(menu);

    timelineRef.current = gsap
      .timeline({ paused: true, defaults: { ease: "expo.inOut" } })
      .set(menu, { visibility: "visible" })
      .to(menu, { clipPath: "inset(0 0 0% 0)", duration: 0.7 })
      .from(
        q("[data-menu-link]"),
        { yPercent: 110, duration: 0.8, stagger: 0.05, ease: "expo.out" },
        "-=.3"
      )
      .from(
        q("[data-menu-foot]"),
        { opacity: 0, y: 20, duration: 0.5, ease: "power3.out" },
        "-=.55"
      );
  });

  const setMenuOpen = useCallback(
    (next: boolean) => {
      openRef.current = next;
      setOpen(next);
      if (next) {
        lenis?.stop();
        timelineRef.current?.timeScale(1).play();
        window.setTimeout(
          () => firstLinkRef.current?.focus({ preventScroll: true }),
          500
        );
      } else {
        lenis?.start();
        timelineRef.current?.timeScale(1.6).reverse();
      }
    },
    [lenis]
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && openRef.current) setMenuOpen(false);
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const anchor = target?.closest?.<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;

      const hash = anchor.getAttribute("href") ?? "";
      const toTop = anchor.hasAttribute("data-scroll-top");
      if (hash.length < 2 && !toTop) return;

      event.preventDefault();
      const go = () => scrollTo(hash === "#home" || toTop ? 0 : hash);
      if (openRef.current) {
        setMenuOpen(false);
        window.setTimeout(go, 500);
      } else {
        go();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onClick);
    };
  }, [scrollTo, setMenuOpen]);

  const barClass =
    "h-px w-[18px] bg-white [transition:translate_.6s_var(--ease-expo),rotate_.6s_var(--ease-expo)]";

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[900] flex items-center justify-between px-gx py-[22px] mix-blend-difference">
        <a
          ref={logoRef}
          href="#home"
          aria-label={`${PROFILE.name} — home`}
          className="pointer-events-auto font-display text-[30px] leading-[.8] tracking-[-.01em] text-white hover:text-accent loading:opacity-0"
        >
          {PROFILE.name}
        </a>
        <button
          type="button"
          data-magnetic
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="menu"
          onClick={() => setMenuOpen(!openRef.current)}
          className="pointer-events-auto flex size-14 flex-col items-center justify-center gap-1.5 rounded-full border border-[rgba(242,239,234,.4)]"
        >
          <span
            className={`${barClass} ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`${barClass} ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </header>

      <div
        ref={menuRef}
        id="menu"
        aria-hidden={!open}
        className="invisible fixed inset-0 z-[850] flex flex-col justify-center bg-surface-0 px-gx [clip-path:inset(0_0_100%_0)]"
      >
        <nav aria-label="Main">
          <ul>
            {NAV_ITEMS.map((item, i) => (
              <li key={item.href}>
                <a
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={item.href}
                  className="block font-display text-[clamp(56px,10.5vw,168px)] leading-[.92] uppercase [transition:padding_.6s_var(--ease-expo),color_.3s] hover:pl-[2vw]"
                >
                  <span className="mask">
                    <span data-menu-link>
                      <em className="mt-[1.2em] mr-5 inline-block align-top font-mono text-[12px] tracking-[.2em] text-accent not-italic">
                        {String(i + 1).padStart(2, "0")}
                      </em>
                      {item.label}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div
          data-menu-foot
          className="absolute inset-x-gx bottom-8 flex items-center justify-between gap-5 mobile:flex-col mobile:items-start"
        >
          <span className="label">
            <b>(</b> Email <b>)</b>
          </span>
          <a
            href={`mailto:${PROFILE.email}`}
            className="font-display text-[18px] tracking-[.04em] uppercase"
          >
            {PROFILE.email}
          </a>
          <span className="label">
            {PROFILE.location} — {PROFILE.timeZoneLabel}
          </span>
        </div>
      </div>
    </>
  );
}

export default SiteHeader;
