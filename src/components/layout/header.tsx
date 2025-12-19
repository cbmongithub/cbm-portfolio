import Link from "next/link";

import { Navigation } from "@/components/layout/navigation";
import { Logo } from "@/components/ui";

export function Header() {
  return (
    <header className="border-border bg-background/40 fixed top-0 left-0 z-50 w-full border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
        <Link href="/" className="inline-flex items-center gap-2">
          <Logo />
          <span className="sr-only">CBM home</span>
        </Link>
        <Navigation />
      </div>
    </header>
  );
}
