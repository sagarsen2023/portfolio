import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
