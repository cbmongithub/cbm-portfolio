import { describe, expect, it } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";

import { Button } from "@/components/ui";

describe("Button", () => {
  it("defaults to type=button with primary styling and md sizing", () => {
    const html = renderToStaticMarkup(<Button>Tap</Button>);
    expect(html).toContain('type="button"');
    expect(html).toContain("bg-foreground");
    expect(html).toContain("text-background");
    expect(html).toContain("border-border");
    expect(html).toContain("h-10");
    expect(html).toContain("px-4");
    expect(html).toContain("text-sm");
  });

  it("renders icon variant + icon size with compact square hit area", () => {
    const icon = <svg role="img" aria-label="icon" />;
    const html = renderToStaticMarkup(
      <Button variant="icon" size="icon">
        {icon}
      </Button>
    );
    expect(html).toContain("size-7");
    expect(html).toContain("p-0");
    expect(html).toContain('role="img"');
    expect(html).toContain("border-border");
  });

  it("applies ghost variant styles without border", () => {
    const html = renderToStaticMarkup(<Button variant="ghost">Ghost</Button>);
    expect(html).toContain("hover:bg-muted/60");
    expect(html).toContain("text-muted-foreground");
    expect(html).not.toContain("border-border");
  });

  it("supports size overrides (lg)", () => {
    const html = renderToStaticMarkup(<Button size="lg">Large</Button>);
    expect(html).toContain("h-11");
    expect(html).toContain("px-5");
    expect(html).toContain("text-base");
  });

  it("merges custom class names", () => {
    const html = renderToStaticMarkup(<Button className="custom">Custom</Button>);
    expect(html).toContain("custom");
  });
});
