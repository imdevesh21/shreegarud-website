import { team } from "../../data/team";
import "./TeamGrid.css";

export default function TeamGrid() {
  return (
    <section className="team-grid">
      <div className="team-grid__inner">
        <h2>Meet the team</h2>
        <div className="team-grid__grid">
          {team.map((member) => (
            <article
              key={member.name}
              className={`team-card ${member.isFounder ? "team-card--founder" : ""}`}
            >
              <img src={member.photo} alt={member.name} loading="lazy" width="300" height="300" />
              <h3>{member.name}</h3>
              <p>{member.title}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
