import { describe, expect, it } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";

import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("defaults to type=button and primary styles", () => {
    const html = renderToStaticMarkup(<Button>Tap</Button>);
    expect(html).toContain('type="button"');
    expect(html).toContain("border border-border rounded px-3 py-2");
    expect(html).toContain("Tap");
  });

  it("applies the icon variant sizing and keeps children visible", () => {
    const icon = <svg role="img" aria-label="icon" />;
    const html = renderToStaticMarkup(<Button variant="icon">{icon}</Button>);
    expect(html).toContain("p-3 size-7");
    expect(html).toContain('role="img"');
  });

  it("supports the ghost variant styles", () => {
    const html = renderToStaticMarkup(<Button variant="ghost">Ghost</Button>);
    expect(html).toContain("size-7 items-center");
    expect(html).toContain("text-muted-foreground");
  });

  it("merges custom class names", () => {
    const html = renderToStaticMarkup(<Button className="custom">Custom</Button>);
    expect(html).toContain("custom");
  });
});
