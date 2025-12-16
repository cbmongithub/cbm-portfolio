import type { MetadataRoute } from "next";

import { BASE_URL } from "@/lib/config/metadata";
import { getPosts } from "@/lib/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();

  const blogs = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.modifiedTime ?? post.publishedTime,
  }));

  const newestPostDate =
    posts.length > 0
      ? (posts
          .map((p) => p.modifiedTime ?? p.publishedTime)
          .sort()
          .at(-1) as string)
      : new Date().toISOString();

  const routes = ["", "/blog"].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: newestPostDate,
  }));

  return [...routes, ...blogs];
}
