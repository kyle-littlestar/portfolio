import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Your message has been received. I'll be in touch within 48 hours.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <>
      <style>{`
        main {
          padding-top: 76px;
          min-height: calc(100vh - 76px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding-left: 24px;
          padding-right: 24px;
          border-bottom: var(--border-w) solid var(--border);
        }

        .ty-label {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 24px;
        }

        .ty-heading {
          font-family: var(--font-display);
          font-size: clamp(48px, 7vw, 96px);
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          line-height: 0.92;
          color: var(--text-primary);
          margin-bottom: 24px;
        }

        .ty-heading .accent { color: var(--accent); }

        .ty-sub {
          font-family: var(--font-body);
          font-size: 15px;
          line-height: 1.7;
          color: var(--text-secondary);
          max-width: 480px;
          margin: 0 auto 48px;
        }

        .ty-links {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .ty-btn {
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
          border: var(--border-w-thick) solid;
          transition: all 0.2s;
        }

        .ty-btn.primary {
          background: var(--accent-bg);
          border-color: var(--accent-bg);
          color: var(--text-primary);
        }

        .ty-btn.primary:hover {
          background: var(--accent-bg-hover);
          border-color: var(--accent-bg-hover);
        }

        .ty-btn.secondary {
          background: transparent;
          border-color: var(--border-strong);
          color: var(--text-muted);
        }

        .ty-btn.secondary:hover {
          border-color: var(--text-primary);
          color: var(--text-primary);
        }

        .ty-divider {
          width: 48px;
          height: 2px;
          background: var(--accent);
          margin: 0 auto 40px;
        }
      `}</style>

      <Nav activePage="contact" />

      <main>
        <p className="ty-label">Message received</p>
        <h1 className="ty-heading">
          Thank<br /><span className="accent">You</span>
        </h1>
        <div className="ty-divider" />
        <p className="ty-sub">
          I&apos;ll get back to you within 48 hours. In the meantime, feel free to take a look at my work or browse the journal.
        </p>
        <div className="ty-links">
          <Link href="/projects" className="ty-btn primary">
            View Work &rarr;
          </Link>
          <Link href="/blog" className="ty-btn secondary">
            Read the Journal
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
