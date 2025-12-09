import type { Variants } from "motion/react";

type NavigationVariants = {
  icon: { open: Variants; closed: Variants };
  background: Variants;
  ul: Variants;
  li: Variants;
};

export const NAVIGATION_VARIANTS: NavigationVariants = {
  icon: {
    open: {
      open: { d: "M3.06061 2.99999L21.0606 21" },
      closed: { d: "M0 8.5L24 8.5" },
    },
    closed: {
      open: { d: "M3.00006 21.0607L21 3.06064" },
      moving: { d: "M0 14.5L24 14.5" },
      closed: { d: "M0 14.5L12 14.5" },
    },
  },
  background: {
    open: { opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } },
    closed: { opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  },
  ul: {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        delayChildren: 0.06,
        staggerChildren: 0.08,
      },
    },
    closed: {
      y: -24,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.06,
        staggerDirection: -1,
      },
    },
  },
  li: {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { duration: 0.3, ease: "easeOut" },
      },
    },
    closed: {
      y: -24,
      opacity: 0,
      transition: {
        y: { duration: 0.3, ease: "easeIn" },
      },
    },
  },
};

export const CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const SECTION_VARIANTS = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export const SECTION_DURATION_VARIANT = {
  duration: 0.3,
};
