import { company } from "../../data/company";
import "./PrivacyPolicy.css";

export default function PrivacyPolicy() {
  return (
    <section className="policy-page">
      <div className="policy-page__inner">
        <h1>Privacy Policy for Shree Garud</h1>

        <h2>1. Information We Collect</h2>
        <p>
          We collect different types of information from users to provide
          and improve our services. The types of information we collect
          include:
        </p>
        <p>
          <strong>Personal Information:</strong> When you register on our
          website, inquire about properties, or contact us, we may collect:
        </p>
        <ul>
          <li>Full Name</li>
          <li>Email Address</li>
          <li>Phone Number</li>
          <li>Address</li>
          <li>Payment Information (for services, if applicable)</li>
          <li>Government-issued ID (if required for legal verifications)</li>
        </ul>
        <p>
          <strong>Non-Personal Information:</strong> We may also collect
          non-personal data automatically when you visit our website, such
          as:
        </p>
        <ul>
          <li>IP Address</li>
          <li>Browser Type</li>
          <li>Device Information</li>
          <li>Referring URL</li>
          <li>Pages Visited</li>
          <li>Time and Date of Visit</li>
        </ul>
        <p>
          <strong>Cookies and Tracking Technologies:</strong> We use
          cookies, web beacons, and other tracking technologies to enhance
          your browsing experience and analyze website traffic. You can
          manage cookie preferences through your browser settings.
        </p>

        <h2>2. How We Use Your Information</h2>
        <p>We use the collected information for various purposes, including:</p>
        <ul>
          <li>Providing and personalizing our services</li>
          <li>Responding to inquiries and customer service requests</li>
          <li>Sending promotional emails and newsletters (if opted-in)</li>
          <li>Improving our website functionality and user experience</li>
          <li>Conducting market research and analytics</li>
          <li>Processing transactions and payments</li>
          <li>Preventing fraud and ensuring website security</li>
          <li>Complying with legal obligations</li>
        </ul>

        <h2>3. How We Share Your Information</h2>
        <p>
          We do not sell or rent your personal information. However, we
          may share your data in the following circumstances:
        </p>
        <ul>
          <li>
            <strong>Service Providers:</strong> We may share your
            information with third-party vendors and service providers who
            assist us in running our business, such as hosting services,
            payment processors, and marketing agencies.
          </li>
          <li>
            <strong>Legal Compliance:</strong> We may disclose your
            personal information if required by law, in response to legal
            processes, or to protect our rights and interests.
          </li>
          <li>
            <strong>Business Transfers:</strong> In the event of a merger,
            sale, or acquisition, your data may be transferred to the new
            entity to ensure continuity of services.
          </li>
          <li>
            <strong>Third-Party Advertising and Analytics:</strong> We may
            use third-party advertising networks and analytics providers
            to display ads and analyze user behavior. These providers may
            use cookies to collect data about your online activities.
          </li>
        </ul>

        <h2>4. Data Security Measures</h2>
        <p>
          We take appropriate security measures to protect your personal
          information from unauthorized access, alteration, disclosure, or
          destruction. These measures include:
        </p>
        <ul>
          <li>Encryption of sensitive data</li>
          <li>Secure servers and firewalls</li>
          <li>Regular security audits</li>
          <li>Restricted access to personal data</li>
        </ul>

        <h2>5. User Rights and Choices</h2>
        <p>As a user, you have the following rights regarding your personal data:</p>
        <ul>
          <li>
            <strong>Access:</strong> You can request access to the
            personal data we hold about you.
          </li>
          <li>
            <strong>Correction:</strong> You can update or correct
            inaccurate information.
          </li>
          <li>
            <strong>Deletion:</strong> You may request the deletion of
            your data, subject to legal obligations.
          </li>
          <li>
            <strong>Opt-Out:</strong> You can opt out of receiving
            marketing communications at any time.
          </li>
          <li>
            <strong>Data Portability:</strong> You can request a copy of
            your data in a structured format.
          </li>
        </ul>

        <h2>6. Third-Party Links</h2>
        <p>
          Our website may contain links to third-party websites. We are
          not responsible for their privacy policies or content. We
          encourage you to review their policies before providing personal
          information.
        </p>

        <h2>7. Children's Privacy</h2>
        <p>
          Our services are not intended for children under the age of 18.
          We do not knowingly collect personal information from minors. If
          we become aware that we have collected data from a child, we
          will take steps to remove it promptly.
        </p>

        <h2>8. Data Retention</h2>
        <p>
          We retain your personal information for as long as necessary to
          fulfill the purposes outlined in this Privacy Policy unless a
          longer retention period is required by law. When no longer
          needed, your data is securely deleted.
        </p>

        <h2>9. International Data Transfers</h2>
        <p>
          If you access our services from outside India, your information
          may be transferred to and processed in India, where data
          protection laws may differ from those in your country. By using
          our website, you consent to such transfers.
        </p>

        <h2>10. Updates to This Privacy Policy</h2>
        <p>
          We may update this Privacy Policy periodically to reflect
          changes in our practices or legal requirements. The latest
          version will always be available on our website, and we
          encourage users to review it regularly.
        </p>

        <h2>Contact Us</h2>
        <p>
          For any privacy-related queries, please contact us at{" "}
          <a href={`mailto:${company.email}`}>{company.email}</a>.
        </p>
      </div>
    </section>
  );
}
