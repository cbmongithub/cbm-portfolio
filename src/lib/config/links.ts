// Obfuscate static email string from bots & mitigate spam
export const EMAIL_LINK = () => {
  const ascii = [
    104, 101, 108, 108, 111, 64, 99, 104, 114, 105, 115, 116, 105, 97, 110, 98, 109, 97,
    114, 116, 105, 110, 101, 122, 46, 99, 111, 109,
  ];

  return String.fromCharCode(...ascii);
};

type Links = {
  link: string;
  label: string;
};

export const NAV_LINKS: Links[] = [
  {
    link: "/",
    label: "home",
  },
  {
    link: "/blog",
    label: "blog",
  },
];

export const SOCIAL_LINKS: Links[] = [
  {
    label: "Github",
    link: "https://github.com/cbmongithub",
  },
  {
    label: "Twitter",
    link: "https://twitter.com/cbmonx",
  },
  {
    label: "LinkedIn",
    link: "https://www.linkedin.com/in/cbmonlinkedn",
  },
];
