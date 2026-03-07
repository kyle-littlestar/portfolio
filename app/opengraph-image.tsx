import { ImageResponse } from "next/og";

export const alt = "Kyle Littlestar — Creative Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#F5F2ED",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
        }}
      >
        {/* Top */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <span style={{ fontSize: 24, color: "#8C8880", letterSpacing: "0.12em" }}>KL</span>
          <span style={{ fontSize: 16, color: "#8C8880", letterSpacing: "0.12em" }}>PORTFOLIO 2024</span>
        </div>

        {/* Middle */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <span style={{ fontSize: 16, color: "#C8593A", letterSpacing: "0.18em" }}>CREATIVE DESIGNER</span>
          <span style={{ fontSize: 96, fontWeight: 300, color: "#1A1814", lineHeight: 0.9, letterSpacing: "-0.02em" }}>
            Kyle
          </span>
          <span style={{ fontSize: 96, fontWeight: 300, color: "#C8593A", lineHeight: 0.9, letterSpacing: "-0.02em", fontStyle: "italic" }}>
            Littlestar
          </span>
        </div>

        {/* Bottom */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <span style={{ fontSize: 16, color: "#8C8880", letterSpacing: "0.08em" }}>
            Graphic · Motion · UI/UX · Photography
          </span>
          <span style={{ fontSize: 16, color: "#8C8880", fontStyle: "italic" }}>
            Type enthusiast & adventurist
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
