import { Code } from "bright";

import { CopyButton } from "@/components/ui";

import { DARK_THEME, LIGHT_THEME } from "@/lib/config/code";

export type CodeBlockProps = {
  code: string;
  title?: string;
  language?: string;
};

export function CodeBlock({ code, title, language = "ts" }: CodeBlockProps) {
  return (
    <div className="mt-2 py-2">
      <div className="border-border bg-card/50 relative overflow-hidden rounded-lg border">
        <div className="border-border text-foreground flex items-center justify-between gap-3 border-b px-3 py-2 text-sm">
          <span className="text-muted-foreground">{title ?? `example.${language}`}</span>
          <CopyButton code={code} />
        </div>
        <div className="-my-4 overflow-x-auto">
          <Code
            lang={language}
            code={code.trim()}
            theme={{
              dark: DARK_THEME,
              light: LIGHT_THEME,
              lightSelector: "html.light",
            }}
          />
        </div>
      </div>
    </div>
  );
}
