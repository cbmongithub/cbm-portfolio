import { cache } from "react";
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

function parseFrontmatter(fileContent: string) {
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

function getMdxData(dir: string) {
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

export const getPosts = cache(() => {
  const posts = getMdxData(path.join(process.cwd(), "src", "content", "blog"));
  return posts;
});
