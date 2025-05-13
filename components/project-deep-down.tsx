"use client";

import Footer from "@/components/sections/footer";
import Navigation from "@/components/ui/navigation";
import { projectsData } from "@/constants/project-configs";
import { acma } from "@/lib/fonts";
import { useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";
import React, { useRef } from "react";
import TextReveal from "./text-reveal";

interface ProjectDeepDownProps {
  image: any;
  project: any;
}

function ProjectDeepDown({ image, project }: ProjectDeepDownProps) {
  const imageContainer = useRef(null);

  const { scrollYProgress } = useScroll({
    target: imageContainer,
    offset: ["start center", "end center"],
  });

  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  const footerRef = useRef(null);

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

  return (
    <main>
      <Navigation />
      <section className="bg-background z-30 relative">
        <div className="py-[25vh] flex flex-col">
          <div className="mx-auto w-full max-w-7xl flex flex-col">
            <TextReveal>
              <h1
                className={`${acma.className} text-[12vh] mx-auto text-center`}
              >
                {project?.title ? project.title : ""}
              </h1>
            </TextReveal>
            <TextReveal>
              <h2 className={`text-[4vh] mx-auto text-center`}>
                {project.subtitle}
              </h2>
            </TextReveal>
            {project.link && (
              <TextReveal>
                <div className="w-full text-lg flex justify-center mt-4">
                  <a
                    href={project.link}
                    target="_blank"
                    className="mx-auto underline text-green-500"
                  >
                    {project.linkName}
                  </a>
                </div>
              </TextReveal>
            )}
          </div>
        </div>
        <motion.div
          // style={{ scale: scaleImage }}
          className="w-full aspect-video relative"
          ref={imageContainer}
        >
          <Image
            alt={`Thumbnail Project`}
            src={image.src}
            fill
            className="object-cover"
          />
        </motion.div>
        <ul className="py-[65vh] items-center gap-40 flex flex-col w-full">
          {project.listDescription.map((desc: string, index: number) => (
            <li
              key={index}
              className={`max-w-7xl w-full flex flex-col ${index === 0 ? "items-center" : index === 2 ? "items-end" : index === 3 ? "items-center" : ""}`}
            >
              <span
                className={`text-[4vh] max-w-5xl flex gap-8 ${acma.className}`}
              >
                <TextReveal>
                  <span className="-translate-y-2">(0{index + 1})</span>
                  <span>{desc}</span>
                </TextReveal>
              </span>
            </li>
          ))}
        </ul>
        {project.listImages && (
          <div className="px-[25vw] flex flex-col gap-[15vh] pb-[85vh]">
            {project.listImages.map((image: string) => (
              <div key={image} className="mx-auto w-full aspect-video relative">
                <Image
                  src={`/images/${image}`}
                  alt={image}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </section>
      <Footer ref={footerRef}>
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
              NEXT
            </motion.h1>
            <motion.h1
              style={{ x: footerTextXRight }}
              className={`${acma.className} text-[1300%]`}
            >
              CASE
            </motion.h1>
          </div>
          <motion.div
            style={{ y: footerTextDesc }}
            className="mt-12 text-center text-4xl"
          >
            <p className={`underline`}>
              <TextReveal>
                <a
                  href={`/case/${project.id === 1 ? "ai-chat" : project.id === 2 ? "pagii-emeterai" : "mulia-medika"}`}
                >
                  {projectsData[project.id === 3 ? 0 : project.id].title}
                </a>
              </TextReveal>
            </p>
          </motion.div>
          <div className="relative mt-4 h-20">
            <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-transparent to-neutral-600" />
          </div>
        </div>
      </Footer>
    </main>
  );
}

export default ProjectDeepDown;
