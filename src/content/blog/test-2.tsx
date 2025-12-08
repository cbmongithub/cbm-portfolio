import { CodeBlock } from "@/components/code-block";
import {
  Heading,
  Lead,
  List,
  Prose,
  Quote,
  Surface,
  Text,
} from "@/components/typography";

import type { PostMeta } from "@/lib/posts";

export const meta: PostMeta = {
  slug: "test-2",
  title: "Static data pipeline dry run",
  publishedAt: "2025-12-15",
  description:
    "We ship a fake article to prove object-based content, dynamic imports, and server-side highlighting all play nicely.",
  image: "/og-image.png",
};

export default function TestTwo() {
  return (
    <Prose>
      <Lead>
        This is a fabricated post that lives as a plain TSX module. No MDX, no frontmatter
        parsing—just typed metadata and server-rendered JSX.
      </Lead>

      <Heading level={1}>Why another test?</Heading>
      <Text>
        We’re validating that multiple posts load dynamically, their metadata drives
        routing/SEO, and code blocks still highlight on the server while keeping the Copy
        button hydrated on the client.
      </Text>

      <Heading level={2}>Checklist</Heading>
      <List>
        <li>Typed meta export</li>
        <li>Dynamic import via slug</li>
        <li>Two code samples</li>
        <li>Server-side highlight, client copy</li>
      </List>

      <Heading level={2}>First snippet: data fetch mock</Heading>
      <CodeBlock>
        {
          <code className="language-ts">{`type User = { id: string; name: string };

export async function fetchUsers(): Promise<User[]> {
  // Pretend to hit an API
  await new Promise((res) => setTimeout(res, 50));
  return [
    { id: "u1", name: "Ada" },
    { id: "u2", name: "Lin" },
    { id: "u3", name: "Mae" },
  ];
}

export const pickUser = (users: User[]) =>
  users[Math.floor(Math.random() * users.length)];`}</code>
        }
      </CodeBlock>

      <Heading level={2}>Second snippet: render helper</Heading>
      <CodeBlock>
        {
          <code className="language-ts">{`import { createElement } from "react";

export function renderUserCard(user: { id: string; name: string }) {
  return createElement(
    "div",
    { "data-user": user.id, className: "rounded border p-3" },
    createElement("strong", null, user.name)
  );
}`}</code>
        }
      </CodeBlock>

      <Quote>
        If this renders, the pipeline works. If the copy buttons light up, the hydration
        boundary is intact. If the SEO shows up, the meta export is doing its job.
      </Quote>

      <Surface className="mt-6">
        <Text>Dummy post complete. Nothing to see here—except that it works.</Text>
      </Surface>
    </Prose>
  );
}
