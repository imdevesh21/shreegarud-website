import { company } from "../../data/company";
import "./RefundPolicy.css";

export default function RefundPolicy() {
  return (
    <section className="policy-page">
      <div className="policy-page__inner">
        <h1>Refund Policy for Shree Garud</h1>

        <h2>1. Overview</h2>
        <p>
          At Shree Garud IT Solutions Pvt Ltd, we strive to provide
          high-quality services in software development, digital marketing,
          and IT solutions. We value customer satisfaction and have designed
          our refund policy to ensure a fair and transparent process.
        </p>

        <h2>2. Eligibility for Refund</h2>
        <p>Refunds may be considered under the following conditions:</p>
        <ul>
          <li>
            <strong>Service Not Delivered:</strong> If the service has not
            been initiated within the agreed timeframe.
          </li>
          <li>
            <strong>Failure to Meet Agreed Deliverables:</strong> If the
            final deliverable significantly differs from the scope of work
            outlined in the agreement.
          </li>
          <li>
            <strong>Duplicate Payment:</strong> If a customer has been
            charged twice for the same service due to a technical error.
          </li>
        </ul>

        <h2>3. Non-Refundable Cases</h2>
        <p>Refunds will not be issued in the following cases:</p>
        <ul>
          <li>Once a project has been initiated and work has commenced.</li>
          <li>
            If the delay in service delivery is due to a lack of response
            or required inputs from the client.
          </li>
          <li>If the customer changes their mind after making a payment.</li>
          <li>
            For services that have already been completed as per the agreed
            scope of work.
          </li>
        </ul>

        <h2>4. Refund Request Process</h2>
        <p>To request a refund, the customer must:</p>
        <ul>
          <li>
            Email us at{" "}
            <a href={`mailto:${company.email}`}>{company.email}</a> with
            the order details and the reason for the refund request.
          </li>
          <li>
            <strong>Review Process:</strong> Our team will review the
            request within 7 business days and respond with the decision.
          </li>
          <li>
            <strong>Refund Processing:</strong> If approved, the refund
            will be processed within 14 business days using the original
            payment method.
          </li>
        </ul>

        <h2>5. Modifications &amp; Cancellations</h2>
        <ul>
          <li>
            Customers can request modifications to the service before final
            approval, but refunds will not be granted after work has been
            completed.
          </li>
          <li>
            Subscription-based services (if applicable) can be canceled
            anytime, but no refunds will be issued for the ongoing billing
            cycle.
          </li>
        </ul>

        <h2>6. Contact Us</h2>
        <p>For any refund-related queries, please contact us at:</p>
        <p className="policy-page__contact">
          Shree Garud
          <br />
          Website:{" "}
          <a href="https://www.shreegarud.com" target="_blank" rel="noopener noreferrer">
            www.shreegarud.com
          </a>
          <br />
          Email: <a href={`mailto:${company.email}`}>{company.email}</a>
          <br />
          Contact: +91 8527983001
        </p>
      </div>
    </section>
  );
}
