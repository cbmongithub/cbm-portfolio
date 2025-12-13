import Link from "next/link";

import { Main, Section } from "@/components/layout";

export default function NotFound() {
  return (
    <Main className="mx-auto flex h-160 max-w-4xl flex-col justify-center">
      <Section>
        <div className="border-border bg-card text-foreground rounded-2xl border p-6 shadow-sm">
          <p className="text-muted-foreground text-sm tracking-wide uppercase">
            Page not found
          </p>
          <h1 className="mt-2 text-2xl font-semibold">We couldn&apos;t find that.</h1>
          <p className="text-muted-foreground mt-3">
            The link might be broken or the page may have been moved.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="border-border text-foreground hover:bg-muted/80 rounded-lg border px-4 py-2 text-sm font-medium transition-colors"
            >
              View all posts
            </Link>
            <Link
              href="/"
              className="bg-foreground text-background hover:bg-foreground/90 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            >
              Go home
            </Link>
          </div>
        </div>
      </Section>
    </Main>
  );
}
