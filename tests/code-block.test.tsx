import { describe, expect, it, mock } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";

// Mock Bright so Bun can import CodeBlock without server-only errors
mock.module("bright", () => ({
  Code: ({ lang, code }: { lang: string; code: string }) => (
    <code data-mock="bright" data-lang={lang}>
      {code}
    </code>
  ),
}));

const load = () => import("@/components/ui/code-block");

describe("CodeBlock", () => {
  it("defaults the title to example.<language>", async () => {
    const { CodeBlock } = await load();
    const html = renderToStaticMarkup(
      await CodeBlock({ code: "const x = 1;", language: "ts" })
    );

    expect(html).toContain('data-lang="ts"');
    expect(html).toContain(">example.ts<");
  });

  it("uses a provided title when present", async () => {
    const { CodeBlock } = await load();
    const html = renderToStaticMarkup(
      await CodeBlock({ code: "console.log('hi')", language: "js", title: "demo.js" })
    );

    expect(html).toContain('data-lang="js"');
    expect(html).toContain(">demo.js<");
  });

  it("accepts arbitrary language values", async () => {
    const { CodeBlock } = await load();
    const html = renderToStaticMarkup(
      await CodeBlock({ code: "console.log('hi')", language: "javascript" })
    );

    expect(html).toContain('data-lang="javascript"');
    expect(html).toContain(">example.javascript<");
  });
});
