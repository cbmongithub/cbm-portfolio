import { highlight } from "sugar-high";

import { CopyButton } from "./copy-button";

type CodeBlockProps = React.HTMLAttributes<HTMLPreElement> & {
  children: React.ReactElement<{
    className?: string;
    children?: string;
    metastring?: string;
  }>;
};

export function CodeBlock({ children }: CodeBlockProps) {
  if (!children) return null;

  const raw = children?.props?.children ?? "";
  const lang =
    children?.props?.className?.replace("language-", "")?.trim() || "text";

  const meta = children?.props?.metastring || `example.${lang}`;
  const titleMatch = /title="([^"]+)"/.exec(meta as string);
  const title = titleMatch?.[1] || lang;
  const code = String(raw);

  return (
    <div className="border-border relative overflow-hidden rounded-md border bg-black/10">
      <div className="text-md text-foreground border-border flex items-center justify-between gap-3 border-b bg-black/15 px-3 py-2">
        <span className="text-md">{title}</span>
        <CopyButton code={code} />
      </div>
      <pre className="overflow-x-auto px-4 py-3" data-language={lang}>
        <code dangerouslySetInnerHTML={{ __html: highlight(code) }} />
      </pre>
    </div>
  );
}
