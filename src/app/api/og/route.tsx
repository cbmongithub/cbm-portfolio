import type { NextRequest } from "next/server";

import { createOgImage } from "@/lib/og";

export const runtime = "edge";

const DEFAULT_TITLE = "Christian B. Martinez";
const DEFAULT_SUBTITLE = "Full Stack Engineer crafting modern web experiences.";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const title = searchParams.get("title") ?? DEFAULT_TITLE;
    const subtitle = searchParams.get("subtitle") ?? DEFAULT_SUBTITLE;
    const route = searchParams.get("route");

    return createOgImage({
      title,
      subtitle,
      route,
    });
  } catch (error) {
    console.error("Failed to generate OG image", error);
    return new Response("Failed to generate the image", { status: 500 });
  }
}
