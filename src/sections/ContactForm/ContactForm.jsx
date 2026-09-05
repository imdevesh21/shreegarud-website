import { useState } from "react";
import { submitContactForm } from "../../api/contact";
import { buildWhatsAppLink, company } from "../../data/company";
import "./ContactForm.css";

const initialForm = { name: "", email: "", phone: "", message: "", website: "" };
// `website` is a honeypot field — real users never fill it, bots often do.

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Name is required.";
    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!form.message.trim()) nextErrors.message = "Please add a short message.";
    return nextErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot tripped — silently succeed without hitting the backend.
    if (form.website) {
      setStatus("success");
      return;
    }

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("loading");
    try {
      await submitContactForm(form);
      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
    }
  };

  const whatsappFallback = buildWhatsAppLink(
    "Hi, I tried the contact form but wanted to reach out directly."
  );

  return (
    <section className="contact-form" id="contact">
      <div className="contact-form__inner">
        <h2>Grow your business with our expertise</h2>

        <form onSubmit={handleSubmit} noValidate>
          {/* Honeypot — hidden from real users via CSS, not display:none (bots skip those) */}
          <div className="contact-form__honeypot" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex="-1"
              autoComplete="off"
              value={form.website}
              onChange={handleChange}
            />
          </div>

          <div className="contact-form__field">
            <label htmlFor="name">Name (required)</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              disabled={status === "loading"}
            />
            {errors.name && <span className="contact-form__error">{errors.name}</span>}
          </div>

          <div className="contact-form__field">
            <label htmlFor="email">Email address (required)</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              disabled={status === "loading"}
            />
            {errors.email && <span className="contact-form__error">{errors.email}</span>}
          </div>

          <div className="contact-form__field">
            <label htmlFor="phone">Phone (optional)</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              disabled={status === "loading"}
            />
          </div>

          <div className="contact-form__field">
            <label htmlFor="message">Your message</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={form.message}
              onChange={handleChange}
              disabled={status === "loading"}
            />
            {errors.message && (
              <span className="contact-form__error">{errors.message}</span>
            )}
          </div>

          <button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Sending…" : "Send message"}
          </button>

          {status === "success" && (
            <p className="contact-form__status contact-form__status--success">
              Thanks — our team will connect with you shortly, or call{" "}
              {company.phoneDisplay}.
            </p>
          )}

          {status === "error" && (
            <p className="contact-form__status contact-form__status--error">
              Something went wrong sending your message. Please try again, or{" "}
              <a href={whatsappFallback} target="_blank" rel="noopener noreferrer">
                message us on WhatsApp
              </a>{" "}
              instead.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
