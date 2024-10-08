import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { Rubik } from "next/font/google";
import { Providers } from "./providera";

const rubik = Rubik({ weight: "400", subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Sagar Sen's Portfolio",
  description: "Let's build something together!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rubik.className} bg-white text-black dark:bg-black dark:text-white transition-colors duration-300 ease-in-out min-h-screen flex flex-col`}>
        <Providers>
           <NavBar />  
         
           <div className="mx-auto flex flex-col flex-grow w-full max-w-2xl px-4 sm:px-6 lg:max-w-[100rem] lg:px-8 overflow-y-auto">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
