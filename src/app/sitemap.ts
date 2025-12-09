import { SITE_URL } from "@/lib/config";
import { getPosts } from "@/lib/posts";

export default async function sitemap() {
  const posts = await getPosts();
  const blogs = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.publishedAt,
  }));

  const routes = ["", "/blog"].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
