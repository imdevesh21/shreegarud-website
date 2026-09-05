// SQLite database — real persistence instead of in-memory arrays.
// Swap to Postgres/MySQL later by replacing this file; the query shapes
// below are simple enough to port directly.

import Database from "better-sqlite3";
import bcrypt from "bcryptjs";

const db = new Database("shreegarud.db");
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT,
    short_description TEXT,
    stock_quantity INTEGER NOT NULL DEFAULT 0,
    unit TEXT DEFAULT 'unit',
    is_active INTEGER NOT NULL DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL REFERENCES orders(id),
    product_id INTEGER NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL,
    notes TEXT
  );

  CREATE TABLE IF NOT EXISTS order_timeline (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL REFERENCES orders(id),
    status TEXT NOT NULL,
    note TEXT,
    changed_by TEXT,
    changed_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS job_postings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    department TEXT,
    location TEXT,
    employment_type TEXT DEFAULT 'Full-time',
    description TEXT,
    requirements TEXT,
    is_active INTEGER NOT NULL DEFAULT 1,
    posted_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS job_applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    job_posting_id INTEGER NOT NULL REFERENCES job_postings(id),
    applicant_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    cover_note TEXT,
    resume_url TEXT,
    submitted_at TEXT DEFAULT (datetime('now'))
  );
`);

// Seed one admin user + a few products + sample jobs on first run, so the
// dashboard is usable immediately. CHANGE THIS PASSWORD before deploying.
const adminExists = db.prepare("SELECT id FROM admin_users LIMIT 1").get();
if (!adminExists) {
  const passwordHash = bcrypt.hashSync("changeme123", 10);
  db.prepare(
    "INSERT INTO admin_users (email, password_hash, name) VALUES (?, ?, ?)"
  ).run("admin@shreegarud.com", passwordHash, "Admin");

  const insertProduct = db.prepare(
    "INSERT INTO products (name, category, short_description, stock_quantity, unit) VALUES (?, ?, ?, ?, ?)"
  );
  insertProduct.run("Dell Latitude 5440 Laptop", "Laptops", "14\" business laptop, i5, 16GB RAM", 12, "unit");
  insertProduct.run("HP EliteDesk Mini Desktop", "Desktops", "Compact desktop, i5, 8GB RAM", 8, "unit");
  insertProduct.run("Cisco 24-Port Switch", "Networking", "Managed gigabit switch", 5, "unit");
  insertProduct.run("Microsoft 365 Business License", "Software", "Annual license, per seat", 100, "seat");

  const insertJob = db.prepare(
    "INSERT INTO job_postings (title, department, location, employment_type, description, requirements) VALUES (?, ?, ?, ?, ?, ?)"
  );
  insertJob.run(
    "IT Support Engineer",
    "Technical Support",
    "Gurugram, Haryana",
    "Full-time",
    "Provide on-site and remote IT support for our SMB clients — troubleshooting hardware, networking, and software issues, and assisting with AMC visits.",
    "1-3 years experience in IT support. Strong knowledge of Windows/networking fundamentals. Own two-wheeler preferred for on-site visits."
  );
  insertJob.run(
    "Sales Executive — IT Solutions",
    "Sales",
    "Gurugram, Haryana",
    "Full-time",
    "Identify and close new business for our IT infrastructure, cloud, and AMC services. Build relationships with SMB and enterprise clients in the NCR region.",
    "2+ years B2B sales experience, IT/tech sales preferred. Strong communication skills in English and Hindi."
  );

  console.log("Seeded default admin (admin@shreegarud.com / changeme123) and sample products.");
}

export default db;
