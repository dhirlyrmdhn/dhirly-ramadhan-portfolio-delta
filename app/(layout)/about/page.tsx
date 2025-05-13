"use client";

import Footer from "@/components/sections/footer";
import Navigation from "@/components/ui/navigation";
import { acma } from "@/lib/fonts";
import { useScroll, useTransform, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef, useState } from "react";

const About = () => {
  const container = useRef(null);
  const footerRef = useRef(null);
  const paths = useRef([]);
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollYProgress: scrollYProgressFooter } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const footerY = useTransform(scrollYProgressFooter, [0, 1], [-500, 0]);
  const footerTextXLeft = useTransform(scrollYProgressFooter, [0, 1], [50, 0]);
  const footerTextXRight = useTransform(
    scrollYProgressFooter,
    [0, 1],
    [-50, 0]
  );
  const footerTextDesc = useTransform(scrollYProgressFooter, [0, 1], [50, 0]);

  useEffect(() => {
    // Register ScrollTrigger plugin
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Set initial position off-screen
    paths.current.forEach((path) => {
      gsap.set(path, { attr: { startOffset: "-100%" } });
    });

    // Create animation timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Animate text paths with staggered timing
    tl.to(paths.current, {
      attr: { startOffset: (i) => i * 40 + "%" },
      duration: 4,
      delay: 1,
      ease: "power4.out",
    });
    // paths.current.forEach((path) => {
    //   gsap.to(path, {
    //     attr: { startOffset: (i) => i * 40 + "%" },
    //     duration: 5,
    //     delay: 1,
    //     ease: "expo.out",
    //   });
    // });

    // Setup scroll animation after initial animation completes
    ScrollTrigger.create({
      trigger: container.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const progress = self.progress;
        paths.current.forEach((path, i) => {
          const newOffset = -40 + i * 40 + progress * 40;
          gsap.set(path, { attr: { startOffset: newOffset + "%" } });
        });
      },
    });

    // Add scroll event listener to handle clip container transformations
    const handleScroll = () => {
      if (window.scrollY > 1) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function
    return () => {
      if (ScrollTrigger.getAll().length) {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main ref={container}>
      <Navigation />
      <section className="bg-background min-h-screen z-30 relative">
        <div className="absolute top-0 flex h-screen w-full items-center justify-center leading-none">
          <svg className={`${acma.className} w-[200vw]`} viewBox="0 0 250 90">
            <path
              fill="none"
              id="curve"
              d="m0,88.5c61.37,0,61.5-68,126.5-68,58,0,51,68,123,68"
            />
            <text className="text-xl" style={{ fill: "white" }}>
              {[...Array(4)].map((_, i) => {
                return (
                  <textPath
                    key={i}
                    ref={(ref) => (paths.current[i] = ref)}
                    startOffset="-100%"
                    href="#curve"
                  >
                    Avant-garde.
                  </textPath>
                );
              })}
            </text>
          </svg>
        </div>
      </section>
      <Footer ref={footerRef}>
        <>
          <div className="flex w-full max-w-5xl flex-1 flex-col items-center justify-center pt-8">
            <div className="mb-40 w-full leading-relaxed flex">
              <div className="flex-1" />
              <ul className="grid list-disc gap-x-8 grid-cols-2">
                <li className="hover:underline">
                  <a href="/?loader=axz">Index</a>
                </li>
                <li className="hover:underline">
                  <a href="/case">Work</a>
                </li>
                {/* <li className="hover:underline">
                  <a href="">About</a>
                </li> */}
                <li className="hover:underline">
                  <a href="/contact">Contact</a>
                </li>
              </ul>
            </div>
            <div className="flex w-full justify-between">
              <motion.h1
                style={{ x: footerTextXLeft }}
                className={`${acma.className} text-[1300%]`}
              >
                ABOUT
              </motion.h1>
              <motion.h1
                style={{ x: footerTextXRight }}
                className={`${acma.className} text-[1300%]`}
              >
                ABOUT
              </motion.h1>
            </div>
            <motion.div
              style={{ y: footerTextDesc }}
              className="mt-12 max-w-96 text-center text-lg"
            >
              <p>Get to know about myself</p>
            </motion.div>
            <div className="relative mt-4 h-20">
              <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-transparent to-neutral-600" />
            </div>
          </div>
        </>
      </Footer>
    </main>
  );
};

export default About;
