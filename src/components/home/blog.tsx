import Link from "next/link";

import { Text } from "@/components/ui";
import { BackgroundEffect } from "@/components/ui/effects";

import { POSTS } from "@/lib/config/home";

export function Blog() {
  return (
    <div className="flex flex-col">
      <BackgroundEffect
        enableHover
        className="bg-muted size-full rounded-l-none rounded-r-lg"
      >
        {POSTS.map(({ id, link, title, description }) => (
          <Link
            key={id}
            className="border-muted text-muted-foreground my-2 mb-2 border-l p-3 pl-4"
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
