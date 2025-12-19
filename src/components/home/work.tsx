"use client";

import Link from "next/link";

import { Arrow } from "@/components/ui";
import { BorderEffect, MagnetEffect } from "@/components/ui/effects";
import { Text } from "@/components/ui/typography";

import { WORK } from "@/lib/config/home";

export function Work() {
  return (
    <div className="flex flex-col space-y-2">
      {WORK.map(({ link, id, title, company, start, end }) => (
        <div key={id}>
          <div className="border-border relative border p-4">
            <BorderEffect />
            <div className="relative flex items-center justify-between gap-4">
              <div className="flex flex-col">
                <Text className="text-foreground font-medium">{title}</Text>
                <Text muted>{company}</Text>
              </div>
              <div>
                <Text muted>
                  {start} - {end}
                </Text>
                <MagnetEffect className="flex justify-end">
                  <Link
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${company} link`}
                    className="group text-link hover:text-link-hover relative inline-flex shrink-0 items-center gap-px py-1 text-sm transition-colors duration-200"
                  >
                    Visit
                    <Arrow />
                  </Link>
                </MagnetEffect>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
