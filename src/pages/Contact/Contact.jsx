import ContactForm from "../../sections/ContactForm/ContactForm";
import { company } from "../../data/company";

export default function Contact() {
  return (
    <>
      <section style={{ padding: "4rem 1.5rem 0" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <h1>Contact us</h1>
          <p style={{ color: "var(--color-text-muted)", marginTop: "1rem" }}>
            {company.address.line1}, {company.address.line2}
            <br />
            {company.phoneDisplay} · {company.email}
          </p>
        </div>
      </section>

      <section style={{ padding: "2rem 1.5rem 0" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <iframe
            src={company.address.mapEmbedUrl}
            width="100%"
            height="360"
            style={{ border: 0, borderRadius: "12px" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Shree Garud IT Solutions location"
          />
        </div>
      </section>

      <ContactForm />
    </>
  );
}
