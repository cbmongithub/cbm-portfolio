import Link from "next/link";

import { cn } from "@/lib/utils";

// Turn an arbitrary string into a URL-safe slug (lowercase, dashes, no symbols)
export function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/--+/g, "-");
}

export type HeadingLevel = 1 | 2 | 3 | 4;

const HEADING_STYLES: Record<HeadingLevel, string> = {
  1: "text-4xl md:text-5xl pt-6 pb-1",
  2: "text-3xl md:text-4xl pt-6 pb-1",
  3: "text-xl md:text-2xl pt-6 pb-1",
  4: "text-lg md:text-xl pt-6 pb-1",
};

type HeadingProps = React.PropsWithChildren<{
  level?: HeadingLevel;
  id?: string;
  className?: string;
  asChild?: boolean;
}>;

// Heading that auto-generates an anchor link for deep-linking
export function Heading({ level = 2, id, children, className, asChild }: HeadingProps) {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
  const text =
    typeof children === "string"
      ? children
      : Array.isArray(children)
        ? children.join("")
        : "";
  const slug = id ?? slugify(text);

  return (
    <Tag
      id={slug}
      className={cn("scroll-mt-24 font-semibold", HEADING_STYLES[level], className)}
    >
      {asChild ? (
        children
      ) : (
        <Link
          href={`#${slug}`}
          aria-label={`Link to heading ${text}`}
          scroll
          className="relative pr-8 text-inherit no-underline after:absolute after:top-1/2 after:right-0 after:translate-x-1.5 after:-translate-y-1/2 after:text-xl after:opacity-0 after:transition after:duration-200 after:ease-out after:content-['🔗'] hover:after:translate-x-0 hover:after:opacity-70"
        >
          {children}
        </Link>
      )}
    </Tag>
  );
}
