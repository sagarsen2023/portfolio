import React from 'react';
import "./projects.css";
import ContentHeader from '@/components/content_header/ContentHeader';
import ProjectCard from '@/components/projectCard/ProjectCard';

const Projects = ({projectData, languageIcons, frameworkIcons, otherIcons }) => {
  const allIcons = languageIcons.concat(frameworkIcons, otherIcons);
  return (
    <>
      <div className="project-wrapper">
        <div className="project-header">
          <ContentHeader header={"Projects"} description={"My Recent Projects"} />
        </div>

        <div className="all-cards">
          <div className="project-cards">
            {projectData.map((elem, index)=>(
              <ProjectCard key={index} projectName={elem.name} projectDescription={elem.description} projectLink={elem.link} techStack={elem.tech} icons={allIcons}/>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Projects;
