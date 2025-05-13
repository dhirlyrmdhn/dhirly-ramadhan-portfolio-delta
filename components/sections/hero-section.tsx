"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  useScroll,
  useMotionValueEvent,
  motion,
  useTransform,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { imageConfigs } from "@/constants/image-configs";
import { useParallaxImages } from "@/hooks/use-parallax-images";

export default function HeroSection() {
  const scrollProgress1 = useRef(null);
  const plane1 = useRef(null);
  const plane2 = useRef(null);
  const plane3 = useRef(null);
  const { scrollYProgress: scrollYProgress1 } = useScroll({
    target: scrollProgress1,
    offset: ["start end", "end end"],
  });

  const { animateImagesOnScroll } = useParallaxImages();

  const xHashtag = useTransform(scrollYProgress1, [0, 1], [0, -500]);

  useEffect(() => {
    // Register ScrollTrigger plugin
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);

  // Use this function whenever scroll progress changes
  useMotionValueEvent(scrollYProgress1, "change", (latest) => {
    animateImagesOnScroll(latest);
  });

  return (
    <div className="absolute top-0 left-0 h-[515vh] w-full">
      <div className="image-container sticky top-0 left-0 z-0 h-screen w-full">
        {/* Image 1 */}
        <div
          ref={plane3}
          style={{
            clipPath: "inset(0 0 0 0)",
            transform: `translateX(${imageConfigs.image1.initial.x}vw) translateY(${imageConfigs.image1.initial.y}vh)`,
            width: `${imageConfigs.image1.initial.width}vw`,
            height: `calc(${imageConfigs.image1.initial.width}vw * ${imageConfigs.image1.initial.ratio})`,
          }}
          className="image-clip image-clip-1 absolute flex justify-end overflow-hidden rounded"
        >
          <Image
            alt="Image Case 1"
            src={imageConfigs.image1.src || "/placeholder.svg"}
            fill
            sizes="100%"
            className="object-cover"
          />
        </div>

        {/* Image 2 */}
        <div
          ref={plane2}
          style={{
            clipPath: "inset(0 0 0 0)",
            transform: `translateX(${imageConfigs.image2.initial.x}vw) translateY(${imageConfigs.image2.initial.y}vh)`,
            width: `${imageConfigs.image2.initial.width}vw`,
            height: `calc(${imageConfigs.image2.initial.width}vw * ${imageConfigs.image2.initial.ratio})`,
          }}
          className="image-clip image-clip-2 absolute top-0 flex justify-end overflow-hidden rounded"
        >
          <Image
            alt="Image Case 2"
            src={imageConfigs.image2.src || "/placeholder.svg"}
            fill
            sizes="100%"
            className="object-cover"
          />
        </div>

        {/* Image 3 */}
        <div
          ref={plane1}
          style={{
            clipPath: "inset(0 0 0 0)",
            transform: `translateX(${imageConfigs.image3.initial.x}vw) translateY(${imageConfigs.image3.initial.y}vh)`,
            width: `${imageConfigs.image3.initial.width}vw`,
            height: `calc(${imageConfigs.image3.initial.width}vw * ${imageConfigs.image3.initial.ratio})`,
          }}
          className="image-clip image-clip-3 absolute top-0 flex z-50 justify-end overflow-hidden rounded"
        >
          <Image
            alt="Image Case 3"
            src={imageConfigs.image3.src || "/placeholder.svg"}
            fill
            sizes="100%"
            className="object-cover"
          />
        </div>
      </div>
      <div ref={scrollProgress1} className="h-[50vh]"></div>
      <div className="w-full  h-screen absolute top-0 flex p-5 text-lg lg:p-6 items-end">
        <motion.p style={{ x: xHashtag }} className="hashtag">
          #LookingForWork
        </motion.p>
      </div>
    </div>
  );
}
