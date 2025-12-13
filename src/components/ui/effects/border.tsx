"use client";

import { memo, useCallback, useEffect, useRef } from "react";
import { animate } from "motion/react";

export const BorderEffect = memo(function BorderEffect() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastPosition = useRef({ x: 0, y: 0 });
  const isTicking = useRef(false);

  const PROXIMITY = 64;

  const handleMove = useCallback((e?: MouseEvent | { x: number; y: number }) => {
    if (!containerRef.current) return;

    if (isTicking.current) return;
    isTicking.current = true;

    requestAnimationFrame(() => {
      isTicking.current = false;
      const element = containerRef.current;
      if (!element) return;

      const { left, top, width, height } = element.getBoundingClientRect();
      const mouseX = e?.x ?? lastPosition.current.x;
      const mouseY = e?.y ?? lastPosition.current.y;

      if (e) {
        lastPosition.current = { x: mouseX, y: mouseY };
      }

      const center = [left + width * 0.5, top + height * 0.5];
      const distanceFromCenter = Math.hypot(mouseX - center[0], mouseY - center[1]);
      const inactiveRadius = 0.5 * Math.min(width, height) * 0.01;

      if (distanceFromCenter < inactiveRadius) {
        element.style.setProperty("--active", "0");
        return;
      }

      const isActive =
        mouseX > left - PROXIMITY &&
        mouseX < left + width + PROXIMITY &&
        mouseY > top - PROXIMITY &&
        mouseY < top + height + PROXIMITY;

      element.style.setProperty("--active", isActive ? "1" : "0");

      if (!isActive) return;

      const currentAngle = parseFloat(element.style.getPropertyValue("--start")) || 0;
      const targetAngle =
        (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) / Math.PI + 90;

      const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
      const newAngle = currentAngle + angleDiff;

      animate(currentAngle, newAngle, {
        duration: 2,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (value) => {
          element.style.setProperty("--start", String(value));
        },
      });
    });
  }, []);

  useEffect(() => {
    const target = containerRef.current?.parentElement;
    if (!target) return;

    const handlePointerMove = (e: PointerEvent) => handleMove(e);
    const handlePointerLeave = () => handleMove();

    target.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    target.addEventListener("pointerleave", handlePointerLeave, {
      passive: true,
    });

    const handleScroll = PROXIMITY > 0 ? () => handleMove() : undefined;
    if (handleScroll) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      target.removeEventListener("pointermove", handlePointerMove);
      target.removeEventListener("pointerleave", handlePointerLeave);
      if (handleScroll) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleMove]);

  return (
    <div
      ref={containerRef}
      style={
        {
          "--blur": "0px",
          "--spread": "40",
          "--start": "0",
          "--active": "0",
          "--glowingeffect-border-width": "1px",
          "--repeating-conic-gradient-times": "5",
          "--gradient": `radial-gradient(circle, var(--color-link) 12%, transparent 22%),
                radial-gradient(circle at 35% 35%, color-mix(in oklch, var(--color-link) 70%, var(--color-foreground) 30%) 9%, transparent 19%),
                radial-gradient(circle at 65% 65%, color-mix(in oklch, var(--color-link) 55%, var(--color-border) 45%) 11%, transparent 21%),
                radial-gradient(circle at 40% 60%, color-mix(in oklch, var(--color-link) 65%, var(--color-card) 35%) 10%, transparent 22%),
                repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  var(--color-link) 0%,
                  color-mix(in oklch, var(--color-link) 65%, var(--color-foreground) 35%) calc(25% / var(--repeating-conic-gradient-times)),
                  color-mix(in oklch, var(--color-link) 55%, var(--color-border) 45%) calc(50% / var(--repeating-conic-gradient-times)),
                  color-mix(in oklch, var(--color-link) 70%, var(--color-card) 30%) calc(75% / var(--repeating-conic-gradient-times)),
                  var(--color-link) calc(100% / var(--repeating-conic-gradient-times))
                )`,
        } as React.CSSProperties
      }
      className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity"
    >
      <div className='glow rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))] after:rounded-[inherit] after:mask-[linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))] after:bg-fixed after:mask-intersect after:[mask-clip:padding-box,border-box] after:opacity-(--active) after:transition-opacity after:duration-200 after:content-[""] after:[background:var(--gradient)] after:[border:var(--glowingeffect-border-width)_solid_transparent]' />
    </div>
  );
});
