"use client";

import { useState, useEffect } from "react";

export function Nav({ activePage }: { activePage?: "home" | "projects" | "contact" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when menu is open
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
          padding: 28px 48px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--cream);
          border-bottom: 1px solid var(--border);
          transition: box-shadow 0.2s;
        }

        .nav.scrolled {
          box-shadow: 0 1px 24px rgba(26,24,20,0.06);
        }

        .nav-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 600;
          letter-spacing: 0.02em;
          color: var(--ink);
          text-decoration: none;
          z-index: 210;
          position: relative;
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

        .nav-links a:hover,
        .nav-links a.active { color: var(--ink); }

        /* HAMBURGER BUTTON */
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
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
          height: 1px;
          background: var(--ink);
          transition: all 0.3s ease;
          transform-origin: center;
        }

        .hamburger.open .hamburger-line:nth-child(1) {
          transform: translateY(6px) rotate(45deg);
        }

        .hamburger.open .hamburger-line:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }

        .hamburger.open .hamburger-line:nth-child(3) {
          transform: translateY(-6px) rotate(-45deg);
        }

        /* MOBILE MENU OVERLAY */
        .mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 190;
          background: var(--cream);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 0;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        .mobile-menu.open {
          opacity: 1;
          pointer-events: all;
        }

        .mobile-menu-link {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(48px, 12vw, 80px);
          font-weight: 300;
          line-height: 1.1;
          color: var(--ink);
          text-decoration: none;
          letter-spacing: -0.01em;
          transition: color 0.2s, transform 0.2s;
          transform: translateY(16px);
          opacity: 0;
          display: block;
          padding: 8px 0;
        }

        .mobile-menu.open .mobile-menu-link {
          transform: translateY(0);
          opacity: 1;
        }

        .mobile-menu.open .mobile-menu-link:nth-child(1) { transition-delay: 0.05s; }
        .mobile-menu.open .mobile-menu-link:nth-child(2) { transition-delay: 0.1s; }
        .mobile-menu.open .mobile-menu-link:nth-child(3) { transition-delay: 0.15s; }

        .mobile-menu-link:hover { color: var(--accent); }
        .mobile-menu-link.active { color: var(--accent); font-style: italic; }

        .mobile-menu-footer {
          position: absolute;
          bottom: 40px;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--warm-gray);
          opacity: 0;
          transition: opacity 0.3s ease 0.2s;
        }

        .mobile-menu.open .mobile-menu-footer {
          opacity: 1;
        }

        @media (max-width: 768px) {
          .nav { padding: 20px 24px; }
          .nav-links { display: none; }
          .hamburger { display: flex; }
        }
      `}</style>

      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <a href="/" className="nav-logo">KL</a>

        {/* Desktop links */}
        <ul className="nav-links">
          <li><a href="/" className={activePage === "home" ? "active" : ""}>About</a></li>
          <li><a href="/projects" className={activePage === "projects" ? "active" : ""}>Work</a></li>
          <li><a href="/contact" className={activePage === "contact" ? "active" : ""}>Contact</a></li>
        </ul>

        {/* Hamburger button */}
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

      {/* Mobile menu overlay */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <a href="/" className={`mobile-menu-link ${activePage === "home" ? "active" : ""}`} onClick={() => setMenuOpen(false)}>About</a>
        <a href="/projects" className={`mobile-menu-link ${activePage === "projects" ? "active" : ""}`} onClick={() => setMenuOpen(false)}>Work</a>
        <a href="/#contact" className={`mobile-menu-link`} onClick={() => setMenuOpen(false)}>Contact</a>
        <span className="mobile-menu-footer">Kyle Littlestar — 2024</span>
      </div>
    </>
  );
}

