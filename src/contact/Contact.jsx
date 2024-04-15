import React from 'react';
import Image from 'next/image';
import "./contact.css";
import linkedin from "../../public/linkedin.svg";
import github from "../../public/github.svg";
import email from "../../public/email.svg";
import { Link } from 'react-scroll';

const Contact = ({ contact }) => {
    return (
        <div className="contact-wrapper">
            <div className="contact-content">
                <div className="contact-text">
                    <h3>Let's Connect</h3>
                    <p>{contact.contactDescription}</p>
                </div>
                <div className="contact-links">
                    <ul>
                        <li><Link to="hero" offset={-50} smooth={true} duration={500}>Home</Link></li>
                        <li><Link to="services" offset={-110} smooth={true} duration={500}>Services</Link></li>
                        <li><Link to="about" offset={-20} smooth={true} duration={500}>About Me</Link></li>
                        <li><Link to="about" offset={850} smooth={true} duration={500}>Skills</Link></li>
                        <li><Link to="projects" offset={10} smooth={true} duration={500}>Projects</Link></li>
                    </ul>
                </div>
                <div className="image-links">
                    <div>
                        <a href={`mailto:${contact.email}`} target='_main'>
                            <Image src={email} height={40} width={40} alt='logo unavailable' />
                        </a>
                    </div>
                    <div>
                        <a href={contact.linkedin} target='_main'>
                            <Image src={linkedin} alt='Images' width={40} height={40} />
                        </a>
                    </div>
                    <div>
                        <a href={contact.github} target='_main'> <Image src={github} alt='Images' width={40} height={40} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
