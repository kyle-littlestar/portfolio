"use client";

import { useState } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

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

        .form-wrapper {
          display: grid;
          grid-template-columns: 1fr 380px;
          min-height: calc(100vh - 250px);
        }

        .form-main {
          padding: 64px 48px;
          border-right: var(--border-w) solid var(--border);
        }

        .form-sidebar {
          padding: 64px 40px;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

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

        .field-label {
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .field-required { color: var(--accent); margin-left: 2px; }

        .field-input {
          font-family: var(--font-body);
          font-size: 14px;
          color: var(--text-primary);
          background: transparent;
          border: none;
          border-bottom: var(--border-w) solid var(--border);
          padding: 12px 0;
          outline: none;
          transition: border-color 0.2s;
          width: 100%;
        }

        .field-input:focus { border-color: var(--accent); }
        .field-input::placeholder { color: var(--text-muted); }

        .field-textarea {
          font-family: var(--font-body);
          font-size: 14px;
          color: var(--text-primary);
          background: transparent;
          border: none;
          border-bottom: var(--border-w) solid var(--border);
          padding: 12px 0;
          outline: none;
          resize: none;
          transition: border-color 0.2s;
          width: 100%;
          min-height: 140px;
        }

        .field-textarea:focus { border-color: var(--accent); }
        .field-textarea::placeholder { color: var(--text-muted); }

        .chip-group {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .chip {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          padding: 8px 16px;
          border: var(--border-w) solid var(--border);
          background: transparent;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.2s;
        }

        .chip:hover { border-color: var(--text-primary); color: var(--text-primary); }
        .chip.selected { background: var(--text-primary); color: var(--bg); border-color: var(--text-primary); }

        .submit-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 48px;
          padding-top: 32px;
          border-top: var(--border-w) solid var(--border);
        }

        .submit-note {
          font-family: var(--font-body);
          font-size: 11px;
          letter-spacing: 0.08em;
          color: var(--text-muted);
        }

        .submit-btn {
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-primary);
          background: var(--accent-bg);
          border: var(--border-w-thick) solid var(--accent-bg);
          padding: 16px 40px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .submit-btn:hover { background: var(--accent-bg-hover); border-color: var(--accent-bg-hover); }
        .submit-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .submit-arrow { transition: transform 0.2s; }
        .submit-btn:hover .submit-arrow { transform: translateX(4px); }

        .status-success {
          padding: 20px 24px;
          border: var(--border-w) solid var(--success);
          background: rgba(74, 122, 74, 0.1);
          margin-bottom: 32px;
        }

        .status-error {
          padding: 20px 24px;
          border: var(--border-w) solid var(--error);
          background: rgba(198, 40, 40, 0.1);
          margin-bottom: 32px;
        }

        .status-text {
          font-family: var(--font-body);
          font-size: 14px;
          line-height: 1.5;
          color: var(--text-secondary);
        }

        .sidebar-quote {
          font-family: var(--font-display);
          font-size: 28px;
          font-weight: 700;
          line-height: 1.2;
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
          font-size: 16px;
          font-weight: 500;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .sidebar-value a {
          color: var(--text-secondary);
          border-bottom: 1px solid var(--border);
          transition: all 0.2s;
        }

        .sidebar-value a:hover { color: var(--accent); border-color: var(--accent); }

        @media (max-width: 900px) {
          .page-header { grid-template-columns: 1fr; padding: 40px 20px 32px; }
          .form-wrapper { grid-template-columns: 1fr; }
          .form-main { padding: 40px 20px; border-right: none; border-bottom: var(--border-w) solid var(--border); }
          .form-sidebar { padding: 40px 20px; }
          .form-row { grid-template-columns: 1fr; gap: 0; }
        }
      `}</style>

      <Nav activePage="contact" />

      <main>
        <div className="page-header">
          <h1 className="page-title">
            Get in<br /><span className="accent">Touch</span>
          </h1>
          <p className="page-intro">
            Have a project in mind? I&apos;d love to hear about it. Fill out the form and I&apos;ll get back to you within 48 hours.
          </p>
        </div>

        <div className="form-wrapper">
          <div className="form-main">
            {status === "success" && (
              <div className="status-success">
                <p className="status-text">Thank you &mdash; your message has been sent. I&apos;ll be in touch within 48 hours.</p>
              </div>
            )}

            {status === "error" && (
              <div className="status-error">
                <p className="status-text">Something went wrong. Please try again or email me directly.</p>
              </div>
            )}

            <div className="form-row">
              <div className="form-field">
                <label className="field-label" htmlFor="contact-name">Name <span className="field-required">*</span></label>
                <input id="contact-name" className="field-input" type="text" placeholder="Your full name" value={form.name} onChange={(e) => update("name", e.target.value)} />
              </div>
              <div className="form-field">
                <label className="field-label" htmlFor="contact-email">Email <span className="field-required">*</span></label>
                <input id="contact-email" className="field-input" type="email" placeholder="your@email.com" value={form.email} onChange={(e) => update("email", e.target.value)} />
              </div>
            </div>

            <div className="form-field">
              <label className="field-label" htmlFor="contact-subject">Subject</label>
              <input id="contact-subject" className="field-input" type="text" placeholder="What's this about?" value={form.subject} onChange={(e) => update("subject", e.target.value)} />
            </div>

            <div className="form-field">
              <label className="field-label">Project Type</label>
              <div className="chip-group">
                {PROJECT_TYPES.map((type) => (
                  <button key={type} className={`chip ${form.projectType === type ? "selected" : ""}`} onClick={() => update("projectType", form.projectType === type ? "" : type)}>
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-field">
              <label className="field-label">Budget Range</label>
              <div className="chip-group">
                {BUDGET_RANGES.map((range) => (
                  <button key={range} className={`chip ${form.budget === range ? "selected" : ""}`} onClick={() => update("budget", form.budget === range ? "" : range)}>
                    {range}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-field">
              <label className="field-label" htmlFor="contact-message">Message <span className="field-required">*</span></label>
              <textarea id="contact-message" className="field-textarea" placeholder="Tell me about your project, timeline, and any other details..." value={form.message} onChange={(e) => update("message", e.target.value)} />
            </div>

            <div className="submit-row">
              <span className="submit-note">* Required fields</span>
              <button className="submit-btn" onClick={handleSubmit} disabled={status === "sending" || !form.name || !form.email || !form.message}>
                {status === "sending" ? "Sending..." : "Send Message"}
                <span className="submit-arrow">&rarr;</span>
              </button>
            </div>
          </div>

          <div className="form-sidebar">
            <p className="sidebar-quote">
              Great work starts with a <span className="accent">great conversation.</span>
            </p>

            <div className="sidebar-item">
              <p className="sidebar-label">Email</p>
              <p className="sidebar-value"><a href="mailto:hello@ltlstar.com">hello@ltlstar.com</a></p>
            </div>

            <div className="sidebar-item">
              <p className="sidebar-label">Response Time</p>
              <p className="sidebar-value">Within 48 hours</p>
            </div>

            <div className="sidebar-item">
              <p className="sidebar-label">Available For</p>
              <p className="sidebar-value">Freelance &middot; Collaboration<br />Full-time Opportunities</p>
            </div>

            <div className="sidebar-item">
              <p className="sidebar-label">Based</p>
              <p className="sidebar-value">Wherever the work takes me</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
