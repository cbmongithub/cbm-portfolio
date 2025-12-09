"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";

import { AnimatedBackground } from "./animated-background";
import { Button } from "./button";

const THEMES = [
  {
    label: "Light",
    id: "light",
    icon: <SunIcon className="size-4" />,
  },
  {
    label: "Dark",
    id: "dark",
    icon: <MoonIcon className="size-4" />,
  },
  {
    label: "System",
    id: "system",
    icon: <DesktopIcon className="size-4" />,
  },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatedBackground
      className="bg-muted pointer-events-none rounded"
      defaultValue={theme}
      transition={{
        type: "spring",
        bounce: 0,
        duration: 0.2,
      }}
      enableHover={false}
      onValueChangeAction={(id: string) => {
        setTheme(id);
      }}
    >
      {THEMES.map(({ id, label, icon }) => {
        return (
          <Button
            key={id}
            variant="ghost"
            type="button"
            aria-label={`Switch to ${label} theme`}
            data-id={id}
          >
            {icon}
          </Button>
        );
      })}
    </AnimatedBackground>
  );
}
