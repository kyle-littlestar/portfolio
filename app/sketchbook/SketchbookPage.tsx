"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import type { SketchbookEntry } from "@/lib/sketchbook";

export default function SketchbookPage({ entries }: { entries: SketchbookEntry[] }) {
  const [disciplineFilter, setDisciplineFilter] = useState("All");
  const [selected, setSelected] = useState<SketchbookEntry | null>(null);

  const disciplines = ["All", ...Array.from(new Set(entries.map((e) => e.discipline)))];
  const filtered = disciplineFilter === "All" ? entries : entries.filter((e) => e.discipline === disciplineFilter);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [selected]);

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

        .entry-count {
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

        .sketch-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }

        .sketch-card {
          border-right: var(--border-w) solid var(--border);
          border-bottom: var(--border-w) solid var(--border);
          text-align: left;
          background: transparent;
          padding: 0;
          cursor: pointer;
          transition: background 0.2s;
          display: block;
          width: 100%;
        }

        .sketch-card:nth-child(4n) { border-right: none; }
        .sketch-card:hover { background: var(--bg-surface); }

        .sketch-card-media {
          position: relative;
          height: 220px;
          overflow: hidden;
          background: var(--bg-surface);
        }

        .sketch-card-media img {
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .sketch-card:hover .sketch-card-media img { transform: scale(1.04); }

        .sketch-card-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sketch-card-placeholder span {
          font-family: var(--font-body);
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .sketch-card-info { padding: 20px 24px; }

        .sketch-card-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .sketch-card-discipline {
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent);
        }

        .sketch-card-date {
          font-family: var(--font-body);
          font-size: 10px;
          letter-spacing: 0.08em;
          color: var(--text-muted);
        }

        .sketch-card-title {
          font-family: var(--font-display);
          font-size: 17px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 8px;
          line-height: 1.2;
        }

        .sketch-card-takeaway {
          font-family: var(--font-body);
          font-size: 13px;
          line-height: 1.5;
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

        /* LIGHTBOX */
        .lightbox-overlay {
          position: fixed;
          inset: 0;
          z-index: 300;
          background: rgba(12, 10, 9, 0.9);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px;
        }

        .lightbox-box {
          background: var(--bg);
          border: var(--border-w) solid var(--border-strong);
          max-width: 720px;
          width: 100%;
          max-height: 100%;
          overflow-y: auto;
        }

        .lightbox-media {
          position: relative;
          width: 100%;
          height: 55vh;
          overflow: hidden;
          background: var(--bg-surface);
          border-bottom: var(--border-w) solid var(--border);
        }

        .lightbox-media img {
          object-fit: contain;
        }

        .lightbox-body { padding: 32px 40px 40px; position: relative; }

        .lightbox-close {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg);
          border: var(--border-w) solid var(--border);
          color: var(--text-primary);
          font-family: var(--font-body);
          font-size: 16px;
          cursor: pointer;
          z-index: 1;
        }

        .lightbox-close:hover { border-color: var(--accent); color: var(--accent); }

        .lightbox-meta {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
        }

        .lightbox-title {
          font-family: var(--font-display);
          font-size: 28px;
          font-weight: 800;
          line-height: 1.1;
          color: var(--text-primary);
          margin-bottom: 20px;
        }

        .lightbox-takeaway {
          font-family: var(--font-body);
          font-size: 15px;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        .lightbox-note {
          font-family: var(--font-body);
          font-size: 14px;
          line-height: 1.7;
          color: var(--text-muted);
          margin-top: 20px;
          padding-top: 20px;
          border-top: var(--border-w) solid var(--border);
          white-space: pre-wrap;
        }

        @media (max-width: 1024px) {
          .sketch-grid { grid-template-columns: repeat(2, 1fr); }
          .sketch-card:nth-child(4n) { border-right: var(--border-w) solid var(--border); }
          .sketch-card:nth-child(2n) { border-right: none; }
        }

        @media (max-width: 768px) {
          .page-header { padding: 40px 20px 32px; flex-direction: column; align-items: flex-start; gap: 16px; }
          .filters { padding: 16px 20px; }
          .sketch-grid { grid-template-columns: 1fr; }
          .sketch-card, .sketch-card:nth-child(2n), .sketch-card:nth-child(4n) { border-right: none; }
          .lightbox-overlay { padding: 20px; }
          .lightbox-body { padding: 24px 24px 32px; }
        }
      `}</style>

      <Nav activePage="sketchbook" />

      <main>
        <div className="page-header">
          <div>
            <h1 className="page-title">
              Sketch<span className="accent">book</span>
            </h1>
            <p className="page-subtitle">
              Daily design exercises — quick, unpolished, and honest about it. The practice behind the finished work.
            </p>
          </div>
          <span className="entry-count">{entries.length} {entries.length === 1 ? "Entry" : "Entries"}</span>
        </div>

        {disciplines.length > 2 && (
          <div className="filters">
            {disciplines.map((d) => (
              <button key={d} className={`filter-btn ${disciplineFilter === d ? "active" : ""}`} onClick={() => setDisciplineFilter(d)}>
                {d}
              </button>
            ))}
          </div>
        )}

        <div className="sketch-grid">
          {filtered.length > 0 ? filtered.map((entry) => (
            <button key={entry.slug} className="sketch-card" onClick={() => setSelected(entry)}>
              <div className="sketch-card-media">
                {entry.image ? (
                  <Image
                    src={entry.image}
                    alt={entry.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  <div className="sketch-card-placeholder">
                    <span>Preview</span>
                  </div>
                )}
              </div>
              <div className="sketch-card-info">
                <div className="sketch-card-meta">
                  <span className="sketch-card-discipline">{entry.discipline}</span>
                  <span className="sketch-card-date">
                    {new Date(entry.date).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" })}
                  </span>
                </div>
                <h3 className="sketch-card-title">{entry.title}</h3>
                <p className="sketch-card-takeaway">{entry.takeaway}</p>
              </div>
            </button>
          )) : (
            <div className="empty-state">
              First sketch drops soon — check back shortly.
            </div>
          )}
        </div>
      </main>

      <Footer />

      {selected && (
        <div className="lightbox-overlay" onClick={() => setSelected(null)}>
          <div className="lightbox-box" onClick={(e) => e.stopPropagation()}>
            {selected.image && (
              <div className="lightbox-media">
                <Image src={selected.image} alt={selected.title} fill sizes="(max-width: 720px) 100vw, 720px" />
              </div>
            )}
            <div className="lightbox-body">
              <button className="lightbox-close" onClick={() => setSelected(null)} aria-label="Close">✕</button>
              <div className="lightbox-meta">
                <span className="sketch-card-discipline">{selected.discipline}</span>
                <span className="sketch-card-date">
                  {new Date(selected.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })}
                </span>
              </div>
              <h2 className="lightbox-title">{selected.title}</h2>
              <p className="lightbox-takeaway">{selected.takeaway}</p>
              {selected.note && <p className="lightbox-note">{selected.note}</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
