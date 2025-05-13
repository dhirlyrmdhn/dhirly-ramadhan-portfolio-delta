"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";

type Props = {
  modal: {
    active: boolean;
    index: number;
  };
  projects: any[];
};

const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
  },
};

const ModalProject = ({ modal, projects }: Props) => {
  const { active, index } = modal;

  const modalContainer = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const cursorLabel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only set up event listeners if the modal is active
    if (!active) return;

    // Move Container
    const xMoveContainer = gsap.quickTo(modalContainer.current, "left", {
      duration: 0.8,
      ease: "power3",
    });

    const yMoveContainer = gsap.quickTo(modalContainer.current, "top", {
      duration: 0.8,
      ease: "power3",
    });

    // Move cursor
    const xMoveCursor = gsap.quickTo(cursor.current, "left", {
      duration: 0.5,
      ease: "power3",
    });

    const yMoveCursor = gsap.quickTo(cursor.current, "top", {
      duration: 0.5,
      ease: "power3",
    });

    // Move cursor label
    const xMoveCursorLabel = gsap.quickTo(cursorLabel.current, "left", {
      duration: 0.45,
      ease: "power3",
    });

    const yMoveCursorLabel = gsap.quickTo(cursorLabel.current, "top", {
      duration: 0.45,
      ease: "power3",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      xMoveContainer(clientX);
      yMoveContainer(clientY);
      xMoveCursor(clientX);
      yMoveCursor(clientY);
      xMoveCursorLabel(clientX);
      yMoveCursorLabel(clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [active]);

  return (
    <>
      <motion.div
        ref={modalContainer}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        className="h-[300px] w-[400px] absolute bg-white overflow-hidden flex justify-center items-center z-[999] pointer-events-none origin-center"
        style={{ position: "fixed", left: 0, top: 0 }}
      >
        <div
          style={{ top: index * -100 + "%" }}
          className="h-full w-full absolute transition-all duration-500"
        >
          {projects.map((project, i) => (
            <div
              key={i}
              className="h-full w-full flex items-center justify-center"
            >
              <Image
                src={project.src || "/images/1.png"}
                alt={project.title || "Project image"}
                width={400}
                height={300}
                className="h-auto object-cover"
              />
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        ref={cursor}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        // className="fixed h-16 w-16 rounded-full bg-blue-500 z-[1000] pointer-events-none flex items-center justify-center"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          transform: "translate(-50%, -50%)",
        }}
      />

      <motion.div
        ref={cursorLabel}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        // className="fixed text-white font-medium text-sm z-[1001] pointer-events-none"
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          transform: "translate(-50%, -50%)",
        }}
      >
        View
      </motion.div>
    </>
  );
};

export default ModalProject;
