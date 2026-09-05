import { Link } from "react-router-dom";
import { services } from "../../data/services";
import "./Services.css";

export default function Services() {
  return (
    <section className="services-page">
      <div className="services-page__inner">
        <h1>Our Services</h1>
        <p className="services-page__intro">
          Ten IT service lines built to cover everything your business needs
          to run reliably and grow securely.
        </p>
        <div className="services-page__grid">
          {services.map((service) => (
            <Link
              key={service.slug}
              to={`/services/${service.slug}`}
              className="services-page__card"
            >
              <h2>{service.title}</h2>
              <p>{service.shortDescription}</p>
              <span>Learn more →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
