"use client";

import { forwardRef } from "react";
import TextReveal from "../text-reveal";

interface ProjectCardProps {
  title: string;
  subtitle: string;
  description: string;
  techStack: string;
  acmaFont: string;
}

const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ title, subtitle, description, techStack, acmaFont }, ref) => {
    return (
      <div
        ref={ref}
        className="relative z-50 flex h-screen flex-col items-end justify-between px-[10%] pt-[5%] leading-tight"
      >
        <TextReveal>
          <h2 className={`${acmaFont} text-end text-[4vw]`}>
            {title} <br /> {subtitle}
          </h2>
        </TextReveal>
        <div className="flex gap-2">
          {/* <TextReveal> */}
          <span className="-translate-y-1 text-2xl leading-none">+</span>
          <span>
            <p className="max-w-xl text-2xl">{description}</p>
            <p className="text-lg mt-1" style={{ color: "#b5b5b5" }}>
              {techStack}
            </p>
          </span>
          {/* </TextReveal> */}
        </div>
      </div>
    );
  }
);

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
