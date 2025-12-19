import { notFound } from "next/navigation";

import { BackButton, Cta } from "@/components/blog";
import { Avatar, Badge, ScrollProgress } from "@/components/ui";
import { Heading } from "@/components/ui/typography";

import {
  type BlogMetadata,
  generateBlogMetadata as generateMetadata,
  generateStaticBlogParams as generateStaticParams,
} from "@/lib/config/metadata";
import { formatDate, loadPost } from "@/lib/posts";

export const dynamicParams = false;

export { generateMetadata, generateStaticParams };

export default async function BlogPage({ params }: BlogMetadata) {
  const { slug } = await params;
  const { post: Post, metadata } = await loadPost(slug);
  const { title, description, tags, publishedTime, authors } = metadata;

  if (!Post) return notFound();

  return (
    <>
      <ScrollProgress />
      <section className="space-y-10">
        <BackButton />
        <header className="space-y-4">
          <div className="text-muted-foreground flex flex-row items-center justify-between gap-3 text-sm">
            <div className="text-foreground flex items-center gap-3">
              <Avatar />
              {authors ? <span>{authors}</span> : null}
            </div>
            <span className="text-muted-foreground text-xs tracking-widest uppercase">
              {formatDate(publishedTime)}
            </span>
          </div>

          <div className="space-y-4">
            <Heading level={1} asChild>
              {title}
            </Heading>

            {description && (
              <p className="text-muted-foreground text-lg leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {tags.length ? (
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          ) : null}
        </header>

        <article className="max-w-none">
          <Post />
        </article>

        <Cta title={title} />
      </section>
    </>
  );
}
