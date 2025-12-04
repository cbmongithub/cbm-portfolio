import { describe, expect, it } from "bun:test";

describe("hello world", () => {
  it("prints a friendly greeting", () => {
    const message = "Hello, world!";
    expect(message).toBe("Hello, world!");
  });
});
