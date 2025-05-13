"use client";

import { useEffect } from "react";
import gsap from "gsap";

interface LoaderProps {
  acmaFont: string;
  loader?: string;
}

export default function Loader({ acmaFont, loader }: LoaderProps) {
  useEffect(() => {
    gsap.from(".clip-top, .clip-bottom", {
      duration: loader ? 0 : 2,
      delay: loader ? 0 : 1,
      height: "calc(50vh + 1px)",
      ease: "power4.inOut",
    });

    gsap.to(".marquee", {
      duration: loader ? 0 : 3.5,
      delay: loader ? 0 : 0.75,
      top: "50%",
      ease: "power4.inOut",
    });

    gsap.from(".clip-top .marquee, .clip-bottom .marquee", {
      duration: loader ? 0 : 5,
      delay: loader ? 0 : 1,
      left: "100%",
      ease: "power4.inOut",
    });

    gsap.from(".clip-center .marquee", {
      duration: loader ? 0 : 5,
      delay: loader ? 0 : 1,
      left: "-50%",
      ease: "power4.inOut",
    });

    gsap.to(".clip-top", {
      duration: loader ? 0 : 2,
      delay: loader ? 0 : 6,
      clipPath: "inset(0 0 100% 0)",
      ease: "power4.inOut",
    });

    gsap.to(".clip-bottom", {
      duration: loader ? 0 : 2,
      delay: loader ? 0 : 6,
      clipPath: "inset(100% 0 0 0)",
      ease: "power4.inOut",
    });

    gsap.to(
      ".clip-top .marquee, .clip-bottom .marquee, .clip-center .marquee span",
      {
        duration: loader ? 0 : 1,
        delay: loader ? 0 : 6,
        opacity: 0,
        ease: "power2.inOut",
      }
    );

    gsap.from(".image-clip", {
      duration: 1,
      delay: loader ? 0 : 8,
      clipPath: "inset(0 100% 0 0)",
      ease: "power4.inOut",
    });

    gsap.from("main", {
      duration: loader ? 0 : 1,
      delay: loader ? 0 : 9.675,
      ease: "expo",
      background: "white",
      color: "black",
    });

    gsap.from(".clip-center .marquee", {
      duration: loader ? 0 : 1,
      delay: loader ? 0 : 9.675,
      ease: "expo",
      color: "black",
    });
  }, []);

  return (
    <section
      className={`${acmaFont} loader relative z-10 h-screen leading-none`}
    >
      <div className="loader-clip clip-top h-[calc(100vh / 3)] absolute top-0 z-50 w-full overflow-clip bg-white">
        <div className="marquee absolute top-[200%] left-1/2 w-[200vw] font-[14vw] text-black">
          <MarqueeContent />
        </div>
      </div>
      <div className="loader-clip clip-bottom h-[calc(100vh / 3)] absolute bottom-0 z-50 w-full overflow-clip bg-white">
        <div className="marquee absolute top-[200%] left-1/2 w-[200vw] font-[14vw] text-black">
          <MarqueeContent />
        </div>
      </div>
      <div className="clip-center h-[calc(100vh / 3)] top-[100vh / 3] relative w-full overflow-hidden">
        <div className="marquee absolute top-[200%] left-1/2 w-[200vw] font-[14vw]">
          <div className="marquee-container relative z-[999] flex w-full items-center justify-between">
            <span>geek</span>
            {/* <span className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-black"></div>
            </span> */}
            <span>geek</span>
            {/* <span className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-black"></div>
            </span> */}
            geek
            {/* <span className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-black"></div>
            </span> */}
            <span>geek</span>
            {/* <span className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-black"></div>
            </span> */}
            <span>geek</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function MarqueeContent() {
  return (
    <div className="marquee-container flex w-full text-white items-center justify-between">
      <span>geek</span>
      {/* <span className="flex items-center">
        <div className="h-8 w-8 rounded-full bg-white"></div>
      </span> */}
      <span>geek</span>
      {/* <span className="flex items-center">
        <div className="h-8 w-8 rounded-full bg-white"></div>
      </span> */}
      geek
      {/* <span className="flex items-center">
        <div className="h-8 w-8 rounded-full bg-white"></div>
      </span> */}
      <span>geek</span>
      {/* <span className="flex items-center">
        <div className="h-8 w-8 rounded-full bg-white"></div>
      </span> */}
      <span>geek</span>
    </div>
  );
}
