"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";

type Props = {
  children: React.ReactNode;
  animateOnScroll?: boolean;
  delay?: number;
};

gsap.registerPlugin(SplitText, ScrollTrigger);

const TextReveal = ({ children, animateOnScroll = true, delay = 0 }: Props) => {
  const containerRef = useRef(null);
  const elementRef = useRef([]);
  const splitRef = useRef([]);
  const lines = useRef([]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      splitRef.current = [];
      elementRef.current = [];
      lines.current = [];

      let elements = [];
      // @ts-ignore
      if (containerRef.current.hasAttribute("data-copy-wrapper")) {
        // @ts-ignore
        elements = Array.from(containerRef.current.children);
      } else {
        elements = [containerRef.current];
      }

      elements.forEach((element) => {
        // @ts-ignore
        const split = SplitText.create(element, {
          type: "lines",
          mask: "lines",
          linesClass: "line++",
        });

        // @ts-ignore
        splitRef.current.push(split);

        // @ts-ignore
        const computedStyle = window.getComputedStyle(element);
        const textIndent = computedStyle.textIndent;

        if (textIndent && textIndent !== "0px") {
          if (split.lines.length > 0) {
            // @ts-ignore
            split.lines[0].style.paddingLeft = textIndent;
          }
          // @ts-ignore
          element.style.textIndent = "0";
        }

        // @ts-ignore
        lines.current.push(...split.lines);
      });

      gsap.set(lines.current, { y: "100%" });

      const animationProps = {
        y: "0%",
        duration: 1,
        stagger: 0.1,
        ease: "power.out",
        // delay: delay,
      };

      if (animateOnScroll) {
        gsap.to(lines.current, {
          ...animationProps,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            once: false,
          },
        });
      } else {
        gsap.to(lines.current, animationProps);
      }

      return () => {
        splitRef.current.forEach((split) => {
          if (split) {
            // @ts-ignore
            split.revert();
          }
        });
      };
    },
    {
      scope: containerRef,
      dependencies: [animateOnScroll, delay],
    }
  );

  if (React.Children.count(children) === 1) {
    // @ts-ignore
    return React.cloneElement(children, { ref: containerRef });
  }

  return (
    <div ref={containerRef} data-copy-wrapper="true">
      {children}
    </div>
  );
};

export default TextReveal;
