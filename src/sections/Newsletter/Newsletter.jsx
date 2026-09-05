import { useState } from "react";
import { subscribeToNewsletter } from "../../api/newsletter";
import "./Newsletter.css";

// `compact` renders the tighter footer version; otherwise a full section.
export default function Newsletter({ compact = false }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      await subscribeToNewsletter(email);
      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
    }
  };

  const content = (
    <>
      <h4>Stay in touch</h4>
      <p>Get updates on ongoing offers and upcoming discounts.</p>
      <form onSubmit={handleSubmit} className="newsletter__form">
        <input
          type="email"
          required
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
        />
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Subscribing…" : "Subscribe"}
        </button>
      </form>
      {status === "success" && (
        <p className="newsletter__message newsletter__message--success">
          You're subscribed — thanks!
        </p>
      )}
      {status === "error" && (
        <p className="newsletter__message newsletter__message--error">
          Something went wrong. Please try again.
        </p>
      )}
    </>
  );

  return compact ? (
    <div className="newsletter newsletter--compact">{content}</div>
  ) : (
    <section className="newsletter">
      <div className="newsletter__inner">{content}</div>
    </section>
  );
}
