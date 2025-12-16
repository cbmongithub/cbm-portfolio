import type { Metadata } from "next";

import { getPosts, loadPost } from "@/lib/posts";

export type OgImageOptions = {
  title: string;
  description: string;
  route: string;
};

// Generate a dynamic image url for OG images.
export function generateOgImageUrl({ title, description, route }: OgImageOptions) {
  const params = new URLSearchParams({ title });
  if (description) params.set("description", description);
  if (route) params.set("route", route);
  return `${BASE_URL}/api/og?${params.toString()}`;
}

function resolveBaseUrl() {
  const envUrl =
    process.env["NEXT_PUBLIC_BASE_URL"] ??
    process.env["VERCEL_BRANCH_URL"] ??
    process.env["VERCEL_URL"];

  if (envUrl) {
    return envUrl.startsWith("http") ? envUrl : `https://${envUrl}`;
  }

  return process.env["NODE_ENV"] === "production"
    ? "https://www.christianbmartinez.com"
    : "http://localhost:3000";
}

export const BASE_URL = resolveBaseUrl();
export const BASE_TITLE = "Christian B. Martinez";
export const BASE_DESCRIPTION = "Full Stack Engineer crafting modern web experiences.";
export const BASE_IMAGE_URL = generateOgImageUrl({
  title: BASE_TITLE,
  description: BASE_DESCRIPTION,
  route: "/",
});

const TWITTER_HANDLE = "@cbmonx";

export const OG_IMAGE_SIZES = { width: 1200, height: 630 };

export const OG_DEFAULTS = {
  type: "website",
  locale: "en_US",
  url: BASE_URL,
  title: BASE_TITLE,
  description: BASE_DESCRIPTION,
  siteName: BASE_TITLE,
  images: [
    {
      url: BASE_IMAGE_URL,
      ...OG_IMAGE_SIZES,
      alt: "Open graph preview for Christian B. Martinez's portfolio",
    },
  ],
} satisfies Metadata["openGraph"];

export const TWITTER_DEFAULTS = {
  title: BASE_TITLE,
  description: BASE_DESCRIPTION,
  card: "summary_large_image",
  images: [BASE_IMAGE_URL],
  creator: TWITTER_HANDLE,
  site: TWITTER_HANDLE,
} satisfies Metadata["twitter"];

export const BASE_METADATA: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: BASE_TITLE,
    template: "%s | Christian B. Martinez",
  },
  description: BASE_DESCRIPTION,
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
      name: BASE_TITLE,
      url: BASE_URL,
    },
  ],
  creator: BASE_TITLE,
  openGraph: OG_DEFAULTS,
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

export const HOME_PAGE_METADATA: Metadata = {
  title: {
    absolute: BASE_TITLE,
  },
  description: BASE_DESCRIPTION,
  openGraph: {
    ...OG_DEFAULTS,
    title: BASE_TITLE,
    description: BASE_DESCRIPTION,
    url: "/",
    images: [
      {
        url: BASE_IMAGE_URL,
        ...OG_IMAGE_SIZES,
        alt: OG_DEFAULTS.images?.[0]?.alt ?? BASE_TITLE,
      },
    ],
  },
  twitter: {
    ...TWITTER_DEFAULTS,
    title: BASE_TITLE,
    description: BASE_DESCRIPTION,
    images: [BASE_IMAGE_URL],
  },
};

const BLOGS_TITLE = "Notes, Experiments, and Writeups";
const BLOGS_DESCRIPTION = "A running log of what I'm building, learning, and shipping.";
const BLOGS_IMAGE = generateOgImageUrl({
  title: BLOGS_TITLE,
  description: BLOGS_DESCRIPTION,
  route: "/blog",
});

export const BLOGS_PAGE_METADATA: Metadata = {
  title: BLOGS_TITLE,
  description: BLOGS_DESCRIPTION,
  openGraph: {
    ...OG_DEFAULTS,
    title: BLOGS_TITLE,
    description: BLOGS_DESCRIPTION,
    url: "/blog",
    images: [
      {
        url: BLOGS_IMAGE,
        ...OG_IMAGE_SIZES,
        alt: BLOGS_TITLE,
      },
    ],
  },
  twitter: {
    ...TWITTER_DEFAULTS,
    title: BLOGS_TITLE,
    description: BLOGS_DESCRIPTION,
    images: [BLOGS_IMAGE],
  },
};

// Re-export blog/[slug]/page.tsx helpers for cleanliness.
export async function generateStaticBlogParams() {
  const posts = await getPosts();
  return posts.map(({ slug }) => ({ slug }));
}

export type BlogMetadata = {
  params: Promise<{ slug: string }>;
};

export async function generateBlogMetadata({ params }: BlogMetadata): Promise<Metadata> {
  const { slug } = await params;
  const {
    metadata: { title, description, tags, publishedTime, modifiedTime, image, authors },
  } = await loadPost(slug);
  const url = `/blog/${slug}`;
  const images = [
    {
      url: image,
      ...OG_IMAGE_SIZES,
      alt: title,
    },
  ];

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      ...OG_DEFAULTS,
      title,
      description,
      type: "article",
      url,
      publishedTime,
      modifiedTime,
      authors,
      tags,
      images,
    },
    twitter: {
      ...TWITTER_DEFAULTS,
      title,
      description,
      images: [image],
    },
  };
}
