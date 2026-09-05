import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { services } from "../../data/services";
import { buildWhatsAppLink } from "../../data/company";
import "./Header.css";

export default function Header() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const quoteLink = buildWhatsAppLink(
    "Hi, I'd like to get a quote for your IT services."
  );

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__logo">
          Shree Garud IT Solutions
        </Link>

        <nav className={`header__nav ${mobileOpen ? "is-open" : ""}`}>
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/about">About</NavLink>

          <div
            className="header__services-dropdown"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <NavLink to="/services">Services</NavLink>
            {servicesOpen && (
              <div className="header__mega-menu">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    to={`/services/${service.slug}`}
                    className="header__mega-menu-item"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/careers">Careers</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        <div className="header__actions">
          <a
            href={quoteLink}
            target="_blank"
            rel="noopener noreferrer"
            className="header__cta"
          >
            Get a Quote
          </a>
          <button
            className="header__mobile-toggle"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle navigation"
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}
