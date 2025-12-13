import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const OG_IMAGE_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

// Fallack to a gradient when Pexels isn't available or fails.
const FALLBACK_GRADIENT =
  "radial-gradient(circle at 18% 18%, rgba(255,255,255,0.08), transparent 35%), radial-gradient(circle at 78% 12%, rgba(90,160,255,0.16), transparent 40%), linear-gradient(135deg, #0f172a 0%, #0b1222 100%)";

type OgBackground = { image: string; credit?: string };

type PexelsResponse = {
  photos?: Array<{
    src?: { landscape?: string; large?: string };
    photographer?: string;
    photographer_url?: string;
    url?: string;
  }>;
};

// Fetch a single Pexels image for a query (or fall back to a gradient) and return it with photographer credits.
export async function getOgBackground(query: string): Promise<OgBackground> {
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) return { image: FALLBACK_GRADIENT };

  // Pull a single landscape photo for the query; cache to avoid rate limits.
  const res = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(
      query
    )}&per_page=1&orientation=landscape`,
    {
      headers: { Authorization: apiKey },
      cache: "force-cache",
      next: { revalidate: 60 * 60 * 168 }, // 1 week
    }
  );

  if (!res.ok) return { image: FALLBACK_GRADIENT };

  const data = (await res.json()) as PexelsResponse;

  const photo = data.photos?.[0];
  const image = photo?.src?.landscape || photo?.src?.large;
  if (!image) return { image: FALLBACK_GRADIENT };

  const creditName = photo?.photographer;
  const creditLink = photo?.photographer_url || photo?.url;
  const credit = creditName
    ? `Photo by ${creditName}${creditLink ? " on Pexels" : ""}`
    : "Photo via Pexels";

  return { image, credit };
}

type OgImageProps = {
  title: string;
  image: string;
  credit?: string;
};

// Build and return an ImageResponse for OG/social cards, layering gradients and a logo over the Pexels image.
export async function createOgImage({ title, image, credit }: OgImageProps) {
  // Layer gradients over the fetched image to keep text legible.
  const baseLayer = image.startsWith("http") ? `url(${image})` : image;
  const logoData = await readFile(join(process.cwd(), "public", "apple-touch-icon.png"));
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  const backgroundImage = [
    "radial-gradient(circle at center, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.4) 45%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.08) 100%)",
    "linear-gradient(120deg, rgba(6,7,12,0.72), rgba(7,10,18,0.82))",
    baseLayer,
  ].join(", ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "48px 56px",
          backgroundImage,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "#e5e7eb",
          fontFamily: "Inter, system-ui, -apple-system, sans-serif",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 22,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#a5b4fc",
          }}
        >
          {logoSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoSrc}
              alt="Logo"
              width={56}
              height={56}
              style={{ borderRadius: 12 }}
            />
          ) : null}
          <span>CBM / Blog</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <h1
            style={{
              fontSize: 52,
              lineHeight: 1.08,
              fontWeight: 750,
              color: "#f8fafc",
              maxWidth: 920,
              textTransform: "capitalize",
            }}
          >
            {title}
          </h1>
          {credit ? <p style={{ fontSize: 16, color: "#cbd5e1" }}>{credit}</p> : null}
        </div>
      </div>
    ),
    OG_IMAGE_SIZE
  );
}
