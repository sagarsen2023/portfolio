import HeroSectionInterface from "@/models/hero-section.model";
import { ServicesSectionInterface } from "@/models/services-section.model";

const heroSection: HeroSectionInterface = {
  name: "Sagar Sen",
  descriptions: [
    "A UX / UI designer, product designer, content creator and creative director.",
    "Of course, there’s so much more to me than just a few fancy titles. Scroll down and get to know me,",
  ],
  cvLink: "",
  socialLinks: [
    {
      id: "facebook",
      url: "",
    },
    {
      id: "twitter",
      url: "",
    },
    {
      id: "instagram",
      url: "",
    },
    {
      id: "linkedin",
      url: "",
    },
    {
      id: "github",
      url: "",
    },
  ],
};

const serVicesSection: ServicesSectionInterface = {
  services: [
    {
      id: "front-end-development",
      title: "Front-End Development",
      description:
        "I can design and develop responsive websites with a focus on user experience.",
      techStack: [
        "HTML",
        "CSS",
        "JavaScript",
        "TypeScript",
        "Next.js",
        "Tailwind CSS",
      ],
    },
    {
      id: "back-end-development",
      title: "Back-End Development",
      description:
        "I can design and develop server-side applications, APIs, and databases.",
      techStack: ["Node.js", "Express.js", "MongoDB", "PostgreSQL"],
    },
    {
      id: "android-development",
      title: "Android Development",
      description:
        "I can design and develop mobile applications for the Android platform.",
      techStack: ["Flutter", "React-Native"],
    },
    {
      id: "ios-development",
      title: "iOS Development",
      description:
        "I can design and develop mobile applications for the iOS platform.",
      techStack: ["Flutter", "React-Native"],
    },
  ],
};

const projectSection = {};

export { heroSection, serVicesSection, projectSection };
