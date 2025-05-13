export const imageConfigs = {
  image1: {
    src: "/images/3.png",
    initial: {
      width: 24, // in vw
      ratio: 3 / 4, // height/width ratio
      x: 10, // in vw
      y: 70, // in vh
    },
    final: {
      width: 50, // in vw
      x: 25, // in vw
      y: 50, // in vh (will be adjusted for centering)
    },
  },
  image2: {
    src: "/images/2.png",
    initial: {
      width: 20, // in vw
      ratio: 11 / 9, // height/width ratio
      x: 25, // in vw
      y: -2, // in vh
    },
    final: {
      width: 50, // in vw (will use the same as image1)
      x: 25, // in vw
      y: 50, // in vh (will be adjusted for centering)
    },
  },
  image3: {
    src: "/images/4.png",
    initial: {
      width: 21, // in vw
      ratio: 4 / 3, // height/width ratio
      x: 73, // in vw
      y: 28, // in vh
    },
    final: {
      width: 50, // in vw (will use the same as image1)
      x: 25, // in vw
      y: 50, // in vh (will be adjusted for centering)
    },
  },
};
