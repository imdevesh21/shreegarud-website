// Single source of truth for all service content.
// Each service has a short (card/grid) description and a long (detail page) description.
// slug is used for routing: /services/:slug

export const services = [
  {
    slug: "it-infrastructure-management",
    title: "IT Infrastructure Management",
    icon: "infrastructure",
    shortDescription:
      "Network optimization, server management, and data center operations that keep your business running.",
    longDescription:
      "We manage the full lifecycle of your IT infrastructure — from network optimization and server management to data center operations, hardware maintenance, and cloud integration. Our team monitors systems proactively, resolves issues before they impact your business, and ensures your infrastructure scales with your growth.",
    highlights: [
      "24/7 infrastructure monitoring",
      "Server & hardware maintenance",
      "Data center operations",
      "Cloud integration support",
    ],
  },
  {
    slug: "networking-solutions",
    title: "Networking Solutions",
    icon: "network",
    shortDescription:
      "End-to-end network design, installation, and security for reliable business connectivity.",
    longDescription:
      "From network design and seamless installation to proactive management and robust security, we handle every layer of your business connectivity. Our engineers troubleshoot efficiently and design networks that scale, so your teams stay connected without downtime.",
    highlights: [
      "Custom network design",
      "Installation & configuration",
      "Ongoing security management",
      "Rapid troubleshooting",
    ],
  },
  {
    slug: "rental-laptop-desktop",
    title: "Rental Laptop & Desktop",
    icon: "device",
    shortDescription:
      "Flexible, cost-effective device rentals with quick setup and dedicated support.",
    longDescription:
      "Reliable laptop and desktop rentals for corporate use, with flexible terms, quality equipment, and quick turnaround. Whether you need to scale a team up temporarily or equip a new office, we handle setup, maintenance, and support so you can focus on your work.",
    highlights: [
      "Flexible rental terms",
      "Quality, well-maintained devices",
      "Fast setup & delivery",
      "Ongoing support included",
    ],
  },
  {
    slug: "cloud-solutions",
    title: "Cloud Solutions",
    icon: "cloud",
    shortDescription:
      "Scalable, secure cloud migration and management to drive digital transformation.",
    longDescription:
      "We design and manage cloud solutions that improve efficiency and support digital transformation — including cloud migration, storage solutions, security, infrastructure management, and disaster recovery planning. Built to scale with your business.",
    highlights: [
      "Cloud migration & strategy",
      "Storage & backup solutions",
      "Disaster recovery planning",
      "Ongoing cloud security",
    ],
  },
  {
    slug: "security-solutions",
    title: "Security Solutions",
    icon: "shield",
    shortDescription:
      "Threat detection, firewall protection, and incident response for robust business security.",
    longDescription:
      "Comprehensive security solutions covering threat detection, firewall protection, network monitoring, data encryption, and incident response. We help you stay ahead of cybersecurity risks with a proactive, layered approach to protection.",
    highlights: [
      "Threat detection & monitoring",
      "Firewall & network protection",
      "Data encryption",
      "Incident response planning",
    ],
  },
  {
    slug: "software-licensing",
    title: "Software Licensing Solutions",
    icon: "license",
    shortDescription:
      "License management, compliance auditing, and renewal services made simple.",
    longDescription:
      "We simplify software licensing with end-to-end license management, compliance auditing, renewal tracking, and cost optimization. Get customized licensing strategies that keep your business compliant without overspending.",
    highlights: [
      "License management & tracking",
      "Compliance auditing",
      "Renewal reminders",
      "Cost optimization strategy",
    ],
  },
  {
    slug: "audio-visual",
    title: "Audio Visual",
    icon: "av",
    shortDescription:
      "System design, installation, and support for conference rooms and event spaces.",
    longDescription:
      "Cutting-edge audio-visual solutions tailored to your space — from system design and installation to integration and ongoing maintenance. We ensure your meeting rooms, event spaces, and offices perform reliably every time.",
    highlights: [
      "AV system design",
      "Professional installation",
      "System integration",
      "Maintenance & support",
    ],
  },
  {
    slug: "annual-maintenance",
    title: "Annual Facility Maintenance",
    icon: "maintenance",
    shortDescription:
      "AMC coverage with inspections, preventive maintenance, and reliable repairs.",
    longDescription:
      "Our Annual Maintenance Contracts (AMC) keep your facility's IT equipment running smoothly with scheduled inspections, preventive maintenance, timely repairs, and dependable equipment support — all built around your business's uptime needs.",
    highlights: [
      "Scheduled inspections",
      "Preventive maintenance",
      "Priority repair support",
      "Annual contract flexibility",
    ],
  },
  {
    slug: "mailing-solutions",
    title: "Mailing Solutions",
    icon: "mail",
    shortDescription:
      "Microsoft 365 and Google Workspace setup for seamless business communication.",
    longDescription:
      "Reliable mailing and collaboration solutions including Microsoft 365 and Google Workspace licensing, setup, and support — ensuring seamless communication and collaboration across your business.",
    highlights: [
      "Microsoft 365 setup & licensing",
      "Google Workspace (G Suite)",
      "Migration support",
      "Ongoing account management",
    ],
  },
  {
    slug: "designing-software",
    title: "Designing Software",
    icon: "design",
    shortDescription:
      "Adobe, Corel, and AutoCAD licensing for professional design and creative teams.",
    longDescription:
      "We provide licensing and setup for leading design software — Adobe Creative Cloud, Corel, and AutoCAD — giving your creative and technical teams the tools they need for professional design work.",
    highlights: [
      "Adobe Creative Cloud",
      "Corel & AutoCAD licensing",
      "Team license management",
      "Setup & onboarding support",
    ],
  },
];

export const getServiceBySlug = (slug) =>
  services.find((service) => service.slug === slug);
