"use client";

import { motion, type Variants } from "motion/react";

import {
  TEXT_EFFECT_CONTAINER_VARIANTS,
  TEXT_EFFECT_FADE_VARIANTS,
} from "@/lib/config/variants";

function AnimationSegment({
  segment,
  variants,
}: {
  segment: string;
  variants: Variants;
}) {
  return (
    <motion.span className="inline-block whitespace-pre">
      {segment.split("").map((char, charIndex) => (
        <motion.span
          key={`char-${charIndex}`}
          aria-hidden="true"
          variants={variants}
          className="inline-block whitespace-pre"
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

type TextEffectProps = {
  children: string;
};

export function TextEffect({ children }: TextEffectProps) {
  const text = children.split(/(\s+)/);
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={TEXT_EFFECT_CONTAINER_VARIANTS}
      className="text-muted-foreground"
    >
      <span className="sr-only">{children}</span>
      {text.map((segment, index) => (
        <AnimationSegment
          key={`char-${index}-${segment}`}
          segment={segment}
          variants={TEXT_EFFECT_FADE_VARIANTS}
        />
      ))}
    </motion.div>
  );
}
