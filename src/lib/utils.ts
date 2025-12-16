import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Merge conditional class strings and resolve Tailwind conflicts in a single call.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Turn an arbitrary string into a URL-safe slug (lowercase, dashes, no symbols)
export function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/--+/g, "-");
}

// Obfuscate static email string from bots & mitigate spam
export function generateEmail() {
  const ascii = [
    104, 101, 108, 108, 111, 64, 99, 104, 114, 105, 115, 116, 105, 97, 110, 98,
    109, 97, 114, 116, 105, 110, 101, 122, 46, 99, 111, 109,
  ];

  return String.fromCharCode(...ascii);
}
