import { buildWhatsAppLink } from "../../data/company";
import "./ServiceDetail.css";

export default function ServiceDetail({ service }) {
  const quoteLink = buildWhatsAppLink(
    `Hi, I'd like a quote for ${service.title}.`
  );

  return (
    <section className="service-detail">
      <div className="service-detail__inner">
        <h1>{service.title}</h1>
        <p className="service-detail__long">{service.longDescription}</p>

        <ul className="service-detail__highlights">
          {service.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>

        <a
          href={quoteLink}
          target="_blank"
          rel="noopener noreferrer"
          className="service-detail__cta"
        >
          Get a quote for {service.title}
        </a>
      </div>
    </section>
  );
}
