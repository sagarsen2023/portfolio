import React from "react";
import { ExperienceInterface } from "@/models/professional-section.model";
import { RiHomeOfficeLine } from "react-icons/ri";

function ExperienceCard({ experience }: { experience: ExperienceInterface[] }) {
  const reversedExperience = experience.slice().reverse();
  let sameCompany: string | null = null;

  return (
    <div className="w-full h-full px-4 py-5">
      <div className="text-xl lg:text-2xl font-bold">Experience</div>
      <div className="mt-5 ml-8 pl-8 border-l border-black dark:border-white lg:px-8">
        {reversedExperience.map((experience, index) => {
          if (sameCompany !== experience.company) {
            sameCompany = experience.company;
            return (
              <div key={index} className="mb-3 relative">
                <RiHomeOfficeLine className="absolute -top-1 -left-[50px] text-4xl bg-white dark:bg-black p-2 rounded-full border border-black dark:border-white shadow-md" />
                <div className="text-lg lg:text-xl font-semibold">
                  {experience.title}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-100 lg:text-lg">
                  <p>{experience.company}</p>
                  <p>{experience.duration}</p>
                </div>
                <div className="text-sm lg:text-lg">{experience.description}</div>
              </div>
            );
          }
          return (
            <div key={index} className="mb-3 relative">
              <div className="text-lg lg:text-xl font-semibold">
                {experience.title}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-100 lg:text-lg">
                <p>{experience.company}</p>
                <p>{experience.duration}</p>
              </div>
              <div className="text-sm lg:text-lg">{experience.description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ExperienceCard;
