import { createOgImage, OG_CONTENT_TYPE, OG_IMAGE_SIZE } from "@/lib/og";
import { getOgBackground } from "@/lib/og";

export const size = OG_IMAGE_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const { image, credit } = await getOgBackground("blog");
  return createOgImage({
    title: "Latest from the CBM Blog",
    image,
    credit,
  });
}
