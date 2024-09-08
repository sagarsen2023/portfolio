import React from "react";
import ExperienceCard from "../Experience-Card";
import EducationCard from "../Education-Card";
import { ProfessionalBackgroundSectionInterface } from "@/models/professional-section.model";

function ProfessionalSection({
  professionalBackground,
}: {
  professionalBackground: ProfessionalBackgroundSectionInterface;
}) {
  return (
    <div className="py-10">
        <div>
        <h1 className="text-4xl text-center font-bold mt-10">
          {professionalBackground.title}
        </h1>
        <p className="text-center mt-4 mb-7 text-lg md:text-xl">
          {professionalBackground.description}
        </p>
      </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <ExperienceCard experience={professionalBackground.experience} />
        <EducationCard education={professionalBackground.education} />
        </div>

    </div>
  );
}

export default ProfessionalSection;
