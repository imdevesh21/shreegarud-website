const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export async function getProducts() {
  const response = await fetch(`${API_BASE_URL}/api/products`);
  if (!response.ok) throw new Error("Failed to load products.");
  return response.json();
}

export async function submitOrder({ customer_name, customer_email, customer_phone, items }) {
  const response = await fetch(`${API_BASE_URL}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customer_name, customer_email, customer_phone, items }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message || "Failed to submit order.");
  }

  return response.json();
}

export async function trackOrder(orderId, email) {
  const response = await fetch(
    `${API_BASE_URL}/api/orders/${orderId}/track?email=${encodeURIComponent(email)}`
  );
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message || "Order not found.");
  }
  return response.json();
}
