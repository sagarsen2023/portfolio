import React from 'react';
import "./servicecard.css";
import Image from 'next/image';

const ServiceCards = ({icon, content}) => {
  return (
    <div className='card-wrapper'>
      <div className="service-icon">
        <Image
          src={icon}
          width={60}
          height={60}
          alt='Image not found'
        />
      </div>
      <div className="service-header">
        {content.header}
      </div>
      <div className="service-description">
        {content.description}
      </div>
    </div>
  )
}

export default ServiceCards;