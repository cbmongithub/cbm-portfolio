import { MDXRemote } from "next-mdx-remote/rsc";
import Image, { ImageProps } from "next/image";
import Link, { type LinkProps } from "next/link";

import { CodeBlock, CodeBlockProps } from "./code-block";
import {
  Heading,
  InlineCode,
  Lead,
  List,
  Prose,
  Quote,
  Small,
  Surface,
  Table,
  Td,
  Text,
  Th,
  Tr,
} from "./typography";

/* MDX element overrides */
const components = {
  h1: (props: React.ComponentPropsWithoutRef<"h1">) => (
    <Heading level={1} {...props} />
  ),
  h2: (props: React.ComponentPropsWithoutRef<"h2">) => (
    <Heading level={2} {...props} />
  ),
  h3: (props: React.ComponentPropsWithoutRef<"h3">) => (
    <Heading level={3} {...props} />
  ),
  h4: (props: React.ComponentPropsWithoutRef<"h4">) => (
    <Heading level={4} {...props} />
  ),
  p: (props: React.ComponentPropsWithoutRef<"p">) => <Text {...props} />,
  code: (props: React.ComponentPropsWithoutRef<"code">) => (
    <InlineCode {...props} />
  ),
  a: (props: LinkProps) => <Link {...props} />,
  img: (props: ImageProps) => <Image {...props} />,
  pre: (props: CodeBlockProps) => <CodeBlock {...props} />,
  Lead,
  Small,
  Quote,
  Surface,
  Prose,
  List,
  Table,
  Tr,
  Td,
  Th,
};

type MDXComponentsProps = { source: string };

/* Render raw MDX with our component map; no extra rehype/remark pipeline */
export function MDXComponents({ source }: MDXComponentsProps) {
  return <MDXRemote source={source} components={components} />;
}
