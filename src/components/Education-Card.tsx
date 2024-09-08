import { EducationInterface } from '@/models/professional-section.model'
import React from 'react'
import { IoSchoolOutline } from 'react-icons/io5';

function EducationCard({education}:{
    education: EducationInterface[]
}) {
    const reversedEducation = education.slice().reverse();
    let sameInstitute: string | null = null;
  return (
    <div className="w-full border border-black px-4 py-5 rounded-3xl">
    <div className="text-xl font-bold">Education</div>
    <div className="mt-5 ml-8 pl-8 border-l border-black">
    {reversedEducation.map((education, index) => {
      if(sameInstitute !== education.institute) {
        sameInstitute = education.institute;
        return <div key={index} className="mb-3 relative">
          <IoSchoolOutline className="absolute -top-1 -left-[50px] text-4xl  bg-white p-1 rounded-full" />
          <div className="text-lg font-semibold">{education.degree}</div>
          <div className="text-sm text-gray-500">{education.institute}</div>
          <div className="text-sm text-gray-500">
            {education.duration}
          </div>
          {/* <div className="text-sm">{experience.description}</div> */}
        </div>
      }
      return <div key={index} className="mb-3 relative">
        <div className="text-lg font-semibold">{education.degree}</div>
        <div className="text-sm text-gray-500">{education.institute}</div>
        <div className="text-sm text-gray-500">
          {education.duration}
        </div>
        <div className="text-sm">{}</div>
      </div>
})}
    </div>
  </div>
  )
}

export default EducationCard