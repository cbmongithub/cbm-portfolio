import type { Transition, Variants } from "motion/react";

export const BASE_TRANSITION: Transition = {
  type: "spring",
  bounce: 0,
  duration: 0.3,
  ease: "easeInOut",
};

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
    open: {
      opacity: 1,
      transition: { ...BASE_TRANSITION },
    },
    closed: {
      opacity: 0,
      transition: { ...BASE_TRANSITION },
    },
  },
  ul: {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        ...BASE_TRANSITION,
        delayChildren: 0.06,
        staggerChildren: 0.08,
      },
    },
    closed: {
      y: -24,
      opacity: 0,
      transition: {
        ...BASE_TRANSITION,
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
        y: { ...BASE_TRANSITION },
      },
    },
    closed: {
      y: -24,
      opacity: 0,
      transition: {
        y: { ...BASE_TRANSITION },
      },
    },
  },
};

export const CONTAINER_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const SECTION_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export const MORPH_EFFECT_TRANSITION: Transition = {
  ...BASE_TRANSITION,
  stiffness: 220,
  damping: 28,
  mass: 0.9,
};

export const MORPH_EFFECT_VARIANTS: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { delay: 0.3, duration: 0.1 },
  },
  exit: { opacity: 0, transition: { duration: 0 } },
};

export const TEXT_EFFECT_CONTAINER_VARIANTS: Variants = {
  ...CONTAINER_VARIANTS,
  visible: {
    ...CONTAINER_VARIANTS.visible,
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0.4,
    },
  },
};

export const TEXT_EFFECT_FADE_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};
