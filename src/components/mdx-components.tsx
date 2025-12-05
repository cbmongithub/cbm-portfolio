import { MDXRemote } from "next-mdx-remote/rsc";
import Link, { type LinkProps } from "next/link";

import { slugify } from "@/lib/utils";

import { CodeBlock } from "./code-block";

type HeadingLevel = 1 | 2 | 3 | 4;

type HeadingProps = React.PropsWithChildren<{ level: HeadingLevel }>;

const headingMap = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
} satisfies Record<HeadingLevel, keyof React.JSX.IntrinsicElements>;

/* Heading with auto-anchors  */
function Heading({ level, children }: HeadingProps) {
  const Heading = headingMap[level];
  // Strip non‑string children so we can safely slugify the text
  const text = Array.isArray(children)
    ? children.join("")
    : typeof children === "string"
      ? children
      : "";
  const id = slugify(text);

  return (
    <Heading id={id} className="group">
      <Link href={`#${id}`} aria-label={`Link to heading ${text}`} className="anchor">
        {children}
      </Link>
    </Heading>
  );
}

/* MDX element overrides */
const components = {
  h1: (props: React.PropsWithChildren) => <Heading level={1} {...props} />,
  h2: (props: React.PropsWithChildren) => <Heading level={2} {...props} />,
  h3: (props: React.PropsWithChildren) => <Heading level={3} {...props} />,
  h4: (props: React.PropsWithChildren) => <Heading level={4} {...props} />,
  a: (props: LinkProps) => <Link {...props} />,
  pre: CodeBlock,
};

type MDXComponentsProps = { source: string };

/* Render raw MDX with our component map; no extra rehype/remark pipeline */
export function MDXComponents({ source }: MDXComponentsProps) {
  return <MDXRemote source={source} components={components} />;
}
