import { BASE_URL } from "@/lib/config";
import { getPosts } from "@/lib/posts";

export default async function sitemap() {
  const blogs = getPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const routes = ["", "/blog"].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
