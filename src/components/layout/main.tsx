"use client";

import { motion } from "motion/react";

import { CONTAINER_VARIANTS } from "@/lib/config/motion";
import { cn } from "@/lib/utils";

type MainProps = {
  className?: string;
  children: React.ReactNode;
};

export function Main({ className, children }: MainProps) {
  return (
    <motion.main
      className={cn("space-y-10 py-6", className)}
      variants={CONTAINER_VARIANTS}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.main>
  );
}
