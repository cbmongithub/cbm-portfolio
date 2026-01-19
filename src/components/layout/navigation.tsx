"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

import { NAV_LINKS } from "@/lib/config/links";
import { NAVIGATION_VARIANTS } from "@/lib/config/motion";
import { cn } from "@/lib/utils";

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [emoji, setEmoji] = useState("😴");
  const { icon, background, ul, li, footer } = NAVIGATION_VARIANTS;

  useEffect(() => setIsOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflowY = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const getCurrentTime = () => {
      const now = new Date();
      const hour = Number(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "America/Denver",
          hour: "numeric",
          hour12: false,
        }).format(now)
      );
      const timeLabel = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Denver",
        hour: "numeric",
        minute: "2-digit",
      }).format(now);

      let emoji = "😴";
      if (hour >= 5 && hour < 12) emoji = "🌅";
      else if (hour >= 12 && hour < 18) emoji = "🌤️";
      else if (hour >= 18 && hour < 22) emoji = "🌙";

      setCurrentTime(timeLabel);
      setEmoji(emoji);
    };

    getCurrentTime();
    const interval = setInterval(getCurrentTime, 60_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.nav className="relative" aria-label="Main navigation">
      <motion.button
        type="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        className="text-foreground hover:text-muted-foreground hover:bg-muted/60 relative z-9999 inline-flex size-8 items-center justify-center"
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
            className="bg-card fixed inset-0 z-40 flex h-screen w-full flex-col"
            variants={background}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="flex flex-1 flex-col items-center justify-center">
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
                      onClick={() => pathname === link && setIsOpen(false)}
                      aria-label={label}
                    >
                      {label}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
            <motion.div
              className="text-muted-foreground flex w-full items-center justify-center pb-10 text-sm"
              variants={footer}
              custom={NAV_LINKS.length}
            >
              <span className="mr-2" aria-hidden="true">
                {emoji}
              </span>
              <span>Utah time: {currentTime}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
