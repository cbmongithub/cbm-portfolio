import fs from "node:fs";
import path from "node:path";

export type PostMeta = {
  slug: string;
  title: string;
  publishedAt: string;
  description: string;
  image: string | URL;
};

const filePath = path.join(process.cwd(), "src", "content", "blog");

// Eagerly snapshot available post slugs from the content directory.
const slugs = fs
  .readdirSync(filePath)
  .map((files) => files.replace(/\.tsx?$/, ""));

type LoadedPost = { Post: React.ComponentType; meta: PostMeta };

// Dynamically import a post module and return its component + typed metadata.
export async function loadPost(slug: string): Promise<LoadedPost> {
  const { default: Post, meta } = await import(`@/content/blog/${slug}`);
  return { Post, meta };
}

// Load all posts' metadata in parallel for listings and sitemap generation.
export async function getPosts(): Promise<PostMeta[]> {
  return Promise.all(slugs.map(async (slug) => (await loadPost(slug)).meta));
}

// Fetch metadata for a single post.
export async function getPostBySlug(slug: string): Promise<PostMeta> {
  const { meta } = await loadPost(slug);
  return meta;
}
