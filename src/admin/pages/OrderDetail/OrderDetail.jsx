import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { adminApi } from "../../api/adminApi";
import "./OrderDetail.css";

const STATUS_FLOW = ["pending", "approved", "processing", "dispatched", "completed"];
const STATUS_LABELS = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
  processing: "Processing",
  dispatched: "Dispatched",
  completed: "Completed",
};

export default function OrderDetail() {
  const { id } = useParams();
  const { token, logout } = useAuth();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [note, setNote] = useState("");
  const [updating, setUpdating] = useState(false);

  const load = useCallback(() => {
    adminApi
      .getOrder(token, id)
      .then(setData)
      .catch((err) => {
        if (err.isAuthError) return logout();
        setError(err.message);
      });
  }, [token, id, logout]);

  useEffect(() => {
    load();
  }, [load]);

  const handleStatusChange = async (status) => {
    setUpdating(true);
    try {
      await adminApi.updateOrderStatus(token, id, status, note);
      setNote("");
      load();
    } catch (err) {
      if (err.isAuthError) return logout();
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  };

  if (error) return <p className="order-detail__error">{error}</p>;
  if (!data) return <p>Loading…</p>;

  const { order, items, timeline } = data;
  const currentStepIndex = STATUS_FLOW.indexOf(order.status);
  const isRejected = order.status === "rejected";

  return (
    <div className="order-detail">
      <Link to="/admin/orders" className="order-detail__back">
        ← Back to orders
      </Link>

      <div className="order-detail__header">
        <h1>Order #{order.id}</h1>
        <span className={`order-detail__status-pill order-detail__status-pill--${order.status}`}>
          {STATUS_LABELS[order.status]}
        </span>
      </div>

      <div className="order-detail__grid">
        <div className="order-detail__main">
          <section className="order-detail__card">
            <h2>Customer</h2>
            <p>{order.customer_name}</p>
            <p>{order.customer_email}</p>
            <p>{order.customer_phone}</p>
          </section>

          <section className="order-detail__card">
            <h2>Items requested</h2>
            <table className="order-detail__items">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>
                      {item.quantity} {item.unit}
                    </td>
                    <td>{item.notes || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="order-detail__card">
            <h2>Update status</h2>
            <textarea
              placeholder="Optional note for this status change (e.g. reason, circumstance)…"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
            />
            <div className="order-detail__actions">
              {order.status === "pending" && (
                <>
                  <button
                    className="order-detail__btn order-detail__btn--approve"
                    disabled={updating}
                    onClick={() => handleStatusChange("approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="order-detail__btn order-detail__btn--reject"
                    disabled={updating}
                    onClick={() => handleStatusChange("rejected")}
                  >
                    Reject
                  </button>
                </>
              )}
              {order.status === "approved" && (
                <button
                  className="order-detail__btn order-detail__btn--advance"
                  disabled={updating}
                  onClick={() => handleStatusChange("processing")}
                >
                  Mark as Processing
                </button>
              )}
              {order.status === "processing" && (
                <button
                  className="order-detail__btn order-detail__btn--advance"
                  disabled={updating}
                  onClick={() => handleStatusChange("dispatched")}
                >
                  Mark as Dispatched
                </button>
              )}
              {order.status === "dispatched" && (
                <button
                  className="order-detail__btn order-detail__btn--advance"
                  disabled={updating}
                  onClick={() => handleStatusChange("completed")}
                >
                  Mark as Completed
                </button>
              )}
              {(order.status === "completed" || order.status === "rejected") && (
                <p className="order-detail__final-note">
                  This order is in a final state. You can still add context via the note field above by re-applying the same status if needed.
                </p>
              )}
            </div>
          </section>
        </div>

        <aside className="order-detail__timeline-card">
          <h2>Timeline</h2>
          {!isRejected && (
            <ol className="order-detail__progress">
              {STATUS_FLOW.map((step, i) => (
                <li
                  key={step}
                  className={i <= currentStepIndex ? "is-complete" : ""}
                >
                  {STATUS_LABELS[step]}
                </li>
              ))}
            </ol>
          )}

          <ul className="order-detail__history">
            {timeline.map((entry) => (
              <li key={entry.id}>
                <div className={`order-detail__history-dot order-detail__history-dot--${entry.status}`} />
                <div>
                  <strong>{STATUS_LABELS[entry.status]}</strong>
                  <p>{entry.note || "No note added."}</p>
                  <time>
                    {new Date(entry.changed_at).toLocaleString()} · {entry.changed_by}
                  </time>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
