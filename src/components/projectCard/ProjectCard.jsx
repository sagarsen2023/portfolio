import React from 'react';
import Image from 'next/image';
import "./projectCard.css";

const ProjectCard = ({ projectName, projectDescription, projectLink, techStack, icons }) => {
    const iconFetcher = (elem) => {
        switch (elem) {
            // Languages
            case "html":
                return icons[0];
            case "css":
                return icons[1];
            case "js":
                return icons[2];
            case "c":
                return icons[3];
            case "python":
                return icons[4];
            case "dart":
                return icons[5];
            // Frameworkd
            case "react":
                return icons[6]
            case "express":
                return icons[7]
            case "tailwind":
                return icons[8]
            case "next":
                return icons[9]
            case "flutter":
                return icons[10]
            // Other Technologies
            case "figma":
                return icons[11]
            case "canva":
                return icons[12]
            case "premiere":
                return icons[13]
            case "resolve":
                return icons[14]
        }
    }
    return (
        <div className="projectCard-wrapper">
            <div className="card">
                <div className="container-card bg-border">
                    <p className="card-title">{projectName}</p>
                    <p className="card-description">{projectDescription}</p>
                    <div className="all-icons">
                        {techStack.map((elem, index) => {
                            const currentIcon = iconFetcher(elem);
                            return (
                                <Image key={index} src={currentIcon} width={40} height={40} alt='Image not found' />
                            )
                        })}
                    </div>
                   <div className="link">
                   <button className='link-btn'><a href={projectLink} target='_main'>View Project</a></button>
                   </div>
                </div>
            </div>

        </div>
    )
}

export default ProjectCard
