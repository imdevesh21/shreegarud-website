import { partners } from "../../data/partners";
import "./PartnerScroller.css";

// Lightweight CSS-only infinite scroll (no JS animation library needed).
// Duplicates the list once so the loop is seamless.
export default function PartnerScroller() {
  const track = [...partners, ...partners];

  return (
    <section className="partner-scroller">
      <div className="partner-scroller__inner">
        <p className="partner-scroller__label">Trusted by teams working with</p>
        <div className="partner-scroller__track-wrap">
          <div className="partner-scroller__track">
            {track.map((partner, i) => (
              <img
                key={`${partner.name}-${i}`}
                src={partner.logo}
                alt={partner.name}
                loading="lazy"
                width="120"
                height="32"
                className="partner-scroller__logo"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
