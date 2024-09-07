import React from "react";
import ContactSectionInterface from "@/models/contact-section.model";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import ContactUsForm from "../ContactUsForm";

function ContactSection({
  title,
  description,
  email,
  phone,
}: ContactSectionInterface) {
  return (
    <div className="mt-20 pb-20">
      <h2 className="text-4xl mr-10 lg:mr-0 font-bold md:text-center">
        {title}
      </h2>
      <div className="mt-5 w-full grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div>
          <div className="my-10">
            <p className="pb-10 font-thin opacity-40 dark:opacity-70 text-xl lg:text-3xl leading-6">
              {description}
            </p>

            <div className="flex gap-2 justify-start items-center mb-4">
              <MdEmail className="inline text-2xl" />
              <h3 className="inline text-xl lg:text-2xl mb-0.5 opacity-70">
                {email}
              </h3>
            </div>
            <div>
              <FaPhone className="inline text-2xl" />
              <h3 className="inline text-xl lg:text-2xl mb-0.5 opacity-70">
                {phone}
              </h3>
            </div>
          </div>
        </div>

        <div className="mt-10">
        <ContactUsForm />{" "}
        </div>
      </div>
    </div>
  );
}

export default ContactSection;
