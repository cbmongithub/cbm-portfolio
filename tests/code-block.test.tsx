import { describe, expect, it } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";

import { CodeBlock } from "@/components/ui";

// Helper to build the expected <code> child
const fence = (children: string, className?: string, title?: string) => (
  <code className={className} title={title}>
    {children}
  </code>
);

describe("CodeBlock", () => {
  it("defaults the title to example.<language>", () => {
    const html = renderToStaticMarkup(
      <CodeBlock>{fence("const x = 1;", "language-ts")}</CodeBlock>
    );

    expect(html).toContain('data-language="ts"');
    expect(html).toContain(">example.ts<");
  });

  it("uses a provided title when present", () => {
    const html = renderToStaticMarkup(
      <CodeBlock>{fence("console.log('hi')", "language-js", "demo.js")}</CodeBlock>
    );

    expect(html).toContain('data-language="js"');
    expect(html).toContain(">demo.js<");
  });

  it("falls back to raw className when not prefixed", () => {
    const html = renderToStaticMarkup(
      <CodeBlock>{fence("console.log('hi')", "javascript")}</CodeBlock>
    );

    expect(html).toContain('data-language="javascript"');
    expect(html).toContain(">example.javascript<");
  });
});
