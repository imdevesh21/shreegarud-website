import { testimonials } from "../../data/testimonials";
import "./Testimonials.css";

function Stars({ rating }) {
  return (
    <div className="testimonial-card__stars" aria-label={`${rating} out of 5 stars`}>
      {"★".repeat(rating)}
      {"☆".repeat(5 - rating)}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="testimonials__inner">
        <h2>What our clients say</h2>
        <div className="testimonials__grid">
          {testimonials.map((t) => (
            <article key={t.name} className="testimonial-card">
              <Stars rating={t.rating} />
              <p className="testimonial-card__quote">&ldquo;{t.quote}&rdquo;</p>
              <p className="testimonial-card__name">
                {t.name}
                {t.company && <span> · {t.company}</span>}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
