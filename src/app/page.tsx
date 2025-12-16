import type { Metadata } from "next";

import { Blog, Connect, Projects, Work } from "@/components/home";
import { Main, Section } from "@/components/layout";
import { TextEffect } from "@/components/ui/effects";

import {
  METADATA,
  OPEN_GRAPH_DEFAULTS,
  TWITTER_DEFAULTS,
} from "@/lib/config/metadata";
import { generateOgImageUrl } from "@/lib/og";

const HOME_PAGE_OG_DESCRIPTION =
  "Full stack web developer from Utah focusing on modern technologies.";

const HOME_PAGE_OG_IMAGE_URL = generateOgImageUrl({
  title: METADATA.name,
  subtitle: HOME_PAGE_OG_DESCRIPTION,
  route: "/",
});

export const metadata: Metadata = {
  title: METADATA.name,
  description: HOME_PAGE_OG_DESCRIPTION,
  openGraph: {
    ...OPEN_GRAPH_DEFAULTS,
    title: METADATA.name,
    description: HOME_PAGE_OG_DESCRIPTION,
    url: "/",
    images: [{ url: HOME_PAGE_OG_IMAGE_URL }],
  },
  twitter: {
    ...TWITTER_DEFAULTS,
    title: METADATA.name,
    description: HOME_PAGE_OG_DESCRIPTION,
    images: [HOME_PAGE_OG_IMAGE_URL],
  },
};

export default async function HomePage() {
  return (
    <Main className="space-y-20 pt-6">
      <Section title={{ text: "Hi I'm Christian" }}>
        <TextEffect>
          Full stack web developer from Utah focusing on modern technologies.
        </TextEffect>
      </Section>
      <Section title={{ text: "Projects", level: 4 }}>
        <Projects />
      </Section>
      <Section title={{ text: "Work", level: 4 }}>
        <Work />
      </Section>
      <Section title={{ text: "Blog", level: 4 }}>
        <Blog />
      </Section>
      <Section title={{ text: "Connect", level: 4 }}>
        <Connect />
      </Section>
    </Main>
  );
}
