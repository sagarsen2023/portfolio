"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   THEME SYSTEM
   ═══════════════════════════════════════════════════════════════ */
const THEMES: Record<
  string,
  {
    accR: number;
    accG: number;
    accB: number;
    bg: string;
    dark: boolean;
    dot: string;
  }
> = {
  parchment: {
    accR: 184,
    accG: 112,
    accB: 72,
    bg: "#f0ebe0",
    dark: false,
    dot: "#b87048",
  },
  rouge: {
    accR: 196,
    accG: 57,
    accB: 74,
    bg: "#f5f0ed",
    dark: false,
    dot: "#c4394a",
  },
  sage: {
    accR: 61,
    accG: 115,
    accB: 85,
    bg: "#e8edea",
    dark: false,
    dot: "#3d7355",
  },
  midnight: {
    accR: 201,
    accG: 168,
    accB: 76,
    bg: "#100f0d",
    dark: true,
    dot: "#c9a84c",
  },
  carbon: {
    accR: 91,
    accG: 156,
    accB: 246,
    bg: "#161618",
    dark: true,
    dot: "#5b9cf6",
  },
};

const TECHS = [
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
  "React Native",
  "Expo",
  "MongoDB",
  "PostgreSQL",
  "Docker",
  "Kubernetes",
  "SQL",
];

/* ═══════════════════════════════════════════════════════════════
   PROJECTS DATA
   ═══════════════════════════════════════════════════════════════ */
