"use client";

import { useState } from "react";
import { Nav } from "@/components/Nav";

const PROJECT_TYPES = [
  "Brand Identity",
  "Motion Design",
  "UI/UX Design",
  "Photography",
  "Multiple Disciplines",
  "Other",
];

const BUDGET_RANGES = [
  "Under $1,000",
  "$1,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000 – $25,000",
  "$25,000+",
  "Let's discuss",
];

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
  projectType: string;
  budget: string;
};

type Status = "idle" | "sending" | "success" | "error";

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
    projectType: "",
    budget: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  const update = (field: keyof FormState, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      const res = await fetch("https://6kk0glpa27.execute-api.us-east-1.amazonaws.com/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "", projectType: "", budget: "" });
    } catch {
      setStatus("error");
    }
  };

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

        main { padding-top: 89px; }

        .page-header {
          padding: 64px 48px 48px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          border-bottom: 1px solid var(--border);
          align-items: end;
        }

        .page-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(48px, 7vw, 96px);
          font-weight: 300;
          line-height: 0.9;
          letter-spacing: -0.02em;
        }

        .page-title em {
          font-style: italic;
          color: var(--accent);
        }

        .page-intro {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 300;
          font-style: italic;
          color: var(--warm-gray);
          line-height: 1.6;
          padding-bottom: 8px;
        }

        /* FORM LAYOUT */
        .form-wrapper {
          display: grid;
          grid-template-columns: 1fr 380px;
          min-height: calc(100vh - 250px);
        }

        .form-main {
          padding: 64px 48px;
          border-right: 1px solid var(--border);
        }

        .form-sidebar {
          padding: 64px 48px;
          display: flex;
          flex-direction: column;
          gap: 48px;
        }

        /* FORM FIELDS */
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 32px;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 32px;
        }

        .form-field.full { margin-bottom: 32px; }

        .field-label {
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--warm-gray);
        }

        .field-required {
          color: var(--accent);
          margin-left: 2px;
        }

        .field-input {
          font-family: 'DM Mono', monospace;
          font-size: 14px;
          color: var(--ink);
          background: transparent;
          border: none;
          border-bottom: 1px solid var(--border);
          padding: 12px 0;
          outline: none;
          transition: border-color 0.2s;
          width: 100%;
        }

        .field-input:focus { border-color: var(--ink); }
        .field-input::placeholder { color: var(--border); }

        .field-textarea {
          font-family: 'DM Mono', monospace;
          font-size: 14px;
          color: var(--ink);
          background: transparent;
          border: none;
          border-bottom: 1px solid var(--border);
          padding: 12px 0;
          outline: none;
          resize: none;
          transition: border-color 0.2s;
          width: 100%;
          min-height: 140px;
        }

        .field-textarea:focus { border-color: var(--ink); }
        .field-textarea::placeholder { color: var(--border); }

        /* SELECT CHIPS */
        .chip-group {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .chip {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.08em;
          padding: 8px 16px;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--warm-gray);
          cursor: pointer;
          transition: all 0.2s;
        }

        .chip:hover { border-color: var(--ink); color: var(--ink); }

        .chip.selected {
          background: var(--ink);
          color: var(--cream);
          border-color: var(--ink);
        }

        /* SUBMIT */
        .submit-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 48px;
          padding-top: 32px;
          border-top: 1px solid var(--border);
        }

        .submit-note {
          font-size: 11px;
          letter-spacing: 0.08em;
          color: var(--warm-gray);
        }

        .submit-btn {
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--cream);
          background: var(--ink);
          border: none;
          padding: 16px 40px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .submit-btn:hover { background: var(--accent); }
        .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .submit-arrow { transition: transform 0.2s; }
        .submit-btn:hover .submit-arrow { transform: translateX(4px); }

        /* SUCCESS / ERROR */
        .status-success {
          padding: 20px 24px;
          border: 1px solid #4CAF50;
          background: rgba(76, 175, 80, 0.06);
          margin-bottom: 32px;
        }

        .status-error {
          padding: 20px 24px;
          border: 1px solid var(--accent);
          background: rgba(200, 89, 58, 0.06);
          margin-bottom: 32px;
        }

        .status-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 300;
          line-height: 1.5;
        }

        /* SIDEBAR INFO */
        .sidebar-item {
          border-top: 1px solid var(--border);
          padding-top: 24px;
        }

        .sidebar-label {
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--warm-gray);
          margin-bottom: 10px;
        }

        .sidebar-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          font-weight: 300;
          color: var(--ink);
          line-height: 1.4;
        }

        .sidebar-value a {
          color: var(--ink);
          text-decoration: none;
          border-bottom: 1px solid var(--border);
          transition: border-color 0.2s;
        }

        .sidebar-value a:hover { border-color: var(--accent); color: var(--accent); }

        .sidebar-quote {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 300;
          font-style: italic;
          line-height: 1.4;
          color: var(--ink);
          margin-top: 48px;
        }

        .sidebar-quote em { color: var(--accent); }

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
          .page-header { grid-template-columns: 1fr; padding: 40px 24px 32px; }
          .form-wrapper { grid-template-columns: 1fr; }
          .form-main { padding: 40px 24px; border-right: none; border-bottom: 1px solid var(--border); }
          .form-sidebar { padding: 40px 24px; }
          .form-row { grid-template-columns: 1fr; gap: 0; }
          .footer { padding: 24px; flex-direction: column; gap: 8px; text-align: center; }
        }
      `}</style>

      <Nav activePage="contact" />

      <main>
        {/* PAGE HEADER */}
        <div className="page-header">
          <h1 className="page-title">
            Get in<br /><em>Touch</em>
          </h1>
          <p className="page-intro">
            Have a project in mind? I'd love to hear about it. Fill out the form and I'll get back to you within 48 hours.
          </p>
        </div>

        <div className="form-wrapper">
          {/* FORM */}
          <div className="form-main">

            {status === "success" && (
              <div className="status-success">
                <p className="status-text">Thank you — your message has been sent. I'll be in touch within 48 hours.</p>
              </div>
            )}

            {status === "error" && (
              <div className="status-error">
                <p className="status-text">Something went wrong. Please try again or email me directly.</p>
              </div>
            )}

            {/* Name + Email */}
            <div className="form-row">
              <div className="form-field">
                <label className="field-label">Name <span className="field-required">*</span></label>
                <input
                  className="field-input"
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={e => update("name", e.target.value)}
                />
              </div>
              <div className="form-field">
                <label className="field-label">Email <span className="field-required">*</span></label>
                <input
                  className="field-input"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={e => update("email", e.target.value)}
                />
              </div>
            </div>

            {/* Subject */}
            <div className="form-field full">
              <label className="field-label">Subject</label>
              <input
                className="field-input"
                type="text"
                placeholder="What's this about?"
                value={form.subject}
                onChange={e => update("subject", e.target.value)}
              />
            </div>

            {/* Project Type */}
            <div className="form-field full">
              <label className="field-label">Project Type</label>
              <div className="chip-group">
                {PROJECT_TYPES.map(type => (
                  <button
                    key={type}
                    className={`chip ${form.projectType === type ? "selected" : ""}`}
                    onClick={() => update("projectType", form.projectType === type ? "" : type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div className="form-field full">
              <label className="field-label">Budget Range</label>
              <div className="chip-group">
                {BUDGET_RANGES.map(range => (
                  <button
                    key={range}
                    className={`chip ${form.budget === range ? "selected" : ""}`}
                    onClick={() => update("budget", form.budget === range ? "" : range)}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="form-field full">
              <label className="field-label">Message <span className="field-required">*</span></label>
              <textarea
                className="field-textarea"
                placeholder="Tell me about your project, timeline, and any other details..."
                value={form.message}
                onChange={e => update("message", e.target.value)}
              />
            </div>

            {/* Submit */}
            <div className="submit-row">
              <span className="submit-note">* Required fields</span>
              <button
                className="submit-btn"
                onClick={handleSubmit}
                disabled={status === "sending" || !form.name || !form.email || !form.message}
              >
                {status === "sending" ? "Sending..." : "Send Message"}
                <span className="submit-arrow">→</span>
              </button>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="form-sidebar">
            <p className="sidebar-quote">
              Great work starts with a <em>great conversation.</em>
            </p>

            <div className="sidebar-item">
              <p className="sidebar-label">Email</p>
              <p className="sidebar-value">
                <a href="mailto:hello@kylelittlestar.com">hello@kylelittlestar.com</a>
              </p>
            </div>

            <div className="sidebar-item">
              <p className="sidebar-label">Response Time</p>
              <p className="sidebar-value">Within 48 hours</p>
            </div>

            <div className="sidebar-item">
              <p className="sidebar-label">Available For</p>
              <p className="sidebar-value">Freelance · Collaboration<br />Full-time Opportunities</p>
            </div>

            <div className="sidebar-item">
              <p className="sidebar-label">Based</p>
              <p className="sidebar-value">Wherever the work takes me</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <span className="footer-copy">© 2024 Kyle Littlestar. All rights reserved.</span>
        <span className="footer-tagline">Type enthusiast & adventurist</span>
      </footer>
    </>
  );
}
