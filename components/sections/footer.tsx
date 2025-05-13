"use client";

import React, { useRef, type RefObject } from "react";
import {
  motion,
  type MotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { acma } from "@/lib/fonts";

interface FooterProps {
  children?: React.ReactNode;
  ref?: any;
}

export default function Footer({ children, ref }: FooterProps) {
  const footerRef = useRef(null);

  const { scrollYProgress: scrollYProgressFooter } = useScroll({
    target: ref ? ref : footerRef,
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

  return (
    <motion.section ref={ref ? ref : footerRef} style={{ y: footerY }}>
      <footer className="flex min-h-screen w-full flex-col items-center bg-gray-300 leading-none text-black">
        {children ? (
          children
        ) : (
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
                  GEEK
                </motion.h1>
                <motion.h1
                  style={{ x: footerTextXRight }}
                  className={`${acma.className} text-[1300%]`}
                >
                  GEEK
                </motion.h1>
              </div>
              <motion.div
                style={{ y: footerTextDesc }}
                className="mt-12 max-w-96 text-center text-lg"
              >
                <p>
                  <b>Geek</b>, someone who is passionate and knowledgeable about
                  a specific subject, often computers or technology.
                </p>
              </motion.div>
              <div className="relative mt-4 h-20">
                <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-transparent to-neutral-600" />
              </div>
            </div>
          </>
        )}
        <div className="flex w-full max-w-5xl justify-between py-5 lg:py-6">
          <span>Dhirly Ramadhan Portfolio</span>
          <span>2025</span>
        </div>
      </footer>
    </motion.section>
  );
}
