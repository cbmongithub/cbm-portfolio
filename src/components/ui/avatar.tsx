"use client";

import { motion, useScroll, useTransform } from "motion/react";

export function Avatar() {
  const { scrollYProgress } = useScroll();
  const scaleValue = useTransform(scrollYProgress, [0, 0.025], [1, 0.025]);

  return (
    <motion.img
      style={{
        scale: scaleValue,
      }}
      src="/me.jpg"
      alt="Christian B. Martinez Avatar Photo"
      width={48}
      height={48}
      className="z-10 size-8 object-cover"
    />
  );
}
