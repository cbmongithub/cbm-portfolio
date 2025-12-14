import Link from "next/link";

import { BackgroundEffect } from "@/components/ui/effects";
import { Text } from "@/components/ui/typography";

import { getPosts } from "@/lib/posts";

export async function Blog() {
  const posts = await getPosts();
  const latest = posts
    .sort(
      (a, b) => new Date(b.publishedTime).getTime() - new Date(a.publishedTime).getTime()
    )
    .slice(0, 4);

  return (
    <div className="flex flex-col">
      <BackgroundEffect
        enableHover
        className="bg-muted size-full rounded-l-none rounded-r-lg"
      >
        {latest.map(({ slug, title, description }) => (
          <Link
            key={slug}
            className="border-muted text-muted-foreground my-2 mb-2 border-l p-3 pl-4"
            href={`/blog/${slug}`}
            data-id={slug}
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
