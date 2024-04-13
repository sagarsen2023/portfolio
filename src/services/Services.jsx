import React from 'react';
import "./services.css";
import ServiceCard from '@/components/serviceCard/ServiceCard';
import frontEnd from "../../public//frontEnd.svg";
import backend from "../../public/backend.svg"
import videoediting from "../../public/videoediting.svg";
import androiddev from "../../public/androiddev.svg";
import help from "../../public/help.svg"
import writer from "../../public/writer.svg"
import ContentHeader from '@/components/content_header/ContentHeader';

const Services = ({serviceContent}) => {

  const svgs = [androiddev, frontEnd, backend, help, videoediting, writer];

  return (
    <>
      <div className="service-wrapper">
        <ContentHeader header={"Services"} description={"Services I can provide"}/>

        <div className="service-cards">
          {serviceContent.map((elem, index)=>(
            <ServiceCard key={index} icon={svgs[index]} content={serviceContent[index]}/>
          ))}
        </div>
      </div>
    </>
  )
}

export default Services