import Link from "next/link";

import { Main, Section } from "@/components/layout";
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
              <div className="text-muted-foreground flex items-center justify-between text-sm">
                <span>{publishedAt}</span>
              </div>
              <h2 className="text-foreground text-xl font-semibold">{title}</h2>
              <p className="text-muted-foreground">{description}</p>
            </Link>
          ))}
        </BackgroundEffect>
      </Section>
    </Main>
  );
}
