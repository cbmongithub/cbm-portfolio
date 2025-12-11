"use client";

import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
    bounce: 0,
  });

  return (
    <motion.div
      className="bg-link fixed inset-x-0 top-0 z-20 h-1 origin-left"
      style={{
        scaleX,
      }}
    />
  );
}
