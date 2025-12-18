import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

import { OgImage } from "@/components/blog";

import {
  BASE_DESCRIPTION,
  BASE_TITLE,
  BASE_URL,
  OG_IMAGE_SIZES,
} from "@/lib/config/metadata";

function clampText(text: string, maxLength: number) {
  const trimmed = text.trim();
  if (trimmed.length <= maxLength) return trimmed;
  return `${trimmed.slice(0, maxLength - 1)}…`;
}

function formatRoute(route?: string | null) {
  if (!route) return "/";
  const normalized = route.startsWith("/") ? route : `/${route}`;
  return normalized.replace(/\/+/g, "/");
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const title = clampText(searchParams.get("title") ?? BASE_TITLE, 90);
    const description = clampText(
      searchParams.get("description") ?? BASE_DESCRIPTION,
      150
    );
    const route = clampText(formatRoute(searchParams.get("route")), 42);
    const url = BASE_URL.replace(/^https?:\/\//, "");

    return new ImageResponse(
      <OgImage title={title} description={description} route={route} url={url} />,
      {
        ...OG_IMAGE_SIZES,
      }
    );
  } catch (error) {
    console.error("Failed to generate OG image", error);
    return new Response("Failed to generate the image", { status: 500 });
  }
}
