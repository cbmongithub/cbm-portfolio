import type { Variants } from "motion/react";

export const BASE_URL =
  process.env["NEXT_PUBLIC_BASE_URL"] ?? "https://www.christianbmartinez.com";

export const NAV_LINKS = [
  {
    href: "/",
    text: "home",
  },
  {
    href: "/about",
    text: "about",
  },
  {
    href: "/portfolio",
    text: "portfolio",
  },
  {
    href: "/blog",
    text: "blog",
  },
  {
    href: "/contact",
    text: "contact",
  },
];

export const FOOTER_LINKS = [
  {
    href: "/",
    text: "home",
  },
  {
    href: "/blog",
    text: "blog",
  },
  {
    href: "/sitemap.xml",
    text: "sitemap",
  },
];

export const SOCIAL_LINKS = {
  urls: {
    github: "https://www.github.com/cbmongithub",
    linkedin: "https://www.linkedin.com/in/cbmonlinkedn/",
    twitter: "https://www.twitter.com/cbmonx",
  },
  handles: {
    twitter: "@cbmonx",
    github: "@cbmongithub",
  },
};

export const SITE_METADATA = {
  name: "Christian B. Martinez — Full-Stack Engineer",
  url: BASE_URL,
  ogImage: `${BASE_URL}/og-image.png`,
  description:
    "Portfolio of Christian B. Martinez showcasing full-stack projects, product thinking, and experiments.",
  links: {
    twitter: SOCIAL_LINKS.urls.twitter,
    github: SOCIAL_LINKS.urls.github,
  },
  handles: {
    twitter: SOCIAL_LINKS.handles.twitter,
    github: SOCIAL_LINKS.handles.github,
  },
};

type MotionVariants = {
  icon: { open: Variants; closed: Variants };
  background: Variants;
  ul: Variants;
  li: Variants;
};

export const MOTION_VARIANTS: MotionVariants = {
  icon: {
    open: {
      open: { d: "M3.06061 2.99999L21.0606 21" },
      closed: { d: "M0 8.5L24 8.5" },
    },
    closed: {
      open: { d: "M3.00006 21.0607L21 3.06064" },
      moving: { d: "M0 14.5L24 14.5" },
      closed: { d: "M0 14.5L12 14.5" },
    },
  },
  background: {
    open: {
      opacity: 1,
      transition: { duration: 0.7, ease: "easeInOut" },
    },
    closed: {
      opacity: 0,
      transition: { duration: 0.7, ease: "easeInOut" },
    },
  },
  ul: {
    open: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
    closed: {
      opacity: 0,
      transition: { staggerChildren: 0.05, staggerDirection: 1 },
    },
  },
  li: {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { type: "spring", stiffness: 120, damping: 16 },
      },
    },
    closed: {
      y: -100,
      opacity: 0,
      transition: {
        y: { type: "spring", stiffness: 120, damping: 16 },
      },
    },
  },
};
