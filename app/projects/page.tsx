"use client";

import { useState } from "react";
import { Nav } from "@/components/Nav";
import { projects } from "@/lib/projects-data";

const disciplines = ["All", "Graphic Design", "UI/UX Design", "Motion Design", "Photography"];

type Project = typeof projects[0];

function MediaBlock({ project, className = "" }: { project: Project; className?: string }) {
  if (project.mediaType === "video") {
    return (
      <video
        className={className}
        src={project.mediaSrc}
        autoPlay
        muted
        loop
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    );
  }
  return (
    <div
      className={className}
      style={{
        width: "100%",
        height: "100%",
        background: project.mediaColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "13px",
        letterSpacing: "0.16em",
        textTransform: "uppercase" as const,
        color: "rgba(255,255,255,0.2)",
      }}>
        Cover image
      </span>
    </div>
  );
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const featuredProject = projects[0];
  const gridProjects = projects.slice(1).filter(p =>
    activeFilter === "All" ? true : p.discipline === activeFilter
  );
  const showFeatured = activeFilter === "All" || featuredProject.discipline === activeFilter;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400&display=swap');

        :root {
          --cream: #F5F2ED;
          --ink: #1A1814;
          --warm-gray: #8C8880;
          --accent: #C8593A;
          --border: #DDD9D3;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          background: var(--cream);
          color: var(--ink);
          font-family: 'DM Mono', monospace;
          overflow-x: hidden;
        }

        body::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 100;
          opacity: 0.5;
        }

        nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 50;
          padding: 28px 48px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--cream);
          border-bottom: 1px solid var(--border);
        }

        .nav-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 600;
          letter-spacing: 0.02em;
          color: var(--ink);
          text-decoration: none;
        }

        .nav-links {
          display: flex;
          gap: 40px;
          list-style: none;
        }

        .nav-links a {
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--warm-gray);
          text-decoration: none;
          transition: color 0.2s;
        }

        .nav-links a:hover, .nav-links a.active { color: var(--ink); }

        main { padding-top: 89px; }

        /* PAGE HEADER */
        .page-header {
          padding: 64px 48px 48px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          border-bottom: 1px solid var(--border);
        }

        .page-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(48px, 7vw, 96px);
          font-weight: 300;
          line-height: 0.9;
          letter-spacing: -0.02em;
        }

        .page-title em {
          font-style: italic;
          color: var(--accent);
        }

        .project-count {
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--warm-gray);
          padding-bottom: 8px;
        }

        /* FILTERS */
        .filters {
          padding: 24px 48px;
          display: flex;
          gap: 8px;
          border-bottom: 1px solid var(--border);
          overflow-x: auto;
        }

        .filter-btn {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 8px 20px;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--warm-gray);
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .filter-btn:hover { color: var(--ink); border-color: var(--ink); }
        .filter-btn.active {
          background: var(--ink);
          color: var(--cream);
          border-color: var(--ink);
        }

        /* FEATURED PROJECT */
        .featured {
          display: grid;
          grid-template-columns: 1fr 400px;
          border-bottom: 1px solid var(--border);
          min-height: 560px;
        }

        .featured-media {
          position: relative;
          overflow: hidden;
          border-right: 1px solid var(--border);
          background: var(--ink);
        }

        .featured-badge {
          position: absolute;
          top: 24px;
          left: 24px;
          z-index: 2;
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.6);
          background: rgba(0,0,0,0.3);
          padding: 6px 12px;
          backdrop-filter: blur(8px);
        }

        .featured-info {
          padding: 48px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .featured-top {}

        .featured-discipline {
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 16px;
        }

        .featured-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 52px;
          font-weight: 300;
          line-height: 1;
          letter-spacing: -0.01em;
          color: var(--ink);
          margin-bottom: 24px;
        }

        .featured-description {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          font-weight: 300;
          line-height: 1.6;
          color: var(--warm-gray);
        }

        .featured-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .featured-year {
          font-size: 11px;
          letter-spacing: 0.12em;
          color: var(--warm-gray);
        }

        .view-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--ink);
          text-decoration: none;
          border-bottom: 1px solid var(--ink);
          padding-bottom: 2px;
          transition: all 0.2s;
          background: none;
          border-top: none;
          border-left: none;
          border-right: none;
          cursor: pointer;
        }

        .view-btn:hover { color: var(--accent); border-color: var(--accent); }
        .view-btn-arrow { transition: transform 0.2s; }
        .view-btn:hover .view-btn-arrow { transform: translateX(4px); }

        /* PROJECT GRID */
        .grid-section {
          padding: 48px;
        }

        .grid-label {
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--warm-gray);
          margin-bottom: 32px;
        }

        .project-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--border);
        }

        .project-card {
          background: var(--cream);
          cursor: pointer;
          transition: background 0.2s;
          overflow: hidden;
        }

        .project-card:hover { background: #F0EDE7; }

        .project-card-media {
          height: 260px;
          overflow: hidden;
          position: relative;
        }

        .project-card-media-inner {
          width: 100%;
          height: 100%;
          transition: transform 0.5s ease;
        }

        .project-card:hover .project-card-media-inner {
          transform: scale(1.03);
        }

        .project-card-info {
          padding: 24px;
          border-top: 1px solid var(--border);
        }

        .project-card-discipline {
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 8px;
        }

        .project-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 300;
          line-height: 1.1;
          color: var(--ink);
          margin-bottom: 10px;
        }

        .project-card-description {
          font-family: 'Cormorant Garamond', serif;
          font-size: 15px;
          font-weight: 300;
          line-height: 1.5;
          color: var(--warm-gray);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .empty-state {
          grid-column: 1 / -1;
          padding: 80px;
          text-align: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          font-style: italic;
          color: var(--warm-gray);
        }

        .footer {
          padding: 32px 48px;
          border-top: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 48px;
        }

        .footer-copy {
          font-size: 11px;
          letter-spacing: 0.08em;
          color: var(--warm-gray);
        }

        .footer-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-size: 13px;
          font-style: italic;
          color: var(--warm-gray);
        }

        @media (max-width: 1024px) {
          .project-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          nav { padding: 20px 24px; }
          .page-header { padding: 40px 24px 32px; flex-direction: column; align-items: flex-start; gap: 16px; }
          .filters { padding: 16px 24px; }
          .featured { grid-template-columns: 1fr; }
          .featured-media { height: 320px; border-right: none; border-bottom: 1px solid var(--border); }
          .featured-info { padding: 32px 24px; }
          .grid-section { padding: 32px 24px; }
          .project-grid { grid-template-columns: 1fr; }
          .footer { padding: 24px; flex-direction: column; gap: 8px; text-align: center; }
        }
      `}</style>

      {/* NAV */}
      

// Then inside your JSX, replace <nav>...</nav> with:
<Nav activePage="home" />

      <main>
        {/* PAGE HEADER */}
        <div className="page-header">
          <h1 className="page-title">
            Selected<br /><em>Work</em>
          </h1>
          <span className="project-count">{projects.length} Projects</span>
        </div>

        {/* FILTERS */}
        <div className="filters">
          {disciplines.map(d => (
            <button
              key={d}
              className={`filter-btn ${activeFilter === d ? "active" : ""}`}
              onClick={() => setActiveFilter(d)}
            >
              {d}
            </button>
          ))}
        </div>

        {/* FEATURED PROJECT */}
        {showFeatured && (
          <div className="featured">
            <div className="featured-media">
              <span className="featured-badge">Featured Project</span>
              <MediaBlock project={featuredProject} />
            </div>
            <div className="featured-info">
              <div className="featured-top">
                <p className="featured-discipline">{featuredProject.discipline}</p>
                <h2 className="featured-title">{featuredProject.title}</h2>
                <p className="featured-description">{featuredProject.description}</p>
              </div>
              <div className="featured-bottom">
                <span className="featured-year">{featuredProject.year}</span>
                <a href={`/projects/${featuredProject.slug}`} className="view-btn">
                  View Project <span className="view-btn-arrow">→</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* PROJECT GRID */}
        <div className="grid-section">
          <p className="grid-label">
            {activeFilter === "All" ? "All Projects" : activeFilter} — {gridProjects.length} {gridProjects.length === 1 ? "piece" : "pieces"}
          </p>
          <div className="project-grid">
            {gridProjects.length > 0 ? gridProjects.map(project => (
              <a href={`/projects/${project.slug}`} style={{ textDecoration: "non"}}>
              <div
                key={project.id}
                className="project-card"
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="project-card-media">
                  <div className="project-card-media-inner">
                    <MediaBlock project={project} />
                  </div>
                </div>
                <div className="project-card-info">
                  <p className="project-card-discipline">{project.discipline}</p>
                  <h3 className="project-card-title">{project.title}</h3>
                  <p className="project-card-description">{project.description}</p>
                </div>
              </div>
              </a>
            )) : (
              <div className="empty-state">No projects in this discipline yet.</div>
            )}
          </div>
        </div>
      </main>

      <footer className="footer">
        <span className="footer-copy">© 2024 Kyle Littlestar. All rights reserved.</span>
        <span className="footer-tagline">Type enthusiast & adventurist</span>
      </footer>
    </>
  );
}
