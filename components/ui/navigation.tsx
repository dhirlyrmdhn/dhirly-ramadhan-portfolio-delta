"use client";

import { useEffect } from "react";
import gsap from "gsap";

interface NavigationProps {
  delay?: number;
}

export default function Navigation({ delay = 0 }: NavigationProps) {
  useEffect(() => {
    gsap.from("nav", {
      duration: 1,
      delay,
      opacity: 0,
      ease: "expo",
    });

    gsap.from(".hashtag", {
      duration: 1,
      delay,
      opacity: 0,
      ease: "expo",
    });
  }, []);

  return (
    <nav className="absolute flex w-full items-center z-50 justify-between p-5 text-lg lg:p-6">
      <div className="flex gap-5 lg:gap-6">
        <span>
          <a href="/?loader=axz">Dhirly Ramadhan</a>
        </span>
        <span>Developer</span>
      </div>
      <ul className="flex list-disc gap-5 lg:gap-8">
        {/* <li>
          <a href="/about">About</a>
        </li> */}
        <li>
          <a href="/case">Work</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
}
