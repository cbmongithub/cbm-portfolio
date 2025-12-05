import { notFound } from "next/navigation";

import { MDXComponents } from "@/components/mdx-components";

import { getPostBySlug, getPosts } from "@/lib/posts";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getPosts().map(({ slug }) => ({ slug }));
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;

  const post = getPostBySlug(slug);

  if (!post) return notFound();

  const published = new Date(post.metadata.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-10">
      <article>
        <header className="space-y-2">
          <p className="text-muted-foreground text-sm">{published}</p>
          <h1 className="text-foreground text-3xl font-semibold">
            {post.metadata.title}
          </h1>
          <p className="text-muted-foreground">{post.metadata.summary}</p>
        </header>

        <div className="max-w-none">
          <MDXComponents source={post.content} />
        </div>
      </article>
    </main>
  );
}
