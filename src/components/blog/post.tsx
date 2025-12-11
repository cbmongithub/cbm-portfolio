"use client";

import { Main, Section } from "@/components/layout";
import { ScrollProgress } from "@/components/ui";

import type { PostMetadata } from "@/lib/posts";

type PostProps = {
  children: React.ReactNode;
  metadata: PostMetadata;
};

export function Post({ children, metadata }: PostProps) {
  const { publishedAt, title, description } = metadata;

  return (
    <>
      <div className="bg-background pointer-events-none fixed top-0 left-0 z-10 h-12 w-full to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_bottom,var(--color-background),transparent)]" />
      <ScrollProgress />
      <Main className="flex flex-col gap-4">
        <Section>
          <header className="space-y-2">
            <p className="text-muted-foreground text-sm">{publishedAt}</p>
            <h1 className="text-foreground text-3xl font-semibold">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
          </header>
        </Section>

        <Section>
          <div className="max-w-none">{children}</div>
        </Section>
      </Main>
    </>
  );
}
