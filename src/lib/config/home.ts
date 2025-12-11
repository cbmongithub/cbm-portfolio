export type Projects = {
  name: string;
  alt: string;
  description: string;
  link: string;
  image: string;
  id: string;
};

export const PROJECTS: Projects[] = [
  {
    name: "Cli Loaders",
    alt: "An image of Christian B. Martinez' Cli Loaders project.",
    description: "A collection of cli loaders for the terminal, react, and beyond.",
    link: "https://cliloaders.com/",
    image: "/cliloaders.jpg",
    id: "project-1",
  },
  {
    name: "Chattr",
    alt: "An image of Christian B. Martinez' Chattr project.",
    description: "A customizable chatgpt chatbot component library for Nextjs.",
    link: "https://github.com/cbmongithub/chattr",
    image: "/chattr.jpg",
    id: "project-2",
  },
];

export type WorkExperience = {
  company: string;
  title: string;
  start: string;
  end: string;
  link: string;
  id: string;
};

export const WORK: WorkExperience[] = [
  {
    company: "Pointbreak",
    title: "Technical Co-Founder",
    start: "2025",
    end: "Present",
    link: "https://pointbreakapp.com",
    id: "work-1",
  },
  {
    company: "Freelance",
    title: "Full Stack Developer",
    start: "2020",
    end: "2024",
    link: "/",
    id: "work-2",
  },
  {
    company: "MMBC",
    title: "Front End Developer",
    start: "2017",
    end: "2020",
    link: "/",
    id: "work-3",
  },
];

export type BlogPosts = {
  title: string;
  description: string;
  link: string;
  id: string;
};

export const POSTS: BlogPosts[] = [
  {
    title: "Exploring the Intersection of Design, AI, and Design Engineering",
    description: "How AI is changing the way we design",
    link: "/blog/test",
    id: "blog-1",
  },
  {
    title: "Why I left my job to start my own company",
    description: "A deep dive into my decision to leave my job and start my own company",
    link: "/blog/test-2",
    id: "blog-2",
  },
  {
    title: "What I learned from my first year of freelancing",
    description: "A look back at my first year of freelancing and what I learned",
    link: "/blog/test",
    id: "blog-3",
  },
  {
    title: "How to Export Metadata from MDX for Next.js SEO",
    description:
      "A guide on exporting metadata from MDX files to leverage Next.js SEO features.",
    link: "/blog//blog/test-2",
    id: "blog-4",
  },
];
