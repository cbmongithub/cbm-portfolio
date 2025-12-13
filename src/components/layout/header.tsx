import Link from "next/link";

import { Navigation } from "@/components/layout/navigation";
import { Logo } from "@/components/ui";

export function Header() {
  return (
    <header className="flex h-12 items-center justify-between pt-6 pb-18">
      <Link href="/" className="z-50 inline-flex items-center">
        <Logo />
        <span className="sr-only">CBM home</span>
      </Link>
      <Navigation />
    </header>
  );
}
