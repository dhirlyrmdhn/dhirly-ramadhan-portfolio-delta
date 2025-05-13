"use client";

import TextReveal from "../text-reveal";

interface ContactSectionProps {
  acmaFont: string;
}

export default function ContactSection({ acmaFont }: ContactSectionProps) {
  return (
    <section className="bg-background relative z-50 mx-auto flex flex-col items-center justify-center gap-[2vw] pb-[10vh]">
      <div className="relative h-40">
        <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-transparent to-neutral-600" />
      </div>
      <TextReveal>
        <h2 className={`${acmaFont} text-center text-[6vw] leading-none`}>
          Get in touch <br /> with me
        </h2>
      </TextReveal>
      <div className="mx-auto">
        <TextReveal>
          <button className="rounded-full border border-green-500 px-[1.5vw] py-[1vw] text-[1vw] text-green-500">
            dhirlyrmdhn.work@gmail.com
          </button>
        </TextReveal>
      </div>
    </section>
  );
}
