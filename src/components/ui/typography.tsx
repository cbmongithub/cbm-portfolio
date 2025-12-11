import Link from "next/link";

import { slugify } from "@/lib/utils";

export type HeadingLevel = 1 | 2 | 3 | 4;

const headingSizes: Record<HeadingLevel, string> = {
  1: "text-3xl md:text-5xl",
  2: "text-2xl md:text-4xl",
  3: "text-xl md:text-3xl",
  4: "text-lg md:text-2xl",
};

type HeadingProps = React.PropsWithChildren<{
  level?: HeadingLevel;
  id?: string;
  className?: string;
  asChild?: boolean;
}>;

/* Heading with auto-anchors  */
export function Heading({ level = 2, id, children, className, asChild }: HeadingProps) {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
  const text = Array.isArray(children)
    ? children.join("")
    : typeof children === "string"
      ? children
      : "";
  const slug = id ?? slugify(text);

  return (
    <Tag
      id={slug}
      className={`scroll-mt-24 py-1 font-semibold ${headingSizes[level]} ${
        className ?? ""
      }`}
    >
      {asChild ? (
        children
      ) : (
        <Link
          href={`#${slug}`}
          aria-label={`Link to heading ${text}`}
          scroll
          className="relative pr-8 text-inherit no-underline after:absolute after:top-1/2 after:right-0 after:translate-x-1.5 after:-translate-y-1/2 after:text-xl after:opacity-0 after:transition after:duration-150 after:ease-out after:content-['🔗'] hover:after:translate-x-0 hover:after:opacity-70"
        >
          {children}
        </Link>
      )}
    </Tag>
  );
}

type TextProps = React.HTMLAttributes<HTMLParagraphElement> & {
  muted?: boolean;
};

export function Text({ muted, className, ...props }: TextProps) {
  return (
    <p
      className={`${
        muted ? "text-muted-foreground" : "text-foreground"
      } py-1 leading-relaxed ${className ?? ""}`}
      {...props}
    />
  );
}

export function Lead(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={`text-foreground/90 py-1 text-lg leading-7 ${props.className ?? ""}`}
    />
  );
}

export function Small(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={`text-muted-foreground py-1 text-sm ${props.className ?? ""}`}
    />
  );
}

export function Quote(props: React.HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      {...props}
      className={`border-border text-muted-foreground my-2 border-l-2 py-1 pl-4 ${
        props.className ?? ""
      }`}
    />
  );
}

// Polymorphic List (supports as="ol")
type ListProps = React.HTMLAttributes<HTMLUListElement> & { as?: "ul" | "ol" };

export function List({ as = "ul", className, ...props }: ListProps) {
  const Tag = as;
  const marker = as === "ol" ? "list-decimal" : "list-disc";
  return (
    <Tag
      {...props}
      className={`text-foreground ml-5 ${marker} space-y-1 py-1 ${className ?? ""}`}
    />
  );
}

export function InlineCode(props: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      {...props}
      className={`bg-secondary text-foreground rounded px-1 py-0.5 font-mono text-sm ${
        props.className ?? ""
      }`}
    />
  );
}

export function Surface(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={`border-border bg-card text-foreground rounded-lg border px-4 py-3 ${
        props.className ?? ""
      }`}
    />
  );
}

export function Prose(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={`text-foreground space-y-4 py-1 leading-relaxed [&_ol]:ml-5 [&_ol]:list-decimal [&_ul]:ml-5 [&_ul]:list-disc ${
        props.className ?? ""
      }`}
    />
  );
}

type TableProps = React.TableHTMLAttributes<HTMLTableElement>;

export function Table({ className, ...props }: TableProps) {
  return (
    <table
      {...props}
      className={`border-border text-foreground w-full border-collapse border ${
        className ?? ""
      }`}
    />
  );
}

type TableRowProps = React.HTMLAttributes<HTMLTableRowElement>;

export function Tr({ className, ...props }: TableRowProps) {
  return <tr {...props} className={`border-border border-b ${className ?? ""}`} />;
}

type TableCellProps = React.ThHTMLAttributes<HTMLTableCellElement> &
  React.TdHTMLAttributes<HTMLTableCellElement>;

export function Th({ className, ...props }: TableCellProps) {
  return (
    <th
      {...props}
      className={`border-border border px-3 py-1 text-left font-semibold ${
        className ?? ""
      }`}
    />
  );
}

export function Td({ className, ...props }: TableCellProps) {
  return (
    <td
      {...props}
      className={`border-border border px-3 py-1 text-left ${className ?? ""}`}
    />
  );
}
