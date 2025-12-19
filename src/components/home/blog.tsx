import { PostsList } from "@/components/blog";

import { getPosts } from "@/lib/posts";

export async function Blog() {
  const posts = await getPosts();
  const latest = posts
    .sort(
      (a, b) => new Date(b.publishedTime).getTime() - new Date(a.publishedTime).getTime()
    )
    .slice(0, 4);

  return (
    <div className="flex flex-col">
      <PostsList posts={latest} />
    </div>
  );
}
