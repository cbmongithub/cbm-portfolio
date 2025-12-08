import { describe, expect, it } from "bun:test";
import path from "node:path";

import { getPostBySlug, getPosts, parseFrontmatter } from "@/lib/posts";

const TEST_SLUG = "test-blog";
const TEST_FILE = path.join(process.cwd(), "src", "content", "blog", `${TEST_SLUG}.mdx`);

describe("posts loader", () => {
  it("parses frontmatter from a file", async () => {
    const raw = await Bun.file(TEST_FILE).text();
    const { metadata, content } = parseFrontmatter(raw);
    expect(metadata.title.length).toBeGreaterThan(0);
    expect(content).toContain("Widget");
  });

  it("returns a single post by slug", () => {
    const post = getPostBySlug(TEST_SLUG);
    expect(post).not.toBeNull();
    if (!post) return;
    expect(post.slug).toBe(TEST_SLUG);
    expect(post.metadata.title).toContain("Design system smoke test");
  });

  it("lists all posts", () => {
    const posts = getPosts();
    expect(posts.length).toBeGreaterThan(0);
    expect(posts.find((p) => p.slug === TEST_SLUG)).toBeDefined();
  });

  it("returns null when slug is missing", () => {
    expect(getPostBySlug("non-existent-slug")).toBeNull();
  });
});
