import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Merge conditional class strings and resolve Tailwind conflicts in a single call.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
