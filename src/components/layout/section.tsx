"use client";

import { motion } from "motion/react";

import { Heading, type HeadingLevel, Text } from "@/components/ui/typography";

import { BASE_TRANSITION, SECTION_VARIANTS } from "@/lib/config/motion";
import { cn } from "@/lib/utils";

type SectionProps = {
  className?: string;
  title?: {
    text: string;
    level?: HeadingLevel;
  };
  text?: string;
  children?: React.ReactNode;
};

export function Section({ className, title, text, children }: SectionProps) {
  return (
    <motion.section
      className={cn("space-y-2", className)}
      variants={SECTION_VARIANTS}
      initial="hidden"
      animate="visible"
      transition={BASE_TRANSITION}
    >
      {title && (
        <motion.div className="flex-1">
          <Heading className="mb-1" asChild level={title.level || 2}>
            {title.text}
          </Heading>
          {text && <Text muted>{text}</Text>}
        </motion.div>
      )}
      {children}
    </motion.section>
  );
}
