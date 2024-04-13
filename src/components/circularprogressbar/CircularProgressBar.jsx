import React from 'react';
import './circularprogressbar.css';
import Image from 'next/image';

const CircularProgressBar = ({ progress, content ,logo }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress / 100);

  return (
    <>
      <div className="progress-wrapper">
        <div className="progress">
          <div className="outer">
            <svg width="160" height="160" viewBox="0 0 160 160">
              <circle r={radius} cx="80" cy="80" fill="transparent" stroke="#333333" strokeWidth="15px"></circle>
              <circle r={radius} cx="80" cy="80" fill="transparent" stroke="#FD6F00" strokeWidth="12px"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
              ></circle>
            </svg>
          </div>
          <div className="inner">
            <Image
              src={logo}
              alt='progress image'
              width={50}
              height={50}
            />
          </div>
        </div>
        <div className="progress-data">
          <h3>{progress}%</h3>
          <h6>{content}</h6>
        </div>
      </div>

    </>
  );
};

export default CircularProgressBar;

