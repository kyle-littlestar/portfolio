"use client";

import { Nav } from "@/components/Nav";
import { projects, getProjectBySlug, getAdjacentProjects } from "@/lib/projects-data";
import React, { useEffect, useState } from "react";



function GalleryMedia({ item }: { item: any }) {
  if (item.type === "video") {
    return (
      <video
        src={item.src}
        autoPlay
        muted
        loop
        playsInline
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
    );
  }
  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: item.color || "#1A1814",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <span style={{
        fontFamily: "var(--font-cormorant), serif",
        fontSize: "12px",
        letterSpacing: "0.14em",
        textTransform: "uppercase" as const,
        color: "rgba(255,255,255,0.15)",
      }}>Image</span>
    </div>
  );
}

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const project = getProjectBySlug(slug);
  const { prev, next } = getAdjacentProjects(slug);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <>
        <Nav />
        <main style={{ paddingTop: "89px", minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "24px", color: "#6B6760" }}>Project not found.</p>
        </main>
      </>
    );
  }

  const paragraphs = project.overview.split("\n\n");

  return (
    <>
      <style>{`

        :root {
          --cream: #F5F2ED;
          --ink: #1A1814;
          --warm-gray: #6B6760;
          --accent: #C8593A;
          --border: #DDD9D3;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          background: var(--cream);
          color: var(--ink);
          font-family: var(--font-dm-mono), monospace;
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

        .fade-up {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .loaded .fade-up { opacity: 1; transform: translateY(0); }
        .delay-1 { transition-delay: 0.1s; }
        .delay-2 { transition-delay: 0.2s; }
        .delay-3 { transition-delay: 0.3s; }
        .delay-4 { transition-delay: 0.4s; }

        main { padding-top: 89px; }

        /* HERO */
        .project-hero {
          height: 70vh;
          min-height: 480px;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid var(--border);
        }

        .project-hero-media {
          width: 100%;
          height: 100%;
        }

        .project-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(26,24,20,0.7) 0%, rgba(26,24,20,0.1) 60%, transparent 100%);
        }

        .project-hero-info {
          position: absolute;
          bottom: 48px;
          left: 48px;
          right: 48px;
        }

        .project-discipline {
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 12px;
        }

        .project-title {
          font-family: var(--font-cormorant), serif;
          font-size: clamp(48px, 7vw, 96px);
          font-weight: 300;
          line-height: 0.92;
          letter-spacing: -0.02em;
          color: white;
          margin-bottom: 16px;
        }

        .project-year {
          font-size: 11px;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.5);
        }

        /* CONTENT */
        .project-content {
          display: grid;
          grid-template-columns: 1fr 320px;
          border-bottom: 1px solid var(--border);
        }

        .project-overview {
          padding: 64px 48px;
          border-right: 1px solid var(--border);
        }

        .section-eyebrow {
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--warm-gray);
          margin-bottom: 32px;
        }

        .overview-text {
          font-family: var(--font-cormorant), serif;
          font-size: 24px;
          font-weight: 300;
          line-height: 1.65;
          color: var(--ink);
        }

        .overview-text p + p {
          margin-top: 24px;
        }

        .project-sidebar {
          padding: 64px 40px;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .sidebar-block {}

        .sidebar-block-label {
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--warm-gray);
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border);
        }

        .sidebar-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .sidebar-list li {
          font-family: var(--font-cormorant), serif;
          font-size: 18px;
          font-weight: 300;
          color: var(--ink);
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .sidebar-list li::before {
          content: '';
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--accent);
          flex-shrink: 0;
        }

        /* GALLERY */
        .gallery-section {
          padding: 64px 48px;
          border-bottom: 1px solid var(--border);
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
          margin-top: 32px;
        }

        .gallery-item {
          position: relative;
          overflow: hidden;
        }

        .gallery-item.full {
          grid-column: 1 / -1;
        }

        .gallery-item.half {
          grid-column: span 1;
        }

        .gallery-media {
          width: 100%;
          aspect-ratio: 16/9;
          overflow: hidden;
        }

        .gallery-item.full .gallery-media {
          aspect-ratio: 21/9;
        }

        .gallery-caption {
          padding: 14px 0;
          font-size: 11px;
          letter-spacing: 0.08em;
          color: var(--warm-gray);
        }

        /* NEXT / PREV */
        .project-nav {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        .project-nav-item {
          padding: 48px;
          text-decoration: none;
          color: var(--ink);
          border-right: 1px solid var(--border);
          transition: background 0.2s;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .project-nav-item:last-child { border-right: none; }
        .project-nav-item:hover { background: #F0EDE7; }

        .project-nav-item.next { text-align: right; }

        .project-nav-label {
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--warm-gray);
        }

        .project-nav-title {
          font-family: var(--font-cormorant), serif;
          font-size: 32px;
          font-weight: 300;
          line-height: 1.1;
        }

        .project-nav-discipline {
          font-size: 11px;
          letter-spacing: 0.1em;
          color: var(--accent);
          text-transform: uppercase;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--warm-gray);
          text-decoration: none;
          padding: 24px 48px;
          border-bottom: 1px solid var(--border);
          transition: color 0.2s;
        }

        .back-link:hover { color: var(--ink); }

        .footer {
          padding: 32px 48px;
          border-top: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-copy {
          font-size: 11px;
          letter-spacing: 0.08em;
          color: var(--warm-gray);
        }

        .footer-tagline {
          font-family: var(--font-cormorant), serif;
          font-size: 13px;
          font-style: italic;
          color: var(--warm-gray);
        }

        @media (max-width: 768px) {
          .project-hero-info { bottom: 32px; left: 24px; right: 24px; }
          .project-content { grid-template-columns: 1fr; }
          .project-overview { padding: 40px 24px; border-right: none; border-bottom: 1px solid var(--border); }
          .project-sidebar { padding: 40px 24px; }
          .gallery-section { padding: 40px 24px; }
          .gallery-grid { grid-template-columns: 1fr; }
          .gallery-item.half { grid-column: 1 / -1; }
          .gallery-item.full .gallery-media { aspect-ratio: 16/9; }
          .project-nav { grid-template-columns: 1fr; }
          .project-nav-item { padding: 32px 24px; border-right: none; border-bottom: 1px solid var(--border); }
          .project-nav-item.next { text-align: left; }
          .back-link { padding: 20px 24px; }
          .footer { padding: 24px; flex-direction: column; gap: 8px; text-align: center; }
        }
      `}</style>

      <Nav activePage="projects" />

      <div className={loaded ? "loaded" : ""}>
        <main>
          {/* BACK LINK */}
          <a href="/projects" className="back-link fade-up">
            ← All Projects
          </a>

          {/* HERO */}
          <div className="project-hero">
            <div className="project-hero-media">
              {project.mediaType === "video" ? (
                <video
                  src={project.mediaSrc}
                  autoPlay muted loop playsInline
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <div style={{ width: "100%", height: "100%", background: project.mediaColor || "#1A1814" }} />
              )}
            </div>
            <div className="project-hero-overlay" />
            <div className="project-hero-info">
              <p className="project-discipline fade-up delay-1">{project.discipline}</p>
              <h1 className="project-title fade-up delay-2">{project.title}</h1>
              <p className="project-year fade-up delay-3">{project.year}</p>
            </div>
          </div>

          {/* OVERVIEW + SIDEBAR */}
          <div className="project-content">
            <div className="project-overview fade-up delay-1">
              <p className="section-eyebrow">Overview</p>
              <div className="overview-text">
                {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
            <div className="project-sidebar fade-up delay-2">
              <div className="sidebar-block">
                <p className="sidebar-block-label">Role</p>
                <ul className="sidebar-list">
                  {project.role.map(r => <li key={r}>{r}</li>)}
                </ul>
              </div>
              <div className="sidebar-block">
                <p className="sidebar-block-label">Deliverables</p>
                <ul className="sidebar-list">
                  {project.deliverables.map(d => <li key={d}>{d}</li>)}
                </ul>
              </div>
            </div>
          </div>

          {/* GALLERY */}
          {project.gallery.length > 0 && (
            <div className="gallery-section">
              <p className="section-eyebrow">Gallery</p>
              <div className="gallery-grid">
                {project.gallery.map((item, i) => (
                  <div key={i} className={`gallery-item ${item.span || "full"}`}>
                    <div className="gallery-media">
                      <GalleryMedia item={item} />
                    </div>
                    {item.caption && <p className="gallery-caption">{item.caption}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PREV / NEXT */}
          <div className="project-nav">
            {prev ? (
              <a href={`/projects/${prev.slug}`} className="project-nav-item prev">
                <span className="project-nav-label">← Previous</span>
                <span className="project-nav-title">{prev.title}</span>
                <span className="project-nav-discipline">{prev.discipline}</span>
              </a>
            ) : <div />}
            {next ? (
              <a href={`/projects/${next.slug}`} className="project-nav-item next">
                <span className="project-nav-label">Next →</span>
                <span className="project-nav-title">{next.title}</span>
                <span className="project-nav-discipline">{next.discipline}</span>
              </a>
            ) : <div />}
          </div>
        </main>

        <footer className="footer">
          <span className="footer-copy">© 2024 Kyle Littlestar. All rights reserved.</span>
          <span className="footer-tagline">Type enthusiast & adventurist</span>
        </footer>
      </div>
    </>
  );
}
