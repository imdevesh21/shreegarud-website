import { buildWhatsAppLink } from "../../data/company";
import Laptop3D from "../../components/common/Laptop3D/Laptop3D";
import "./Hero.css";

export default function Hero() {
  const quoteLink = buildWhatsAppLink(
    "Hi, I'd like to talk about IT solutions for my business."
  );

  return (
    <section className="hero">
      <div className="hero__inner">
        <div className="hero__copy">
          <h1 className="hero__title">
            Empowering growth with innovative IT solutions
          </h1>
          <p className="hero__subtitle">
            Cutting-edge devices, simplified systems, and strategic
            partnerships that keep your business competitive.
          </p>
          <div className="hero__actions">
            <a href="#contact" className="hero__cta hero__cta--primary">
              Contact us
            </a>
            <a
              href={quoteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__cta hero__cta--whatsapp"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
        <div className="hero__visual">
          <Laptop3D />
        </div>
      </div>
    </section>
  );
}
