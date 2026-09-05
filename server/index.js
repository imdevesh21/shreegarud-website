// Backend API for the Shree Garud site — contact form, newsletter,
// products, and the orders/dashboard system with JWT-authenticated
// admin routes.

import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import db from "./db.js";
import { signToken, requireAuth } from "./auth.js";
import ordersRouter from "./routes-orders.js";
import productsRouter from "./routes-products.js";
import careersRouter from "./routes-careers.js";
const app = express();
app.use(cors());
app.use(express.json());

// ---- Contact form (from Phase 1) ----
app.post("/api/contact", (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: "Name, email, and message are required." });
  }
  // TODO: send email notification + auto-reply (nodemailer/SES)
  console.log("New contact lead:", { name, email, phone, message });
  res.status(201).json({ message: "Lead received." });
});

// ---- Newsletter (from Phase 1) ----
app.post("/api/newsletter", (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required." });
  // TODO: connect to Mailchimp/Brevo
  console.log("New newsletter subscriber:", email);
  res.status(201).json({ message: "Subscribed." });
});

// ---- Admin auth ----
app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;
  const user = db.prepare("SELECT * FROM admin_users WHERE email = ?").get(email);

  if (!user || !bcrypt.compareSync(password || "", user.password_hash)) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  const token = signToken(user);
  res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
});

app.get("/api/admin/me", requireAuth, (req, res) => {
  res.json({ admin: req.admin });
});

// ---- Dashboard summary stats ----
app.get("/api/admin/stats", requireAuth, (req, res) => {
  const totalOrders = db.prepare("SELECT COUNT(*) as count FROM orders").get().count;
  const pendingOrders = db
    .prepare("SELECT COUNT(*) as count FROM orders WHERE status = 'pending'")
    .get().count;
  const lowStock = db
    .prepare("SELECT COUNT(*) as count FROM products WHERE stock_quantity < 5 AND is_active = 1")
    .get().count;
  const totalProducts = db.prepare("SELECT COUNT(*) as count FROM products WHERE is_active = 1").get().count;

  res.json({ totalOrders, pendingOrders, lowStock, totalProducts });
});

app.use("/api/orders", ordersRouter);
app.use("/api/products", productsRouter);
app.use("/api/careers", careersRouter);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
  console.log(`Admin login: admin@shreegarud.com / changeme123 (change this before production)`);
});
