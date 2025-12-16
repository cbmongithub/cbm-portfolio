import Link from "next/link";

import { Main, Section } from "@/components/layout";
import { BackgroundEffect } from "@/components/ui/effects";
import { Text } from "@/components/ui/typography";

import { BLOGS_PAGE_METADATA as metadata } from "@/lib/config/metadata";
import { formatPostDate, getPosts } from "@/lib/posts";

export { metadata };

export default async function BlogsPage() {
  const posts = await getPosts();
  return (
    <Main className="space-y-20 pt-6">
      <Section
        title={{ text: "Blog" }}
        text="Notes, experiments, and writeups from the build log."
      />
      <Section title={{ text: "Latest Posts", level: 4 }}>
        <BackgroundEffect
          enableHover
          className="bg-muted size-full rounded-l-none rounded-r-lg"
        >
          {posts.map(({ slug, title, description, publishedTime }) => (
            <Link
              key={slug}
              href={`/blog/${slug}`}
              className="border-muted text-muted-foreground my-2 mb-2 border-l p-3 pl-4"
              data-id={slug}
            >
              <Text className="text-sm" muted>
                {formatPostDate(publishedTime)}
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
