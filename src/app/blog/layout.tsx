import type { Metadata } from "next";

import { METADATA, OPEN_GRAPH_DEFAULTS, TWITTER_DEFAULTS } from "@/lib/config/metadata";

export const metadata: Metadata = {
  title: "Blog",
  description: METADATA.description,
  openGraph: {
    ...OPEN_GRAPH_DEFAULTS,
    title: "Blog",
    description: METADATA.description,
    url: "/blog",
  },
  twitter: {
    ...TWITTER_DEFAULTS,
    title: "Blog",
    description: METADATA.description,
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
