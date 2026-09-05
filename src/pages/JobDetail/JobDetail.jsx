import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getJob, applyToJob } from "../../api/careers";
import "./JobDetail.css";

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [form, setForm] = useState({ applicant_name: "", email: "", phone: "", cover_note: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    getJob(id)
      .then((data) => setJob(data.job))
      .catch((err) => setLoadError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const validate = () => {
    const next = {};
    if (!form.applicant_name.trim()) next.applicant_name = "Name is required.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "A valid email is required.";
    }
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("loading");
    try {
      await applyToJob(id, form);
      setStatus("success");
    } catch (err) {
      setSubmitError(err.message);
      setStatus("error");
    }
  };

  if (loading) return <p className="job-detail__loading">Loading role…</p>;
  if (loadError) {
    return (
      <div className="job-detail__missing">
        <p>{loadError}</p>
        <Link to="/careers">← Back to all roles</Link>
      </div>
    );
  }

  return (
    <section className="job-detail">
      <div className="job-detail__inner">
        <Link to="/careers" className="job-detail__back">
          ← Back to all roles
        </Link>

        <h1>{job.title}</h1>
        <p className="job-detail__meta">
          {job.department} · {job.location} · {job.employment_type}
        </p>

        <div className="job-detail__section">
          <h2>About the role</h2>
          <p>{job.description}</p>
        </div>

        {job.requirements && (
          <div className="job-detail__section">
            <h2>What we're looking for</h2>
            <p>{job.requirements}</p>
          </div>
        )}

        <div className="job-detail__apply">
          <h2>Apply for this role</h2>

          {status === "success" ? (
            <p className="job-detail__success">
              Thanks for applying — our team will review your application and reach out if
              it's a fit.
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <label htmlFor="applicant_name">Full name</label>
              <input
                id="applicant_name"
                value={form.applicant_name}
                onChange={(e) => setForm({ ...form, applicant_name: e.target.value })}
                disabled={status === "loading"}
              />
              {errors.applicant_name && <span>{errors.applicant_name}</span>}

              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                disabled={status === "loading"}
              />
              {errors.email && <span>{errors.email}</span>}

              <label htmlFor="phone">Phone (optional)</label>
              <input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                disabled={status === "loading"}
              />

              <label htmlFor="cover_note">Why you'd be a good fit (optional)</label>
              <textarea
                id="cover_note"
                rows={4}
                value={form.cover_note}
                onChange={(e) => setForm({ ...form, cover_note: e.target.value })}
                disabled={status === "loading"}
              />

              <p className="job-detail__resume-note">
                Resume upload isn't wired up yet — mention how to reach you above and we'll
                follow up for a resume by email.
              </p>

              {status === "error" && <span className="job-detail__submit-error">{submitError}</span>}

              <button type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Submitting…" : "Submit application"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
