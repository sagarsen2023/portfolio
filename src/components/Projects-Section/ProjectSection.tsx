import React from "react";
import ProjectCard from "../Project-Card";
import { ProjectSectionInterface } from "@/models/project-section.model";

function ProjectSection({ projects }: { projects: ProjectSectionInterface }) {
  const filteredProjects = projects.projects.slice(
    0,
    projects.viewProjectCount
  );
  return (
    <div className="py-10">
      <div>
        <h1 className="text-4xl text-center font-bold mt-10">
          {projects.title}
        </h1>
        <p className="text-center mt-4 mb-7 text-lg md:text-xl">
          {projects.description}
        </p>
      </div>
      <div className="pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
}

export default ProjectSection;
