import { buildWhatsAppLink } from "../../data/company";
import "./WhatsAppWidget.css";

// Persistent floating button, bottom-right, all pages.
// Uses the same wa.me + prefilled-message logic as every other
// "Get a Quote" CTA in the app (single source in data/company.js).
export default function WhatsAppWidget() {
  const link = buildWhatsAppLink(
    "Hi, I'm interested in your IT services. Could you help me get started?"
  );

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-widget"
      aria-label="Chat with us on WhatsApp"
    >
      <svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor" aria-hidden="true">
        <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.386.703 4.61 1.912 6.47L4 29l7.72-1.877A11.93 11.93 0 0 0 16 27c6.627 0 12-5.373 12-12S22.628 3 16.001 3zm0 21.818a9.78 9.78 0 0 1-4.99-1.366l-.358-.213-4.583 1.114 1.128-4.47-.234-.372A9.79 9.79 0 0 1 5.182 15c0-5.964 4.854-10.818 10.819-10.818S26.818 9.036 26.818 15 21.965 24.818 16.001 24.818zm5.55-7.29c-.304-.152-1.797-.887-2.076-.988-.279-.101-.482-.152-.685.152-.203.303-.786.987-.964 1.19-.177.203-.354.228-.658.076-.304-.152-1.283-.473-2.444-1.51-.903-.806-1.513-1.801-1.69-2.104-.177-.304-.019-.468.133-.62.137-.136.304-.354.456-.531.152-.177.203-.304.304-.507.101-.203.05-.38-.025-.532-.076-.152-.685-1.653-.939-2.264-.247-.594-.499-.514-.685-.523l-.583-.01c-.203 0-.532.076-.81.38-.279.304-1.064 1.04-1.064 2.54s1.089 2.947 1.24 3.15c.152.203 2.144 3.27 5.19 4.587.725.313 1.29.5 1.732.64.727.231 1.389.198 1.912.12.583-.087 1.797-.735 2.05-1.445.253-.71.253-1.318.177-1.445-.076-.126-.279-.203-.583-.354z" />
      </svg>
    </a>
  );
}
