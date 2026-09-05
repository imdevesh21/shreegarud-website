import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { adminApi } from "../../api/adminApi";
import "./Orders.css";

const STATUS_LABELS = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
  processing: "Processing",
  dispatched: "Dispatched",
  completed: "Completed",
};

export default function Orders() {
  const { token, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    adminApi
      .getOrders(token)
      .then((data) => setOrders(data.orders))
      .catch((err) => {
        if (err.isAuthError) return logout();
        setError(err.message);
      });
  }, [token, logout]);

  const filtered =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div>
      <h1>Orders</h1>
      <p className="orders__subtitle">All order requests submitted through the shop.</p>

      {error && <p className="orders__error">{error}</p>}

      <div className="orders__filters">
        {["all", ...Object.keys(STATUS_LABELS)].map((status) => (
          <button
            key={status}
            className={filter === status ? "is-active" : ""}
            onClick={() => setFilter(status)}
          >
            {status === "all" ? "All" : STATUS_LABELS[status]}
          </button>
        ))}
      </div>

      <table className="orders__table">
        <thead>
          <tr>
            <th>Order #</th>
            <th>Customer</th>
            <th>Email</th>
            <th>Status</th>
            <th>Submitted</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((order) => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>{order.customer_name}</td>
              <td>{order.customer_email}</td>
              <td>
                <span className={`orders__status orders__status--${order.status}`}>
                  {STATUS_LABELS[order.status]}
                </span>
              </td>
              <td>{new Date(order.created_at).toLocaleDateString()}</td>
              <td>
                <Link to={`/admin/orders/${order.id}`}>View →</Link>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={6} className="orders__empty">
                No orders in this view yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
