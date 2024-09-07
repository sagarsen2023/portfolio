"use client";
import { useTheme } from "next-themes";
import Link from "next/link";
import React, { useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { FiMoon } from "react-icons/fi";
import { IoMdSunny } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";

function NavBar() {
  const { setTheme, resolvedTheme } = useTheme();
  const [menu, setMenu] = useState(false);

  return (
    <div className="mx-auto max-w-2xl lg:max-w-[100rem] relative">
      <div className="p-4 lg:px-8 absolute backdrop-blur-md w-full flex justify-between items-center z-10">
        <h1 className="font-bold text-2xl">Sagar Sen</h1>
        <button
          onClick={() => {
            setMenu(!menu);
          }}
          className="block sm:hidden"
        >
          {menu ? (
            <RxCross1 className="text-3xl" />
          ) : (
            <BiMenuAltRight className="text-3xl" />
          )}
        </button>

        <div className="hidden sm:flex items-center gap-4">
            {/* Theme Toggler visible above mobile resolutions */}
          <button
            className={`flex justify-center items-center p-2 text-sm rounded-3xl border border-gray-700 dark:border-gray-300 transition-colors duration-300 ease-in-out`}
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            <div>
              {resolvedTheme === "dark" ? (
                <IoMdSunny className="text-xl" />
              ) : (
                <FiMoon className="text-xl" />
              )}
            </div>
          </button>
           {/* Contact us visible above mobile resolutions */}
          <Link href="">
            <button className={`px-3 py-2 rounded-xl bg-black text-white dark:bg-white dark:text-black transition-colors duration-300 ease-in-out`}>Contact Me</button>
          </Link>
        </div>
      </div>

      {/* menu bar */}
      <div
        className={`fixed top-16 w-full max-w-full backdrop-blur-md h-screen px-4 py-10 shadow-lg transform transition-transform duration-300 ease-in-out ${
          menu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="px-4 py-2 w-full rounded-lg border border-gray-300 dark:border-gray-700 flex justify-between items-center transition-colors duration-300 ease-in-out"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
          <h1>Toggle Theme</h1>
          {resolvedTheme === "dark" ? (
            <IoMdSunny className="text-3xl transition-transform duration-300 ease-in-out transform hover:scale-110" />
          ) : (
            <FiMoon className="text-3xl transition-transform duration-300 ease-in-out transform hover:scale-110" />
          )}
        </button>
      </div>
    </div>
  );
}

export default NavBar;
