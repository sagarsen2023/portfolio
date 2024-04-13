"use client";
import React, { useState } from 'react'
import Image from 'next/image';
import menu from "./menu.svg";
import close from "./close.svg";
import "./navbar.css"
import { Link } from 'react-scroll';

const NavBar = ({contactLink}) => {
  let [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <div className="nav-wrapper">
        <div onClick={() => { setMenuOpen(!menuOpen) }} className="menu-image">
          <Image
            src={menuOpen ? close : menu}
            alt='menu-image'
            width={25}
            height={25}
          />
        </div>
        <h3>Sen Production</h3>

        <ul>
          <li><Link to="hero" offset={-50} smooth={true} duration={500}>Home</Link></li>
          <li><Link to="services" offset={-110} smooth={true} duration={500}>Services</Link></li>
          <li><Link to="about" offset={-20} smooth={true} duration={500}>About Me</Link></li>
          <li><Link to="about" offset={850} smooth={true} duration={500}>Skills</Link></li>
          <li><Link to="projects" offset={10} smooth={true} duration={500}>Projects</Link></li>
          <li><Link to="contact" smooth={true} duration={500} onClick={() => setMenuOpen(false)}>Contact Me</Link></li>
        </ul>

        <button className='contactLink'><a href={contactLink}>Hire Me</a></button>
      </div>

      <div className={"menuItems"} style={
        { transform: menuOpen ? "translate(0)" : "translate(-100%)" }}>
          <ul>
            <li><Link to="hero" offset={-50} smooth={true} duration={500} onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="services" offset={-110} smooth={true} duration={500} onClick={() => setMenuOpen(false)}>Services</Link></li>
            <li><Link to="about" offset={-20} smooth={true} duration={500} onClick={() => setMenuOpen(false)}>About Me</Link></li>
            <li><Link to="about" offset={1300} smooth={true} duration={500} onClick={() => setMenuOpen(false)}>Skills</Link></li>
            <li><Link to="projects" offset={-30} smooth={true} duration={500} onClick={() => setMenuOpen(false)}>Projects</Link></li>
            <li><Link to="contact" smooth={true} duration={500} onClick={() => setMenuOpen(false)}>Contact Me</Link></li>
          </ul>
      </div>
    </>
  )
}

export default NavBar