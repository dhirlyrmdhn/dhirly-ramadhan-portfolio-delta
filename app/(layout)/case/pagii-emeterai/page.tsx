import ProjectDeepDown from "@/components/project-deep-down";
import { imageConfigs } from "@/constants/image-configs";
import { projectsData } from "@/constants/project-configs";
import React from "react";

const Page = () => {
  const image = imageConfigs.image3;
  const project = projectsData[2];

  return <ProjectDeepDown image={image} project={project} />;
};

export default Page;
