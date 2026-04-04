"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { projects } from "@/lib/projects-data";

const DISCIPLINES = ["Graphic Design", "Motion Design", "UI / UX", "Photography"];

const featuredProjects = projects.filter((p) => p.featured || p.status === "in-progress").slice(0, 3);

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <style>{`
        main { padding-top: 76px; }

        /* ── HERO ── */
        .hero {
          min-height: calc(100vh - 62px);
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-bottom: var(--border-w) solid var(--border);
        }

        .hero-left {
          padding: 80px 48px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-right: var(--border-w) solid var(--border);
        }

        .hero-label {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .hero-name {
          font-family: var(--font-display);
          font-size: clamp(56px, 8vw, 120px);
          font-weight: 800;
          line-height: 0.88;
          letter-spacing: -0.03em;
          text-transform: uppercase;
          color: var(--text-primary);
          margin-top: 24px;
        }

        .hero-name .accent {
          color: var(--accent);
          display: block;
        }

        .hero-tagline {
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 400;
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 480px;
          margin-top: 32px;
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
          gap: 8px;
        }

        .discipline-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .discipline-dot {
          width: 6px;
          height: 6px;
          background: var(--accent);
          flex-shrink: 0;
        }

        .scroll-hint {
          font-family: var(--font-body);
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--text-muted);
          writing-mode: vertical-rl;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .scroll-hint::before {
          content: '';
          display: block;
          width: 2px;
          height: 48px;
          background: var(--border-strong);
        }

        .hero-right {
          position: relative;
          overflow: hidden;
          background: var(--bg-surface);
        }

        .hero-photo-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          background: linear-gradient(160deg, var(--bg-elevated) 0%, var(--bg) 100%);
        }

        .hero-photo-icon {
          width: 80px;
          height: 80px;
          border: var(--border-w-thick) solid var(--border-strong);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-photo-icon svg { opacity: 0.3; }

        .hero-photo-label {
          font-family: var(--font-body);
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .hero-photo-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 32px;
          background: linear-gradient(to top, rgba(12,10,9,0.9) 0%, transparent 100%);
        }

        .hero-photo-overlay-text {
          font-family: var(--font-body);
          font-size: 12px;
          color: var(--text-muted);
          letter-spacing: 0.04em;
        }

        /* ── ABOUT ── */
        .about {
          display: grid;
          grid-template-columns: 200px 1fr;
          border-bottom: var(--border-w) solid var(--border);
        }

        .section-sidebar {
          padding: 64px 32px;
          border-right: var(--border-w) solid var(--border);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .section-number {
          font-family: var(--font-body);
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .section-title-vertical {
          font-family: var(--font-display);
          font-size: 48px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          color: var(--text-muted);
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          align-self: flex-end;
        }

        .about-content {
          padding: 64px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: start;
        }

        .about-text {
          font-family: var(--font-display);
          font-size: 26px;
          font-weight: 500;
          line-height: 1.4;
          color: var(--text-primary);
        }

        .about-text .accent { color: var(--accent); }

        .about-details {
          display: flex;
          flex-direction: column;
          gap: 32px;
          padding-top: 4px;
        }

        .about-detail-item {
          border-top: var(--border-w) solid var(--border);
          padding-top: 16px;
        }

        .about-detail-label {
          font-family: var(--font-body);
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 8px;
        }

        .about-detail-value {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 500;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        /* ── FEATURED WORK ── */
        .featured-work {
          border-bottom: var(--border-w) solid var(--border);
        }

        .featured-header {
          padding: 48px 48px 32px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
        }

        .featured-title {
          font-family: var(--font-display);
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          line-height: 0.95;
        }

        .featured-title .accent { color: var(--accent); }

        .view-all-link {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 8px;
          padding-bottom: 8px;
          transition: color 0.2s;
        }

        .view-all-link:hover { color: var(--accent-hover); }
        .view-all-link .arrow { transition: transform 0.2s; }
        .view-all-link:hover .arrow { transform: translateX(4px); }

        .featured-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-top: var(--border-w) solid var(--border);
        }

        .featured-card {
          border-right: var(--border-w) solid var(--border);
          text-decoration: none;
          transition: background 0.2s;
        }

        .featured-card:last-child { border-right: none; }
        .featured-card:hover { background: var(--bg-surface); }

        .featured-card-media {
          height: 280px;
          overflow: hidden;
          position: relative;
          border-bottom: var(--border-w) solid var(--border);
        }

        .featured-card-color {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .featured-card-color span {
          font-family: var(--font-body);
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.15);
        }

        .featured-card-status {
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
        }

        .status-completed {
          color: var(--success);
          border-color: var(--success);
          background: rgba(74, 122, 74, 0.15);
        }

        .status-in-progress {
          color: var(--warning);
          border-color: var(--warning);
          background: rgba(196, 154, 60, 0.15);
        }

        .featured-card-info { padding: 24px; }

        .featured-card-discipline {
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 8px;
        }

        .featured-card-name {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 8px;
          line-height: 1.1;
        }

        .featured-card-desc {
          font-family: var(--font-body);
          font-size: 13px;
          line-height: 1.6;
          color: var(--text-muted);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* ── CONTACT CTA ── */
        .contact-cta {
          padding: 96px 48px;
          text-align: center;
          border-bottom: var(--border-w) solid var(--border);
        }

        .contact-cta-heading {
          font-family: var(--font-display);
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          line-height: 0.95;
          color: var(--text-primary);
          margin-bottom: 24px;
        }

        .contact-cta-heading .accent { color: var(--accent); }

        .contact-cta-sub {
          font-family: var(--font-body);
          font-size: 14px;
          color: var(--text-muted);
          margin-bottom: 40px;
        }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-primary);
          background: var(--accent-bg);
          border: var(--border-w-thick) solid var(--accent-bg);
          padding: 16px 40px;
          text-decoration: none;
          transition: all 0.2s;
        }

        .cta-btn:hover {
          background: var(--accent-bg-hover);
          border-color: var(--accent-bg-hover);
          border-color: var(--accent-hover);
        }

        .cta-btn .arrow { transition: transform 0.2s; }
        .cta-btn:hover .arrow { transform: translateX(4px); }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .hero { grid-template-columns: 1fr; }
          .hero-left { padding: 48px 20px; }
          .hero-right { height: 360px; }
          .about { grid-template-columns: 1fr; }
          .section-sidebar { display: none; }
          .about-content { grid-template-columns: 1fr; padding: 48px 20px; gap: 40px; }
          .featured-header { padding: 40px 20px 24px; flex-direction: column; align-items: flex-start; gap: 16px; }
          .featured-grid { grid-template-columns: 1fr; }
          .featured-card { border-right: none; border-bottom: var(--border-w) solid var(--border); }
          .featured-card:last-child { border-bottom: none; }
          .contact-cta { padding: 64px 20px; }
        }
      `}</style>

      <Nav activePage="home" />

      <div className={loaded ? "loaded" : ""}>
        <main>
          {/* HERO */}
          <section className="hero">
            <div className="hero-left">
              <div>
                <p className="hero-label fade-up delay-1">Creative Designer &amp; Builder</p>
                <h1 className="hero-name fade-up delay-2">
                  Kyle<span className="accent">Littlestar</span>
                </h1>
                <p className="hero-tagline fade-up delay-3">
                  Multi-disciplinary creative bridging graphic design, motion, UI/UX, and code — crafting work that moves people.
                </p>
              </div>
              <div className="hero-bottom fade-up delay-4">
                <div className="hero-disciplines">
                  {DISCIPLINES.map((d) => (
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
              <div className="hero-photo-placeholder">
                <div className="hero-photo-icon">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                </div>
                <span className="hero-photo-label">Your photo here</span>
              </div>
              <div className="hero-photo-overlay">
                <p className="hero-photo-overlay-text">Based wherever the work takes me</p>
              </div>
            </div>
          </section>

          {/* ABOUT */}
          <section className="about" id="about">
            <div className="section-sidebar">
              <span className="section-number">01</span>
              <span className="section-title-vertical">About</span>
            </div>
            <div className="about-content">
              <p className="about-text fade-up">
                I&apos;m a creative with a <span className="accent">restless curiosity</span> — equally at home shaping a brand identity, directing motion, refining a user experience, or building it from scratch in code.
              </p>
              <div className="about-details fade-up delay-2">
                <div className="about-detail-item">
                  <p className="about-detail-label">Disciplines</p>
                  <p className="about-detail-value">Graphic Design &middot; Motion Design<br />UI/UX &middot; Photography</p>
                </div>
                <div className="about-detail-item">
                  <p className="about-detail-label">Interests</p>
                  <p className="about-detail-value">Typography &middot; Adventure<br />Visual Storytelling</p>
                </div>
                <div className="about-detail-item">
                  <p className="about-detail-label">Available for</p>
                  <p className="about-detail-value">Freelance &middot; Collaboration<br />Full-time Opportunities</p>
                </div>
              </div>
            </div>
          </section>

          {/* FEATURED WORK */}
          <section className="featured-work">
            <div className="featured-header">
              <h2 className="featured-title fade-up">
                Selected<br /><span className="accent">Work</span>
              </h2>
              <Link href="/projects" className="view-all-link fade-up delay-2">
                View All <span className="arrow">&rarr;</span>
              </Link>
            </div>
            <div className="featured-grid">
              {featuredProjects.map((project) => (
                <Link key={project.id} href={`/projects/${project.slug}`} className="featured-card fade-up delay-3">
                  <div className="featured-card-media">
                    <div className="featured-card-color" style={{ background: project.mediaColor || "#1A1714" }}>
                      <span>Preview</span>
                    </div>
                    <span className={`featured-card-status ${project.status === "completed" ? "status-completed" : "status-in-progress"}`}>
                      {project.status === "completed" ? "Completed" : "In Progress"}
                    </span>
                  </div>
                  <div className="featured-card-info">
                    <p className="featured-card-discipline">{project.discipline}</p>
                    <h3 className="featured-card-name">{project.title}</h3>
                    <p className="featured-card-desc">{project.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* CONTACT CTA */}
          <section className="contact-cta" id="contact">
            <h2 className="contact-cta-heading fade-up">
              Let&apos;s Build<br />Something <span className="accent">Great</span>
            </h2>
            <p className="contact-cta-sub fade-up delay-2">Have a project in mind? I&apos;d love to hear about it.</p>
            <Link href="/contact" className="cta-btn fade-up delay-3">
              Get in Touch <span className="arrow">&rarr;</span>
            </Link>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
