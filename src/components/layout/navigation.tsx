"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

import { ThemeToggle } from "@/components/ui/theme-toggle";

import { NAV_LINKS } from "@/lib/config/links";
import { NAVIGATION_VARIANTS } from "@/lib/config/variants";
import { cn } from "@/lib/utils";

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { icon, background, ul, li } = NAVIGATION_VARIANTS;

  useEffect(() => setIsOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflowY = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [isOpen]);

  return (
    <motion.nav className="relative" aria-label="Main navigation">
      <motion.button
        type="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        className="relative z-50 inline-flex size-8 items-center justify-center"
        onClick={() => setIsOpen((p) => !p)}
      >
        <motion.svg
          aria-hidden="true"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          initial={false}
          animate={isOpen ? "open" : "closed"}
        >
          <motion.path
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            variants={icon.open}
          />
          <motion.path
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            variants={icon.closed}
          />
        </motion.svg>
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className="size-screen bg-background fixed inset-0 z-40 flex flex-col justify-center"
            variants={background}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <motion.ul
              className="flex flex-col items-center justify-center gap-6"
              variants={ul}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {NAV_LINKS.map(({ label, link }) => (
                <motion.li
                  key={label}
                  className="flex flex-row items-center justify-center p-2"
                  variants={li}
                >
                  <Link
                    className={cn(
                      "text-2xl transition ease-in-out",
                      pathname === link
                        ? "text-foreground hover:text-muted-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground font-light"
                    )}
                    href={link}
                    aria-label={label}
                  >
                    {label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                className="flex flex-row items-center justify-center pt-2"
                variants={li}
              >
                <ThemeToggle />
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
