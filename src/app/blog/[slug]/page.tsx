import { notFound } from "next/navigation";

import { Avatar, Badge, ScrollProgress } from "@/components/ui";
import { Heading } from "@/components/ui/typography";

import {
  type BlogMetadata,
  generateBlogMetadata as generateMetadata,
  generateStaticBlogParams as generateStaticParams,
} from "@/lib/config/metadata";
import { formatPostDate, loadPost } from "@/lib/posts";

export const dynamicParams = false;

export { generateMetadata, generateStaticParams };

export default async function BlogPage({ params }: BlogMetadata) {
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
            <span>{formatPostDate(publishedTime)}</span>
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
