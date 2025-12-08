import { describe, expect, it } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";

import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("defaults to type=button and primary styles", () => {
    const html = renderToStaticMarkup(<Button variant="primary">Tap</Button>);
    expect(html).toContain('type="button"');
    expect(html).toContain("border border-border px-3 py-2");
    expect(html).toContain("Tap");
  });

  it("applies the icon variant sizing", () => {
    const icon = <svg role="img" aria-label="icon" />;
    const html = renderToStaticMarkup(<Button variant="icon" icon={icon} />);
    expect(html).toContain("p-3 size-8");
    expect(html).toContain('role="img"');
  });

  it("merges custom class names", () => {
    const html = renderToStaticMarkup(
      <Button variant="primary" className="custom">
        Custom
      </Button>
    );
    expect(html).toContain("custom");
  });
});
