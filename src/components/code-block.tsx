import { highlight } from "sugar-high";

import { CopyButton } from "./copy-button";

export type CodeBlockProps = {
  children: React.ReactElement<{
    className: string;
    children: string;
  }>;
};

export function CodeBlock({ children }: CodeBlockProps) {
  const { className, children: code } = children.props;
  const language = className.replace(/^language-/, "");
  return (
    <div className="mt-2 py-2">
      <div className="border-border bg-card relative overflow-hidden border">
        <div className="text-md text-foreground border-border bg-card flex items-center justify-between gap-3 border-b px-3 py-2">
          <span className="text-md">{language}</span>
          <CopyButton code={code} />
        </div>
        <pre className="overflow-x-auto px-4 py-3" data-language={language}>
          <code dangerouslySetInnerHTML={{ __html: highlight(code) }} />
        </pre>
      </div>
    </div>
  );
}
