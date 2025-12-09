import { describe, expect, it } from "bun:test";

import { SITE_URL } from "@/lib/config";
import { getPosts } from "@/lib/posts";

import robots from "@/app/robots";
import sitemap from "@/app/sitemap";

describe("metadata routes", () => {
  it("sitemap includes static routes and blog posts", async () => {
    const entries = await sitemap();
    const urls = entries.map((entry) => entry.url);
    const today = new Date().toISOString().split("T")[0];

    expect(urls).toContain(SITE_URL);
    expect(urls).toContain(`${SITE_URL}/blog`);

    const expectedStatics = new Set([SITE_URL, `${SITE_URL}/blog`]);
    const staticRoutes = entries.filter((entry) => expectedStatics.has(entry.url));
    staticRoutes.forEach((route) => expect(route.lastModified).toBe(today));

    const posts = await getPosts();
    posts.forEach((post) => {
      expect(urls).toContain(`${SITE_URL}/blog/${post.slug}`);
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

    expect(robotsConfig.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
  });
});
