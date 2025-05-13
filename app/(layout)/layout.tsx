import SmoothScrollProvider from "@/components/smooth-scroll-provider";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const LayoutSmoothScroll = ({ children }: Props) => {
  return <SmoothScrollProvider>{children}</SmoothScrollProvider>;
};

export default LayoutSmoothScroll;
