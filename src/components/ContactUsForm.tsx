"use client"
import React from "react";
import { useForm } from "@formspree/react";

const ContactForm = () => {
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORM_ID!);

  if (state.succeeded) {
    return <p className="text-white">Thanks for your submission!</p>;
  }

  return (
    <div className=" p-6 rounded-lg shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Your name"
            required
            className="w-full border border-gray-500 p-2 bg-transparent dark:border-white rounded-lg" 
          />
        </div>
        <div>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Your email Address"
            required
            className="w-full border border-gray-500 p-2 bg-transparent dark:border-white rounded-lg"
          />
        </div>
        <div>
          <input
            id="Project Title"
            type="text"
            name="Project Title"
            required
            placeholder="Your project title"
            className="w-full border border-gray-500 p-2 bg-transparent dark:border-white rounded-lg"
          />
        </div>
        <div>
          <textarea
            id="Project Description"
            name="Project Description"
            placeholder="Your project description"
            required
            className="w-full border border-gray-500 p-2 bg-transparent dark:border-white rounded-lg resize-none h-24"
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={state.submitting}
            className="w-full px-5 py-2 flex justify-center items-center rounded-lg bg-black text-white dark:bg-white dark:text-black transition-colors duration-300 ease-in-out hover:bg-white hover:border hover:border-black hover:text-black dark:hover:border-white dark:hover:bg-black dark:hover:text-white"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;