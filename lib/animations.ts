import { Variants } from "framer-motion";

export const fadeIn = (direction: 'up' | 'down' | 'left' | 'right' | 'none' = 'none', delay: number = 0, duration: number = 0.8): Variants => {
  return {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
      x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
    },
    show: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        type: 'tween',
        duration: duration,
        delay: delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};

export const staggerContainer = (staggerChildren: number = 0.15, delayChildren: number = 0): Variants => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: staggerChildren,
        delayChildren: delayChildren,
      },
    },
  };
};

export const brushDraw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { type: "spring", duration: 1.5, bounce: 0 },
      opacity: { duration: 0.2 }
    }
  }
};

export const scaleUp: Variants = {
  hidden: { scale: 0.95, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.8,
      bounce: 0.15
    }
  }
};

export const stampRotate: Variants = {
  hidden: { scale: 1.4, opacity: 0, rotate: -15 },
  show: {
    scale: 1,
    opacity: 1,
    rotate: -5,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 100,
      delay: 0.4
    }
  }
};
