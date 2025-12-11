import { Blog, Connect, Projects, Work } from "@/components/home";
import { Main, Section } from "@/components/layout";

export default function HomePage() {
  return (
    <Main className="space-y-24">
      <Section
        title={{ text: "Hi I'm Christian" }}
        text="Full stack web developer from Utah focusing on modern technologies."
      />
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
