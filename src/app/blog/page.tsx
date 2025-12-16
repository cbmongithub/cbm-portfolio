import type { Metadata } from "next";
import Link from "next/link";

import { Main, Section } from "@/components/layout";
import { BackgroundEffect } from "@/components/ui/effects";
import { Text } from "@/components/ui/typography";

import { OPEN_GRAPH_DEFAULTS, TWITTER_DEFAULTS } from "@/lib/config/metadata";
import { getPosts } from "@/lib/posts";
import { generateOgImageUrl } from "@/lib/og";

const BLOG_PAGE_OG_TITLE = "Notes, Experiments, and Writeups";
const BLOG_PAGE_OG_DESCRIPTION =
  "A running log of what I'm building, learning, and shipping.";
const BLOG_PAGE_OG_IMAGE_URL = generateOgImageUrl({
  title: "Inside the build log",
  subtitle: BLOG_PAGE_OG_DESCRIPTION,
  route: "/blog",
});

export const metadata: Metadata = {
  title: BLOG_PAGE_OG_TITLE,
  description: BLOG_PAGE_OG_DESCRIPTION,
  openGraph: {
    ...OPEN_GRAPH_DEFAULTS,
    title: BLOG_PAGE_OG_TITLE,
    description: BLOG_PAGE_OG_DESCRIPTION,
    url: "/blog",
    images: [{ url: BLOG_PAGE_OG_IMAGE_URL }],
  },
  twitter: {
    ...TWITTER_DEFAULTS,
    title: BLOG_PAGE_OG_TITLE,
    description: BLOG_PAGE_OG_DESCRIPTION,
    images: [BLOG_PAGE_OG_IMAGE_URL],
  },
};

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
                {publishedTime}
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
