import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ScrollProgress } from "@/components/ui";

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
    metadata: { title, description },
  } = await loadPost(slug);
  const ogUrl = `${SITE_URL}/blog/${slug}/opengraph-image`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: ogUrl }],
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const { post: BlogPost, metadata } = await loadPost(slug);

  if (!BlogPost) return notFound();

  const { image } = await getOgBackground(slug);
  const { publishedAt, title, description } = metadata;
  const blurDataURL =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='9' viewBox='0 0 16 9'%3E%3Crect width='16' height='9' fill='%23111'/%3E%3C/svg%3E";

  const imageSrc = (() => {
    const source = image ?? "/og-image.png";
    if (!source) return null;
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
    <main className="flex flex-col gap-4">
      {imageSrc ? (
        <section>
          <div className="border-border bg-muted relative aspect-1200/630 overflow-hidden rounded-xl border">
            <Image
              src={imageSrc}
              alt={title}
              fill
              sizes="100vw"
              priority
              className="object-cover"
              placeholder="blur"
              blurDataURL={blurDataURL}
            />
            <div className="from-background/70 absolute inset-0 bg-linear-to-t via-transparent to-transparent" />
          </div>
        </section>
      ) : null}
      <div className="bg-background pointer-events-none fixed top-0 left-0 z-10 h-12 w-full to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_bottom,var(--color-background),transparent)]" />
      <ScrollProgress />
      <section className="space-y-2">
        <header className="space-y-2">
          <p className="text-muted-foreground text-sm">{publishedAt}</p>
          <h1 className="text-foreground text-3xl font-semibold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </header>
      </section>
      <section>
        <div className="max-w-none">
          <BlogPost />
        </div>
      </section>
    </main>
  );
}
