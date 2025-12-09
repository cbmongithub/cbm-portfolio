import { SOCIAL_LINKS } from "./links";

export const SITE_URL =
  process.env["NEXT_PUBLIC_BASE_URL"] ?? "https://www.christianbmartinez.com";

export const SITE_METADATA = {
  name: "Christian B. Martinez — Full-Stack Engineer",
  url: SITE_URL,
  ogImage: `${SITE_URL}/og-image.png`,
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
