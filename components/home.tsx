"use client";

import { useSearchParams } from "next/navigation";

import { Suspense, useEffect } from "react";
import localFont from "next/font/local";

// Components
import Loader from "@/components/sections/loader";
import HeroSection from "@/components/sections/hero-section";
import ProjectsSection from "@/components/sections/projects-section";
import AboutSection from "@/components/sections/about-section";
import ContactSection from "@/components/sections/contact-section";
import Footer from "@/components/sections/footer";
import Navigation from "@/components/ui/navigation";

// Hooks
import { useMouseParallax } from "@/hooks/use-mouse-parallax";
import { ScrollLock } from "@/utils/scroll-lock";

export const acma = localFont({
  src: "../public/fonts/PPAcma-Book.ttf",
  variable: "--font-acma",
});

function SearchParamsContent() {
  const searchParams = useSearchParams();
  const showLoader = searchParams.get("loader");

  useEffect(() => {
    // Apply scroll lock when component mounts
    if (!showLoader) ScrollLock.disable(9675);

    // Cleanup function to ensure scroll is re-enabled if component unmounts
    return () => {
      ScrollLock.enable();
    };
  }, [showLoader]);

  return showLoader || "";
}

export default function Home() {
  const { manageMouseMove } = useMouseParallax();
  const params = SearchParamsContent();

  return (
    <main onMouseMove={manageMouseMove}>
      <Navigation delay={1} />
      <Suspense fallback={<div>Loading...</div>}>
        {/* This component will handle the useSearchParams logic */}
        <Loader acmaFont={acma.className} loader={params} />
      </Suspense>
      <HeroSection />
      <ProjectsSection acmaFont={acma.className} />
      <AboutSection acmaFont={acma.className} />
      <ContactSection acmaFont={acma.className} />
      <Footer />
    </main>
  );
}
