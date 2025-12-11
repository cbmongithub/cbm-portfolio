import Link from "next/link";

import { Text } from "@/components/ui";
import { MagnetEffect } from "@/components/ui/effects";

import { EMAIL_LINK, SOCIAL_LINKS } from "@/lib/config/links";

export function Connect() {
  return (
    <>
      <Text muted>
        Feel free to&nbsp;
        <Link
          className="text-link hover:text-link/80 transition-colors"
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
              className="group bg-muted text-muted-foreground hover:bg-foreground hover:text-background relative inline-flex shrink-0 items-center gap-px rounded-full px-2.5 py-1 text-sm transition-colors duration-200"
            >
              {label}
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
              >
                <path
                  d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
          </MagnetEffect>
        ))}
      </div>
    </>
  );
}
