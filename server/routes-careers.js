import { Router } from "express";
import db from "./db.js";
import { requireAuth } from "./auth.js";

const router = Router();

// ---- PUBLIC: list active job postings ----
router.get("/", (req, res) => {
  const jobs = db
    .prepare("SELECT * FROM job_postings WHERE is_active = 1 ORDER BY posted_at DESC")
    .all();
  res.json({ jobs });
});

// ---- PUBLIC: get one job posting ----
router.get("/:id", (req, res) => {
  const job = db
    .prepare("SELECT * FROM job_postings WHERE id = ? AND is_active = 1")
    .get(req.params.id);
  if (!job) return res.status(404).json({ message: "Job posting not found." });
  res.json({ job });
});

// ---- PUBLIC: submit an application ----
router.post("/:id/apply", (req, res) => {
  const { applicant_name, email, phone, cover_note, resume_url } = req.body;

  if (!applicant_name || !email) {
    return res.status(400).json({ message: "Name and email are required." });
  }

  const job = db.prepare("SELECT * FROM job_postings WHERE id = ?").get(req.params.id);
  if (!job) return res.status(404).json({ message: "Job posting not found." });

  const result = db
    .prepare(
      "INSERT INTO job_applications (job_posting_id, applicant_name, email, phone, cover_note, resume_url) VALUES (?, ?, ?, ?, ?, ?)"
    )
    .run(job.id, applicant_name, email, phone || "", cover_note || "", resume_url || "");

  console.log(`New application #${result.lastInsertRowid} for "${job.title}" from ${applicant_name}`);

  res.status(201).json({ applicationId: result.lastInsertRowid, message: "Application submitted." });
});

// ---- ADMIN: list all postings (including inactive) ----
router.get("/admin/all", requireAuth, (req, res) => {
  const jobs = db.prepare("SELECT * FROM job_postings ORDER BY posted_at DESC").all();
  res.json({ jobs });
});

// ---- ADMIN: create posting ----
router.post("/", requireAuth, (req, res) => {
  const { title, department, location, employment_type, description, requirements } = req.body;
  if (!title) return res.status(400).json({ message: "Title is required." });

  const result = db
    .prepare(
      "INSERT INTO job_postings (title, department, location, employment_type, description, requirements) VALUES (?, ?, ?, ?, ?, ?)"
    )
    .run(title, department || "", location || "", employment_type || "Full-time", description || "", requirements || "");

  res.status(201).json({ id: result.lastInsertRowid });
});

// ---- ADMIN: update posting (edit or close) ----
router.patch("/:id", requireAuth, (req, res) => {
  const { title, department, location, employment_type, description, requirements, is_active } = req.body;
  const job = db.prepare("SELECT * FROM job_postings WHERE id = ?").get(req.params.id);
  if (!job) return res.status(404).json({ message: "Job posting not found." });

  db.prepare(
    `UPDATE job_postings SET
      title = COALESCE(?, title),
      department = COALESCE(?, department),
      location = COALESCE(?, location),
      employment_type = COALESCE(?, employment_type),
      description = COALESCE(?, description),
      requirements = COALESCE(?, requirements),
      is_active = COALESCE(?, is_active)
     WHERE id = ?`
  ).run(title, department, location, employment_type, description, requirements, is_active, req.params.id);

  res.json({ message: "Job posting updated." });
});

// ---- ADMIN: view applications for a posting ----
router.get("/:id/applications", requireAuth, (req, res) => {
  const applications = db
    .prepare("SELECT * FROM job_applications WHERE job_posting_id = ? ORDER BY submitted_at DESC")
    .all(req.params.id);
  res.json({ applications });
});

export default router;
