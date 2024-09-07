import { ServicesSectionInterface } from "@/models/services-section.model";
import React from "react";
import ServiceCard from "../Service-Card";

function ServicesSection({ services }: { services: ServicesSectionInterface }) {
  return (
    <div className="py-10">
      <h1 className="text-4xl text-center font-bold mt-10">{services.title}</h1>
      <p className="text-center mt-4 mb-7 text-lg md:text-xl">{services.description}</p>
      <div className="pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
        {services.services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}

export default ServicesSection;
