"use client"
import React, { useState, useEffect } from 'react';
import data from "../data/data.json"
import Hero from '@/hero/Hero';
import NavBar from '@/components/Navbar/NavBar';
import Services from '@/services/Services';
import About from '@/about/About';
import Projects from '@/projects/Projects';
import Contact from '@/contact/Contact';

// Importing images
// Languages
import html from "../../public/html.svg";
import css from "../../public/css.svg";
import js from "../../public/js.svg";
import c from "../../public/c.svg";
import python from "../../public/python.svg";
import dart from "../../public/dart.svg";

// Frameworks
import react from "../../public/react.svg";
import express from "../../public/express.svg";
import tailwind from "../../public/tailwind.svg";
import next from "../../public/next.svg";
import flutter from "../../public/flutter.svg";

// Others
import figma from "../../public/figma.svg";
import canva from "../../public/canva.svg";
import premiere from "../../public/premiere.svg";
import resolve from "../../public/resolve.svg";



const page = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursorPos({ x: event.clientX, y: event.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // Empty dependency array to run only once on mount
  const langusgeIcons = [html, css, js, c, python, dart];
  const frameworkIcons = [react, express, tailwind, next, flutter];
  const otherIcons = [figma, canva, premiere, resolve];
  return (
    <>
      <NavBar contactLink={data.aboutMe.linkedin} />
      <div>
        <div id="hero">
          <Hero data={data} />
        </div>
        <div id="services">
          <Services serviceContent={data.services} />
        </div>
        <div id="about">
          <About aboutContent={data.aboutMe.description} progresses={data.progressDetails} langusgeIcons={langusgeIcons} frameworkIcons={frameworkIcons} otherSkills={otherIcons} />
        </div>
        <div id="projects">
          <Projects projectData={data.recentProjects} langusgeIcons={langusgeIcons} frameworkIcons={frameworkIcons} otherIcons={otherIcons} />
        </div>
        <div className="contact">
          <Contact contact={data.aboutMe} />
        </div>
        <div className="cursorCircle" style={{ left: cursorPos.x, top: cursorPos.y }}></div>
      </div>
    </>
  )
}

export default page 