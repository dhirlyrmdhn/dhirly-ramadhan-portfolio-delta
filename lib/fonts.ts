import { Inter } from "next/font/google";
import localFont from "next/font/local";

export const acma = localFont({
  src: "../public/fonts/PPAcma-Book.ttf",
  variable: "--font-acma",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
