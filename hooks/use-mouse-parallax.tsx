"use client";

import { useRef, useCallback } from "react";
import gsap from "gsap";

export function useMouseParallax() {
  const requestAnimationFrameId = useRef(null);
  const xForce = useRef(0);
  const yForce = useRef(0);
  const easing = 0.08;
  const speed = 0.01;

  const lerp = (start, target, amount) =>
    start * (1 - amount) + target * amount;

  const animate = useCallback(() => {
    if (window.scrollY > 0) return;

    xForce.current = lerp(xForce.current, 0, easing);
    yForce.current = lerp(yForce.current, 0, easing);

    const plane1 = document.querySelector(".image-clip-3");
    const plane2 = document.querySelector(".image-clip-2");
    const plane3 = document.querySelector(".image-clip-1");

    if (plane1 && plane2 && plane3) {
      gsap.set(plane1, { x: `+=${xForce.current}`, y: `+=${yForce.current}` });
      gsap.set(plane2, {
        x: `+=${xForce.current * 0.5}`,
        y: `+=${yForce.current * 0.5}`,
      });
      gsap.set(plane3, {
        x: `+=${xForce.current * 0.25}`,
        y: `+=${yForce.current * 0.25}`,
      });
    }

    if (Math.abs(xForce.current) < 0.01) xForce.current = 0;
    if (Math.abs(yForce.current) < 0.01) yForce.current = 0;

    if (xForce.current != 0 || yForce.current != 0) {
      requestAnimationFrameId.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(requestAnimationFrameId.current);
      requestAnimationFrameId.current = null;
    }
  }, []);

  const manageMouseMove = useCallback(
    (e) => {
      const { movementX, movementY } = e;

      xForce.current += movementX * speed;
      yForce.current += movementY * speed;

      if (requestAnimationFrameId.current == null) {
        requestAnimationFrameId.current = requestAnimationFrame(animate);
      }
    },
    [animate]
  );

  return { manageMouseMove };
}
