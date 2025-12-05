import { MDXRemote } from "next-mdx-remote/rsc";
import NextImage, { type ImageProps } from "next/image";
import Link, { type LinkProps } from "next/link";

import { CodeBlock } from "./code-block";
import {
  CodeInline,
  Heading,
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

type MDXImageProps = ImageProps & { className?: string };

const MDXImage = ({ className, ...props }: MDXImageProps) => (
  <div className={`overflow-hidden ${className ?? ""}`}>
    <NextImage {...props} />
  </div>
);

/* MDX element overrides */
const components = {
  h1: (props: React.ComponentPropsWithoutRef<"h1">) => <Heading level={1} {...props} />,
  h2: (props: React.ComponentPropsWithoutRef<"h2">) => <Heading level={2} {...props} />,
  h3: (props: React.ComponentPropsWithoutRef<"h3">) => <Heading level={3} {...props} />,
  h4: (props: React.ComponentPropsWithoutRef<"h4">) => <Heading level={4} {...props} />,
  p: (props: React.ComponentPropsWithoutRef<"p">) => <Text {...props} />,
  code: (props: React.ComponentPropsWithoutRef<"code">) => <CodeInline {...props} />,
  a: (props: LinkProps) => <Link {...props} />,
  img: (props: ImageProps) => (
    <MDXImage
      className={props.className ?? ""}
      alt={props.alt ?? ""}
      src={props.src}
      width={props.width ?? 1200}
      height={props.height ?? 630}
    />
  ),
  pre: CodeBlock,
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
