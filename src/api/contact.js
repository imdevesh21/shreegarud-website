// Talks to the backend contact endpoint (see /server folder for a working
// Express example). Swap API_BASE_URL for your real backend URL, or point
// it at a form service (Formspree/Getform) if you don't want a custom backend.

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export async function submitContactForm({ name, email, phone, message }) {
  const response = await fetch(`${API_BASE_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, phone, message }),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || "Failed to submit form");
  }

  return response.json();
}
