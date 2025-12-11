import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Post } from "@/components/blog";

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
    metadata: { title, description, image },
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
  const { post: BlogPost, metadata } = await loadPost(slug);

  if (!BlogPost) return notFound();

  return (
    <Post metadata={metadata}>
      <BlogPost />
    </Post>
  );
}
