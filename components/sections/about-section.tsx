"use client";

import TextReveal from "../text-reveal";

interface AboutSectionProps {
  acmaFont: string;
}

export default function AboutSection({ acmaFont }: AboutSectionProps) {
  return (
    <section className="relative mx-auto my-[25vh] min-h-screen max-w-5xl py-[25vh]">
      <TextReveal>
        <h1 className={`${acmaFont} text-[5vw]`}>
          Build something strong Be remembered{" "}
          <span className="text-[3vw] text-[#b5b5b5]">(about me)</span>
        </h1>
      </TextReveal>
      <div className="mt-[18vh] mb-[12vh] w-full border-t"></div>
      {/* <div className="mt-[12vh] mb-[8vh] w-full border-t border-[#b5b5b5]"></div> */}
      <div className="flex w-full gap-16 text-xl">
        <TextReveal>
          <p className="flex-1">
            Crafting clean soulwork. No nonsense. Just the climb to the top.
          </p>
        </TextReveal>
        <TextReveal>
          <p className="flex-1">
            Avant-garde it is — bold, unique, and unapologetically original.
          </p>
        </TextReveal>
        <p className="flex-1">
          {/* My great sense for design and my development skills enable me to
          create kick-ass projects. */}
        </p>
      </div>
    </section>
  );
}
