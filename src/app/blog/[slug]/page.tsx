import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ScrollProgress } from "@/components/ui/scroll-progress";

import { getPosts, loadPost } from "@/lib/posts";

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const {
    meta: { title, description, image },
  } = await loadPost(slug);
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const {
    Post,
    meta: { publishedAt, title, description },
  } = await loadPost(slug);

  if (!Post) return notFound();

  return (
    <>
      <div className="bg-background pointer-events-none fixed top-0 left-0 z-10 h-12 w-full to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_bottom,var(--color-background),transparent)]" />
      <ScrollProgress />
      <main className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-10">
        <article>
          <header className="space-y-2">
            <p className="text-muted-foreground text-sm">{publishedAt}</p>
            <h1 className="text-foreground text-3xl font-semibold">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
          </header>

          <div className="max-w-none">
            <Post />
          </div>
        </article>
      </main>
    </>
  );
}
