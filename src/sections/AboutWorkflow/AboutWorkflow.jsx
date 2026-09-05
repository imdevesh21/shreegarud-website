import "./AboutWorkflow.css";

const steps = [
  {
    title: "Discovery",
    description: "We learn your business, systems, and pain points.",
  },
  {
    title: "Solution Design",
    description: "We design an IT solution tailored to your goals and budget.",
  },
  {
    title: "Implementation",
    description: "Our team installs, configures, and tests everything.",
  },
  {
    title: "Ongoing Support",
    description: "We monitor, maintain, and support your systems long-term.",
  },
];

export default function AboutWorkflow() {
  return (
    <section className="workflow">
      <div className="workflow__inner">
        <h2>How we work</h2>
        <ol className="workflow__steps">
          {steps.map((step, i) => (
            <li key={step.title} className="workflow__step">
              <span className="workflow__step-number">{i + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
