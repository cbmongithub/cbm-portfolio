"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

type MagnetEffectProps = {
  className?: string;
  children: React.ReactNode;
  key?: string;
};

export function MagnetEffect({ className, children, key }: MagnetEffectProps) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { bounce: 0, stiffness: 26.7, damping: 4.1, mass: 0.2 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    function calculateDistance(e: MouseEvent) {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        const range = 100;
        const intensity = 0.4;

        const absoluteDistance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

        if (isHovered && absoluteDistance <= range) {
          const scale = 1 - absoluteDistance / range;
          x.set(distanceX * intensity * scale);
          y.set(distanceY * intensity * scale);
        } else {
          x.set(0);
          y.set(0);
        }
      }
    }

    document.addEventListener("mousemove", calculateDistance);

    return () => {
      document.removeEventListener("mousemove", calculateDistance);
    };
  }, [x, y, ref, isHovered]);

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      key={key}
      ref={ref}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
      }}
    >
      {children}
    </motion.div>
  );
}
