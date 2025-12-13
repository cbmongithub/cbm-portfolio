"use client";

import { memo, useCallback } from "react";
import { useTheme } from "next-themes";
import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";

import { useMounted } from "@/hooks";

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

export const ThemeToggle = memo(function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { mounted } = useMounted();

  const handleValueChange = useCallback(
    (id: string) => {
      setTheme(id);
    },
    [setTheme]
  );

  if (!mounted) return null;

  return (
    <BackgroundEffect
      className="bg-muted pointer-events-none rounded"
      defaultValue={theme}
      enableHover={false}
      onValueChangeAction={handleValueChange}
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
});
