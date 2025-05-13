"use client";

import { useCallback } from "react";
import gsap from "gsap";
import { imageConfigs } from "@/constants/image-configs";

export function useParallaxImages() {
  // Animation function to handle scroll-based animations
  const animateImagesOnScroll = useCallback((progress: number) => {
    if (typeof window === "undefined") return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Common final height adjustment for centering
    const heightAdjustment = vh * 0.5 - vw * 0.1875;

    // Calculate image1 transformations
    const image1Config = imageConfigs.image1;
    const width1 =
      image1Config.initial.width +
      (image1Config.final.width - image1Config.initial.width) * progress;
    const height1 = width1 * image1Config.initial.ratio;
    const x1 =
      image1Config.initial.x * 0.01 * vw -
      (image1Config.initial.x - image1Config.final.x) * 0.01 * vw * progress;
    const y1 =
      image1Config.initial.y * 0.01 * vh -
      (image1Config.initial.y * 0.01 * vh - heightAdjustment) * progress;

    // Calculate image2 transformations
    const image2Config = imageConfigs.image2;
    const finalWidth2 = (width1 / 100) * vw; // Use same final width as image1
    const width2 =
      image2Config.initial.width * 0.01 * vw +
      (finalWidth2 - image2Config.initial.width * 0.01 * vw) * progress;
    const height2 =
      image2Config.initial.width * 0.01 * vw * image2Config.initial.ratio +
      ((height1 / 100) * vw -
        image2Config.initial.width * 0.01 * vw * image2Config.initial.ratio) *
        progress;
    const x2 =
      image2Config.initial.x * 0.01 * vw +
      (image2Config.final.x - image2Config.initial.x) * 0.01 * vw * progress;
    const y2 =
      image2Config.initial.y * 0.01 * vh -
      (image2Config.initial.y * 0.01 * vh - heightAdjustment) * progress;

    // Calculate image3 transformations
    const image3Config = imageConfigs.image3;
    const width3 =
      image3Config.initial.width * 0.01 * vw +
      (finalWidth2 - image3Config.initial.width * 0.01 * vw) * progress;
    const height3 =
      image3Config.initial.width * 0.01 * vw * image3Config.initial.ratio +
      ((height1 / 100) * vw -
        image3Config.initial.width * 0.01 * vw * image3Config.initial.ratio) *
        progress;
    const x3 =
      image3Config.initial.x * 0.01 * vw -
      (image3Config.initial.x - image3Config.final.x) * 0.01 * vw * progress;
    const y3 =
      image3Config.initial.y * 0.01 * vh +
      (heightAdjustment - image3Config.initial.y * 0.01 * vh) * progress;

    // Apply transformations
    gsap.to(".image-clip-1", {
      width: `${width1}vw`,
      height: `${height1}vw`,
      x: x1,
      y: y1,
      ease: "expo",
    });

    gsap.to(".image-clip-2", {
      width: width2,
      height: height2,
      x: x2,
      y: y2,
      ease: "expo",
    });

    gsap.to(".image-clip-3", {
      width: width3,
      height: height3,
      x: x3,
      y: y3,
      ease: "expo",
    });

    gsap.to(".clip-center", {
      y: -1 * (400 * progress),
      //   x: 200 * progress,
    });
  }, []);

  return { animateImagesOnScroll };
}
