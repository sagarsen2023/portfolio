import HeroSection from "@/components/Hero-Section/HeroSection";
import React from "react";
import {
  heroSection,
  serVicesSection,
  projectSection,
  professionalBackground,
  contactSection,
  copyrightSection
} from "@/data/my-portfolio-data";
import ProjectSection from "@/components/Projects-Section/ProjectSection";
import ServicesSection from "@/components/Services-Section/ServicesSection";
import ContactSection from "@/components/Contact-Section/ContactSection";
import { FaRegCopyright } from "react-icons/fa";
import ProfessionalSection from "@/components/Professional-Section/ProfessionalSection";

function Home() {
  return (
    <main>
      <HeroSection
        name={heroSection.name}
        descriptions={heroSection.descriptions}
        socialLinks={heroSection.socialLinks}
        cvLink={heroSection.cvLink}
      />

      <ServicesSection services={serVicesSection} />

      <ProjectSection projects={projectSection} />

      <ProfessionalSection professionalBackground={professionalBackground}/>

      <ContactSection
        title={contactSection.title}
        description={contactSection.description}
        email={contactSection.email}
        phone={contactSection.phone}
      />

      <div className="pb-5 w-full flex justify-center items-center gap-2">
        {/* Copyright Section */}
        <FaRegCopyright/>
        <span>
          {copyrightSection.year} {copyrightSection.name} all rights reserved.
        </span>
      </div>
    </main>
  );
}

export default Home;
