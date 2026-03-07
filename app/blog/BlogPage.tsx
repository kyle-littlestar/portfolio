"use client";

import { useState } from "react";
import { Nav } from "@/components/Nav";

type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
  coverImage: string;
  excerpt: string;
  readingTime: string;
};

export default function BlogPage({ posts }: { posts: Post[] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];
  const filtered = activeCategory === "All" ? posts : posts.filter((p) => p.category === activeCategory);

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

        main { padding-top: 89px; }

        .page-header {
          padding: 64px 48px 48px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          border-bottom: 1px solid var(--border);
        }

        .page-title {
          font-family: var(--font-cormorant), serif;
          font-size: clamp(48px, 7vw, 96px);
          font-weight: 300;
          line-height: 0.9;
          letter-spacing: -0.02em;
        }

        .page-title em {
          font-style: italic;
          color: var(--accent);
        }

        .post-count {
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--warm-gray);
          padding-bottom: 8px;
        }

        .filters {
          padding: 24px 48px;
          display: flex;
          gap: 8px;
          border-bottom: 1px solid var(--border);
          overflow-x: auto;
        }

        .filter-btn {
          font-family: var(--font-dm-mono), monospace;
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
        .filter-btn.active { background: var(--ink); color: var(--cream); border-color: var(--ink); }

        /* FEATURED POST */
        .featured-post {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-bottom: 1px solid var(--border);
          min-height: 480px;
          text-decoration: none;
          color: var(--ink);
          transition: background 0.2s;
        }

        .featured-post:hover { background: #F0EDE7; }

        .featured-cover {
          overflow: hidden;
          border-right: 1px solid var(--border);
          background: var(--ink);
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 400px;
        }

        .featured-cover img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .featured-post:hover .featured-cover img { transform: scale(1.03); }

        .cover-placeholder {
          width: 100%;
          height: 100%;
          min-height: 400px;
          background: var(--ink);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cover-placeholder-text {
          font-family: var(--font-cormorant), serif;
          font-size: 13px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.15);
        }

        .featured-info {
          padding: 48px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .featured-badge {
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--warm-gray);
          margin-bottom: 24px;
        }

        .post-category {
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 12px;
        }

        .featured-title {
          font-family: var(--font-cormorant), serif;
          font-size: 48px;
          font-weight: 300;
          line-height: 1.05;
          letter-spacing: -0.01em;
          margin-bottom: 20px;
        }

        .post-excerpt {
          font-family: var(--font-cormorant), serif;
          font-size: 20px;
          font-weight: 300;
          line-height: 1.6;
          color: var(--warm-gray);
          margin-bottom: 32px;
        }

        .post-meta {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .post-date {
          font-size: 11px;
          letter-spacing: 0.1em;
          color: var(--warm-gray);
        }

        .post-reading-time {
          font-size: 11px;
          letter-spacing: 0.1em;
          color: var(--warm-gray);
        }

        .read-more {
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--ink);
          border-bottom: 1px solid var(--ink);
          padding-bottom: 2px;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .featured-post:hover .read-more { color: var(--accent); border-color: var(--accent); }

        /* POST GRID */
        .posts-grid {
          padding: 48px;
        }

        .grid-label {
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--warm-gray);
          margin-bottom: 32px;
        }

        .posts-list {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .post-row {
          display: grid;
          grid-template-columns: 200px 1fr auto;
          gap: 48px;
          align-items: center;
          padding: 32px 0;
          border-top: 1px solid var(--border);
          text-decoration: none;
          color: var(--ink);
          transition: background 0.2s;
        }

        .post-row:last-child { border-bottom: 1px solid var(--border); }
        .post-row:hover { background: #F0EDE7; padding-left: 16px; padding-right: 16px; margin: 0 -16px; }

        .post-row-cover {
          width: 200px;
          height: 120px;
          overflow: hidden;
          background: var(--ink);
          flex-shrink: 0;
        }

        .post-row-cover img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .post-row:hover .post-row-cover img { transform: scale(1.05); }

        .post-row-cover-placeholder {
          width: 100%;
          height: 100%;
          background: var(--ink);
        }

        .post-row-info { flex: 1; }

        .post-row-title {
          font-family: var(--font-cormorant), serif;
          font-size: 28px;
          font-weight: 300;
          line-height: 1.2;
          margin-bottom: 8px;
          transition: color 0.2s;
        }

        .post-row:hover .post-row-title { color: var(--accent); }

        .post-row-excerpt {
          font-family: var(--font-cormorant), serif;
          font-size: 16px;
          font-weight: 300;
          color: var(--warm-gray);
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .post-row-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
          flex-shrink: 0;
        }

        .empty-state {
          padding: 80px;
          text-align: center;
          font-family: var(--font-cormorant), serif;
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

        .footer-copy { font-size: 11px; letter-spacing: 0.08em; color: var(--warm-gray); }
        .footer-tagline { font-family: var(--font-cormorant), serif; font-size: 13px; font-style: italic; color: var(--warm-gray); }

        @media (max-width: 768px) {
          .page-header { padding: 40px 24px 32px; flex-direction: column; align-items: flex-start; gap: 16px; }
          .filters { padding: 16px 24px; }
          .featured-post { grid-template-columns: 1fr; }
          .featured-cover { border-right: none; border-bottom: 1px solid var(--border); min-height: 280px; }
          .featured-info { padding: 32px 24px; }
          .posts-grid { padding: 32px 24px; }
          .post-row { grid-template-columns: 1fr; gap: 16px; }
          .post-row-cover { width: 100%; height: 200px; }
          .post-row-meta { align-items: flex-start; }
          .footer { padding: 24px; flex-direction: column; gap: 8px; text-align: center; }
        }
      `}</style>

      <Nav activePage="blog" />

      <main>
        <div className="page-header">
          <h1 className="page-title">
            The<br /><em>Journal</em>
          </h1>
          <span className="post-count">{posts.length} {posts.length === 1 ? "Post" : "Posts"}</span>
        </div>

        <div className="filters">
          {categories.map((c) => (
            <button
              key={c}
              className={`filter-btn ${activeCategory === c ? "active" : ""}`}
              onClick={() => setActiveCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {/* FEATURED POST */}
        {filtered.length > 0 && (
          <a href={`/blog/${filtered[0].slug}`} className="featured-post">
            <div className="featured-cover">
              {filtered[0].coverImage ? (
                <img src={filtered[0].coverImage} alt={filtered[0].title} />
              ) : (
                <div className="cover-placeholder">
                  <span className="cover-placeholder-text">Cover image</span>
                </div>
              )}
            </div>
            <div className="featured-info">
              <div>
                <p className="featured-badge">Latest Post</p>
                <p className="post-category">{filtered[0].category}</p>
                <h2 className="featured-title">{filtered[0].title}</h2>
                <p className="post-excerpt">{filtered[0].excerpt}</p>
              </div>
              <div>
                <div className="post-meta" style={{ marginBottom: "20px" }}>
                  <span className="post-date">{new Date(filtered[0].date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                  <span className="post-reading-time">{filtered[0].readingTime}</span>
                </div>
                <span className="read-more">Read Post →</span>
              </div>
            </div>
          </a>
        )}

        {/* POSTS LIST */}
        {filtered.length > 1 && (
          <div className="posts-grid">
            <p className="grid-label">All Posts — {filtered.length} {filtered.length === 1 ? "entry" : "entries"}</p>
            <div className="posts-list">
              {filtered.slice(1).map((post) => (
                <a key={post.slug} href={`/blog/${post.slug}`} className="post-row">
                  <div className="post-row-cover">
                    {post.coverImage ? (
                      <img src={post.coverImage} alt={post.title} />
                    ) : (
                      <div className="post-row-cover-placeholder" />
                    )}
                  </div>
                  <div className="post-row-info">
                    <p className="post-category">{post.category}</p>
                    <h3 className="post-row-title">{post.title}</h3>
                    <p className="post-row-excerpt">{post.excerpt}</p>
                  </div>
                  <div className="post-row-meta">
                    <span className="post-date">{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short" })}</span>
                    <span className="post-reading-time">{post.readingTime}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="empty-state">No posts in this category yet.</div>
        )}
      </main>

      <footer className="footer">
        <span className="footer-copy">© 2024 Kyle Littlestar. All rights reserved.</span>
        <span className="footer-tagline">Type enthusiast & adventurist</span>
      </footer>
    </>
  );
}
