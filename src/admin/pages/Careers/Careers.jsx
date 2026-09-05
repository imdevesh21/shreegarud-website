import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { adminApi } from "../../api/adminApi";
import "./Careers.css";

const emptyForm = {
  title: "",
  department: "",
  location: "",
  employment_type: "Full-time",
  description: "",
  requirements: "",
};

function ApplicationsPanel({ jobId, token, logout }) {
  const [applications, setApplications] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    adminApi
      .getJobApplications(token, jobId)
      .then((data) => setApplications(data.applications))
      .catch((err) => {
        if (err.isAuthError) return logout();
        setError(err.message);
      });
  }, [jobId, token, logout]);

  if (error) return <p className="careers-admin__error">{error}</p>;
  if (!applications) return <p>Loading applications…</p>;
  if (applications.length === 0) return <p className="careers-admin__empty">No applications yet.</p>;

  return (
    <ul className="careers-admin__applications">
      {applications.map((app) => (
        <li key={app.id}>
          <strong>{app.applicant_name}</strong>
          <span>{app.email}{app.phone ? ` · ${app.phone}` : ""}</span>
          {app.cover_note && <p>{app.cover_note}</p>}
          <time>{new Date(app.submitted_at).toLocaleString()}</time>
        </li>
      ))}
    </ul>
  );
}

export default function Careers() {
  const { token, logout } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [expandedJobId, setExpandedJobId] = useState(null);

  const load = () => {
    adminApi
      .getJobsAdmin(token)
      .then((data) => setJobs(data.jobs))
      .catch((err) => {
        if (err.isAuthError) return logout();
        setError(err.message);
      });
  };

  useEffect(load, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCreate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await adminApi.createJob(token, form);
      setForm(emptyForm);
      load();
    } catch (err) {
      if (err.isAuthError) return logout();
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (job) => {
    const nextActive = job.is_active ? 0 : 1;
    setJobs((prev) => prev.map((j) => (j.id === job.id ? { ...j, is_active: nextActive } : j)));
    try {
      await adminApi.updateJob(token, job.id, { is_active: nextActive });
    } catch (err) {
      if (err.isAuthError) return logout();
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Careers</h1>
      <p className="careers-admin__subtitle">
        Manage job postings and review applications. Closing a posting hides it from the
        public careers page without deleting its history.
      </p>

      {error && <p className="careers-admin__error">{error}</p>}

      <form className="careers-admin__new-form" onSubmit={handleCreate}>
        <div className="careers-admin__new-row">
          <input
            placeholder="Job title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            placeholder="Department"
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
          />
          <input
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
          <select
            value={form.employment_type}
            onChange={(e) => setForm({ ...form, employment_type: e.target.value })}
          >
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Internship</option>
          </select>
        </div>
        <textarea
          placeholder="Role description"
          rows={2}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <textarea
          placeholder="Requirements"
          rows={2}
          value={form.requirements}
          onChange={(e) => setForm({ ...form, requirements: e.target.value })}
        />
        <button type="submit" disabled={saving}>
          {saving ? "Posting…" : "Post job"}
        </button>
      </form>

      <div className="careers-admin__list">
        {jobs.map((job) => (
          <div key={job.id} className={`careers-admin__card ${!job.is_active ? "is-inactive" : ""}`}>
            <div className="careers-admin__card-header">
              <div>
                <h3>{job.title}</h3>
                <p>{job.department} · {job.location} · {job.employment_type}</p>
              </div>
              <div className="careers-admin__card-actions">
                <button
                  className="careers-admin__toggle"
                  onClick={() => toggleActive(job)}
                >
                  {job.is_active ? "Active" : "Closed"}
                </button>
                <button
                  className="careers-admin__expand"
                  onClick={() => setExpandedJobId(expandedJobId === job.id ? null : job.id)}
                >
                  {expandedJobId === job.id ? "Hide applications" : "View applications"}
                </button>
              </div>
            </div>
            {expandedJobId === job.id && (
              <div className="careers-admin__applications-wrap">
                <ApplicationsPanel jobId={job.id} token={token} logout={logout} />
              </div>
            )}
          </div>
        ))}
        {jobs.length === 0 && <p className="careers-admin__empty">No job postings yet.</p>}
      </div>
    </div>
  );
}
