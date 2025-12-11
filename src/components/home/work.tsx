import Link from "next/link";

import { Text } from "@/components/ui";

import { WORK } from "@/lib/config/home";

export function Work() {
  return (
    <div className="flex flex-col space-y-2">
      {WORK.map(({ link, id, title, company, start, end }) => (
        <Link
          key={id}
          className="relative overflow-hidden rounded-lg p-px"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="bg-card relative size-full rounded-lg p-4">
            <div className="relative flex w-full flex-row justify-between">
              <div>
                <Text className="text-foreground font-medium">{title}</Text>
                <Text muted>{company}</Text>
              </div>
              <Text muted>
                {start} - {end}
              </Text>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
