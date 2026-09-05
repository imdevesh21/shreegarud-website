const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export async function getJobs() {
  const response = await fetch(`${API_BASE_URL}/api/careers`);
  if (!response.ok) throw new Error("Failed to load job postings.");
  return response.json();
}

export async function getJob(id) {
  const response = await fetch(`${API_BASE_URL}/api/careers/${id}`);
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message || "Job posting not found.");
  }
  return response.json();
}

export async function applyToJob(id, application) {
  const response = await fetch(`${API_BASE_URL}/api/careers/${id}/apply`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(application),
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message || "Failed to submit application.");
  }
  return response.json();
}
