import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Placeholder scaffold to be customized later (title/slug-aware, branding, etc.)
export default async function Image() {
  const logoData = await readFile(join(process.cwd(), "public", "apple-touch-icon.png"));
  const logoSrc = Uint8Array.from(logoData).buffer;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* @ts-expect-error Satori accepts ArrayBuffer/typed arrays for <img src> at runtime */}
        <img src={logoSrc} height="100" alt="OG Image for blog (dynamic)" />
      </div>
    )
  );
}
