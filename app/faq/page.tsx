"use client";

import { useState } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import Link from "next/link";

const FAQS = [
  {
    q: "What does your project process look like?",
    a: "Every project starts with a Discovery phase — a deep-dive conversation to understand your goals, audience, and constraints. From there I move into Strategy, where I define the direction before a single thing gets designed. Then comes Design, with clear feedback rounds so nothing surprises you at the end. Finally, Deliver — handoff files, documentation, and anything you need to hit the ground running.",
  },
  {
    q: "How do you structure pricing?",
    a: "It depends on the nature of the work. Defined projects with a clear scope get a flat rate quoted upfront — no surprises. For ongoing, open-ended, or advisory work I bill hourly. Either way, you'll know what to expect before anything starts. Reach out via the contact form and I'll put together a proposal based on your specific needs.",
  },
  {
    q: "How long does a project typically take?",
    a: "It varies significantly by project type and complexity. A logo system might wrap in three weeks. A full brand identity with motion guidelines and digital templates could take two to three months. A UI/UX design system for a product team might run longer still. I'll give you an honest timeline estimate during our initial conversation — and I stick to it.",
  },
  {
    q: "Are you available for new projects?",
    a: "I'm opening up for freelance projects and keeping it intentional — anyone I take on gets full attention, not divided focus. If you have something in mind, reach out and let's talk. If the timing isn't right I'll tell you honestly rather than overcommit.",
  },
  {
    q: "What disciplines do you work across?",
    a: "Graphic design, motion design, UI/UX, and photography — often in combination. Many of my projects blend two or more of these. If your project needs a brand identity that extends into motion and digital UI, that's exactly the kind of work I'm built for.",
  },
  {
    q: "Do you work with clients remotely?",
    a: "Yes — I work remotely by default. Strong communication and a clear process make location irrelevant.",
  },
  {
    q: "What do you need from me to get started?",
    a: "A clear brief helps, but it's not required. At minimum: a sense of what you're trying to accomplish, who it's for, and a rough idea of timeline and budget. We'll shape the rest together in the discovery phase.",
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <style>{`
        main { padding-top: 76px; }

        .page-header {
          padding: 64px 48px 48px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          border-bottom: var(--border-w) solid var(--border);
          align-items: end;
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

        .page-intro {
          font-family: var(--font-body);
          font-size: 15px;
          color: var(--text-secondary);
          line-height: 1.7;
          padding-bottom: 8px;
        }

        .faq-wrapper {
          display: grid;
          grid-template-columns: 1fr 360px;
        }

        .faq-list {
          border-right: var(--border-w) solid var(--border);
        }

        .faq-item {
          border-bottom: var(--border-w) solid var(--border);
        }

        .faq-question {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding: 32px 48px;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          transition: background 0.2s;
        }

        .faq-question:hover { background: var(--bg-surface); }

        .faq-question-text {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.2;
        }

        .faq-icon {
          flex-shrink: 0;
          width: 28px;
          height: 28px;
          border: var(--border-w) solid var(--border-strong);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-body);
          font-size: 18px;
          color: var(--text-muted);
          transition: all 0.2s;
        }

        .faq-item.open .faq-icon {
          border-color: var(--accent);
          color: var(--accent);
        }

        .faq-answer {
          padding: 0 48px 32px;
          font-family: var(--font-body);
          font-size: 14px;
          line-height: 1.8;
          color: var(--text-secondary);
          max-width: 640px;
        }

        .faq-sidebar {
          padding: 64px 40px;
          display: flex;
          flex-direction: column;
          gap: 40px;
          position: sticky;
          top: 76px;
          align-self: start;
        }

        .sidebar-quote {
          font-family: var(--font-display);
          font-size: 24px;
          font-weight: 700;
          line-height: 1.3;
          color: var(--text-primary);
        }

        .sidebar-quote .accent { color: var(--accent); }

        .sidebar-item {
          border-top: var(--border-w) solid var(--border);
          padding-top: 20px;
        }

        .sidebar-label {
          font-family: var(--font-body);
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 8px;
        }

        .sidebar-value {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 500;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .sidebar-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-primary);
          background: var(--accent-bg);
          border: var(--border-w-thick) solid var(--accent-bg);
          padding: 14px 28px;
          text-decoration: none;
          transition: all 0.2s;
          margin-top: 8px;
        }

        .sidebar-cta:hover {
          background: var(--accent-bg-hover);
          border-color: var(--accent-bg-hover);
        }

        @media (max-width: 900px) {
          .page-header { grid-template-columns: 1fr; padding: 40px 20px 32px; }
          .faq-wrapper { grid-template-columns: 1fr; }
          .faq-list { border-right: none; }
          .faq-question { padding: 24px 20px; }
          .faq-answer { padding: 0 20px 24px; }
          .faq-sidebar { padding: 40px 20px; position: static; border-top: var(--border-w) solid var(--border); }
        }
      `}</style>

      <Nav />

      <main>
        <div className="page-header">
          <h1 className="page-title">
            Frequently<br /><span className="accent">Asked</span>
          </h1>
          <p className="page-intro">
            Questions I get asked most often — about my process, pricing, timeline, and how to get started.
          </p>
        </div>

        <div className="faq-wrapper">
          <div className="faq-list">
            {FAQS.map((faq, i) => (
              <div key={i} className={`faq-item ${open === i ? "open" : ""}`}>
                <button className="faq-question" onClick={() => setOpen(open === i ? null : i)}>
                  <span className="faq-question-text">{faq.q}</span>
                  <span className="faq-icon">{open === i ? "−" : "+"}</span>
                </button>
                {open === i && (
                  <p className="faq-answer">{faq.a}</p>
                )}
              </div>
            ))}
          </div>

          <div className="faq-sidebar">
            <p className="sidebar-quote">
              Still have a <span className="accent">question?</span>
            </p>
            <div className="sidebar-item">
              <p className="sidebar-label">Response Time</p>
              <p className="sidebar-value">Within 48 hours</p>
            </div>
            <div className="sidebar-item">
              <p className="sidebar-label">Email</p>
              <p className="sidebar-value">hello@ltlstar.com</p>
            </div>
            <div className="sidebar-item">
              <p className="sidebar-label">Available For</p>
              <p className="sidebar-value">Freelance &middot; Collaboration</p>
            </div>
            <Link href="/contact" className="sidebar-cta">
              Get in Touch &rarr;
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
