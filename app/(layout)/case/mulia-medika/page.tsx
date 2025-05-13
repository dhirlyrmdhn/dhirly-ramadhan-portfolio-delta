import ProjectDeepDown from "@/components/project-deep-down";
import { imageConfigs } from "@/constants/image-configs";
import { projectsData } from "@/constants/project-configs";
import React from "react";

const Page = () => {
  const image = imageConfigs.image1;
  const project = projectsData[0];

  return <ProjectDeepDown image={image} project={project} />;
};

export default Page;
