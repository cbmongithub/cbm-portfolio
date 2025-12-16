import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Avatar, Badge, ScrollProgress } from "@/components/ui";
import { Heading } from "@/components/ui/typography";

import {
  BASE_URL,
  OPEN_GRAPH_DEFAULTS,
  TWITTER_DEFAULTS,
} from "@/lib/config/metadata";
import { getPosts, loadPost } from "@/lib/posts";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(({ slug }) => ({ slug }));
}

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const {
    metadata: {
      title,
      description,
      tags,
      publishedTime,
      modifiedTime,
      image,
      authors,
    },
  } = await loadPost(slug);
  const url = `${BASE_URL}/blog/${slug}`;
  const images = [
    {
      url: image,
      width: 1200,
      height: 630,
      alt: title,
    },
  ];

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      ...OPEN_GRAPH_DEFAULTS,
      title,
      description,
      type: "article",
      url,
      publishedTime,
      modifiedTime,
      authors,
      tags,
      images,
    },
    twitter: {
      ...TWITTER_DEFAULTS,
      title,
      description,
      images: [image],
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const { post: BlogPost, metadata } = await loadPost(slug);
  const { title, description, tags, publishedTime, authors } = metadata;

  if (!BlogPost) return notFound();

  return (
    <main className="pt-4">
      <div className="bg-background pointer-events-none fixed top-0 left-0 z-10 h-12 w-full to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_bottom,var(--color-background),transparent)]" />
      <ScrollProgress />
      <section className="space-y-2">
        <header className="space-y-2">
          <div className="text-muted-foreground flex flex-wrap items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Avatar />
              {authors ? <span>{authors}</span> : null}
            </div>
            <span>{publishedTime}</span>
          </div>

          <div className="mt-4">
            <Heading level={1} asChild className="pt-0 pb-1">
              {title}
            </Heading>

            {description && (
              <p className="text-muted-foreground text-lg">{description}</p>
            )}
          </div>

          {tags?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          ) : null}
          {/* <Figure
            title={title}
            blurDataURL={blurDataURL}
            imageSrc={imageSrc}
            caption={credit}
          /> */}
        </header>

        <article className="max-w-none">
          <BlogPost />
        </article>
      </section>
    </main>
  );
}
