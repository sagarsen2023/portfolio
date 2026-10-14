import { useRef, useState, type FormEvent } from "react";
import CircleArrow from "@/components/circle-arrow";
import RevealWords from "@/components/reveal-words";
import {
  EXPERTISE,
  NAV_ITEMS,
  PROFILE,
  SOCIAL_LINKS,
} from "@/constants/portfolio";
import useWordReveal from "@/hooks/use-word-reveal";
import { gsap, useGSAP } from "@/lib/gsap";

const WORDMARK = PROFILE.name.toLowerCase().replace(/\s+/g, "");
const YEAR = new Date().getFullYear();
const LINK_ROW =
  "flex flex-wrap items-baseline gap-x-[22px] gap-y-2 font-display text-[14px] tracking-[.06em] uppercase";

function SiteFooter({ ready }: { ready: boolean }) {
  const footerRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [confirmation, setConfirmation] = useState("");

  useWordReveal(headingRef, ready);

  useGSAP(
    () => {
      if (!ready) return;
      gsap.from("[data-reveal]", {
        yPercent: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: { trigger: footerRef.current, start: "top 70%" },
      });
      gsap.from("[data-wordmark-letter]", {
        yPercent: 105,
        duration: 1.4,
        stagger: 0.06,
        ease: "expo.out",
        scrollTrigger: { trigger: wordmarkRef.current, start: "top 88%" },
      });
    },
    { dependencies: [ready], scope: footerRef }
  );

  // No backend: hand the enquiry to the visitor's mail client.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const replyTo = String(new FormData(form).get("email") ?? "").trim();
    const subject = encodeURIComponent("Project inquiry");
    const body = encodeURIComponent(
      `Hi ${PROFILE.firstName},\n\nReply-to: ${replyTo}\n\n`
    );
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    setConfirmation(
      "Thanks — your mail app should open now. I reply within two days."
    );
    form.reset();
  };

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative overflow-hidden bg-surface-1 px-gx pt-[18vh] pb-7"
    >
      <div className="grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-[6vw] mobile:grid-cols-1">
        <div>
          <div className="mask">
            <p data-reveal className="label">
              <b>(</b> Contact <b>)</b>
            </p>
          </div>
          <h2
            ref={headingRef}
            className="mt-[22px] mb-[7vh] font-serif text-[clamp(44px,6vw,108px)] leading-[.95] font-normal"
          >
            <span className="block">
              <RevealWords text="Let's build something," />
            </span>
            <span className="it block">
              <RevealWords text="worth scaling." />
            </span>
          </h2>
          <form
            noValidate
            onSubmit={handleSubmit}
            className="flex max-w-[620px] items-center gap-5 border-b border-[rgba(242,239,234,.25)] pb-3.5 [transition:border-color_.4s] focus-within:border-accent"
          >
            <label htmlFor="footer-email" className="sr-only">
              Your email
            </label>
            <input
              id="footer-email"
              name="email"
              type="email"
              placeholder="your@email.com"
              required
              autoComplete="email"
              className="min-w-0 flex-1 font-serif text-[clamp(22px,2vw,32px)] text-fg outline-none placeholder:text-muted placeholder:italic"
            />
            <button
              type="submit"
              data-magnetic
              className="flex flex-none items-center gap-3 rounded-full bg-fg py-[7px] pr-[7px] pl-[22px] font-mono text-[11px] tracking-[.25em] text-surface-0 uppercase"
            >
              Send
              <span className="grid size-[34px] place-items-center rounded-full bg-surface-0 text-[14px] tracking-normal text-fg">
                ↗
              </span>
            </button>
          </form>
          <p
            role="status"
            className="mt-3.5 min-h-[1.4em] font-serif text-[19px] text-accent italic"
          >
            {confirmation}
          </p>
        </div>

        <div className="flex flex-col items-end text-right mobile:items-start mobile:text-left">
          <p className="label">
            <b>(</b> Email <b>)</b>
          </p>
          <a
            href={`mailto:${PROFILE.email}`}
            className="disp mt-3 mb-[4vh] block text-[clamp(26px,2.6vw,44px)]"
          >
            {PROFILE.email}
          </a>
          <ul className="flex flex-col items-end gap-0.5 mobile:items-start">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener"
                  className="inline-block font-display text-[clamp(40px,4.6vw,80px)] leading-[.98] uppercase [transition:color_.3s,translate_.6s_var(--ease-expo)] hover:-translate-x-[.15em] mobile:hover:translate-x-[.15em]"
                >
                  {link.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        ref={wordmarkRef}
        aria-label={WORDMARK}
        className="mt-[14vh] mb-[5vh] flex justify-center overflow-hidden pt-[.02em] text-center font-display text-[24vw] leading-[.8] tracking-[-.01em]"
      >
        {WORDMARK.split("").map((letter, i) => (
          <span key={i} data-wordmark-letter className="inline-block">
            {letter}
          </span>
        ))}
      </div>

      <div className="grid gap-3.5 border-t border-surface-3 pt-7">
        <div className={LINK_ROW}>
          <span className="min-w-[110px] text-muted">Navigate:</span>
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
        <div className={LINK_ROW}>
          <span className="min-w-[110px] text-muted">Expertise:</span>
          {EXPERTISE.map((area) => (
            <span key={area} className="[transition:color_.3s] hover:text-accent">
              {area}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-11 flex items-center justify-between gap-5 font-display text-[13px] tracking-[.06em] uppercase mobile:flex-col mobile:items-start">
        <span>
          © {YEAR} {PROFILE.name} · {PROFILE.domain}
        </span>
        <a href="#" data-scroll-top className="group flex items-center gap-3.5">
          Back to top
          <CircleArrow arrow="↗" size="sm" />
        </a>
      </div>
    </footer>
  );
}

export default SiteFooter;
