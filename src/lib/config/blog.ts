export type Category = {
  id: string;
  label: string;
  tags: string[];
  description?: string;
};

export const DEFAULT_CATEGORY = "all";

export const CATEGORIES: Category[] = [
  {
    id: DEFAULT_CATEGORY,
    label: "All",
    tags: [],
    description: "Every post across the build log.",
  },
  {
    id: "nextjs",
    label: "Next.js",
    tags: ["nextjs", "frameworks"],
    description: "Routing, caching, and framework deep dives.",
  },
  {
    id: "react",
    label: "React",
    tags: ["react"],
    description: "React 19 features, compiler work, and patterns.",
  },
  {
    id: "security",
    label: "Security",
    tags: ["security"],
    description: "Secure-by-default patterns and mitigations.",
  },
  {
    id: "updates",
    label: "Updates",
    tags: ["updates"],
    description: "Release notes and platform updates.",
  },
];
