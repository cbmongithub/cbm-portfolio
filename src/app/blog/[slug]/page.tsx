import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Avatar, Badge, ScrollProgress } from "@/components/ui";
import { Figure, Heading } from "@/components/ui/typography";

import { SITE_URL } from "@/lib/config/site";
import { getOgBackground } from "@/lib/og";
import { getPosts, loadPost } from "@/lib/posts";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(({ slug }) => ({ slug }));
}

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const {
    metadata: { title, description, tags, publishedTime, modifiedTime, image, authors },
  } = await loadPost(slug);
  const url = `${SITE_URL}/blog/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: "article",
      url,
      publishedTime,
      modifiedTime,
      authors,
      siteName: SITE_URL,
      tags,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const { post: BlogPost, metadata } = await loadPost(slug);

  if (!BlogPost) return notFound();

  const { image, credit } = await getOgBackground(slug);
  const { title, description, tags, publishedTime, authors } = metadata;
  const blurDataURL =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='9' viewBox='0 0 16 9'%3E%3Crect width='16' height='9' fill='%23111'/%3E%3C/svg%3E";

  const imageSrc = (() => {
    const source = image; // Falls back to gradient
    const src = source.toString();
    try {
      const url = new URL(src, SITE_URL);
      const siteHost = new URL(SITE_URL).host;
      if (
        url.host === siteHost ||
        url.hostname === "localhost" ||
        url.hostname === "127.0.0.1"
      ) {
        return url.pathname + url.search;
      }
      return url.toString();
    } catch {
      return src;
    }
  })();

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
          <Figure
            title={title}
            blurDataURL={blurDataURL}
            imageSrc={imageSrc}
            caption={credit}
          />
        </header>

        <article className="max-w-none">
          <BlogPost />
        </article>
      </section>
    </main>
  );
}
