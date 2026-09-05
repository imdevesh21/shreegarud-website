import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { adminApi } from "../../api/adminApi";
import "./Dashboard.css";

export default function Dashboard() {
  const { token, logout } = useAuth();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    adminApi
      .getStats(token)
      .then(setStats)
      .catch((err) => {
        if (err.isAuthError) return logout();
        setError(err.message);
      });
  }, [token, logout]);

  return (
    <div>
      <h1>Dashboard</h1>
      <p className="dashboard__subtitle">Overview of orders and inventory.</p>

      {error && <p className="dashboard__error">{error}</p>}

      {stats && (
        <div className="dashboard__stats">
          <div className="dashboard__stat-card dashboard__stat-card--blue">
            <span>Total Orders</span>
            <strong>{stats.totalOrders}</strong>
          </div>
          <div className="dashboard__stat-card dashboard__stat-card--coral">
            <span>Pending Approval</span>
            <strong>{stats.pendingOrders}</strong>
          </div>
          <div className="dashboard__stat-card dashboard__stat-card--violet">
            <span>Active Products</span>
            <strong>{stats.totalProducts}</strong>
          </div>
          <div className="dashboard__stat-card dashboard__stat-card--teal">
            <span>Low Stock (&lt;5)</span>
            <strong>{stats.lowStock}</strong>
          </div>
        </div>
      )}
    </div>
  );
}
