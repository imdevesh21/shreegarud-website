// Single source of truth for company info.
// Fixes the old site's inconsistent address problem — every component
// pulls from here instead of hardcoding contact details.

export const company = {
  name: "Shree Garud IT Solutions Pvt Ltd",
  foundedYear: 2019,
  phoneDisplay: "+91 98107 26787",
  phoneRaw: "919810726787", // for wa.me and tel: links, no + or spaces
  email: "sales@shreegarud.com",
  address: {
    line1: "Unit No. 559, 5th Floor, JMD Megapolis",
    line2: "Sector 48, Sohna Road, Gurugram, Haryana 122018",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.979756849208!2d77.03565167510895!3d28.419867675781543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d229e71ef44dd%3A0x9931b80f30d32dd3!2sJMD%20Megapolis!5e0!3m2!1sen!2sin!4v1788770942277!5m2!1sen!2sin",
  },
  hours: {
    weekdays: "Mon – Sat: 10am – 6pm",
    sunday: "Sunday: On-call support",
  },
  social: {
    facebook: "https://www.facebook.com/SGITSOLUTIONS",
    instagram: "https://www.instagram.com/shreegarud2019",
    linkedin:
      "https://www.linkedin.com/company/shreegarud-it-solutions-private-limited",
  },
};

// Builds a wa.me link with a pre-filled, URL-encoded message.
// Used by every "Get a Quote" / WhatsApp CTA in the app so the logic
// lives in one place (per the brief: "same logic I prefer should be here").
export const buildWhatsAppLink = (message = "") => {
  const base = `https://wa.me/${company.phoneRaw}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
};
