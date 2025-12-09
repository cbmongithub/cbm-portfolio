import Link from "next/link";

import { getPosts, type PostMeta } from "@/lib/posts";

export default async function BlogsPage() {
  const posts: PostMeta[] = await getPosts();

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-12">
      <header className="space-y-2">
        <p className="text-muted-foreground text-sm uppercase tracking-wide">
          Blog
        </p>
        <h1 className="text-foreground text-3xl font-semibold">Latest posts</h1>
        <p className="text-muted-foreground">
          Notes, experiments, and writeups from the build log.
        </p>
      </header>

      <section className="space-y-4">
        {posts.map(({ slug, title, description, publishedAt }) => (
          <Link
            key={slug}
            href={`/blog/${slug}`}
            className="border-border bg-card hover:border-foreground/30 hover:bg-card/80 flex flex-col gap-2 rounded-lg border p-4 transition-colors"
          >
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{publishedAt}</span>
            </div>
            <h2 className="text-foreground text-xl font-semibold">{title}</h2>
            <p className="text-muted-foreground">{description}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
