import Link from "next/link";

import { Arrow, Badge } from "@/components/ui";
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
            <Badge>
              <Link href={link}>{label}</Link>
              <Arrow />
            </Badge>
          </MagnetEffect>
        ))}
      </div>
    </>
  );
}
