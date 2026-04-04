"use client";

import { useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { getInProgressProjects } from "@/lib/projects-data";

const inProgressProjects = getInProgressProjects();
const DISCIPLINE_FILTERS = ["All", ...Array.from(new Set(inProgressProjects.map((p) => p.discipline)))];

export default function BuildingPage() {
  const [disciplineFilter, setDisciplineFilter] = useState<string>("All");

  const filtered = inProgressProjects.filter(
    (p) => disciplineFilter === "All" || p.discipline === disciplineFilter,
  );

  return (
    <>
      <style>{`
        main { padding-top: 76px; }

        .page-header {
          padding: 64px 48px 48px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          border-bottom: var(--border-w) solid var(--border);
        }

        .page-title {
          font-family: var(--font-display);
          font-size: clamp(48px, 7vw, 96px);
          font-weight: 800;
          line-height: 0.9;
          letter-spacing: -0.02em;
          text-transform: uppercase;
        }

        .page-title .accent { color: var(--accent); }

        .page-subtitle {
          font-family: var(--font-body);
          font-size: 13px;
          line-height: 1.6;
          color: var(--text-muted);
          max-width: 400px;
          margin-top: 16px;
        }

        .project-count {
          font-family: var(--font-body);
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
          padding-bottom: 8px;
        }

        .filters {
          padding: 24px 48px;
          display: flex;
          gap: 8px;
          border-bottom: var(--border-w) solid var(--border);
          overflow-x: auto;
          flex-wrap: wrap;
        }

        .filter-btn {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 8px 20px;
          border: var(--border-w) solid var(--border);
          background: transparent;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .filter-btn:hover { color: var(--text-primary); border-color: var(--text-primary); }

        .filter-btn.active {
          background: var(--text-primary);
          color: var(--bg);
          border-color: var(--text-primary);
        }

        .project-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        }

        .project-card {
          border-right: var(--border-w) solid var(--border);
          border-bottom: var(--border-w) solid var(--border);
          text-decoration: none;
          transition: background 0.2s;
        }

        .project-card:nth-child(2n) { border-right: none; }
        .project-card:hover { background: var(--bg-surface); }

        .project-card-media {
          height: 300px;
          overflow: hidden;
          position: relative;
          border-bottom: var(--border-w) solid var(--border);
        }

        .project-card-color {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .project-card-color span {
          font-family: var(--font-body);
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.12);
        }

        .project-card-phase {
          position: absolute;
          top: 12px;
          left: 12px;
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 4px 10px;
          border: var(--border-w) solid;
          color: var(--warning);
          border-color: var(--warning);
          background: rgba(196, 154, 60, 0.15);
        }

        .project-card-info { padding: 24px 28px; }

        .project-card-discipline {
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 8px;
        }

        .project-card-title {
          font-family: var(--font-display);
          font-size: 26px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 8px;
          line-height: 1.1;
        }

        .project-card-year {
          font-family: var(--font-body);
          font-size: 11px;
          color: var(--text-muted);
          letter-spacing: 0.1em;
          margin-bottom: 12px;
        }

        .project-card-desc {
          font-family: var(--font-body);
          font-size: 13px;
          line-height: 1.6;
          color: var(--text-muted);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .empty-state {
          grid-column: 1 / -1;
          padding: 80px;
          text-align: center;
          font-family: var(--font-display);
          font-size: 20px;
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .page-header { padding: 40px 20px 32px; flex-direction: column; align-items: flex-start; gap: 16px; }
          .filters { padding: 16px 20px; }
          .project-grid { grid-template-columns: 1fr; }
          .project-card { border-right: none; }
        }
      `}</style>

      <Nav activePage="building" />

      <main>
        <div className="page-header">
          <div>
            <h1 className="page-title">
              Currently<br /><span className="accent">Building</span>
            </h1>
            <p className="page-subtitle">
              Living documents — work in progress, open process, honest reflections.
            </p>
          </div>
          <span className="project-count">{inProgressProjects.length} Projects</span>
        </div>

        {DISCIPLINE_FILTERS.length > 2 && (
          <div className="filters">
            {DISCIPLINE_FILTERS.map((d) => (
              <button key={d} className={`filter-btn ${disciplineFilter === d ? "active" : ""}`} onClick={() => setDisciplineFilter(d)}>
                {d}
              </button>
            ))}
          </div>
        )}

        <div className="project-grid">
          {filtered.length > 0 ? filtered.map((project) => (
            <Link key={project.id} href={`/projects/${project.slug}`} className="project-card">
              <div className="project-card-media">
                <div className="project-card-color" style={{ background: project.mediaColor || "#1A1714" }}>
                  <span>Preview</span>
                </div>
                {project.currentPhase && (
                  <span className="project-card-phase">{project.currentPhase}</span>
                )}
              </div>
              <div className="project-card-info">
                <p className="project-card-discipline">{project.discipline}</p>
                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-card-year">{project.year}</p>
                <p className="project-card-desc">{project.description}</p>
              </div>
            </Link>
          )) : (
            <div className="empty-state">No projects match these filters.</div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
