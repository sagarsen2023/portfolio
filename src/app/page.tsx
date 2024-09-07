import HeroSection from "@/components/Hero-Section/HeroSection";
import React from "react";
import { heroSection } from "@/data/my-portfolio-data";

function Home() {
  return (
    <main>
      <HeroSection
        name={heroSection.name}
        descriptions={heroSection.descriptions}
        socialLinks={heroSection.socialLinks}
        cvLink={heroSection.cvLink}
      />
    </main>
  );
}

export default Home;
