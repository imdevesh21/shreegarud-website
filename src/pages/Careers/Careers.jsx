import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getJobs } from "../../api/careers";
import "./Careers.css";

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getJobs()
      .then((data) => setJobs(data.jobs))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="careers">
      <div className="careers__inner">
        <h1>Careers at Shree Garud IT Solutions</h1>
        <p className="careers__intro">
          We're growing — join a team that keeps businesses across Gurugram running.
        </p>

        {loading && <p>Loading open roles…</p>}
        {error && <p className="careers__error">{error}</p>}

        {!loading && !error && jobs.length === 0 && (
          <p className="careers__empty">
            No open positions right now — check back soon, or reach out anyway if you think
            you'd be a great fit.
          </p>
        )}

        <div className="careers__list">
          {jobs.map((job) => (
            <Link key={job.id} to={`/careers/${job.id}`} className="careers__card">
              <div>
                <h2>{job.title}</h2>
                <p className="careers__meta">
                  {job.department} · {job.location} · {job.employment_type}
                </p>
              </div>
              <span>View role →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

