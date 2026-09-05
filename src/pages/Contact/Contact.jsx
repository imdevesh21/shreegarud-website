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
      <ContactForm />
    </>
  );
}
