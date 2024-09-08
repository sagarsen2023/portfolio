import React from "react";
import HeroSectionInterface from "@/models/hero-section.model";
import profilePicture from "@/assets/profile-picture.jpg";
import Image from "next/image";
import Link from "next/link";
import AnimatedButtonSmall from "../Animated-Button-Small";
import { FaFilePdf } from "react-icons/fa6";
import GenerateIcon from "../GenerateIcon";

function HeroSection({
  name,
  descriptions,
  socialLinks,
  cvLink,
}: HeroSectionInterface) {
  return (
    <div>
      {/* Text and Image Section */}
      <div className="mt-16 sm:grid lg:grid-cols-2 gap-10 place-items-center lg:place-items-end mb-5">
        {/* Text Container */}
        <div className="h-full">
          <div className="flex items-center gap-4">
            <div className="w-10 bg-black dark:bg-white h-0.5" />
            <span className="text-2xl font-medium">Hello</span>
          </div>
          <div className="text-4xl sm:text-5xl md:text-6xl my-7">
            <span>Hi I&apos;m </span>
            <span className="font-black">{name}</span>
          </div>
          <div className="flex flex-col gap-2 mr-3">
            {descriptions.map((description, index) => (
              <p
                key={index}
                className={`${
                  index == 0 ? "text-xl md:text-2xl font-thin" : "text-xl"
                }`}
              >
                {description}
              </p>
            ))}
          </div>
          <div className="mt-5">
            <Link href={cvLink}>
              <AnimatedButtonSmall
                buttonContext={
                  <div className="flex justify-center items-center gap-3">
                    <FaFilePdf />
                    <span className="mt-0.5">Get My CV</span>
                  </div>
                }
              />
            </Link>
          </div>
        </div>

        {/* Image Container */}
        <div className="relative mt-10 h-[400px] sm:w-[500px] sm:h-[500px] lg:w-[550px] lg:h-[550px] shadow-2xl dark:border dark:border-gray-300 rounded-xl">
          <Image
            src={profilePicture}
            alt="Profile Picture"
            className="object-cover object-center rounded-xl"
            fill
          />
        </div>
      </div>

      {/* Social Icons Section */}
      <div className="w-full flex justify-center lg:justify-start items-center gap-10 my-10">
        {socialLinks.map((socialLink, index) => (
          <Link key={index} href={socialLink.url} target="_blank">
           <GenerateIcon techName={socialLink.icon} className="text-4xl" />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HeroSection;
