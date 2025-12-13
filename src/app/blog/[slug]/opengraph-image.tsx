import { createOgImage, getOgBackground, OG_CONTENT_TYPE, OG_IMAGE_SIZE } from "@/lib/og";
import { getPosts } from "@/lib/posts";

export const size = OG_IMAGE_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

type ImageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: ImageProps) {
  const { slug } = await params;
  const titleFromSlug = slug.replace(/-/g, " ");
  const posts = await getPosts();
  const post = posts.find((post) => post.slug === slug);
  const title = post?.title ?? titleFromSlug;

  const { image, credit } = await getOgBackground(slug);

  return createOgImage({
    title,
    image,
    credit,
  });
}
