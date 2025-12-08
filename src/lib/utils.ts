import { ClassValue, clsx } from "clsx";
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
