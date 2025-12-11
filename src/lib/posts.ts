import fs from "node:fs";
import path from "node:path";

export type PostMetadata = {
  slug: string;
  title: string;
  publishedAt: string;
  description: string;
  image: string | URL;
};

const filePath = path.join(process.cwd(), "src", "content", "blog");

// Eagerly snapshot available post slugs from the content directory.
const slugs = fs.readdirSync(filePath).map((files) => files.replace(/\.tsx?$/, ""));

type LoadedPost = { post: React.ComponentType; metadata: PostMetadata };

// Dynamically import a post module and return its component + typed metadata.
export async function loadPost(slug: string): Promise<LoadedPost> {
  const { default: post, metadata } = await import(`@/content/blog/${slug}`);
  return { post, metadata };
}

// Load all posts' metadata in parallel for listings and sitemap generation.
export async function getPosts(): Promise<PostMetadata[]> {
  return Promise.all(slugs.map(async (slug) => (await loadPost(slug)).metadata));
}

// Fetch metadata for a single post.
export async function getPostBySlug(slug: string): Promise<PostMetadata> {
  const { metadata } = await loadPost(slug);
  return metadata;
}
