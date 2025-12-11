import Link from "next/link";

import { Navigation } from "@/components/layout/navigation";

export function Header() {
  return (
    <header className="z-50 flex h-12 items-center justify-between pt-6 pb-18">
      <Link href="/" className="z-50 inline-flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="300.047"
          height="171.5"
          preserveAspectRatio="none"
          viewBox="99.974 164.102 300.047 171.5"
          className="h-6 w-full max-w-[41.82px]"
          aria-hidden="true"
        >
          <title>Cbm Logo</title>
          <text
            x="99.974"
            y="303.102"
            className="fill-foreground hover:fill-muted-foreground text-[153.4px] transition-colors"
          >
            𝕔𝕓𝕞
          </text>
        </svg>
        <span className="sr-only">CBM home</span>
      </Link>
      <Navigation />
    </header>
  );
}
