import React, { ReactNode } from "react";

function AnimatedButtonSmall({ buttonContext }: { buttonContext: ReactNode }) {
  return (
    <button className="px-5 py-2 flex justify-center items-center rounded-xl bg-black text-white dark:bg-white dark:text-black transition-colors duration-300 ease-in-out hover:bg-white hover:border hover:border-black hover:text-black dark:hover:border-white dark:hover:bg-black dark:hover:text-white">
      {buttonContext}
    </button>
  );
}

export default AnimatedButtonSmall;
