import { Heading, Lead, List, Prose, Quote, Small, Surface, Text } from "@/components/ui";
import { CodeBlock } from "@/components/ui/code-block";

import { SITE_URL } from "@/lib/config/site";
import type { PostMetadata } from "@/lib/posts";

const SLUG = "test";

export const metadata: PostMetadata = {
  slug: SLUG,
  title: "Design system smoke test",
  publishedAt: "2025-12-09",
  description:
    "Exercising headings, anchors, links, lists, tables, code, and images—rendered from plain JSX.",
  image: `${SITE_URL}/blog/${SLUG}/opengraph-image`,
};

export default function TestPost() {
  return (
    <Prose>
      <Lead>
        Leidy, You are amazing. This is just a test page, to see what my blog will look
        like, but it makes me happy you checked it out. You are amazing, and I appreciate
        you supporting me, my interests, and my passion for technology &hearts; &hearts;
        &hearts;
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
      <CodeBlock
        code={`// comment: uses keyword, class, property, string, entity, sign
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

console.log(widget.render({ title: "Demo", count: add(2, 3) }));`.trim()}
      />

      <Heading level={3}>Bonus util</Heading>
      <CodeBlock
        code={`export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");`.trim()}
      />

      <Text className="mt-6">
        Copy buttons remain client-only, but the heavy lifting (render + highlight) is
        static at build time. If desired, you can dynamically import the CopyButton inside
        CodeBlock; current setup keeps SSR highlighting intact.
      </Text>
    </Prose>
  );
}
