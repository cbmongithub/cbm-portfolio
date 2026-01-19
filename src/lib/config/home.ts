export type Projects = {
  name: string;
  alt: string;
  description: string;
  link: string;
  src: string;
  id: string;
};

export const PROJECTS: Projects[] = [
  {
    name: "Cli Loaders",
    alt: "An image of Christian B. Martinez' Cli Loaders project.",
    description:
      "A collection of cli loaders for the terminal, react, and beyond.",
    link: "https://cliloaders.com/",
    src: "/cliloaders.jpg",
    id: "project-1",
  },
  {
    name: "Chattr",
    alt: "An image of Christian B. Martinez' Chattr project.",
    description: "A customizable chatgpt chatbot component library for Nextjs.",
    link: "https://github.com/cbmongithub/chattr",
    src: "/chattr.jpg",
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
    company: "Freelance",
    title: "Full Stack Developer",
    start: "2020",
    end: "Present",
    link: "/",
    id: "work-1",
  },
  {
    company: "Pointbreak",
    title: "Full Stack Developer",
    start: "2025",
    end: "2026",
    link: "https://pointbreakapp.com",
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
