import { ImageResponse } from "next/og";

import { BASE_URL } from "@/lib/config/metadata";

export const OG_IMAGE_SIZE = { width: 1200, height: 630 };
export const OG_ALT_TEXT =
  "Open graph preview for Christian B. Martinez's portfolio";

type OgImageOptions = {
  title: string;
  subtitle?: string | null;
  route?: string | null;
};

const OG_BACKGROUND =
  "radial-gradient(circle at 20% 20%, rgba(96,165,250,0.22), transparent 55%), radial-gradient(circle at 80% 15%, rgba(14,165,233,0.28), transparent 48%), radial-gradient(circle at 80% 85%, rgba(129,140,248,0.3), transparent 52%), linear-gradient(135deg, #020617 0%, #0f172a 42%, #020b2b 100%)";

function clampText(value: string, maxLength: number) {
  const trimmed = value.trim();
  if (trimmed.length <= maxLength) return trimmed;
  return `${trimmed.slice(0, maxLength - 1)}…`;
}

function formatRoute(value?: string | null) {
  if (!value) return "/";
  const normalized = value.startsWith("/") ? value : `/${value}`;
  return normalized.replace(/\/+/g, "/");
}

// Generate a dynamic image url for OG images
export function generateOgImageUrl({ title, subtitle, route }: OgImageOptions) {
  const params = new URLSearchParams({ title });
  if (subtitle) params.set("subtitle", subtitle);
  if (route) params.set("route", route);
  return `${BASE_URL}/api/og?${params.toString()}`;
}

export async function createOgImage({
  title,
  subtitle,
  route,
}: OgImageOptions) {
  const safeTitle = clampText(title || "Christian B. Martinez", 90);
  const safeSubtitle = subtitle ? clampText(subtitle, 150) : null;
  const safeRoute = clampText(formatRoute(route), 42);

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
          backgroundImage: OG_BACKGROUND,
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
          <span style={{ color: "#94a3b8", letterSpacing: "0.08em" }}>
            {safeRoute}
          </span>
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
            {safeTitle}
          </h1>
          {safeSubtitle ? (
            <p
              style={{
                fontSize: 30,
                lineHeight: 1.4,
                margin: 0,
                color: "#cbd5f5",
              }}
            >
              {safeSubtitle}
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
          <span>christianbmartinez.com</span>
        </div>
      </div>
    ),
    {
      ...OG_IMAGE_SIZE,
    }
  );
}
