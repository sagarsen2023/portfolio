import { ProjectInterface } from "@/models/project-section.model";
import { FaGithub } from "react-icons/fa6";
import Link from "next/link";
import React from "react";

function ProjectCard({ project }: { project: ProjectInterface }) {
  return (
    <Link href={project.gitHubLink}>
      <div className="w-full text-pretty px-5 py-10 rounded-3xl border border-gray-700 dark:border-gray-200 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300">
        <project.icon className="text-4xl" />
        <h1 className="font-bold mt-5 mb-3 text-3xl">{project.title}</h1>
        <p className="text-lg">{project.description}</p>
        <div className="w-full flex justify-end items-center gap-3 underline font-bold mt-3">
          <span>View on Github</span>
          <FaGithub className="text-2xl" />
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;
