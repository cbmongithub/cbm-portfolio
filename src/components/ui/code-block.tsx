import { highlight } from "sugar-high";

import { CopyButton } from "@/components/ui/copy-button";

export type CodeBlockProps = {
  children: React.ReactElement<{
    className: string;
    children: string;
    title?: string;
  }>;
};

export function CodeBlock({ children }: CodeBlockProps) {
  const { className, children: code, title } = children.props;
  const language = className.replace(/^language-/, "");
  return (
    <div className="mt-2 py-2">
      <div className="border-border bg-card relative overflow-hidden rounded-lg border">
        <div className="md:text-md text-foreground border-border bg-card flex items-center justify-between gap-3 border-b px-3 py-2 text-sm">
          <span className="text-muted-foreground">{title ?? `example.${language}`}</span>
          <CopyButton code={code} />
        </div>
        <pre className="overflow-x-auto px-4 py-3" data-language={language}>
          <code dangerouslySetInnerHTML={{ __html: highlight(code) }} />
        </pre>
      </div>
    </div>
  );
}
