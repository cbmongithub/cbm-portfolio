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
      className="from-link to-info fixed inset-x-0 top-16 left-0 z-20 mx-auto h-0.5 max-w-[848px] origin-left bg-linear-to-r"
      style={{
        scaleX,
      }}
    />
  );
}
