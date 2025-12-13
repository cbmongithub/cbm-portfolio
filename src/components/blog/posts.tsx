import Link from "next/link";

import { Main, Section } from "@/components/layout";
import { Text } from "@/components/ui";
import { BackgroundEffect } from "@/components/ui/effects";

import type { PostMetadata } from "@/lib/posts";

type PostsProps = {
  posts: PostMetadata[];
};

export function Posts({ posts }: PostsProps) {
  return (
    <Main className="space-y-24">
      <Section
        title={{ text: "Blog" }}
        text="Notes, experiments, and writeups from the build log."
      />
      <Section title={{ text: "Latest Posts", level: 4 }}>
        <BackgroundEffect
          enableHover
          className="bg-muted size-full rounded-l-none rounded-r-lg"
        >
          {posts.map(({ slug, title, description, publishedAt }) => (
            <Link
              key={slug}
              href={`/blog/${slug}`}
              className="border-muted text-muted-foreground my-2 mb-2 border-l p-3 pl-4"
              data-id={slug}
            >
              <Text className="text-sm" muted>
                {publishedAt}
              </Text>
              <Text>{title}</Text>
              <Text muted>{description}</Text>
            </Link>
          ))}
        </BackgroundEffect>
      </Section>
    </Main>
  );
}
