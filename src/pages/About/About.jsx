import AboutWorkflow from "../../sections/AboutWorkflow/AboutWorkflow";
import TeamGrid from "../../sections/TeamGrid/TeamGrid";
import PartnerScroller from "../../sections/PartnerScroller/PartnerScroller";

export default function About() {
  return (
    <>
      <section style={{ padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <h1>About Shree Garud IT Solutions</h1>
          <p style={{ color: "var(--color-text-muted)", marginTop: "1rem" }}>
            Founded in October 2019, we deliver exceptional IT services
            tailored to small, mid-sized, and enterprise-level organizations —
            combining cutting-edge technology with unparalleled support.
          </p>
        </div>
      </section>
      <AboutWorkflow />
      <TeamGrid />
      <PartnerScroller />
    </>
  );
}