const PROJECTS = [
  {
    num: "01",
    name: "CalmUI",
    sub: "A CLI tool - Next.js · Vite ",
    tags: ["Next.js", "Vite", "TypeScript"],
    link: "https://github.com/sagarsen2023/next-js-performance-analysis",
  },
  {
    num: "02",
    name: "Style.Loom — E-Commerce",
    sub: "Full-stack platform · Next.js · TypeScript · MongoDB Atlas",
    tags: ["Full-Stack", "Commerce"],
    link: "https://github.com/sagarsen2023/Style-Loom",
  },
  {
    num: "03",
    name: "RedCell Connect",
    sub: "Blood bank communication · Flutter · Firebase · Dart",
    tags: ["Mobile", "Flutter"],
    link: "https://github.com/sagarsen2023/RedCell-Connect",
  },
];

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function Home() {
  const [theme, setTheme] = useState("parchment");
  const [loaderDone, setLoaderDone] = useState(false);
  const [loaderCount, setLoaderCount] = useState(0);
  const [loaderOpen, setLoaderOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const spotlightRef = useRef<HTMLDivElement>(null);

  // Theme switching
  const switchTheme = useCallback((name: string) => {
    setTheme(name);
    const root = document.documentElement;
    root.setAttribute("data-theme", name === "parchment" ? "" : name);
  }, []);

  // Loader animation
  useEffect(() => {
    let n = 0;
    const tick = setInterval(() => {
      n = Math.min(n + Math.floor(Math.random() * 10) + 3, 100);
      setLoaderCount(n);
      if (n >= 100) {
        clearInterval(tick);
        setTimeout(() => {
          setLoaderOpen(true);
          setTimeout(() => setLoaderDone(true), 1200);
        }, 400);
      }
    }, 38);
    return () => clearInterval(tick);
  }, []);

  // Nav scroll
  useEffect(() => {
    const handler = () => setNavScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Spotlight mouse follow
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (spotlightRef.current) {
        const t = THEMES[theme];
        spotlightRef.current.style.background = `radial-gradient(700px at ${e.clientX}px ${e.clientY}px, rgba(${t.accR},${t.accG},${t.accB},0.055), transparent 70%)`;
      }
    };
    document.addEventListener("mousemove", handler);
    return () => document.removeEventListener("mousemove", handler);
  }, [theme]);

  // Reveal on scroll
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [loaderDone]);

  // Count-up animation
  useEffect(() => {
    if (!loaderDone) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const target = parseInt(el.dataset.count || "0");
          const suffix = el.dataset.suffix || "";
          let t0: number | null = null;
          function step(ts: number) {
            if (!t0) t0 = ts;
            const p = Math.min((ts - t0) / 1600, 1);
            const v = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(v * target) + suffix;
            if (p < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
          io.unobserve(el);
        }),
      { threshold: 0.5 },
    );
    document.querySelectorAll("[data-count]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [loaderDone]);

  const marqueeItems = [...TECHS, ...TECHS, ...TECHS, ...TECHS];

  return (
    <>
      {/* Spotlight */}
      <div ref={spotlightRef} className="spotlight" />

      {/* Loader */}
      {!loaderDone && (
        <div className="loader">
          <div className={`loader-half loader-top ${loaderOpen ? "open" : ""}`}>
            <div
              className="loader-count"
              style={{ opacity: loaderOpen ? 0 : 1 }}
            >
              {loaderCount}
            </div>
          </div>
          <div className={`loader-half loader-bot ${loaderOpen ? "open" : ""}`}>
            <div className="loader-word">Loading</div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav
        className={`port-nav ${navScrolled ? "scrolled" : ""}`}
        style={{
          opacity: loaderDone ? 1 : 0,
          transition: "opacity .7s ease .2s, background .5s, padding .4s",
        }}
      >
        <a href="#" className="nav-logo">
          Sagar Sen
        </a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#stack">Stack</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="nav-right">
          <span className="nav-orb" />
          Available for work
        </div>
        {/* Mobile hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          style={{
            background: "none",
            border: "none",
            color: "var(--ink)",
            fontSize: 24,
            cursor: "pointer",
            zIndex: 600,
          }}
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="mobile-menu"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 550,
            background: "var(--bg)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 32,
          }}
        >
          {["about", "work", "stack", "contact"].map((s) => (
            <a
              key={s}
              href={`#${s}`}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontFamily: "var(--serif)",
                fontSize: 32,
                fontWeight: 300,
                fontStyle: "italic",
                color: "var(--ink)",
                textDecoration: "none",
                transition: "color .3s",
              }}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </a>
          ))}
        </div>
      )}

      {/* Theme Switcher */}
      <div
        className="theme-sw"
        style={{
          opacity: loaderDone ? 1 : 0,
          transition: "opacity .7s ease 1s",
        }}
      >
        <span className="sw-label">Theme</span>
        <div className="sw-dots">
          {Object.keys(THEMES).map((t) => (
            <div
              key={t}
              className={`sw-dot ${theme === t ? "active" : ""}`}
              title={t.charAt(0).toUpperCase() + t.slice(1)}
              onClick={() => switchTheme(t)}
              style={{ cursor: "pointer" }}
            >
              <span
                style={{
                  position: "absolute",
                  inset: 3,
                  borderRadius: "50%",
                  background: THEMES[t].dot,
                  display: "block",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ═══ HERO ═══ */}
      <section className="hero-section" id="hero">
        <div className="hero-ghost" aria-hidden="true">
          <span className="hero-ghost-text">SAGAR</span>
        </div>
        <div className="hero-scanline" />

        {/* Geometric Art */}
        <div className="hero-art-abs" style={{ background: "transparent" }}>
          <svg
            viewBox="0 0 280 374"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "100%", height: "100%", overflow: "visible" }}
          >
            {/* Large orbit ring — the canvas */}
            <motion.circle
              cx="140" cy="187" r="100"
              stroke="var(--ink3)" strokeWidth="0.6"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ originX: "140px", originY: "187px" }}
            />

            {/* Rotating accent arc — the movement */}
            <motion.g
              style={{ originX: "140px", originY: "187px" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
            >
              <path
                d="M140 87 A 100 100 0 0 1 240 187"
                stroke="var(--acc)" strokeWidth="1.5" strokeLinecap="round"
              />
            </motion.g>

            {/* Orbiting dot — the wanderer */}
            <motion.g
              style={{ originX: "140px", originY: "187px" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            >
              <circle cx="240" cy="187" r="3" fill="var(--acc)" />
            </motion.g>

            {/* Center mark — the anchor */}
            <motion.circle
              cx="140" cy="187" r="2"
              fill="var(--ink2)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.5, type: "spring" }}
            />
          </svg>
        </div>

        <div className="hero-name-block">
          <div className="name-row-1">
            <span
              className="hero-first"
              style={{
                animation: loaderDone
                  ? "wipeR 1.2s cubic-bezier(.16,1,.3,1) forwards"
                  : "none",
                clipPath: "inset(0 100% 0 0)",
              }}
            >
              Sagar
            </span>
          </div>
          <div className="name-row-2">
            <span
              className="hero-second"
              style={{
                animation: loaderDone
                  ? "wipeL 1.2s cubic-bezier(.16,1,.3,1) .25s forwards"
                  : "none",
                clipPath: "inset(0 0 0 100%)",
              }}
            >
              SEN<span className="name-acc">.</span>
            </span>
          </div>
        </div>

        <div
          className="hero-bar"
          style={{
            opacity: loaderDone ? 1 : 0,
            transform: loaderDone ? "translateY(0)" : "translateY(16px)",
            transition:
              "opacity .8s ease .6s, transform .8s cubic-bezier(.16,1,.3,1) .6s",
          }}
        >
          <div className="bar-left">
            <span>Full-Stack Developer</span>
            <span className="bar-sep">·</span>
            <span>React · Node · Cloud</span>
            <span className="bar-sep">·</span>
            <div className="bar-avail">
              <span className="bar-dot" />
              Open to work
            </div>
          </div>
          <div className="bar-center">
            <div className="bar-stat">
              <div className="bar-num">04</div>
              <div className="bar-num-label">Projects</div>
            </div>
            <div className="bar-divider" />
            <div className="bar-stat">
              <div className="bar-num">9+</div>
              <div className="bar-num-label">Technologies</div>
            </div>
          </div>
          <div className="bar-right">
            <span className="scroll-text">Scroll</span>
            <div className="scroll-track" />
          </div>
        </div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <div className="mq-bar">
        <div className="mq-track">
          {marqueeItems.map((t, i) => (
            <span key={i} className="mq-item">
              <span className="mq-dot" />
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ═══ ABOUT ═══ */}
      <section className="port-section" id="about">
        <span className="sec-num reveal">01</span>
        <h2 className="sec-title reveal">
          The developer
          <br />
          <em>behind the work.</em>
        </h2>
        <div className="about-grid">
          <div className="about-body reveal">
            <p className="about-pull">
              &ldquo;I don&apos;t just write code — I architect systems that are
              robust, elegant, and built to outlive the sprint.&rdquo;
            </p>
            <p>
              I&apos;m a <strong>full-stack developer</strong> who treats
              software as craft. Every project gets the same treatment: deep
              architectural thinking, obsessive attention to detail, and a
              commitment to shipping things that last.
            </p>
            <p>
              I work across the entire stack — from polished React interfaces to
              containerized backend services. No silos. The best products come
              from understanding the <strong>whole system</strong>.
            </p>
            <div className="about-tags">
              {[
                "React",
                "Next.js",
                "React Native",
                "TypeScript",
                "Node.js",
                "PostgreSQL",
                "MongoDB",
                "Docker",
                "Kubernetes",
              ].map((t) => (
                <span key={t} className="a-tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="reveal rd2">
            <div className="stat-grid">
              <div>
                <div className="stat-num" data-count="3" data-suffix="+">
                  0
                </div>
                <div className="stat-label">Years Building</div>
              </div>
              <div>
                <div className="stat-num" data-count="10" data-suffix="+">
                  0
                </div>
                <div className="stat-label">Projects Shipped</div>
              </div>
              <div>
                <div className="stat-num" data-count="9" data-suffix="">
                  0
                </div>
                <div className="stat-label">Technologies</div>
              </div>
              <div>
                <div
                  className="stat-num"
                  style={{ fontSize: 38, lineHeight: 1.5 }}
                >
                  Full
                </div>
                <div className="stat-label">Stack Coverage</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WORK ═══ */}
      <section className="port-section" id="work">
        <span className="sec-num reveal">02</span>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <h2 className="sec-title reveal" style={{ marginBottom: 0 }}>
            Selected
            <br />
            <span className="syne">WORK.</span>
          </h2>
          <span
            className="reveal"
            style={{
              fontFamily: "var(--serif)",
              fontSize: 14,
              fontStyle: "italic",
              color: "var(--ink2)",
              paddingBottom: 8,
            }}
          >
            04 projects
          </span>
        </div>
        <div className="proj-table">
          {PROJECTS.map((p, i) => (
            <a
              key={p.num}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`proj-row reveal ${i > 0 ? `rd${i}` : ""}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="proj-cell">
                <span className="p-num">{p.num}</span>
              </div>
              <div className="proj-cell">
                <div className="p-name">{p.name}</div>
                <div className="p-sub">{p.sub}</div>
              </div>
              <div className="proj-cell p-tags-cell">
                <div className="p-tags">
                  {p.tags.map((tag) => (
                    <span key={tag} className="p-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="proj-cell">
                <div className="p-arr">↗</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ═══ STACK ═══ */}
      <section className="port-section" id="stack">
        <span className="sec-num reveal">03</span>
        <h2 className="sec-title reveal">
          Tools of
          <br />
          <em>the trade.</em>
        </h2>
        <div className="stack-layout">
          <div className="stack-intro reveal">
            <p>
              Nine technologies. One philosophy: know your tools deeply and use
              them with precision.
            </p>
            <p>
              From component architecture to container orchestration — I own the
              full delivery chain.
            </p>
          </div>
          <div className="stack-cols reveal rd2">
            <div className="stack-col">
              <h4>Frontend</h4>
              <ul>
                <li>React</li>
                <li>Next.js</li>
                <li>React Native</li>
                <li>TypeScript</li>
              </ul>
            </div>
            <div className="stack-col">
              <h4>Backend</h4>
              <ul>
                <li>Node.js</li>
                <li>PostgreSQL</li>
                <li>MongoDB</li>
                <li>SQL</li>
              </ul>
            </div>
            <div className="stack-col">
              <h4>DevOps</h4>
              <ul>
                <li>Docker</li>
                <li>Kubernetes</li>
                <li>Expo</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section
        className="port-section"
        id="contact"
        style={{ borderBottom: "none" }}
      >
        <span className="sec-num reveal">04</span>
        <h2 className="sec-title reveal">
          Let&apos;s build
          <br />
          <em>something.</em>
        </h2>
        <div className="contact-grid">
          <div className="reveal">
            <div className="c-label">Get in touch</div>
            <a href="mailto:sagarsen.dev@gmail.com" className="contact-email">
              sagarsen.dev@gmail.com
            </a>
            <p className="c-desc">
              Have something interesting to work on? I&apos;m always open to the
              right conversation about the right project.
            </p>
          </div>
          <div className="soc-list reveal rd2">
            <a
              href="https://github.com/sagarsen2023"
              target="_blank"
              rel="noopener noreferrer"
              className="soc-item"
            >
              <span className="soc-name">GitHub</span>
              <span className="soc-arr">↗</span>
            </a>
            <a
              href="https://www.linkedin.com/in/sagar-sen1067/"
              target="_blank"
              rel="noopener noreferrer"
              className="soc-item"
            >
              <span className="soc-name">LinkedIn</span>
              <span className="soc-arr">↗</span>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100072602310902"
              target="_blank"
              rel="noopener noreferrer"
              className="soc-item"
            >
              <span className="soc-name">Facebook</span>
              <span className="soc-arr">↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="port-footer">
        <span>Sagar Sen © {new Date().getFullYear()}</span>
        <span>Designed with intent.</span>
      </footer>

      {/* Keyframe animations injected via style tag */}
      <style>{`
        @keyframes wipeR { to { clip-path: inset(0 0% 0 0); } }
        @keyframes wipeL { to { clip-path: inset(0 0 0 0%); } }
      `}</style>
    </>
  );
}
