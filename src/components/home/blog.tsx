import Link from "next/link";

import { Text } from "@/components/ui";
import { BackgroundEffect } from "@/components/ui/effects";

import { POSTS } from "@/lib/config/home";

export function Blog() {
  return (
    <div className="flex flex-col">
      <BackgroundEffect enableHover className="bg-muted size-full rounded-lg">
        {POSTS.map(({ id, link, title, description }) => (
          <Link
            key={id}
            className="border-border mb-2 rounded-lg border p-3"
            href={link}
            data-id={id}
          >
            <div className="flex flex-col">
              <Text className="text-foreground py-0 font-medium">{title}</Text>
              <Text muted>{description}</Text>
            </div>
          </Link>
        ))}
      </BackgroundEffect>
    </div>
  );
}
