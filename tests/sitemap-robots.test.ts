import { describe, expect, it } from "bun:test";

import { BASE_URL } from "@/lib/config";
import { getPosts } from "@/lib/posts";

import robots from "@/app/robots";
import sitemap from "@/app/sitemap";

describe("metadata routes", () => {
  it("sitemap includes static routes and blog posts", async () => {
    const entries = await sitemap();
    const urls = entries.map((entry) => entry.url);
    const today = new Date().toISOString().split("T")[0];

    expect(urls).toContain(BASE_URL);
    expect(urls).toContain(`${BASE_URL}/blog`);

    const expectedStatics = new Set([BASE_URL, `${BASE_URL}/blog`]);
    const staticRoutes = entries.filter((entry) => expectedStatics.has(entry.url));
    staticRoutes.forEach((route) => expect(route.lastModified).toBe(today));

    const posts = await getPosts();
    posts.forEach((post) => {
      expect(urls).toContain(`${BASE_URL}/blog/${post.slug}`);
    });
  });

  it("robots points crawlers at the sitemap", () => {
    const robotsConfig = robots();
    const ruleEntries = Array.isArray(robotsConfig.rules)
      ? robotsConfig.rules
      : [robotsConfig.rules];

    expect(ruleEntries.length).toBeGreaterThan(0);
    ruleEntries.forEach((rule) => {
      expect(rule.userAgent).toBe("*");
      expect(rule.allow).toBe("/");
    });

    expect(robotsConfig.sitemap).toBe(`${BASE_URL}/sitemap.xml`);
  });
});
