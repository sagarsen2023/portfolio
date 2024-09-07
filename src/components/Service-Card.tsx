import { ServiceInterface } from "@/models/services-section.model";
import React from "react";
import GenerateIcon from "./GenerateIcon";
import { MdBiotech } from "react-icons/md";

function ServiceCard({ service }: { service: ServiceInterface }) {
  return (
    <div className="w-full bg-gray-200 px-5 py-14 rounded-tl-3xl rounded-br-3xl hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-transparent dark:hover:border dark:hover:border-gray-700 hover:text-white transition-all duration-300 overflow-hidden">
      <h1 className="text-4xl font-bold text-balance hyphens-auto">{service.title}</h1>
      <p className="my-6 text-lg md:text-lg font-extralight">{service.description}</p>
      <div>
        <div className="flex items-center gap-2 mb-2">
          <MdBiotech className="text-3xl my-2 font-semibold" />
          <span>Tech Stack</span>
        </div>
        <div className="flex gap-3 text-2xl">
          {service.techStack.map((tech, index) => (
            <GenerateIcon key={index} techName={tech} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;
