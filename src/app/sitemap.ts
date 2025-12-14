import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/config/site";
import { getPosts } from "@/lib/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();

  const blogs = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.modifiedTime ?? post.publishedTime,
  }));

  const newestPostDate =
    posts.length > 0
      ? new Date(
          posts
            .map((p) => p.modifiedTime ?? p.publishedTime)
            .sort()
            .at(-1) as string
        )
      : new Date();

  const routes = ["", "/blog"].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: newestPostDate.toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
