import { Link } from "react-router-dom";
import { services } from "../../data/services";
import { company } from "../../data/company";
import Newsletter from "../../sections/Newsletter/Newsletter";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__column">
          <h3>{company.name}</h3>
          <p>{company.address.line1}</p>
          <p>{company.address.line2}</p>
          <p>{company.phoneDisplay}</p>
          <p>{company.email}</p>
          <p className="footer__hours">
            {company.hours.weekdays}
            <br />
            {company.hours.sunday}
          </p>
        </div>

        <div className="footer__column">
          <h4>Services</h4>
          <ul>
            {services.map((service) => (
              <li key={service.slug}>
                <Link to={`/services/${service.slug}`}>{service.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__column">
          <h4>Company</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/services">All Services</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <Link to="/careers">Careers</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/refund">Refund Policy</Link>
            </li>
          </ul>

          <div className="footer__social">
            <a href={company.social.facebook} target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
            <a href={company.social.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href={company.social.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </div>

        <div className="footer__column">
          <Newsletter compact />
        </div>
      </div>

      <div className="footer__bottom">
        <p>
          © {new Date().getFullYear()} {company.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
