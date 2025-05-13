"use client";

import TextReveal from "../text-reveal";

type Props = {
  index: number;
  title: string;
  splashDescription: string;
  setModal: (modal: { active: boolean; index: number }) => void;
};

const ProjectListCard = ({
  index,
  title,
  splashDescription,
  setModal,
}: Props) => {
  return (
    <div
      className="py-12 px-12 items-center border-t border-neutral-800 flex justify-between max-w-7xl w-full mx-auto cursor-pointer hover:bg-neutral-900/10 transition-colors duration-300"
      onMouseEnter={() => setModal({ active: true, index })}
      onMouseLeave={() => setModal({ active: false, index })}
    >
      <TextReveal>
        <h2 className="text-[4vh]">{title}</h2>
      </TextReveal>
      <TextReveal>
        <p className="max-w-md">{splashDescription}</p>
      </TextReveal>
    </div>
  );
};

export default ProjectListCard;
