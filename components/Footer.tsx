import Link from "next/link";

export function Footer() {
  return (
    <>
      <style>{`
        .site-footer {
          padding: 40px 48px;
          border-top: var(--border-w) solid var(--border);
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 24px;
        }

        .footer-copy {
          font-family: var(--font-body);
          font-size: 11px;
          letter-spacing: 0.08em;
          color: var(--text-muted);
        }

        .footer-tagline {
          font-family: var(--font-display);
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-muted);
          text-align: center;
        }

        .footer-links {
          display: flex;
          gap: 24px;
          justify-content: flex-end;
        }

        .footer-link {
          font-family: var(--font-body);
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer-link:hover { color: var(--text-secondary); }

        /* STICKY MOBILE CTA */
        .mobile-cta {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 150;
          background: var(--accent-bg);
          border-top: var(--border-w-thick) solid var(--accent);
          padding: 0;
        }

        .mobile-cta a {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 18px 24px;
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-primary);
          text-decoration: none;
        }

        @media (max-width: 768px) {
          .site-footer {
            padding: 24px 20px 96px;
            grid-template-columns: 1fr;
            text-align: center;
            gap: 12px;
          }
          .footer-links { justify-content: center; }
          .mobile-cta { display: block; }
        }
      `}</style>

      <footer className="site-footer">
        <span className="footer-copy">&copy; 2026 Kyle Littlestar</span>
        <span className="footer-tagline">Design &middot; Code &middot; Create</span>
        <div className="footer-links">
          <Link href="/faq" className="footer-link">FAQ</Link>
          <Link href="/privacy-policy" className="footer-link">Privacy Policy</Link>
        </div>
      </footer>

      <div className="mobile-cta">
        <Link href="/contact">Get in Touch &rarr;</Link>
      </div>
    </>
  );
}
