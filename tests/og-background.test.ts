import { describe, expect, it, mock } from "bun:test";

import { getOgBackground } from "@/lib/og";

const originalFetch = global.fetch;

describe("getOgBackground", () => {
  it("returns fallback gradient when no API key is provided", async () => {
    const { PEXELS_API_KEY, ...rest } = process.env;

    delete process.env.PEXELS_API_KEY;

    const result = await getOgBackground("anything");
    expect(result.image).toBeDefined();
    expect(result.credit).toBeUndefined();

    process.env.PEXELS_API_KEY = PEXELS_API_KEY;
    Object.assign(process.env, rest);
  });

  it("returns image and credit when Pexels responds with a photo", async () => {
    process.env.PEXELS_API_KEY = "test-key";
    global.fetch = mock(async () => {
      return new Response(
        JSON.stringify({
          photos: [
            {
              src: { landscape: "https://example.com/landscape.jpg" },
              photographer: "Jane Doe",
              photographer_url: "https://pexels.com/@jane",
            },
          ],
        }),
        { status: 200 }
      );
    }) as unknown as typeof fetch;

    const result = await getOgBackground("mountains");
    expect(result.image).toBe("https://example.com/landscape.jpg");
    expect(result.credit).toContain("Jane Doe");
    expect(result.credit).toContain("Pexels");
    global.fetch = originalFetch;
  });

  it("falls back when fetch fails", async () => {
    process.env.PEXELS_API_KEY = "test-key";
    global.fetch = mock(async () => {
      return new Response("error", { status: 500 });
    }) as unknown as typeof fetch;

    const result = await getOgBackground("bad");
    expect(result.image).toBeDefined();
    global.fetch = originalFetch;
  });

  it("falls back when photo payload is empty", async () => {
    process.env.PEXELS_API_KEY = "test-key";
    global.fetch = mock(async () => {
      return new Response(JSON.stringify({ photos: [] }), { status: 200 });
    }) as unknown as typeof fetch;

    const result = await getOgBackground("empty");
    expect(result.image).toBeDefined();
    global.fetch = originalFetch;
  });
});
