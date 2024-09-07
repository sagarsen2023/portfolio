import HeroSection from "@/components/Hero-Section/HeroSection";
import React from "react";
import {
  heroSection,
  serVicesSection,
  projectSection,
} from "@/data/my-portfolio-data";
import ProjectSection from "@/components/Projects-Section/ProjectSection";
import ServicesSection from "@/components/Services-Section/ServicesSection";

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
    </main>
  );
}

export default Home;
