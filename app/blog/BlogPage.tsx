"use client";

import { useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

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

        .post-count {
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
        .filter-btn.active { background: var(--text-primary); color: var(--bg); border-color: var(--text-primary); }

        /* FEATURED POST */
        .featured-post {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-bottom: var(--border-w) solid var(--border);
          min-height: 440px;
          text-decoration: none;
          color: var(--text-primary);
          transition: background 0.2s;
        }

        .featured-post:hover { background: var(--bg-surface); }

        .featured-cover {
          overflow: hidden;
          border-right: var(--border-w) solid var(--border);
          background: var(--bg-surface);
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 360px;
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
          min-height: 360px;
          background: var(--bg-surface);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cover-placeholder-text {
          font-family: var(--font-body);
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .featured-info {
          padding: 48px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .featured-badge {
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 24px;
        }

        .f-post-category {
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 12px;
        }

        .featured-title {
          font-family: var(--font-display);
          font-size: 40px;
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.01em;
          margin-bottom: 20px;
        }

        .post-excerpt {
          font-family: var(--font-body);
          font-size: 14px;
          line-height: 1.7;
          color: var(--text-secondary);
          margin-bottom: 32px;
        }

        .post-meta {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .post-date, .post-reading-time {
          font-family: var(--font-body);
          font-size: 11px;
          letter-spacing: 0.1em;
          color: var(--text-muted);
        }

        .read-more {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-primary);
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: color 0.2s;
        }

        .featured-post:hover .read-more { color: var(--accent); }

        /* POSTS LIST */
        .posts-grid { padding: 48px; }

        .grid-label {
          font-family: var(--font-body);
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 32px;
        }

        .post-row {
          display: grid;
          grid-template-columns: 200px 1fr auto;
          gap: 40px;
          align-items: center;
          padding: 28px 0;
          border-top: var(--border-w) solid var(--border);
          text-decoration: none;
          color: var(--text-primary);
          transition: all 0.2s;
        }

        .post-row:last-child { border-bottom: var(--border-w) solid var(--border); }
        .post-row:hover { padding-left: 16px; }

        .post-row-cover {
          width: 200px;
          height: 120px;
          overflow: hidden;
          background: var(--bg-surface);
          flex-shrink: 0;
        }

        .post-row-cover img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .post-row:hover .post-row-cover img { transform: scale(1.05); }

        .post-row-info { flex: 1; }

        .post-row-category {
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 6px;
        }

        .post-row-title {
          font-family: var(--font-display);
          font-size: 24px;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 8px;
          transition: color 0.2s;
        }

        .post-row:hover .post-row-title { color: var(--accent); }

        .post-row-excerpt {
          font-family: var(--font-body);
          font-size: 13px;
          color: var(--text-muted);
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
          font-family: var(--font-display);
          font-size: 20px;
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .page-header { padding: 40px 20px 32px; flex-direction: column; align-items: flex-start; gap: 16px; }
          .filters { padding: 16px 20px; }
          .featured-post { grid-template-columns: 1fr; }
          .featured-cover { border-right: none; border-bottom: var(--border-w) solid var(--border); min-height: 240px; }
          .featured-info { padding: 32px 20px; }
          .posts-grid { padding: 32px 20px; }
          .post-row { grid-template-columns: 1fr; gap: 16px; }
          .post-row-cover { width: 100%; height: 200px; }
          .post-row-meta { align-items: flex-start; }
        }
      `}</style>

      <Nav activePage="journal" />

      <main>
        <div className="page-header">
          <h1 className="page-title">
            The<br /><span className="accent">Journal</span>
          </h1>
          <span className="post-count">{posts.length} {posts.length === 1 ? "Post" : "Posts"}</span>
        </div>

        <div className="filters">
          {categories.map((c) => (
            <button key={c} className={`filter-btn ${activeCategory === c ? "active" : ""}`} onClick={() => setActiveCategory(c)}>
              {c}
            </button>
          ))}
        </div>

        {filtered.length > 0 && (
          <Link href={`/blog/${filtered[0].slug}`} className="featured-post">
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
                <p className="f-post-category">{filtered[0].category}</p>
                <h2 className="featured-title">{filtered[0].title}</h2>
                <p className="post-excerpt">{filtered[0].excerpt}</p>
              </div>
              <div>
                <div className="post-meta" style={{ marginBottom: "20px" }}>
                  <span className="post-date">{new Date(filtered[0].date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                  <span className="post-reading-time">{filtered[0].readingTime}</span>
                </div>
                <span className="read-more">Read Post &rarr;</span>
              </div>
            </div>
          </Link>
        )}

        {filtered.length > 1 && (
          <div className="posts-grid">
            <p className="grid-label">All Posts &mdash; {filtered.length} {filtered.length === 1 ? "entry" : "entries"}</p>
            <div>
              {filtered.slice(1).map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="post-row">
                  <div className="post-row-cover">
                    {post.coverImage ? (
                      <img src={post.coverImage} alt={post.title} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", background: "var(--bg-surface)" }} />
                    )}
                  </div>
                  <div className="post-row-info">
                    <p className="post-row-category">{post.category}</p>
                    <h3 className="post-row-title">{post.title}</h3>
                    <p className="post-row-excerpt">{post.excerpt}</p>
                  </div>
                  <div className="post-row-meta">
                    <span className="post-date">{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short" })}</span>
                    <span className="post-reading-time">{post.readingTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="empty-state">No posts in this category yet.</div>
        )}
      </main>

      <Footer />
    </>
  );
}
