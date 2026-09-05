const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

// Every admin API call goes through here so token attachment and 401
// handling (session expired -> force re-login) live in one place.
async function adminFetch(path, { token, ...options } = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (response.status === 401) {
    const error = new Error("Session expired. Please log in again.");
    error.isAuthError = true;
    throw error;
  }

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message || "Request failed.");
  }

  return response.json();
}

export const adminApi = {
  login: (email, password) =>
    adminFetch("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  getStats: (token) => adminFetch("/api/admin/stats", { token }),

  getOrders: (token) => adminFetch("/api/orders", { token }),
  getOrder: (token, id) => adminFetch(`/api/orders/${id}`, { token }),
  updateOrderStatus: (token, id, status, note) =>
    adminFetch(`/api/orders/${id}/status`, {
      method: "PATCH",
      token,
      body: JSON.stringify({ status, note }),
    }),

  getProductsAdmin: (token) => adminFetch("/api/products/admin", { token }),
  createProduct: (token, product) =>
    adminFetch("/api/products", { method: "POST", token, body: JSON.stringify(product) }),
  updateProduct: (token, id, updates) =>
    adminFetch(`/api/products/${id}`, { method: "PATCH", token, body: JSON.stringify(updates) }),
};
