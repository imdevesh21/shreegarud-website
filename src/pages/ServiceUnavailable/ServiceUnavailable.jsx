import { buildWhatsAppLink, company } from "../../data/company";
import "./ServiceUnavailable.css";

export default function ServiceUnavailable({ message }) {
  const helpLink = buildWhatsAppLink(
    "Hi, I'm having trouble accessing your website right now."
  );

  return (
    <section className="status-page">
      <div className="status-page__inner">
        <span className="status-page__code">503</span>
        <h1>Service temporarily unavailable</h1>
        <p>
          {message ||
            "We're having trouble loading this right now. Please try again in a moment."}
        </p>
        <div className="status-page__actions">
          <button
            className="status-page__btn status-page__btn--primary"
            onClick={() => window.location.reload()}
          >
            Try again
          </button>
          <a
            href={helpLink}
            target="_blank"
            rel="noopener noreferrer"
            className="status-page__btn status-page__btn--whatsapp"
          >
            Chat with us on WhatsApp
          </a>
        </div>
        <p className="status-page__fallback">
          Or reach us directly at{" "}
          <a href={`mailto:${company.email}`}>{company.email}</a> /{" "}
          {company.phoneDisplay}
        </p>
      </div>
    </section>
  );
}
