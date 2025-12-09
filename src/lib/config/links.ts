import { obfuscatedEmail } from "../utils";

type Links = {
  link: string;
  label: string;
};

export const FOOTER_LINKS: Links[] = [
  {
    link: "/",
    label: "home",
  },
  {
    link: "/blog",
    label: "blog",
  },
  {
    link: "/sitemap.xml",
    label: "sitemap",
  },
];

export const NAV_LINKS: Links[] = [
  {
    link: "/",
    label: "home",
  },
  {
    link: "/about",
    label: "about",
  },
  {
    link: "/portfolio",
    label: "portfolio",
  },
  {
    link: "/blog",
    label: "blog",
  },
  {
    link: "/contact",
    label: "contact",
  },
];

type SocialLinks = Links & {
  handle?: string;
};

export const SOCIAL_LINKS: SocialLinks[] = [
  {
    label: "Github",
    link: "https://github.com/cbmongithub",
    handle: "@cbmongithub",
  },
  {
    label: "Twitter",
    link: "https://twitter.com/cbmonx",
    handle: "@cbmonx",
  },
  {
    label: "LinkedIn",
    link: "https://www.linkedin.com/in/cbmonlinkedn",
  },
];

export const EMAIL_LINK = obfuscatedEmail();
