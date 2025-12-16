import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

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
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px",
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(96,165,250,0.22), transparent 55%), radial-gradient(circle at 80% 15%, rgba(14,165,233,0.28), transparent 48%), radial-gradient(circle at 80% 85%, rgba(129,140,248,0.3), transparent 52%), linear-gradient(135deg, #020617 0%, #0f172a 42%, #020b2b 100%)",
            color: "#f8fafc",
            fontFamily: "Geist, Inter, system-ui, -apple-system, sans-serif",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 22,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#c7d2fe",
            }}
          >
            <span>Christian B. Martinez</span>
            <span style={{ color: "#94a3b8", letterSpacing: "0.08em" }}>{route}</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <h1
              style={{
                fontSize: 68,
                lineHeight: 1.05,
                margin: 0,
                color: "#f1f5f9",
              }}
            >
              {title}
            </h1>
            {description ? (
              <p
                style={{
                  fontSize: 30,
                  lineHeight: 1.4,
                  margin: 0,
                  color: "#cbd5f5",
                }}
              >
                {description}
              </p>
            ) : null}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 22,
              color: "#94a3b8",
            }}
          >
            <span>Full Stack Engineer</span>
            <span>{url}</span>
          </div>
        </div>
      ),
      {
        ...OG_IMAGE_SIZES,
      }
    );
  } catch (error) {
    console.error("Failed to generate OG image", error);
    return new Response("Failed to generate the image", { status: 500 });
  }
}
