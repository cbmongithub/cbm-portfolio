import { Posts } from "@/components/blog";

import { getPosts } from "@/lib/posts";

export default async function BlogsPage() {
  const posts = await getPosts();
  return <Posts posts={posts} />;
}
