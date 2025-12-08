import { CodeBlock } from "@/components/code-block";
import {
  Heading,
  Lead,
  List,
  Prose,
  Quote,
  Small,
  Surface,
  Text,
} from "@/components/typography";

import type { PostMeta } from "@/lib/posts";

export const meta: PostMeta = {
  slug: "test",
  title: "Design system smoke test",
  publishedAt: "2025-12-09",
  description:
    "Exercising headings, anchors, links, lists, tables, code, and images—rendered from plain JSX.",
  image: "/og-image.png",
};

// Server component page for the test post (no MDX, minimal JS).
// Code is highlighted at build time via CodeBlock; only CopyButton hydrates.
export default function TestPost() {
  return (
    <Prose>
      <Lead>
        This post exercises our typography set without MDX parsing. Content is plain JSX,
        code is highlighted on the server, and only the Copy button hydrates on the
        client.
      </Lead>

      <Heading level={1}>H1 Heading</Heading>
      <Heading level={2}>H2 Heading</Heading>
      <Heading level={3}>H3 Heading</Heading>

      <Quote>Blockquote to verify styling and left border.</Quote>

      <List>
        <li>Unordered item one</li>
        <li>Unordered item two</li>
        <li>Unordered item three</li>
      </List>

      <List as="ol">
        <li>Ordered item one</li>
        <li>Ordered item two</li>
      </List>

      <Surface className="mt-4">
        <Small>Figure 1. Static content rendered from JSX.</Small>
      </Surface>

      <Heading level={2}>Code sample (server-highlighted)</Heading>
      <CodeBlock>
        {
          <code className="language-ts">{`// comment: uses keyword, class, property, string, entity, sign
export class Widget {
  private id: string;
  constructor(id: string) {
    this.id = id ?? crypto.randomUUID();
  }

  static from(entity: { id: string; props: Record<string, unknown> }) {
    const widget = new Widget(entity.id);
    Object.assign(widget, entity.props);
    return widget;
  }

  render(props: { title: string; count: number }) {
    const { title, count } = props; // property + comment
    return \`\${title} (#\${this.id}) has \${count} items\`;
  }
}

function add(a: number, b: number) {
  return a + b; // sign
}

const widget = Widget.from({
  id: "w-123", // string
  props: { owner: "cbm", meta: { env: "dev" } },
});

console.log(widget.render({ title: "Demo", count: add(2, 3) }));`}</code>
        }
      </CodeBlock>

      <Heading level={3}>Bonus util</Heading>
      <CodeBlock>
        {
          <code className="language-ts">{`export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");`}</code>
        }
      </CodeBlock>

      <Text className="mt-6">
        Copy buttons remain client-only, but the heavy lifting (render + highlight) is
        static at build time. If desired, you can dynamically import the CopyButton inside
        CodeBlock; current setup keeps SSR highlighting intact.
      </Text>
    </Prose>
  );
}
