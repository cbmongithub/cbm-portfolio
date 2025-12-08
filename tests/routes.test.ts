import { describe, expect, it } from "bun:test";
import fs from "node:fs";
import path from "node:path";

const ROUTE_PAGES = [
  "src/app/page.tsx",
  "src/app/about/page.tsx",
  "src/app/contact/page.tsx",
  "src/app/portfolio/page.tsx",
  "src/app/blog/page.tsx",
  "src/app/blog/[slug]/page.tsx",
];

describe("app routes", () => {
  it("all route entrypoints exist", () => {
    for (const file of ROUTE_PAGES) {
      const resolved = path.join(process.cwd(), file);
      expect(fs.existsSync(resolved)).toBe(true);
      const size = fs.statSync(resolved).size;
      expect(size).toBeGreaterThan(0);
    }
  });
});
