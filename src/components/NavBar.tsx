"use client";
import { useTheme } from "next-themes";
import React, { useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { FiMoon } from "react-icons/fi";
import { IoMdSunny } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import AnimatedButtonSmall from "./Animated-Button-Small";
import Link from "next/link";

function NavBar() {
  const { setTheme, resolvedTheme } = useTheme();
  const [menu, setMenu] = useState(false);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="sticky top-0 z-30 w-full shadow-md dark:shadow-gray-400/30">
      <div className="mx-auto max-w-2xl lg:max-w-[100rem]">
        <div className="p-4 lg:px-8 backdrop-blur-xl bg-white/60 dark:bg-black/50 w-full flex justify-between items-center duration-300">
          <Link href={"/"}>
            <h1 className="font-bold text-2xl">Sagar Sen</h1>
          </Link>
          <button
            aria-label="Menu Button"
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
              aria-label="Toggle Theme"
              className="flex justify-center items-center p-2 text-sm rounded-3xl border border-gray-700 dark:border-gray-300 transition-colors duration-300 ease-in-out"
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
            <div aria-label="Contact me" onClick={scrollToBottom}>
              <AnimatedButtonSmall
                buttonContext={<span className="mt-0.5">Contact Me</span>}
              />
            </div>
          </div>
        </div>
      </div>
      {/* menu bar */}
      <div
        className={`fixed z-30 w-full max-w-full backdrop-blur-xl bg-white/60 dark:bg-black/50 h-screen px-4 py-10 shadow-lg transform transition-transform duration-300 ease-in-out ${
          menu ? "translate-x-0 no-doc-scroll" : "translate-x-full"
        }`}
      >
        <button
          aria-label="Change Theme Button"
          className="px-4 py-2 w-full rounded-lg border border-gray-300 dark:border-gray-400 flex justify-between items-center transition-colors duration-300 ease-in-out"
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
