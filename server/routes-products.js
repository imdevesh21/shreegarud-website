import { Router } from "express";
import db from "./db.js";
import { requireAuth } from "./auth.js";

const router = Router();

// ---- PUBLIC: shop listing ----
router.get("/", (req, res) => {
  const products = db
    .prepare("SELECT * FROM products WHERE is_active = 1 ORDER BY category, name")
    .all();
  res.json({ products });
});

// ---- ADMIN: full list including inactive ----
router.get("/admin", requireAuth, (req, res) => {
  const products = db.prepare("SELECT * FROM products ORDER BY category, name").all();
  res.json({ products });
});

// ---- ADMIN: create product ----
router.post("/", requireAuth, (req, res) => {
  const { name, category, short_description, stock_quantity, unit } = req.body;
  if (!name) return res.status(400).json({ message: "Name is required." });

  const result = db
    .prepare(
      "INSERT INTO products (name, category, short_description, stock_quantity, unit) VALUES (?, ?, ?, ?, ?)"
    )
    .run(name, category || "", short_description || "", stock_quantity || 0, unit || "unit");

  res.status(201).json({ id: result.lastInsertRowid });
});

// ---- ADMIN: update product (including stock quantity) ----
router.patch("/:id", requireAuth, (req, res) => {
  const { name, category, short_description, stock_quantity, unit, is_active } = req.body;
  const product = db.prepare("SELECT * FROM products WHERE id = ?").get(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found." });

  db.prepare(
    `UPDATE products SET
      name = COALESCE(?, name),
      category = COALESCE(?, category),
      short_description = COALESCE(?, short_description),
      stock_quantity = COALESCE(?, stock_quantity),
      unit = COALESCE(?, unit),
      is_active = COALESCE(?, is_active),
      updated_at = datetime('now')
     WHERE id = ?`
  ).run(name, category, short_description, stock_quantity, unit, is_active, req.params.id);

  res.json({ message: "Product updated." });
});

export default router;
