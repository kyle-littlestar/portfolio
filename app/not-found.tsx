"use client";

import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <style>{`
        main {
          padding-top: 76px;
          min-height: calc(100vh - 76px);
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-bottom: var(--border-w) solid var(--border);
        }

        .not-found-left {
          padding: 80px 48px;
          border-right: var(--border-w) solid var(--border);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .not-found-code {
          font-family: var(--font-display);
          font-size: clamp(120px, 20vw, 240px);
          font-weight: 800;
          line-height: 0.85;
          letter-spacing: -0.04em;
          text-transform: uppercase;
          color: var(--border-strong);
        }

        .not-found-bottom {}

        .not-found-label {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 16px;
        }

        .not-found-heading {
          font-family: var(--font-display);
          font-size: clamp(32px, 4vw, 52px);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          line-height: 0.95;
          color: var(--text-primary);
          margin-bottom: 20px;
        }

        .not-found-heading .accent { color: var(--accent); }

        .not-found-sub {
          font-family: var(--font-body);
          font-size: 14px;
          line-height: 1.7;
          color: var(--text-secondary);
          max-width: 420px;
          margin-bottom: 40px;
        }

        .not-found-links {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .not-found-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 14px 32px;
          text-decoration: none;
          transition: all 0.2s;
          border: var(--border-w-thick) solid;
        }

        .not-found-btn.primary {
          background: var(--accent-bg);
          border-color: var(--accent-bg);
          color: var(--text-primary);
        }

        .not-found-btn.primary:hover {
          background: var(--accent-bg-hover);
          border-color: var(--accent-bg-hover);
        }

        .not-found-btn.secondary {
          background: transparent;
          border-color: var(--border-strong);
          color: var(--text-muted);
        }

        .not-found-btn.secondary:hover {
          border-color: var(--text-primary);
          color: var(--text-primary);
        }

        .not-found-right {
          padding: 80px 48px;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .not-found-nav-label {
          font-family: var(--font-body);
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 32px;
        }

        .not-found-nav-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 0;
          border-top: var(--border-w) solid var(--border);
          text-decoration: none;
          transition: all 0.2s;
          color: var(--text-primary);
        }

        .not-found-nav-item:last-child { border-bottom: var(--border-w) solid var(--border); }
        .not-found-nav-item:hover { padding-left: 12px; color: var(--accent); }

        .not-found-nav-name {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: -0.01em;
        }

        .not-found-nav-arrow {
          font-size: 18px;
          transition: transform 0.2s;
        }

        .not-found-nav-item:hover .not-found-nav-arrow { transform: translateX(4px); }

        @media (max-width: 768px) {
          main { grid-template-columns: 1fr; }
          .not-found-left { padding: 48px 20px; border-right: none; border-bottom: var(--border-w) solid var(--border); }
          .not-found-right { padding: 40px 20px; }
          .not-found-code { font-size: clamp(100px, 30vw, 160px); }
        }
      `}</style>

      <Nav />

      <main>
        <div className="not-found-left">
          <div className="not-found-code">404</div>
          <div className="not-found-bottom">
            <p className="not-found-label">Page not found</p>
            <h1 className="not-found-heading">
              Lost in the <span className="accent">Void</span>
            </h1>
            <p className="not-found-sub">
              This page doesn&apos;t exist — or it moved without leaving a forwarding address. Head back somewhere familiar.
            </p>
            <div className="not-found-links">
              <Link href="/" className="not-found-btn primary">
                Back to Home &rarr;
              </Link>
              <Link href="/contact" className="not-found-btn secondary">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>

        <div className="not-found-right">
          <p className="not-found-nav-label">Or go somewhere useful</p>
          {[
            { href: "/projects", label: "Work" },
            { href: "/building", label: "Building" },
            { href: "/blog", label: "Journal" },
            { href: "/contact", label: "Contact" },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="not-found-nav-item">
              <span className="not-found-nav-name">{label}</span>
              <span className="not-found-nav-arrow">&rarr;</span>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
