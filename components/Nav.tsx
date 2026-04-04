"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type NavPage = "home" | "work" | "building" | "contact" | "journal";

const NAV_LINKS: { label: string; href: string; page: NavPage }[] = [
  { label: "Work", href: "/projects", page: "work" },
  { label: "Building", href: "/building", page: "building" },
  { label: "Journal", href: "/blog", page: "journal" },
  { label: "Contact", href: "/contact", page: "contact" },
];

export function Nav({ activePage }: { activePage?: NavPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <style>{`
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 200;
          padding: 20px 48px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--bg);
          border-bottom: var(--border-w) solid var(--border);
          transition: background 0.3s, border-color 0.3s;
        }

        .nav.scrolled {
          background: rgba(12, 10, 9, 0.95);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-color: var(--border-strong);
        }

        .nav-logo {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-primary);
          text-decoration: none;
          z-index: 210;
          position: relative;
          transition: color 0.2s;
        }

        .nav-logo:hover {
          color: var(--accent-hover);
        }

        .nav-links {
          display: flex;
          gap: 40px;
          list-style: none;
        }

        .nav-links a {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.2s;
          position: relative;
        }

        .nav-links a:hover {
          color: var(--text-primary);
        }

        .nav-links a.active {
          color: var(--accent);
        }

        .nav-links a.active::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--accent);
        }

        /* HAMBURGER */
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 6px;
          width: 32px;
          height: 32px;
          background: none;
          border: none;
          cursor: pointer;
          z-index: 210;
          position: relative;
          padding: 0;
        }

        .hamburger-line {
          display: block;
          width: 24px;
          height: 2px;
          background: var(--text-primary);
          transition: all 0.3s ease;
          transform-origin: center;
        }

        .hamburger.open .hamburger-line:nth-child(1) {
          transform: translateY(8px) rotate(45deg);
        }

        .hamburger.open .hamburger-line:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }

        .hamburger.open .hamburger-line:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
        }

        /* MOBILE MENU */
        .mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 190;
          background: var(--bg);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 8px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        .mobile-menu.open {
          opacity: 1;
          pointer-events: all;
        }

        .mobile-menu-link {
          font-family: var(--font-display);
          font-size: clamp(40px, 10vw, 64px);
          font-weight: 800;
          text-transform: uppercase;
          line-height: 1.1;
          color: var(--text-primary);
          text-decoration: none;
          letter-spacing: -0.02em;
          transition: color 0.2s, transform 0.3s;
          transform: translateY(20px);
          opacity: 0;
          display: block;
          padding: 4px 0;
        }

        .mobile-menu.open .mobile-menu-link {
          transform: translateY(0);
          opacity: 1;
        }

        .mobile-menu.open .mobile-menu-link:nth-child(1) { transition-delay: 0.05s; }
        .mobile-menu.open .mobile-menu-link:nth-child(2) { transition-delay: 0.1s; }
        .mobile-menu.open .mobile-menu-link:nth-child(3) { transition-delay: 0.15s; }
        .mobile-menu.open .mobile-menu-link:nth-child(4) { transition-delay: 0.2s; }

        .mobile-menu-link:hover { color: var(--accent-hover); }
        .mobile-menu-link.active { color: var(--accent); }

        .mobile-menu-footer {
          position: absolute;
          bottom: 40px;
          font-family: var(--font-body);
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
          opacity: 0;
          transition: opacity 0.3s ease 0.25s;
        }

        .mobile-menu.open .mobile-menu-footer {
          opacity: 1;
        }

        @media (max-width: 768px) {
          .nav { padding: 16px 20px; }
          .nav-links { display: none; }
          .hamburger { display: flex; }
        }
      `}</style>

      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <Link href="/" className="nav-logo">Kyle Littlestar</Link>

        <ul className="nav-links">
          {NAV_LINKS.map(({ label, href, page }) => (
            <li key={page}>
              <Link href={href} className={activePage === page ? "active" : ""}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <Link href="/" className={`mobile-menu-link ${activePage === "home" ? "active" : ""}`} onClick={() => setMenuOpen(false)}>Home</Link>
        {NAV_LINKS.map(({ label, href, page }) => (
          <Link key={page} href={href} className={`mobile-menu-link ${activePage === page ? "active" : ""}`} onClick={() => setMenuOpen(false)}>
            {label}
          </Link>
        ))}
        <span className="mobile-menu-footer">Kyle Littlestar &mdash; 2026</span>
      </div>
    </>
  );
}
