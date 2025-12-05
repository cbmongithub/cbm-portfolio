import fs from "node:fs";
import path from "node:path";

type PostMetadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image: string;
};

const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
const quotesRegex = /^['"](.*)['"]$/;

// Parse a raw MDX file: extract YAML-like frontmatter and return metadata + content
export function parseFrontmatter(fileContent: string) {
  const match = frontmatterRegex.exec(fileContent);
  const frontMatterBlock = match?.[1];
  const content = fileContent.replace(frontmatterRegex, "").trim();
  const frontMatterLines = frontMatterBlock?.trim().split("\n") || [];
  const metadata: Partial<PostMetadata> = {};

  for (const line of frontMatterLines) {
    const [key, ...valueArr] = line.split(": ");
    let value = valueArr.join(": ").trim();
    value = value.replace(quotesRegex, "$1");
    metadata[key.trim() as keyof PostMetadata] = value;
  }

  return { metadata: metadata as PostMetadata, content };
}

// Read all MDX files in a directory and return slug + metadata + content
function getMdxData(dir: string) {
  if (!fs.existsSync(dir)) return [];

  const mdxFiles = fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");

  return mdxFiles.map((file) => {
    const { metadata, content } = parseFrontmatter(
      fs.readFileSync(path.join(dir, file), "utf-8")
    );
    const slug = path.basename(file, path.extname(file));
    return {
      metadata,
      slug,
      content,
    };
  });
}

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "blog");

// Return all blog posts from the content directory
export function getPosts() {
  return getMdxData(CONTENT_DIR);
}

// Read a single post by slug; returns null if the file doesn't exist
export function getPostBySlug(slug: string) {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { metadata, content } = parseFrontmatter(raw);
  return { slug, metadata, content };
}
