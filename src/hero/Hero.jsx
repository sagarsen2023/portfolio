import React from 'react'
import Image from 'next/image';
import linkedin from "../../public/linkedin.svg";
import github from "../../public/github.svg";
import profile from "../../public/profile.jpg"
import email from "../../public/email.svg";
import "./hero.css";
import ProfileImage from '@/components/profileimage/ProfileImage';

const Hero = ({ data }) => {
    const { name, profession } = data;
    const { experience, projects, clients } = data.contents;
    return (
        <>
            <div className='hero-wrapper'>
                <div className="left">
                    <div className="profile-content">
                        <p>Hi! I'm</p>
                        <h4>{name}</h4>
                        <h1>{profession}</h1>
                    </div>

                    <div className="images">
                        <div>
                            <a href={`mailto:${data.aboutMe.email}`}>
                                <Image src={email} height={40} width={40} alt='logo unavailable' />
                            </a>
                        </div>
                        <div>
                            <a href={data.aboutMe.linkedin}>
                                <Image src={linkedin} alt='Images' width={40} height={40} />
                            </a>
                        </div>
                        <div>
                            <a href={data.aboutMe.github}> <Image src={github} alt='Images' width={40} height={40} />
                            </a>
                        </div>
                    </div>

                    <div className="btndiv">
                        <button className='button1'><a href={data.aboutMe.linkedin}>Hire Me</a></button>
                        <button className='button2'><a href={data.aboutMe.resume}>Download CV</a></button>
                    </div>
                    <div className='exp-project-client'>
                        <div className="experience">
                            <p className='content'>{experience}+</p>
                            <p className='description'>Experience</p>
                        </div>
                        <div className="bar1"></div>
                        <div className="project-done">
                            <p className='content'>{projects}+</p>
                            <p className='description'>Projects</p>
                        </div>
                        <div className="bar2"></div>
                        <div className="happy-clients">
                            <p className='content'>{clients}+</p>
                            <p className='description'>Clients</p>
                        </div>
                    </div>
                </div>

                <ProfileImage image={profile} />

            </div>
        </>
    )
}

export default Hero