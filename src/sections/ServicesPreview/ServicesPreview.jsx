import { Link } from "react-router-dom";
import { services } from "../../data/services";
import "./ServicesPreview.css";

// Homepage shows exactly 4 flagship services with SHORT descriptions only.
// Full 10-service grid with long descriptions lives on /services.
const FEATURED_SLUGS = [
  "rental-laptop-desktop",
  "networking-solutions",
  "cloud-solutions",
  "security-solutions",
];

export default function ServicesPreview() {
  const featured = services.filter((s) => FEATURED_SLUGS.includes(s.slug));

  return (
    <section className="services-preview">
      <div className="services-preview__inner">
        <h2>What we do</h2>
        <div className="services-preview__grid">
          {featured.map((service) => (
            <article key={service.slug} className="service-card">
              <h3>{service.title}</h3>
              <p>{service.shortDescription}</p>
              <Link to={`/services/${service.slug}`}>Learn more →</Link>
            </article>
          ))}
        </div>
        <Link to="/services" className="services-preview__view-all">
          View all 10 services
        </Link>
      </div>
    </section>
  );
}
