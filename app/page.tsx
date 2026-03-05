"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

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

        .fade-up {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .loaded .fade-up { opacity: 1; transform: translateY(0); }
        .delay-1 { transition-delay: 0.1s; }
        .delay-2 { transition-delay: 0.25s; }
        .delay-3 { transition-delay: 0.4s; }
        .delay-4 { transition-delay: 0.55s; }
        .delay-5 { transition-delay: 0.7s; }
        .delay-6 { transition-delay: 0.85s; }

        nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
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

        .nav-links a:hover { color: var(--ink); }

        main { padding-top: 89px; }

        /* HERO */
        .hero {
          min-height: calc(100vh - 89px);
          display: grid;
          grid-template-columns: 1fr 420px;
          gap: 0;
          border-bottom: 1px solid var(--border);
        }

        .hero-left {
          padding: 80px 48px 80px 48px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-right: 1px solid var(--border);
        }

        .hero-eyebrow {
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--warm-gray);
        }

        .hero-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(72px, 9vw, 128px);
          font-weight: 300;
          line-height: 0.92;
          letter-spacing: -0.02em;
          color: var(--ink);
          margin-top: 24px;
        }

        .hero-name em {
          font-style: italic;
          color: var(--accent);
        }

        .hero-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 300;
          font-style: italic;
          color: var(--warm-gray);
          line-height: 1.5;
          max-width: 480px;
          margin-top: 40px;
        }

        .hero-bottom {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-top: 60px;
        }

        .hero-disciplines {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .discipline-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--warm-gray);
        }

        .discipline-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--accent);
          flex-shrink: 0;
        }

        .scroll-hint {
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--warm-gray);
          writing-mode: vertical-rl;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .scroll-hint::before {
          content: '';
          display: block;
          width: 1px;
          height: 48px;
          background: var(--border);
        }

        .hero-right {
          position: relative;
          overflow: hidden;
        }

        .headshot-container {
          width: 100%;
          height: 100%;
          background: var(--ink);
          position: relative;
          overflow: hidden;
        }

        .headshot-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          background: linear-gradient(160deg, #2a2620 0%, #1A1814 100%);
        }

        .headshot-placeholder-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .headshot-placeholder svg {
          opacity: 0.25;
        }

        .headshot-label {
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
        }

        .headshot-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 32px;
          background: linear-gradient(to top, rgba(26,24,20,0.8) 0%, transparent 100%);
        }

        .headshot-overlay-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 13px;
          font-style: italic;
          color: rgba(255,255,255,0.5);
          letter-spacing: 0.04em;
        }

        /* ABOUT */
        .about {
          display: grid;
          grid-template-columns: 240px 1fr;
          border-bottom: 1px solid var(--border);
        }

        .section-label {
          padding: 64px 48px;
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .section-number {
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--warm-gray);
        }

        .section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 48px;
          font-weight: 300;
          line-height: 1;
          color: var(--ink);
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          align-self: flex-end;
        }

        .about-content {
          padding: 64px 80px 64px 64px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: start;
        }

        .about-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 300;
          line-height: 1.5;
          color: var(--ink);
        }

        .about-text em {
          font-style: italic;
          color: var(--accent);
        }

        .about-details {
          display: flex;
          flex-direction: column;
          gap: 32px;
          padding-top: 8px;
        }

        .about-detail-item {
          border-top: 1px solid var(--border);
          padding-top: 20px;
        }

        .about-detail-label {
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--warm-gray);
          margin-bottom: 8px;
        }

        .about-detail-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 400;
          color: var(--ink);
          line-height: 1.4;
        }

        /* CONTACT */
        .contact {
          display: grid;
          grid-template-columns: 240px 1fr;
        }

        .contact-content {
          padding: 64px;
          display: flex;
          flex-direction: column;
          gap: 48px;
        }

        .contact-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(48px, 6vw, 80px);
          font-weight: 300;
          line-height: 1;
          color: var(--ink);
        }

        .contact-heading em {
          font-style: italic;
          color: var(--accent);
        }

        .contact-links {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .contact-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 0;
          border-top: 1px solid var(--border);
          text-decoration: none;
          color: var(--ink);
          transition: all 0.2s;
          group: true;
        }

        .contact-link:last-child {
          border-bottom: 1px solid var(--border);
        }

        .contact-link:hover .contact-link-label {
          color: var(--accent);
        }

        .contact-link:hover .contact-link-arrow {
          transform: translateX(6px);
          color: var(--accent);
        }

        .contact-link-left {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .contact-link-num {
          font-size: 10px;
          letter-spacing: 0.14em;
          color: var(--warm-gray);
          width: 20px;
        }

        .contact-link-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px;
          font-weight: 300;
          transition: color 0.2s;
        }

        .contact-link-arrow {
          font-size: 20px;
          color: var(--warm-gray);
          transition: all 0.2s;
        }

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
          font-family: 'Cormorant Garamond', serif;
          font-size: 13px;
          font-style: italic;
          color: var(--warm-gray);
        }

        @media (max-width: 900px) {
          nav { padding: 20px 24px; }
          .hero { grid-template-columns: 1fr; }
          .hero-left { padding: 48px 24px; }
          .hero-right { height: 400px; }
          .about { grid-template-columns: 1fr; }
          .section-label { display: none; }
          .about-content { grid-template-columns: 1fr; padding: 48px 24px; gap: 40px; }
          .contact { grid-template-columns: 1fr; }
          .contact-content { padding: 48px 24px; }
          .footer { padding: 24px; flex-direction: column; gap: 8px; text-align: center; }
        }
      `}</style>


      <div className={loaded ? "loaded" : ""}>
        {/* NAV */}
        <nav>
          <a href="/" className="nav-logo fade-up">KL</a>
          <ul className="nav-links">
            <li className="fade-up delay-1"><a href="#about">About</a></li>
            <li className="fade-up delay-2"><a href="#contact">Contact</a></li>
          </ul>
        </nav>

        <main>
          {/* HERO */}
          <section className="hero">
            <div className="hero-left">
              <div>
                <h1 className="hero-name fade-up delay-2">
                  Kyle<br /><em>Littlestar</em>
                </h1>
                <p className="hero-tagline fade-up delay-3">
                  A multi-disciplinary creative bridging graphic design, motion, and UI/UX — crafting work that moves people.
                </p>
              </div>
              <div className="hero-bottom fade-up delay-4">
                <div className="hero-disciplines">
                  {["Graphic Design", "Motion Design", "UI / UX Design", "Photography"].map((d) => (
                    <div key={d} className="discipline-item">
                      <span className="discipline-dot" />
                      {d}
                    </div>
                  ))}
                </div>
                <div className="scroll-hint">Scroll</div>
              </div>
            </div>
            <div className="hero-right fade-up delay-5">
              <div className="headshot-container">
                <div className="headshot-placeholder">
                  <div className="headshot-placeholder-icon">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1">
                      <circle cx="12" cy="8" r="4"/>
                      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                    </svg>
                  </div>
                  <span className="headshot-label">Your photo here</span>
                </div>
                <div className="headshot-overlay">
                  <p className="headshot-overlay-text">Based wherever the work takes me</p>
                </div>
              </div>
            </div>
          </section>

          {/* ABOUT */}
          <section className="about" id="about">
            <div className="section-label">
              <span className="section-number">01</span>
              <span className="section-title">About</span>
            </div>
            <div className="about-content">
              <p className="about-text fade-up">
                I'm a creative with a <em>restless curiosity</em> — equally at home shaping a brand identity, directing motion, refining a user experience, or chasing light with a camera.
              </p>
              <div className="about-details fade-up delay-2">
                <div className="about-detail-item">
                  <p className="about-detail-label">Disciplines</p>
                  <p className="about-detail-value">Graphic Design · Motion Design<br />UI/UX · Photography</p>
                </div>
                <div className="about-detail-item">
                  <p className="about-detail-label">Interests</p>
                  <p className="about-detail-value">Typography · Adventure<br />Visual Storytelling</p>
                </div>
                <div className="about-detail-item">
                  <p className="about-detail-label">Available for</p>
                  <p className="about-detail-value">Freelance · Collaboration<br />Full-time Opportunities</p>
                </div>
              </div>
            </div>
          </section>

          {/* CONTACT */}
          <section className="contact" id="contact">
            <div className="section-label">
              <span className="section-number">02</span>
              <span className="section-title">Contact</span>
            </div>
            <div className="contact-content">
              <h2 className="contact-heading fade-up">
                Let's make<br />something <em>great.</em>
              </h2>
              <div className="contact-links fade-up delay-2">
                {[
                  { label: "Email", href: "mailto:hello@kylelittlestar.com" },
                  { label: "Instagram", href: "https://www.instagram.com/star.slain/" },
                  { label: "LinkedIn", href: "#" }
                ].map((link, i) => (
                  <a key={link.label} href={link.href} className="contact-link">
                    <div className="contact-link-left">
                      <span className="contact-link-num">0{i + 1}</span>
                      <span className="contact-link-label">{link.label}</span>
                    </div>
                    <span className="contact-link-arrow">→</span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        </main>

        <footer className="footer">
          <span className="footer-copy">© 2026 Kyle Littlestar. All rights reserved.</span>
          <span className="footer-tagline">Type enthusiast & adventurist</span>
        </footer>
      </div>
    </>
  );
}
