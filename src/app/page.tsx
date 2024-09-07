import HeroSection from "@/components/Hero-Section/HeroSection";
import React from "react";
import {
  heroSection,
  serVicesSection,
  projectSection,
  contactSection,
} from "@/data/my-portfolio-data";
import ProjectSection from "@/components/Projects-Section/ProjectSection";
import ServicesSection from "@/components/Services-Section/ServicesSection";
import ContactSection from "@/components/Contact-Section/ContactSection";

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

      <ContactSection
        title={contactSection.title}
        description={contactSection.description}
        email={contactSection.email}
        phone={contactSection.phone}
      />
    </main>
  );
}

export default Home;
