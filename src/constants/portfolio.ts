import type {
  ExternalLink,
  NavItem,
  Project,
  Service,
  TextSegment,
} from "@/types/portfolio";

export const PROFILE = {
  name: "Sagar Sen",
  firstName: "Sagar",
  role: "Software Engineer",
  company: "Broadifi Tech",
  email: "sagarsen.dev@gmail.com",
  domain: "sagarsen.dev",
  location: "India",
  timeZone: "Asia/Kolkata",
  timeZoneLabel: "IST",
  stack: "React, Next.js, Flutter, Node.js",
} as const;

export const LINKS = {
  github: "https://github.com/sagarsen2023",
  linkedin: "https://www.linkedin.com/in/sagar-sen1067/",
  resume: "#",
} as const;

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export const SOCIAL_LINKS: ExternalLink[] = [
  { label: "GitHub", href: LINKS.github },
  { label: "LinkedIn", href: LINKS.linkedin },
  { label: "Resume", href: LINKS.resume },
];

export const HERO_HEADLINE = {
  lines: ["Building", "scalable software,"],
  tagline: "from pixels to infrastructure.",
} as const;

export const ABOUT_TEXT: TextSegment[] = [
  {
    text: "I'm a Software Engineer at Broadifi Tech, building web and mobile products end to end — from interfaces in React, Next.js and Flutter to APIs in Node.js and Express. I started in frontend, turning ideas into intuitive interfaces, then followed my curiosity under the hood into backend engineering, databases, and system design. ",
  },
  { text: "Clarity, at every layer.", emphasis: true },
];

export const SERVICES: Service[] = [
  { title: "Frontend", tagline: "Interfaces that feel effortless." },
  { title: "Backend", tagline: "Services built to stay up." },
  { title: "System Design", tagline: "Architecture that scales with you." },
  { title: "DevOps & Cloud", tagline: "From commit to production." },
  { title: "Security & AI", tagline: "Smarter, safer software." },
];

export const TOOLS = [
  "JavaScript",
  "TypeScript",
  "React",
  "React Native",
  "Next.js",
  "Flutter",
  "Dart",
  "Node.js",
  "Express",
  "Python",
  "C",
  "Firebase",
  "MongoDB",
  "MySQL",
  "Vite",
  "HTML5",
  "CSS",
  "Vercel",
  "Netlify",
  "Figma",
  "Canva",
  "Premiere Pro",
];

export const PROJECTS: Project[] = [
  {
    number: "01",
    name: "Aspheric",
    category: "Cybersecurity",
    title: "Website Security & Privacy Auditing",
    description:
      "A security and privacy auditing platform that scans websites, identifies security gaps, and helps businesses assess their DPDP readiness through actionable insights.",
    liveUrl: "https://aspheric.app/",
    image: "/images/projects/aspheric.webp",
    background: "#080808",
    hue: 145,
  },
  {
    number: "02",
    name: "SkillDrift",
    category: "AI Applications",
    title: "AI-Powered Career Coach",
    description:
      "An AI-powered career platform that analyzes resumes, identifies skill gaps, matches users with relevant roles, and builds personalized career roadmaps.",
    liveUrl: "https://www.skilldrift.ai/",
    image: "/images/projects/skilldrift.webp",
    background: "#0B0B10",
    hue: 260,
  },
  {
    number: "03",
    name: "Auram",
    category: "E-Commerce Engineering",
    title: "Luxury Jewellery E-Commerce",
    description:
      "A premium jewellery shopping experience blending elegant design, curated collections, and seamless product discovery.",
    liveUrl: "https://auramjewellery.com/",
    image: "/images/projects/auram.webp",
    background: "#071A13",
    hue: 150,
  },
  {
    number: "04",
    name: "MulltiplyAi",
    category: "B2B SaaS",
    title: "AI-Powered Conversational Commerce",
    description:
      "A B2B commerce platform that transforms WhatsApp conversations into orders, synchronizes product catalogs, and streamlines workflows for distributors, wholesalers, and manufacturers.",
    liveUrl: "https://mulltiply.ai/",
    image: "/images/projects/mulltiplyai.webp",
    background: "#0D1424",
    hue: 225,
  },
];

export const GLIMPSE_ROWS: string[][] = [
  PROJECTS.map((project) => project.name),
  ["Web Apps", "Mobile Apps", "APIs", "Dashboards", "Integrations", "E-Commerce"],
  ["AI Products", "Web Security", "Privacy", "Automation", "Databases", "UI / UX"],
];

export const EXPERTISE = [
  "Frontend",
  "Backend",
  "Mobile",
  "System Design",
  "Cloud",
  "Security",
  "AI",
];

/** Faces the intro waits on before measuring text and starting animations. */
export const CRITICAL_FONTS = [
  "400 100px Anton",
  'italic 40px "Instrument Serif"',
  '40px "Instrument Serif"',
];
