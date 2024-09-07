import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { Ubuntu } from "next/font/google";
import { Providers } from "./providera";

const ubuntu = Ubuntu({ weight: "400", subsets: ["greek"] });

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
      <body className={`${ubuntu.className} bg-white text-black dark:bg-black dark:text-white transition-colors duration-300 ease-in-out`}>
        <Providers>
           <NavBar />  
         
          <div className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-[100rem] lg:px-8 pt-16">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
