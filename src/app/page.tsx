import { Blog, Connect, Projects, Work } from "@/components/home";
import { Main, Section } from "@/components/layout";
import { TextEffect } from "@/components/ui/effects";

import { HOME_PAGE_METADATA as metadata } from "@/lib/config/metadata";

export { metadata };

export default async function HomePage() {
  return (
    <Main className="space-y-20 pt-6">
      <Section title={{ text: "Hi I'm Christian" }}>
        <TextEffect>
          Full stack web developer from Utah focusing on modern technologies.
        </TextEffect>
      </Section>
      <Section title={{ text: "Projects", level: 3 }}>
        <Projects />
      </Section>
      <Section title={{ text: "Work", level: 3 }}>
        <Work />
      </Section>
      <Section title={{ text: "Blog", level: 3 }}>
        <Blog />
      </Section>
      <Section title={{ text: "Connect", level: 3 }}>
        <Connect />
      </Section>
    </Main>
  );
}
