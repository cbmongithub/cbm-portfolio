import { describe, expect, it } from "bun:test";

import { slugify } from "@/components/ui/typography/heading";

describe("slugify", () => {
  it("lowercases and replaces spaces with dashes", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("removes symbols and collapses dashes", () => {
    expect(slugify("Hello & World!!!")).toBe("hello-and-world");
    expect(slugify("Hello--World")).toBe("hello-world");
  });
});
