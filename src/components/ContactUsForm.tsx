"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "@formspree/react";
import FormSubmissionModal from "./Modals/FormSubmissionModal";

const ContactForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORM_ID!);

  useEffect(() => {
    if (state.succeeded) {
      setIsModalOpen(true);
    }
  }, [state.succeeded]);

  return (
    <div className="p-6 rounded-lg shadow-xl w-full border-t dark:border border-gray-200 dark:border-gray-500 transition duration-300">
      <h2 className="text-2xl mt-3 mb-6 font-bold">Contact Me</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Your name"
            required
            className="w-full border border-gray-500 p-2 lg:py-4 bg-transparent dark:border-gray-400 rounded-lg focus:outline-none"
          />
        </div>
        <div>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Your email Address"
            required
            className="w-full border border-gray-500 p-2 lg:py-4 bg-transparent dark:border-gray-400 rounded-lg focus:outline-none"
          />
        </div>
        <div>
          <input
            id="Project Title"
            type="text"
            name="Project Title"
            required
            placeholder="Your project title"
            className="w-full border border-gray-500 p-2 lg:py-4 bg-transparent dark:border-gray-400 rounded-lg focus:outline-none"
          />
        </div>
        <div>
          <textarea
            id="Project Description"
            name="Project Description"
            placeholder="Your project description"
            required
            className="w-full border border-gray-500 p-2 lg:py-4 bg-transparent dark:border-gray-400 rounded-lg resize-none h-24 focus:outline-none"
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={state.submitting}
            className="w-full px-5 py-2 flex justify-center items-center rounded-lg bg-black text-white dark:bg-white dark:text-black transition-colors duration-300 ease-in-out hover:bg-white hover:border hover:border-black hover:text-black dark:hover:border-white dark:hover:bg-black dark:hover:text-white"
          >
            {state.submitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </>
            ) : (
              "Send"
            )}
          </button>
        </div>
      </form>
      <FormSubmissionModal
        status={state.succeeded ? "SUCCESS" : "ERROR"}
        message={
          state.succeeded
            ? "Your message has been sent successfully! I will get back to you soon."
            : "There was an error sending your message. Please try again. If the problem persists, please contact me via email."
        }
        onClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
      />
    </div>
  );
};

export default ContactForm;