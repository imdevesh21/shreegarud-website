import { Link } from "react-router-dom";
import { buildWhatsAppLink } from "../../data/company";
import "./NotFound.css";

export default function NotFound() {
  const helpLink = buildWhatsAppLink(
    "Hi, I couldn't find a page on your website and need some help."
  );

  return (
    <section className="status-page">
      <div className="status-page__inner">
        <span className="status-page__code">404</span>
        <h1>Page not found</h1>
        <p>
          The page you're looking for doesn't exist, may have been moved,
          or the link might be broken.
        </p>
        <div className="status-page__actions">
          <Link to="/" className="status-page__btn status-page__btn--primary">
            Back to homepage
          </Link>
          <a
            href={helpLink}
            target="_blank"
            rel="noopener noreferrer"
            className="status-page__btn status-page__btn--whatsapp"
          >
            Chat with us on WhatsApp
          </a>
        </div>

        <div className="status-page__links">
          <Link to="/services">Services</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </section>
  );
}
