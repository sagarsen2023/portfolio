import React from "react";
import { ExperienceInterface } from "@/models/professional-section.model";
import { RiHomeOfficeLine } from "react-icons/ri";

function ExperienceCard({ experience }: { experience: ExperienceInterface[] }) {
  const reversedExperience = experience.slice().reverse();
  let sameCompany:string |null = null;

  return (
    <div className="w-full border border-black px-4 py-5 rounded-3xl">
      <div className="text-xl font-bold">Experience</div>
      <div className="mt-5 ml-8 pl-8 border-l border-black">
      {reversedExperience.map((experience, index) => {
        if(sameCompany !== experience.company) {
          sameCompany = experience.company;
          return <div key={index} className="mb-3 relative">
            <RiHomeOfficeLine className="absolute -top-1 -left-[50px] text-4xl text-gray-500 bg-white p-1 rounded-full" />
            <div className="text-lg font-semibold">{experience.title}</div>
            <div className="text-sm text-gray-500">{experience.company}</div>
            <div className="text-sm text-gray-500">
              {experience.duration}
            </div>
            <div className="text-sm">{experience.description}</div>
          </div>
        }
        return <div key={index} className="mb-3 relative">
          <div className="text-lg font-semibold">{experience.title}</div>
          <div className="text-sm text-gray-500">{experience.company}</div>
          <div className="text-sm text-gray-500">
            {experience.duration}
          </div>
          <div className="text-sm">{experience.description}</div>
        </div>
})}
      </div>
    </div>
  );
}

export default ExperienceCard;
