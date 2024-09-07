// Import necessary icons from react-icons
import { IconType } from "react-icons";
import { FaHtml5, FaCss3Alt, FaJs, FaNodeJs, FaReact } from "react-icons/fa";
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

const techIcons: {
  [key: string]: IconType;
} = {
  HTML: FaHtml5,
  CSS: FaCss3Alt,
  JavaScript: FaJs,
  TypeScript: SiTypescript,
  "Next.js": SiNextdotjs,
  "Tailwind CSS": SiTailwindcss,
  "Node.js": FaNodeJs,
  "Express.js": SiExpress,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  flutter: SiFlutter,
  "react-native": TbBrandReactNative,
  React: FaReact,
};

const getTechIcon = ({
  techName,
  className = "",
}: {
  techName: string;
  className?: string;
}) => {
  const IconComponent: IconType = techIcons[techName];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
};

export default getTechIcon;
