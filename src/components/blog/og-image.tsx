import type { OgImageOptions } from "@/lib/config/metadata";

type OgImage = OgImageOptions & {
  url: string;
};

export function OgImage({ title, description, route, url }: OgImage) {
  return (
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
  );
}
