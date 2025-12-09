import Link from "next/link";

import { ThemeToggle } from "./ui/theme-toggle";

export function Footer() {
  return (
    <footer className="border-border mt-24 border-t py-4">
      <div className="flex items-center justify-between">
        <Link
          className="text-muted-foreground hover:text-muted-foreground/80 md:text-md text-sm transition-colors"
          href="https://github.com/cbmongithub"
          target="_blank"
        >
          <span>&copy; {new Date().getFullYear()} CBM All rights reserved</span>
        </Link>
        <div>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
