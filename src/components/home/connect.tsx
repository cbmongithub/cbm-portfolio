import Link from "next/link";

import { Arrow, Button } from "@/components/ui";
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
            <Button variant="outline" size="sm">
              <Link href={link} target="_blank">
                {label}
              </Link>
              <Arrow />
            </Button>
          </MagnetEffect>
        ))}
      </div>
    </>
  );
}
