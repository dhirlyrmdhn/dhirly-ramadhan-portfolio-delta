import type React from "react";
import "./globals.css";
import { inter } from "@/lib/fonts";

export const metadata = {
  title: "Dhirly Ramadhan -- Developer",
  description: "Creative Frontend Developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased w-full overflow-x-hidden`}
      >
        <div className="w-full h-full md:scale-0 fixed top-0 z-[9999] flex items-center justify-center bg-background">
          <p>Website under development</p>
        </div>
        {children}
      </body>
    </html>
  );
}
