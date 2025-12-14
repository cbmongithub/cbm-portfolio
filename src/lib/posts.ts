import { cache } from "react";
import { readdirSync } from "node:fs";
import { join } from "node:path";

export type PostMetadata = {
  slug: string;
  image: string;
  title: string;
  description: string;
  publishedTime: string;
  modifiedTime: string;
  authors: string;
  tags: string[];
};

const filePath = join(process.cwd(), "src", "content", "blog");

// Snapshot available post slugs once per server process.
const slugs = readdirSync(filePath).map((files) => files.replace(/\.tsx?$/, ""));

type LoadedPost = { post: React.ComponentType; metadata: PostMetadata };

// Dynamically import a post module and return its component + typed metadata.
export const loadPost = cache(async (slug: string): Promise<LoadedPost> => {
  const { default: post, metadata } = await import(`@/content/blog/${slug}`);
  return { post, metadata };
});

// Load all posts' metadata in parallel for listings and sitemap generation.
export const getPosts = cache(async (): Promise<PostMetadata[]> => {
  const entries = await Promise.all(
    slugs.map(async (slug) => (await loadPost(slug)).metadata)
  );

  return entries;
});

// Fetch metadata for a single post.
export const getPostBySlug = cache(async (slug: string): Promise<PostMetadata> => {
  const { metadata } = await loadPost(slug);
  return metadata;
});
