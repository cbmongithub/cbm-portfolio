"use client";

import { motion, useScroll, useTransform } from "motion/react";

export function Avatar() {
  const { scrollYProgress } = useScroll();
  const scaleValue = useTransform(scrollYProgress, [0, 0.025], [1, 0.025]);

  return (
    <div>
      <motion.img
        style={{
          scale: scaleValue,
        }}
        src="/me.jpg"
        alt="Christian B. Martinez Avatar Photo"
        width={32}
        height={32}
        className="z-10 size-8 rounded-full"
      />
    </div>
  );
}
