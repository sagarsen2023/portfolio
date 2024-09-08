import React from "react";
import ContactSectionInterface from "@/models/contact-section.model";
import { MdEmail } from "react-icons/md";
import ContactUsForm from "../ContactUsForm";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

function ContactSection({
  title,
  description,
  email,
  emailBody,
  emailSubject,
  whatsApp,
  whatsAppCustomMessage,
}: ContactSectionInterface) {
  const phoneNo = whatsApp.split(" ").join("");
  const subject = encodeURIComponent(emailSubject);
  const body = encodeURIComponent(emailBody);
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
            <div className="flex justify-start items-center mb-4 ">
              <Link href={`mailto:${email}?subject=${subject}&body=${body}`}>
                <MdEmail className="inline text-2xl mr-2" />
                <h3 className="inline text-xl lg:text-2xl mb-0.5 opacity-70">
                  {email}
                </h3>
              </Link>
            </div>

            <div className="flex justify-start items-center">
              <Link
                href={`https://wa.me/${phoneNo}?text=${whatsAppCustomMessage}`}
              >
                <FaWhatsapp className="inline text-2xl mr-2 mb-1" />
                <h3 className="inline text-xl lg:text-2xl opacity-70">
                  {whatsApp}
                </h3>
              </Link>
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
