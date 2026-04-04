import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { projects, getProjectBySlug, getAdjacentProjects } from "@/lib/projects-data";
import type { ProjectPhase } from "@/lib/projects-data";
import Link from "next/link";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

function ProgressTracker({ phases, currentPhase }: { phases: ProjectPhase[]; currentPhase: ProjectPhase }) {
  const currentIdx = phases.indexOf(currentPhase);
  return (
    <div className="progress-tracker">
      {phases.map((phase, i) => (
        <div key={phase} className={`progress-phase ${i < currentIdx ? "done" : ""} ${i === currentIdx ? "current" : ""} ${i > currentIdx ? "upcoming" : ""}`}>
          <div className="progress-dot" />
          <span className="progress-label">{phase}</span>
          {i < phases.length - 1 && <div className="progress-line" />}
        </div>
      ))}
    </div>
  );
}

function GalleryMedia({ item }: { item: any }) {
  if (item.type === "color") {
    return (
      <div style={{ width: "100%", height: "100%", minHeight: "200px", background: item.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: "var(--font-body)", fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.12)" }}>
          Preview
        </span>
      </div>
    );
  }
  return null;
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const { prev, next } = getAdjacentProjects(slug);

  if (!project) {
    return (
      <>
        <Nav activePage="work" />
        <main style={{ paddingTop: "62px", minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: "24px", color: "var(--text-muted)" }}>Project not found.</p>
        </main>
      </>
    );
  }

  const isInProgress = project.status === "in-progress";

  return (
    <>
      <style>{`
        main { padding-top: 76px; }

        .back-bar {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 32px 48px;
          border-bottom: var(--border-w) solid var(--border);
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-primary);
          text-decoration: none;
          padding: 10px 28px;
          background: var(--accent-bg);
          border: var(--border-w) solid var(--accent-bg);
          transition: all 0.2s;
        }

        .back-link:hover {
          background: var(--accent-bg-hover);
          border-color: var(--accent-bg-hover);
        }

        /* PROJECT HEADER */
        .project-header {
          display: grid;
          grid-template-columns: 1fr 360px;
          border-bottom: var(--border-w) solid var(--border);
        }

        .project-header-main {
          padding: 64px 48px;
          border-right: var(--border-w) solid var(--border);
        }

        .project-status-badge {
          display: inline-block;
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 4px 12px;
          border: var(--border-w) solid;
          margin-bottom: 20px;
        }

        .badge-completed { color: var(--success); border-color: var(--success); background: rgba(74,122,74,0.1); }
        .badge-in-progress { color: var(--warning); border-color: var(--warning); background: rgba(196,154,60,0.1); }

        .project-discipline {
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 16px;
        }

        .project-title {
          font-family: var(--font-display);
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 800;
          line-height: 0.92;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          color: var(--text-primary);
          margin-bottom: 24px;
        }

        .project-description {
          font-family: var(--font-body);
          font-size: 15px;
          line-height: 1.7;
          color: var(--text-secondary);
          max-width: 600px;
        }

        .project-header-sidebar {
          padding: 64px 32px;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .meta-item {
          border-top: var(--border-w) solid var(--border);
          padding-top: 14px;
        }

        .meta-label {
          font-family: var(--font-body);
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 6px;
        }

        .meta-value {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 500;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        /* OVERVIEW */
        .overview-section {
          padding: 64px 48px;
          border-bottom: var(--border-w) solid var(--border);
          max-width: 800px;
        }

        .section-heading {
          font-family: var(--font-display);
          font-size: 28px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: -0.01em;
          color: var(--text-primary);
          margin-bottom: 24px;
        }

        .overview-text {
          font-family: var(--font-body);
          font-size: 15px;
          line-height: 1.8;
          color: var(--text-secondary);
          white-space: pre-line;
        }

        /* GALLERY */
        .gallery-section {
          border-bottom: var(--border-w) solid var(--border);
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        .gallery-item {
          border-right: var(--border-w) solid var(--border);
          border-bottom: var(--border-w) solid var(--border);
          overflow: hidden;
        }

        .gallery-item:nth-child(2n) { border-right: none; }
        .gallery-item.span-full { grid-column: 1 / -1; border-right: none; }

        .gallery-caption {
          padding: 16px 24px;
          font-family: var(--font-body);
          font-size: 12px;
          color: var(--text-muted);
          border-top: var(--border-w) solid var(--border);
        }

        /* PROGRESS TRACKER (In-Progress) */
        .progress-section {
          padding: 64px 48px;
          border-bottom: var(--border-w) solid var(--border);
        }

        .progress-tracker {
          display: flex;
          gap: 0;
          margin-top: 32px;
        }

        .progress-phase {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          position: relative;
        }

        .progress-dot {
          width: 16px;
          height: 16px;
          border: var(--border-w-thick) solid var(--border-strong);
          background: var(--bg);
          position: relative;
          z-index: 2;
        }

        .progress-phase.done .progress-dot {
          background: var(--accent);
          border-color: var(--accent);
        }

        .progress-phase.current .progress-dot {
          background: var(--warning);
          border-color: var(--warning);
          box-shadow: 0 0 12px rgba(196, 154, 60, 0.4);
        }

        .progress-label {
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          text-align: center;
        }

        .progress-phase.done .progress-label { color: var(--accent); }
        .progress-phase.current .progress-label { color: var(--warning); font-weight: 700; }

        .progress-line {
          position: absolute;
          top: 8px;
          left: calc(50% + 12px);
          right: calc(-50% + 12px);
          height: 2px;
          background: var(--border-strong);
          z-index: 1;
        }

        .progress-phase.done .progress-line { background: var(--accent); }

        /* LISTS (challenges, lessons, next steps, results) */
        .list-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-bottom: var(--border-w) solid var(--border);
        }

        .list-block {
          padding: 48px;
          border-right: var(--border-w) solid var(--border);
        }

        .list-block:last-child { border-right: none; }

        .list-block ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 20px;
        }

        .list-block li {
          font-family: var(--font-body);
          font-size: 14px;
          line-height: 1.6;
          color: var(--text-secondary);
          padding-left: 20px;
          position: relative;
        }

        .list-block li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 8px;
          width: 6px;
          height: 6px;
          background: var(--accent);
        }

        /* RESULTS (completed) */
        .results-section {
          padding: 64px 48px;
          border-bottom: var(--border-w) solid var(--border);
        }

        .results-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          margin-top: 24px;
        }

        .result-card {
          padding: 32px;
          border: var(--border-w) solid var(--border);
          border-right: none;
        }

        .result-card:last-child { border-right: var(--border-w) solid var(--border); }

        .result-text {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.4;
        }

        /* PREV / NEXT NAV */
        .project-nav {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-bottom: var(--border-w) solid var(--border);
        }

        .project-nav-item {
          padding: 48px;
          text-decoration: none;
          color: var(--text-primary);
          border-right: var(--border-w) solid var(--border);
          transition: background 0.2s;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .project-nav-item:last-child { border-right: none; }
        .project-nav-item:hover { background: var(--bg-surface); }
        .project-nav-item.next { text-align: right; }

        .project-nav-label {
          font-family: var(--font-body);
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .project-nav-title {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 700;
          line-height: 1.1;
        }

        @media (max-width: 900px) {
          .back-bar { padding: 12px 20px; }
          .project-header { grid-template-columns: 1fr; }
          .project-header-main { padding: 40px 20px; border-right: none; border-bottom: var(--border-w) solid var(--border); }
          .project-header-sidebar { padding: 32px 20px; }
          .overview-section { padding: 40px 20px; }
          .gallery-grid { grid-template-columns: 1fr; }
          .gallery-item { border-right: none; }
          .progress-section { padding: 40px 20px; }
          .progress-tracker { flex-direction: column; gap: 16px; }
          .progress-line { display: none; }
          .progress-phase { flex-direction: row; gap: 16px; }
          .list-section { grid-template-columns: 1fr; }
          .list-block { border-right: none; border-bottom: var(--border-w) solid var(--border); padding: 32px 20px; }
          .list-block:last-child { border-bottom: none; }
          .results-section { padding: 40px 20px; }
          .results-grid { grid-template-columns: 1fr; }
          .result-card { border-right: var(--border-w) solid var(--border); }
          .project-nav { grid-template-columns: 1fr; }
          .project-nav-item { border-right: none; border-bottom: var(--border-w) solid var(--border); padding: 32px 20px; }
          .project-nav-item.next { text-align: left; }
        }
      `}</style>

      <Nav activePage={isInProgress ? "building" : "work"} />

      <main>
        <div className="back-bar">
          <Link href={isInProgress ? "/building" : "/projects"} className="back-link">
            &larr; {isInProgress ? "Building" : "All Projects"}
          </Link>
        </div>

        {/* HEADER */}
        <div className="project-header">
          <div className="project-header-main">
            <span className={`project-status-badge ${isInProgress ? "badge-in-progress" : "badge-completed"}`}>
              {isInProgress ? "In Progress" : "Completed"}
            </span>
            <p className="project-discipline">{project.discipline}</p>
            <h1 className="project-title">{project.title}</h1>
            <p className="project-description">{project.description}</p>
          </div>
          <div className="project-header-sidebar">
            <div className="meta-item">
              <p className="meta-label">Year</p>
              <p className="meta-value">{project.year}</p>
            </div>
            <div className="meta-item">
              <p className="meta-label">Role</p>
              <p className="meta-value">{project.role.join(" · ")}</p>
            </div>
            <div className="meta-item">
              <p className="meta-label">Deliverables</p>
              <p className="meta-value">{project.deliverables.join(" · ")}</p>
            </div>
            {isInProgress && project.currentPhase && (
              <div className="meta-item">
                <p className="meta-label">Current Phase</p>
                <p className="meta-value" style={{ color: "var(--warning)" }}>{project.currentPhase}</p>
              </div>
            )}
          </div>
        </div>

        {/* PROGRESS TRACKER (In-Progress only) */}
        {isInProgress && project.phases && project.currentPhase && (
          <div className="progress-section">
            <h2 className="section-heading">Progress</h2>
            <ProgressTracker phases={project.phases} currentPhase={project.currentPhase} />
          </div>
        )}

        {/* OVERVIEW */}
        <div className="overview-section">
          <h2 className="section-heading">Overview</h2>
          <p className="overview-text">{project.overview}</p>
        </div>

        {/* GALLERY */}
        {project.gallery.length > 0 && (
          <div className="gallery-section">
            <div className="gallery-grid">
              {project.gallery.map((item, i) => (
                <div key={i} className={`gallery-item ${item.span === "full" ? "span-full" : ""}`}>
                  <GalleryMedia item={item} />
                  {item.caption && <p className="gallery-caption">{item.caption}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CHALLENGES & LESSONS (In-Progress) */}
        {isInProgress && (project.challenges?.length || project.lessonsLearned?.length) && (
          <div className="list-section">
            {project.challenges && project.challenges.length > 0 && (
              <div className="list-block">
                <h2 className="section-heading">Challenges</h2>
                <ul>
                  {project.challenges.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </div>
            )}
            {project.lessonsLearned && project.lessonsLearned.length > 0 && (
              <div className="list-block">
                <h2 className="section-heading">Lessons Learned</h2>
                <ul>
                  {project.lessonsLearned.map((l, i) => <li key={i}>{l}</li>)}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* NEXT STEPS (In-Progress) */}
        {isInProgress && project.nextSteps && project.nextSteps.length > 0 && (
          <div className="overview-section">
            <h2 className="section-heading">Next Steps</h2>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px", marginTop: "16px" }}>
              {project.nextSteps.map((s, i) => (
                <li key={i} style={{ fontFamily: "var(--font-body)", fontSize: "14px", lineHeight: "1.6", color: "var(--text-secondary)", paddingLeft: "20px", position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, top: "8px", width: "6px", height: "6px", background: "var(--warning)", display: "block" }} />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* RESULTS (Completed) */}
        {!isInProgress && project.results && project.results.length > 0 && (
          <div className="results-section">
            <h2 className="section-heading">Results &amp; Impact</h2>
            <div className="results-grid">
              {project.results.map((r, i) => (
                <div key={i} className="result-card">
                  <p className="result-text">{r}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PREV / NEXT */}
        <div className="project-nav">
          {prev ? (
            <Link href={`/projects/${prev.slug}`} className="project-nav-item prev">
              <span className="project-nav-label">&larr; Previous</span>
              <span className="project-nav-title">{prev.title}</span>
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/projects/${next.slug}`} className="project-nav-item next">
              <span className="project-nav-label">Next &rarr;</span>
              <span className="project-nav-title">{next.title}</span>
            </Link>
          ) : <div />}
        </div>
      </main>

      <Footer />
    </>
  );
}
