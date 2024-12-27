import HeroSectionInterface from "@/models/hero-section.model";
import { ServicesSectionInterface } from "@/models/services-section.model";
import { ProjectSectionInterface } from "@/models/project-section.model";
import { ProfessionalBackgroundSectionInterface } from "@/models/professional-section.model";
import { SiNextdotjs, SiFlutter } from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import ContactSectionInterface from "@/models/contact-section.model";

const heroSection: HeroSectionInterface = {
  name: "Sagar Sen",
  descriptions: [
    "I am currently Trainee Software Engineer at Broadifitech Pvt Ltd. I enjoy creating full stack websites, applications with latest technologies..",
    "Of course, there’s so much more to me than just a few fancy titles. Scroll down and get to know me,",
  ],
  cvLink:
    "https://drive.google.com/file/d/1gtDjUjv2JFDsP__-9-mKmlUI1cdAR8Ov/view?usp=sharing",
  socialLinks: [
    {
      icon: "facebook",
      url: "https://www.facebook.com/profile.php?id=100072602310902&mibextid=ZbWKwL",
    },
    {
      icon: "linkedin",
      url: "https://www.linkedin.com/in/sagar-sen1067/",
    },
    {
      icon: "github",
      url: "https://github.com/sagarsen2023",
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
        "Tailwind-CSS",
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
      techStack: ["dart", "Flutter", "React-Native"],
    },
    {
      id: "ios-development",
      title: "iOS Development",
      description:
        "I can design and develop mobile applications for the iOS platform.",
      techStack: ["dart", "Flutter", "React-Native"],
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
      title: "Next JS Performance Analysis",
      description:
        "I have created a Next.js project that demonstrates different data-fetching strategies using the App Router.",
      techStack: ["TypeScript", "Next.js", "tailwind css"],
      gitHubLink:
        "https://github.com/sagarsen2023/next-js-performance-analysis",
    },
    {
      icon: SiNextdotjs,
      title: "Style.Loom",
      description:
        "This is a comprehensive e-commerce platform built with Next.js and TypeScript, featuring a robust seller and user panel and seamless integration with MongoDB Atlas.",
      techStack: ["TypeScript", "Next.js", "tailwind css", "MongoDB"],
      gitHubLink: "https://github.com/sagarsen2023/Style-Loom",
    },
    {
      icon: SiFlutter,
      title: "Redcell Connect",
      description:
        "RedCell Connect is a Flutter and Firebase-based platform that facilitates seamless communication between blood banks and hospitals",
      techStack: ["dart", "Flutter", "Firebase"],
      gitHubLink: "https://github.com/sagarsen2023/RedCell-Connect",
    },
    {
      icon: TbBrandReactNative,
      title: "Uber Clone",
      description:
        "This is a React Native project that replicates the core features of the Uber app.",
      techStack: ["typescript", "react-native", "tailwind-css"],
      gitHubLink: "https://github.com/sagarsen2023/uber-clone",
    },
  ],
};

const professionalBackground: ProfessionalBackgroundSectionInterface = {
  title: "Professional Background",
  description:
    "All About My Education, Experience, and Expertise in the Field of Computer Science and Programming.",
  education: [
    {
      degree: "High School",
      institute: "Chinsurah Duff High School",
      duration: "2020 - 2022",
    },
    {
      degree: "Bachelor of Computer Science",
      institute:
        "Dr. Sudhir Chandra Sur Institute of Technology & Sports Complex",
      duration: "2022 - Present",
    },
  ],
  experience: [
    {
      title: "Trainee Software Engineer",
      company: "Broadifi Tech Private Limited",
      duration: "July 2024 - December 2024",
      description: "I am working as a front-end developer here.",
    },
    {
      title: "Front End Developer",
      company: "Broadifi Tech Private Limited",
      duration: "December 2024 - Present",
      description: "I am working as a front-end developer here.",
    },
  ],
};

const contactSection: ContactSectionInterface = {
  title: "Hire Me For Your Next Amazing Project",
  description:
    "Let’s make something new, different and more meaningful or make thing more visual or conceptual? Just say hello!",
  email: "sagarsen.dev@gmail.com",
  emailSubject: "Inquiry from Your Developer Portfolio",
  emailBody: `Hello Sagar,
I came across your developer portfolio and I'm impressed with your work. I'd like to discuss a potential opportunity with you.
Could we schedule a time to talk about your experience and how it might align with our needs?
Looking forward to hearing from you.
Best regards,...`,
  whatsApp: "+91 74393 16782",
  whatsAppCustomMessage:
    "Hi Sagar, I would like to discuss a project with you.",
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
