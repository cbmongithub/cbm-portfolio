import { BlogFilter } from "@/components/blog";
import { Main, Section } from "@/components/layout";

import { BLOGS_PAGE_METADATA as metadata } from "@/lib/config/metadata";
import { formatDate, getPosts } from "@/lib/posts";

export { metadata };

export default async function BlogsPage() {
  const posts = await getPosts();
  const blogPosts = [...posts]
    .sort(
      (a, b) => new Date(b.publishedTime).getTime() - new Date(a.publishedTime).getTime()
    )
    .map((post) => ({
      ...post,
      formattedDate: formatDate(post.publishedTime),
    }));

  return (
    <Main>
      <Section
        title={{ text: "Blog" }}
        text="Notes, experiments, and writeups from the build log."
      />
      <Section>
        <BlogFilter posts={blogPosts} />
      </Section>
    </Main>
  );
}
