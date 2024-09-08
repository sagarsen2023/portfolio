import { IconType } from "react-icons";

export interface ProjectSectionInterface {
    title: string;
    description:string;
    viewProjectCount: number;
    yearsOfExperience: number;
    totalProjectCount: number;
    totalClientCount: number;
    projects : ProjectInterface[]
}

export interface ProjectInterface{
    title: string;
    icon: IconType;
    description: string;
    techStack: string[],
    gitHubLink: string;
}