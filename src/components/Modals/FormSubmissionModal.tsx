import React from "react";
import { MdCheckCircle, MdSmsFailed } from "react-icons/md";

function FormSubmissionModal({
  status,
  message,
  isOpen,
  onClose,
}: {
  status: "SUCCESS" | "ERROR";
  message: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <div className={`${isOpen ? "block no-doc-scroll" : "hidden"}`}>
      <div className="fixed top-0 left-0 w-full h-full bg-black backdrop-blur-lg bg-opacity-50 z-50 flex justify-center items-center px-5 transition-all duration-300">
        <div className="bg-white dark:bg-black p-10 rounded-lg w-full md:w-1/2 lg:w-1/3 border dark:border-gray-500">
          <div className="text-3xl font-bold text-center">
            {status === "SUCCESS" ? (
              <div>
                <MdCheckCircle className="inline text-5xl" />
                <p className="mt-2">Success!</p>
              </div>
            ) : (
              <div>
                <MdSmsFailed className="inline text-5xl" />
                <p className="mt-2">Error!</p>
              </div>
            )}
          </div>
          <p className="text-center mt-5 text-lg">{message}</p>
          <button
            aria-label="Close Modal"
            onClick={onClose}
            className="w-full mt-10 px-5 py-2 flex justify-center items-center rounded-lg bg-black text-white dark:bg-white dark:text-black transition-colors duration-300 ease-in-out hover:bg-white hover:border hover:border-black hover:text-black dark:hover:border-white dark:hover:bg-black dark:hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormSubmissionModal;
