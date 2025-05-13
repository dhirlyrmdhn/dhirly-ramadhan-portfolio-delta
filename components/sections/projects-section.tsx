"use client";

import { useRef } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import gsap from "gsap";

import ProjectCard from "@/components/ui/project-card";
import { projectsData } from "@/constants/project-configs";

interface ProjectsSectionProps {
  acmaFont: string;
}

export default function ProjectsSection({ acmaFont }: ProjectsSectionProps) {
  const projectSection1 = useRef(null);
  const projectSection2 = useRef(null);
  const projectSection3 = useRef(null);

  const { scrollYProgress: projectSection1ScrollY } = useScroll({
    target: projectSection1,
    offset: ["end end", "end start"],
  });

  const { scrollYProgress: projectSection2ScrollY } = useScroll({
    target: projectSection2,
    offset: ["end end", "end start"],
  });

  const { scrollYProgress: projectSection3ScrollY } = useScroll({
    target: projectSection3,
    offset: ["end end", "end start"],
  });

  // Add these useMotionValueEvent hooks inside your component to track scroll progress
  useMotionValueEvent(projectSection1ScrollY, "change", (latest) => {
    const plane1 = document.querySelector(".image-clip-3");
    if (plane1) {
      gsap.to(plane1, {
        clipPath: `inset(0 0 ${latest * 100}% 0)`,
        duration: 0.5,
        ease: "expo.out",
      });
    }
  });

  useMotionValueEvent(projectSection2ScrollY, "change", (latest) => {
    const plane2 = document.querySelector(".image-clip-2");
    if (plane2) {
      gsap.to(plane2, {
        clipPath: `inset(0 0 ${latest * 100}% 0)`,
        duration: 0.5,
        ease: "expo.out",
      });
    }
  });

  return (
    <section className="flex flex-col gap-[25vh] pt-[65vh]">
      <ProjectCard
        ref={projectSection1}
        title="Clinic Mulia Medika"
        subtitle="(Official Website Project)"
        description="Built a fully responsive and branded official website for Klinik Mulia Medika, working directly with the client to align with their identity."
        techStack={projectsData[0].splashInfo || ""}
        acmaFont={acmaFont}
      />

      <ProjectCard
        ref={projectSection2}
        title="Real-Time AI Chat System"
        subtitle="(Experimental Feature)"
        description="Designed and implemented a real-time chat system where public users can consult with clinic staff (receptionist/doctor) or AI."
        techStack={projectsData[1].splashInfo || ""}
        acmaFont={acmaFont}
      />

      <ProjectCard
        ref={projectSection3}
        title="Pagii E-Meterai"
        subtitle="(Electronic Stamp System)"
        description="Developed backend Pagii E-Meterai, a digital stamp system integrated with Indonesia's official provider, Peruri."
        techStack={projectsData[2].splashInfo || ""}
        acmaFont={acmaFont}
      />

      <div className="mx-auto -translate-y-24">
        <a href="/case">
          <button className="rounded-full cursor-pointer border border-white/50 px-8 hover:border-green-500/50 hover:bg-green-500/50 hover:text-green-500 transition-all duration-200 py-4 text-xl text-white">
            View all cases
          </button>
        </a>
      </div>
    </section>
  );
}
