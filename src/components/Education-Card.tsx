import { EducationInterface } from "@/models/professional-section.model";
import React from "react";
import { IoSchoolOutline } from "react-icons/io5";

function EducationCard({ education }: { education: EducationInterface[] }) {
  const reversedEducation = education.slice().reverse();
  let sameInstitute: string | null = null;
  return (
    <div className="w-full h-full px-4 py-5">
      <div className="text-xl font-bold lg:text-2xl">Education</div>
      <div className="mt-5 ml-8 pl-8 border-l border-black dark:border-white lg:px-8">
        {reversedEducation.map((education, index) => {
          if (sameInstitute !== education.institute) {
            sameInstitute = education.institute;
            return (
              <div key={index} className="mb-3 relative">
                <IoSchoolOutline className="absolute -top-1 -left-[50px] text-4xl bg-white dark:bg-black p-2 rounded-full border border-black dark:border-white shadow-md" />
                <div className="text-lg lg:text-xl font-semibold">
                  {education.degree}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-200 lg:text-lg">
                  <p> {education.institute}</p>
                  <p> {education.duration}</p>
                </div>
              </div>
            );
          }
          return (
            <div key={index} className="mb-3 relative">
              <div className="text-lg lg:text-xl font-semibold">
                {education.degree}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-200 lg:text-lg">
                <p> {education.institute}</p>
                <p> {education.duration}</p>
              </div>
              <div className="text-sm">{}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EducationCard;
