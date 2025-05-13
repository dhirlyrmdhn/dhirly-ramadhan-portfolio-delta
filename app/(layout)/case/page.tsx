"use client";

import { projectsData } from "@/constants/project-configs";
import { acma } from "@/lib/fonts";
import { useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";
import React, { useRef, useState } from "react";
import Footer from "@/components/sections/footer";
import Navigation from "@/components/ui/navigation";
import ProjectListCard from "@/components/ui/project-list-card";
import ModalProject from "@/components/ui/modal-project";
import TextReveal from "@/components/text-reveal";

const Case = () => {
  const [modal, setModal] = useState({ active: false, index: 0 });

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
    <main className="relative">
      <Navigation />
      <section className="min-h-screen py-[35vh] relative z-30 bg-background">
        <div className="w-full mx-auto max-w-7xl mb-40">
          <TextReveal>
            <h1 className={`${acma.className} text-[24vh]`}>Cases (3)</h1>
          </TextReveal>
        </div>
        {projectsData.map((project, index) => (
          <a
            href={
              project.id === 1
                ? "/case/mulia-medika"
                : project.id === 2
                  ? "/case/ai-chat"
                  : "/case/pagii-emeterai"
            }
            key={index}
          >
            <ProjectListCard
              key={index}
              index={index}
              setModal={setModal}
              title={project.title || ""}
              splashDescription={project.splashInfo || ""}
            />
          </a>
        ))}
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
                CASE
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
              className="mt-12 max-w-96 text-center text-lg"
            >
              <TextReveal>
                <p>
                  Take a look at my most notable work. Each one, has different
                  favor.
                </p>
              </TextReveal>
            </motion.div>
            <div className="relative mt-4 h-20">
              <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-transparent to-neutral-600" />
            </div>
          </div>
        </>
      </Footer>
      <ModalProject modal={modal} projects={projectsData} />
    </main>
  );
};

export default Case;
