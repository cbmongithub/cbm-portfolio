import Link from "next/link";

import { Arrow } from "@/components/ui";
import { MagnetEffect } from "@/components/ui/effects";
import { Text } from "@/components/ui/typography";

import { EMAIL_LINK, SOCIAL_LINKS } from "@/lib/config/links";

export function Connect() {
  return (
    <>
      <Text muted>
        Feel free to&nbsp;
        <Link
          className="text-link hover:text-link-hover transition-colors hover:underline"
          href={`mailto:${EMAIL_LINK}`}
        >
          contact me&nbsp;
        </Link>
        anytime
      </Text>
      <div className="mt-2 flex flex-row space-x-3">
        {SOCIAL_LINKS.map(({ label, link }) => (
          <MagnetEffect key={label}>
            <Link
              href={link}
              className="group bg-muted text-muted-foreground hover:bg-muted-foreground hover:text-muted relative inline-flex shrink-0 items-center gap-px rounded-full px-2.5 py-1 text-sm transition-colors duration-200"
            >
              {label}
              <Arrow />
            </Link>
          </MagnetEffect>
        ))}
      </div>
    </>
  );
}
