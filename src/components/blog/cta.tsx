import Link from "next/link";

import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/typography";

import { EMAIL_LINK } from "@/lib/config/links";

type CtaProps = {
  title: string;
};

export function Cta({ title }: CtaProps) {
  const EMAIL_SUBJECT = encodeURIComponent("Let's build something together");
  const EMAIL_BODY = encodeURIComponent(
    `Hey Christian!\n\nI just read your blog post "${title}" and would love to chat about working together.`
  );
  return (
    <Section className="border-border bg-muted/40 rounded-2xl border p-6">
      <Text className="text-sm tracking-widest uppercase" muted>
        Enjoyed this post?
      </Text>
      <h3 className="text-foreground mb-3 text-2xl font-semibold">
        Let&apos;s build something together.
      </h3>
      <Text muted>
        I&apos;m currently partnering with teams to ship performant, design-forward web
        experiences. Reach out if you&apos;d like to collaborate.
      </Text>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button>
          <Link href="/">Back to Home</Link>
        </Button>
        <Button variant="outline">
          <Link
            href={`mailto:${EMAIL_LINK()}?subject=${EMAIL_SUBJECT}&body=${EMAIL_BODY}`}
          >
            Contact Me
          </Link>
        </Button>
      </div>
    </Section>
  );
}
