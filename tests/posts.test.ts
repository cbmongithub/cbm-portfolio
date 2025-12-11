import { describe, expect, it } from "bun:test";
import fs from "node:fs";
import path from "node:path";

import { getPostBySlug, getPosts } from "@/lib/posts";

const BLOG_PATH = path.join(process.cwd(), "src", "content", "blog");
const DISK_SLUGS = fs.readdirSync(BLOG_PATH).map((file) => file.replace(/\.tsx?$/, ""));
const TEST_SLUG = "test";

describe("posts loader", () => {
  it("returns a single post by slug", async () => {
    const post = await getPostBySlug(TEST_SLUG);
    expect(post).not.toBeNull();
    if (!post) return;
    expect(post.slug).toBe(TEST_SLUG);
    expect(post.title).toContain("Design system smoke test");
    expect(post.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("lists all posts present on disk", async () => {
    const posts = await getPosts();
    const slugs = posts.map((p) => p.slug).sort();
    expect(slugs).toEqual([...DISK_SLUGS].sort());
  });

  it("returns meta fields for every post", async () => {
    const posts = await getPosts();
    for (const post of posts) {
      expect(post.title.length).toBeGreaterThan(0);
      expect(post.description.length).toBeGreaterThan(0);
      expect(post.image).toBeDefined();
    }
  });
});
