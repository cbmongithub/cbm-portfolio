"use client";

import { useEffect } from "react";
import Link from "next/link";

import { Main, Section } from "@/components/layout";
import { Button } from "@/components/ui";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);

  return (
    <Main className="mx-auto flex h-160 max-w-4xl flex-col justify-center">
      <Section>
        <div className="border-border bg-card text-foreground rounded-2xl border p-8 shadow-sm">
          <p className="text-muted-foreground text-sm tracking-wide uppercase">
            Something went wrong
          </p>
          <h1 className="mt-2 text-2xl font-semibold">
            We couldn&apos;t load this page.
          </h1>
          <p className="text-muted-foreground mt-3">
            {error?.message ? error.message : "An unexpected error occurred."}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              type="button"
              onClick={reset}
              className="bg-foreground text-background hover:bg-foreground/90 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            >
              Try again
            </Button>
            <Link
              href="/"
              className="border-border text-foreground hover:bg-muted/80 rounded-lg border px-4 py-2 text-sm font-medium transition-colors"
            >
              Go home
            </Link>
          </div>
          {error?.digest && (
            <p className="text-muted-foreground mt-4 font-mono text-[11px]">
              Error ID: {error.digest}
            </p>
          )}
        </div>
      </Section>
    </Main>
  );
}
