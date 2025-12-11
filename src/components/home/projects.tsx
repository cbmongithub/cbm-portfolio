"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

import { Text } from "@/components/ui";

import { PROJECTS } from "@/lib/config/home";

const MorphImage = dynamic(
  () => import("@/components/ui/morph-image").then((m) => m.MorphImage),
  { ssr: false }
);

export function Projects() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {PROJECTS.map(({ name, src, link, alt, description, id }) => (
        <div key={id} className="space-y-2">
          <div className="bg-card ring-border relative rounded-lg ring-1 ring-inset">
            <MorphImage src={src} alt={alt} />
          </div>
          <div className="px-1">
            <Link
              className="font-base group text-foreground relative inline-block font-[450]"
              href={link}
              target="_blank"
            >
              {name}
              <span className="bg-foreground absolute bottom-0.5 left-0 block h-px w-full max-w-0 transition-all duration-200 group-hover:max-w-full"></span>
            </Link>
            <Text muted className="text-base">
              {description}
            </Text>
          </div>
        </div>
      ))}
    </div>
  );
}
