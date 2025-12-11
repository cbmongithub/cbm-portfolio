"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui";
import { BackgroundEffect } from "@/components/ui/effects";

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
    <BackgroundEffect
      className="bg-muted pointer-events-none rounded"
      defaultValue={theme}
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
    </BackgroundEffect>
  );
}
