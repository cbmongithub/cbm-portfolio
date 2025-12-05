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
