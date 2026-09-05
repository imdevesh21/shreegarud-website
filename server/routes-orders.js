import { Router } from "express";
import db from "./db.js";
import { requireAuth } from "./auth.js";

const router = Router();

const VALID_STATUSES = [
  "pending",
  "approved",
  "rejected",
  "processing",
  "dispatched",
  "completed",
];

// ---- PUBLIC: customer submits an order request ----
// POST /api/orders
// body: { customer_name, customer_email, customer_phone, items: [{ product_id, quantity, notes }] }
router.post("/", (req, res) => {
  const { customer_name, customer_email, customer_phone, items } = req.body;

  if (!customer_name || !customer_email || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Name, email, and at least one item are required." });
  }

  const insertOrder = db.prepare(
    "INSERT INTO orders (customer_name, customer_email, customer_phone, status) VALUES (?, ?, ?, 'pending')"
  );
  const orderResult = insertOrder.run(customer_name, customer_email, customer_phone || "");
  const orderId = orderResult.lastInsertRowid;

  const insertItem = db.prepare(
    "INSERT INTO order_items (order_id, product_id, quantity, notes) VALUES (?, ?, ?, ?)"
  );
  for (const item of items) {
    insertItem.run(orderId, item.product_id, item.quantity, item.notes || "");
  }

  db.prepare(
    "INSERT INTO order_timeline (order_id, status, note, changed_by) VALUES (?, 'pending', 'Order submitted by customer', 'system')"
  ).run(orderId);

  // TODO: send email notification to sales@shreegarud.com
  // TODO: send WhatsApp interactive Approve/Reject message to the team
  //       via WhatsApp Business API (WATI/AiSensy webhook trigger goes here)
  console.log(`New order #${orderId} from ${customer_name} — notify team via email + WhatsApp here.`);

  res.status(201).json({ orderId, message: "Order submitted." });
});

// ---- PUBLIC: customer looks up their order status ----
// GET /api/orders/:id/track?email=customer@example.com  (simple lookup auth)
router.get("/:id/track", (req, res) => {
  const order = db.prepare("SELECT * FROM orders WHERE id = ?").get(req.params.id);
  if (!order || order.customer_email !== req.query.email) {
    return res.status(404).json({ message: "Order not found." });
  }

  const items = db
    .prepare(
      `SELECT oi.quantity, oi.notes, p.name, p.unit
       FROM order_items oi JOIN products p ON p.id = oi.product_id
       WHERE oi.order_id = ?`
    )
    .all(order.id);

  const timeline = db
    .prepare("SELECT status, note, changed_at FROM order_timeline WHERE order_id = ? ORDER BY changed_at ASC")
    .all(order.id);

  res.json({ order, items, timeline });
});

// ---- ADMIN: list all orders ----
router.get("/", requireAuth, (req, res) => {
  const orders = db.prepare("SELECT * FROM orders ORDER BY created_at DESC").all();
  res.json({ orders });
});

// ---- ADMIN: get one order with items + timeline ----
router.get("/:id", requireAuth, (req, res) => {
  const order = db.prepare("SELECT * FROM orders WHERE id = ?").get(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found." });

  const items = db
    .prepare(
      `SELECT oi.id, oi.quantity, oi.notes, p.name, p.unit, p.id as product_id
       FROM order_items oi JOIN products p ON p.id = oi.product_id
       WHERE oi.order_id = ?`
    )
    .all(order.id);

  const timeline = db
    .prepare("SELECT * FROM order_timeline WHERE order_id = ? ORDER BY changed_at ASC")
    .all(order.id);

  res.json({ order, items, timeline });
});

// ---- ADMIN: update order status (approve/reject/advance) ----
// This is the endpoint a WhatsApp webhook would also call once the team
// taps Approve/Reject on the interactive message — same code path either way.
router.patch("/:id/status", requireAuth, (req, res) => {
  const { status, note } = req.body;

  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({ message: `Status must be one of: ${VALID_STATUSES.join(", ")}` });
  }

  const order = db.prepare("SELECT * FROM orders WHERE id = ?").get(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found." });

  db.prepare("UPDATE orders SET status = ?, updated_at = datetime('now') WHERE id = ?").run(
    status,
    order.id
  );

  db.prepare(
    "INSERT INTO order_timeline (order_id, status, note, changed_by) VALUES (?, ?, ?, ?)"
  ).run(order.id, status, note || "", req.admin.name);

  // TODO: notify customer of status change via email/WhatsApp

  res.json({ message: "Status updated." });
});

export default router;
