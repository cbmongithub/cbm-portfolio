import { describe, expect, it } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";

import { CodeBlock } from "@/components/code-block";

// Build a React <code> element the component expects
const fence = (children: string, className?: string) => (
  <code className={className}>{children}</code>
);

describe("CodeBlock", () => {
  it("renders highlighted code with the language label and data attribute", () => {
    const html = renderToStaticMarkup(
      <CodeBlock>{fence("const x = 1;", "language-ts")}</CodeBlock>
    );

    expect(html).toContain('data-language="ts"');
    expect(html).toContain(">ts<");
    expect(html).toContain("sh__line");
  });

  it("uses the raw class name when not prefixed by language-", () => {
    const html = renderToStaticMarkup(
      <CodeBlock>{fence("console.log('hi')", "javascript")}</CodeBlock>
    );

    expect(html).toContain('data-language="javascript"');
    expect(html).toContain(">javascript<");
  });

  it("handles plain text when className indicates text", () => {
    const html = renderToStaticMarkup(
      <CodeBlock>{fence("console.log('hi')", "language-text")}</CodeBlock>
    );

    expect(html).toContain('data-language="text"');
    expect(html).toContain(">text<");
  });
});
