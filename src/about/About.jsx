import React from 'react'
import "./about.css";
import ContentHeader from '@/components/content_header/ContentHeader';
import ProfileImage from '@/components/profileimage/ProfileImage';
import profile from "../../public/profile.jpg"
import CircularProgressBar from '@/components/circularprogressbar/CircularProgressBar';

const About = ({ aboutContent, progresses, langusgeIcons, frameworkIcons, otherSkills }) => {
    const languageNames = Object.keys(progresses.languages);
    const frameworkNames = Object.keys(progresses.frameworks);
    const otherSkillNames = Object.keys(progresses.others);
    return (
        <>
            <div className="about-wrapper">
                <ContentHeader header={"About"} description={"Know more about me"} />
                <div className="about-content">
                    <div className="about-left">
                        <ProfileImage image={profile} />
                    </div>
                    <div className="about-right">
                        {aboutContent}
                    </div>
                </div>
                <div className="about-bottom">
                    <div className="languages">
                        <h3>Languages</h3>
                        <div className="progressbars">
                           {langusgeIcons.map(
                            (elem, index) => (
                                <CircularProgressBar key={index} content={languageNames[index]} logo={elem} progress={progresses.languages[languageNames[index]]}/>
                            )
                           )}
                        </div>
                    </div>

                    <div className="rameworks">
                        <h3>Frameworks</h3>
                        <div className="progressbars">
                            {frameworkIcons.map((elem, index)=>(
                                <CircularProgressBar key={index} content={frameworkNames[index]} logo={elem} progress={progresses.frameworks[frameworkNames[index]]}/>
                            ))}
                        </div>
                    </div>

                    <div className="otherSkills">
                    <h3>Other Skills</h3>
                        <div className="progressbars">
                        {otherSkills.map((elem, index) => (
                            <CircularProgressBar key={index} content={otherSkillNames[index]} logo={elem} progress={progresses.others[otherSkillNames[index]]}/>
                        ))}
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default About