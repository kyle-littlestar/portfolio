export function Footer() {
  return (
    <>
      <style>{`
        .site-footer {
          padding: 32px 48px;
          border-top: var(--border-w) solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
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
        }

        @media (max-width: 768px) {
          .site-footer {
            padding: 24px 20px;
            flex-direction: column;
            gap: 8px;
            text-align: center;
          }
        }
      `}</style>

      <footer className="site-footer">
        <span className="footer-copy">&copy; 2026 Kyle Littlestar</span>
        <span className="footer-tagline">Design &middot; Code &middot; Create</span>
      </footer>
    </>
  );
}
