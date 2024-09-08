import { IconType } from "react-icons";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaNodeJs,
  FaReact,
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaInstagram,
} from "react-icons/fa";
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiFlutter,
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import { IoLogoFirebase } from "react-icons/io5";
import { DiDart } from "react-icons/di";

const techIcons: {
  [key: string]: IconType;
} = {
  "html": FaHtml5,
  "css": FaCss3Alt,
  "javascript": FaJs,
  "typescript": SiTypescript,
  "next.js": SiNextdotjs,
  "tailwind-css": SiTailwindcss,
  "node.js": FaNodeJs,
  "express.js": SiExpress,
  "mongodb": SiMongodb,
  "postgresql": SiPostgresql,
  "flutter": SiFlutter,
  "react-native": TbBrandReactNative,
  "react": FaReact,
  "facebook": FaFacebook,
  "linkedin": FaLinkedin,
  "twitter": FaTwitter,
  "github": FaGithub,
  "instagram": FaInstagram,
  "firebase": IoLogoFirebase,
  "dart": DiDart,
};

const GenerateIcon = ({
  techName,
  className = "",
}: {
  techName: string;
  className?: string;
}) => {
  if(!techName) return null;
  const IconComponent: IconType = techIcons[techName.toLowerCase()];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
};

export default GenerateIcon;
