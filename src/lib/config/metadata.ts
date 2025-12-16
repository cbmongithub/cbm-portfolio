import type { Metadata } from "next";

import { SOCIAL_LINKS } from "@/lib/config/links";

export const BASE_URL =
  process.env["NEXT_PUBLIC_BASE_URL"] ?? "https://www.christianbmartinez.com";

export const METADATA = {
  name: "Christian B. Martinez | Full Stack Engineer",
  url: BASE_URL,
  ogImage: `${BASE_URL}/og-image.png`,
  description:
    "Portfolio of Christian B. Martinez showcasing full-stack projects, product thinking, and experiments.",
  links: {
    twitter: SOCIAL_LINKS[1].link,
    github: SOCIAL_LINKS[0].link,
  },
  handles: {
    twitter: SOCIAL_LINKS[1].handle,
    github: SOCIAL_LINKS[0].handle,
  },
};

export const OPEN_GRAPH_DEFAULTS = {
  type: "website",
  locale: "en_US",
  url: BASE_URL,
  title: METADATA.name,
  description: METADATA.description,
  siteName: METADATA.name,
  images: [
    {
      url: METADATA.ogImage,
      width: 1200,
      height: 630,
      alt: METADATA.name,
    },
  ],
} satisfies Metadata["openGraph"];

export const TWITTER_DEFAULTS = {
  card: "summary_large_image",
  title: METADATA.name,
  description: METADATA.description,
  images: [METADATA.ogImage],
  creator: METADATA.handles.twitter,
  site: METADATA.handles.twitter,
} satisfies Metadata["twitter"];

export const BASE_METADATA: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: METADATA.name,
  description: METADATA.description,
  keywords: [
    "Christian B. Martinez",
    "Christian Martinez Full Stack Developer",
    "Christian B Martinez Full Stack",
    "Full Stack developer Utah",
    "Christian Full Stack Developer",
    "cbm full stack developer",
  ],
  authors: [
    {
      name: METADATA.name,
      url: METADATA.url,
    },
  ],
  creator: METADATA.name,
  openGraph: OPEN_GRAPH_DEFAULTS,
  twitter: TWITTER_DEFAULTS,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/icon",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
