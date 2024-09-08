import HeroSectionInterface from "@/models/hero-section.model";
import { ServicesSectionInterface } from "@/models/services-section.model";
import { ProjectSectionInterface } from "@/models/project-section.model";
import { ProfessionalBackgroundSectionInterface } from "@/models/professional-section.model";
import { SiNextdotjs } from "react-icons/si";

const heroSection: HeroSectionInterface = {
  name: "Sagar Sen",
  descriptions: [
    "A UX / UI designer, product designer, content creator and creative director.",
    "Of course, there’s so much more to me than just a few fancy titles. Scroll down and get to know me,",
  ],
  cvLink: "",
  socialLinks: [
    {
      icon: "facebook",
      url: "",
    },
    {
      icon: "twitter",
      url: "",
    },
    {
      icon: "instagram",
      url: "",
    },
    {
      icon: "linkedin",
      url: "",
    },
    {
      icon: "github",
      url: "",
    },
  ],
};

const serVicesSection: ServicesSectionInterface = {
  title: "What I do",
  description: "I can help you with a wide range of services.",
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

const projectSection: ProjectSectionInterface = {
  title: "Projects",
  description: "Here are some of the projects I have worked on.",
  viewProjectCount: 4,
  yearsOfExperience: 3,
  totalProjectCount: 10,
  totalClientCount: 5,
  projects: [
    {
      icon: SiNextdotjs,
      title: "Sample Project",
      description:
        "This is a sample project. This is a sample project. This is a sample project.",
      techStack: ["HTML", "CSS", "JavaScript"],
      gitHubLink: "",
    },
    {
      icon: SiNextdotjs,
      title: "Sample Project",
      description:
        "This is a sample project. This is a sample project. This is a sample project.",
      techStack: ["HTML", "CSS", "JavaScript"],
      gitHubLink: "",
    },
    {
      icon: SiNextdotjs,
      title: "Sample Project",
      description:
        "This is a sample project. This is a sample project. This is a sample project.",
      techStack: ["HTML", "CSS", "JavaScript"],
      gitHubLink: "",
    },
    {
      icon: SiNextdotjs,
      title: "Sample Project",
      description:
        "This is a sample project. This is a sample project. This is a sample project.",
      techStack: ["HTML", "CSS", "JavaScript"],
      gitHubLink: "",
    },
  ],
};

const professionalBackground: ProfessionalBackgroundSectionInterface = {
  title: "Professional Background",
  description:
    "I have been working as a freelance web developer for the past 3 years.",
  education: [
    {
      degree: "Bachelor of Computer Science",
      institute: "institute 1",
      duration: "2015 - 2018",
    },
    {
      degree: "Master of Computer Science",
      institute: "institute 1",
      duration: "2018 - 2020",
    },
  ],
  experience: [
    {
      title: "Front-End Developer",
      company: "Company 1",
      duration: "2018 - 2019",
      description: "I worked as a front-end developer at Company 1.",
    },
    {
      title: "Back-End Developer",
      company: "Company 1",
      duration: "2019 - 2020",
      description: "I worked as a back-end developer at Company 2.",
    },
    {
      title: "Mern-Stack Developer",
      company: "Company 2",
      duration: "2020 - 2021",
      description: "I worked as a full-stack developer at Company 3.",
    },
    {
      title: "Full-Stack Developer",
      company: "Company 2",
      duration: "2020 - 2021",
      description: "I worked as a full-stack developer at Company 3.",
    },
  ],
};

const contactSection = {
  title: "Hire Me For Your Next Amazing Project",
  description:
    "Let’s make something new, different and more meaningful or make thing more visual or conceptual? Just say hello!",
  email: "sagarsen.dev@gmail.com",
  phone: "+91 74393 16782",
};

const copyrightSection: {
  year: number;
  name: string;
} = {
  year: new Date().getFullYear(),
  name: "Sagar Sen",
};

export {
  heroSection,
  serVicesSection,
  projectSection,
  professionalBackground,
  contactSection,
  copyrightSection,
};
