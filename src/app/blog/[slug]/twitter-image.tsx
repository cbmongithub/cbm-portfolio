import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Placeholder scaffold to be customized later (title/slug-aware, branding, etc.)
export default async function Image() {
  const logoData = await readFile(join(process.cwd(), "public", "apple-touch-icon.png"));
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f172a",
          color: "#e2e8f0",
          fontSize: 48,
          fontWeight: 700,
        }}
      >
        <img
          src={logoSrc}
          height="160"
          alt="Twitter image placeholder for blog"
          style={{ marginRight: 32 }}
        />
        <span>Blog post preview (configure later)</span>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
