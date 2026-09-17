import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Kyle Littlestar's portfolio site.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <style>{`
        main { padding-top: 76px; }

        .page-header {
          padding: 64px 48px 48px;
          border-bottom: var(--border-w) solid var(--border);
        }

        .page-label {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 16px;
        }

        .page-title {
          font-family: var(--font-display);
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 800;
          line-height: 0.92;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          color: var(--text-primary);
        }

        .page-title .accent { color: var(--accent); }

        .page-updated {
          font-family: var(--font-body);
          font-size: 11px;
          color: var(--text-muted);
          letter-spacing: 0.08em;
          margin-top: 16px;
        }

        .policy-body {
          max-width: 760px;
          margin: 0 auto;
          padding: 64px 48px 96px;
        }

        .policy-body h2 {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: -0.01em;
          color: var(--text-primary);
          margin: 48px 0 16px;
          padding-top: 48px;
          border-top: var(--border-w) solid var(--border);
        }

        .policy-body h2:first-of-type { margin-top: 0; padding-top: 0; border-top: none; }

        .policy-body p {
          font-family: var(--font-body);
          font-size: 14px;
          line-height: 1.9;
          color: var(--text-secondary);
          margin-bottom: 20px;
        }

        .policy-body ul {
          margin: 0 0 20px 20px;
        }

        .policy-body li {
          font-family: var(--font-body);
          font-size: 14px;
          line-height: 1.9;
          color: var(--text-secondary);
          margin-bottom: 8px;
        }

        .policy-body a {
          color: var(--text-primary);
          border-bottom: 1px solid var(--accent);
          transition: color 0.2s;
        }

        .policy-body a:hover { color: var(--accent); }

        @media (max-width: 768px) {
          .page-header { padding: 40px 20px 32px; }
          .policy-body { padding: 40px 20px 64px; }
        }
      `}</style>

      <Nav />

      <main>
        <div className="page-header">
          <p className="page-label">Legal</p>
          <h1 className="page-title">
            Privacy<br /><span className="accent">Policy</span>
          </h1>
          <p className="page-updated">Last updated: March 2026</p>
        </div>

        <div className="policy-body">
          <h2>Overview</h2>
          <p>
            This Privacy Policy describes how Kyle Littlestar (&ldquo;I&rdquo;, &ldquo;me&rdquo;, or &ldquo;my&rdquo;) collects, uses, and protects information when you visit this website (ltlstar.com). I take your privacy seriously and am committed to handling your information responsibly.
          </p>

          <h2>Information I Collect</h2>
          <p>I collect two types of information:</p>
          <ul>
            <li>
              <strong>Information you provide directly</strong> — When you use the contact form, I collect your name, email address, and any other details you choose to share (project type, budget, message). This information is used solely to respond to your inquiry.
            </li>
            <li>
              <strong>Information collected automatically</strong> — This site uses Google Analytics to understand how visitors interact with the site. This includes pages visited, time on site, general location (country/region), browser type, and device type. This data is anonymised and aggregated — it cannot be used to identify you personally.
            </li>
          </ul>

          <h2>How I Use Your Information</h2>
          <p>Information collected is used for the following purposes:</p>
          <ul>
            <li>Responding to enquiries submitted via the contact form</li>
            <li>Understanding site traffic and usage patterns to improve the site</li>
            <li>No information is used for advertising, profiling, or sold to third parties</li>
          </ul>

          <h2>Google Analytics</h2>
          <p>
            This site uses Google Analytics 4 (GA4), a web analytics service provided by Google LLC. Google Analytics uses cookies and similar tracking technologies to collect data about your use of this site. This data is transmitted to and stored by Google on servers which may be located outside your country of residence.
          </p>
          <p>
            You can opt out of Google Analytics tracking by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>.
          </p>

          <h2>Contact Form Data</h2>
          <p>
            Messages submitted via the contact form are processed through a secure AWS Lambda function and delivered to my inbox. I do not store your form submissions beyond what is required to respond to your enquiry. I will not share your information with any third party without your explicit consent.
          </p>

          <h2>Cookies</h2>
          <p>
            This site uses cookies only for Google Analytics purposes. These cookies do not contain personally identifiable information. If you prefer not to have cookies set, you can disable cookies in your browser settings or use the Google Analytics opt-out tool linked above.
          </p>

          <h2>Third-Party Services</h2>
          <p>This site uses the following third-party services:</p>
          <ul>
            <li><strong>Google Analytics</strong> — website analytics (<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>)</li>
            <li><strong>AWS (Amazon Web Services)</strong> — hosting and contact form processing (<a href="https://aws.amazon.com/privacy/" target="_blank" rel="noopener noreferrer">AWS Privacy Policy</a>)</li>
          </ul>

          <h2>Data Retention</h2>
          <p>
            Contact form submissions are retained only as long as necessary to respond to your enquiry. Google Analytics data is retained according to Google&apos;s standard retention policies. You may request deletion of any information you have submitted by contacting me directly.
          </p>

          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Request access to any personal information I hold about you</li>
            <li>Request correction or deletion of your personal information</li>
            <li>Opt out of analytics tracking at any time</li>
          </ul>
          <p>
            To exercise any of these rights, contact me at <a href="mailto:hello@ltlstar.com">hello@ltlstar.com</a>.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            I may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated date. Continued use of the site after changes are posted constitutes acceptance of the updated policy.
          </p>

          <h2>Contact</h2>
          <p>
            If you have any questions about this Privacy Policy, please reach out at <a href="mailto:hello@ltlstar.com">hello@ltlstar.com</a>.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
