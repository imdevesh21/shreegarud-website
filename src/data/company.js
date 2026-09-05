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
    line1: "Unit No 1206, Tower A, Spaze iTech Park",
    line2: "Sector 49, Gurugram, Haryana 122018",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE_HERE", // TODO: replace with verified single address embed
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
