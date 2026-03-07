import { ImageResponse } from "next/og";
import { getProjectBySlug, projects } from "@/lib/projects-data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          background: "#1A1814",
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
          <span style={{ fontSize: 24, color: "rgba(255,255,255,0.4)", letterSpacing: "0.12em" }}>KL</span>
          <span style={{ fontSize: 16, color: "#C8593A", letterSpacing: "0.16em" }}>
            {project?.discipline?.toUpperCase() || "WORK"}
          </span>
        </div>

        {/* Middle */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <span style={{ fontSize: 72, fontWeight: 300, color: "white", lineHeight: 0.9, letterSpacing: "-0.02em" }}>
            {project?.title || "Project"}
          </span>
        </div>

        {/* Bottom */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <span style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em" }}>
            Kyle Littlestar
          </span>
          <span style={{ fontSize: 16, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em" }}>
            {project?.year || "2024"}
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
