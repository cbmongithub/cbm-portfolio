"use client";

import { motion } from "motion/react";

import { CONTAINER_VARIANTS } from "@/lib/config/motion";

type MainProps = {
  className?: string;
  children: React.ReactNode;
};

export function Main({ className, children }: MainProps) {
  return (
    <motion.main
      className={className}
      variants={CONTAINER_VARIANTS}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.main>
  );
}
