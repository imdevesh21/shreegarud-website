# Phase 2 — Production-Grade Feature Spec

Your current build is a solid frontend scaffold, not yet production-grade — agreed. These new features genuinely need a real backend (database, auth, admin panel), not just React components. Here's the architecture for each.

---

## 1. "Buy from stock" — Inventory & Ordering (e-commerce-lite)

You're not describing full e-commerce (no online payment mentioned) — you're describing **inventory-backed quote requests with an approval workflow**. That's simpler and more appropriate for a B2B IT reseller than a full cart/checkout system. Here's the model:

### Data model (Postgres/MySQL — not just JSON files anymore)

```
products
  id, name, category, short_description, long_description,
  stock_quantity, unit, price_display (optional/hidden), image_url,
  is_active, created_at, updated_at

orders
  id, customer_name, customer_email, customer_phone,
  status, created_at, updated_at
  -- status: pending → approved → processing → dispatched → completed
  --                 ↘ rejected

order_items
  id, order_id, product_id, quantity, notes

order_timeline
  id, order_id, status, note, changed_by, changed_at
  -- this IS your "timeline which can be modified with circumstances" —
  -- every status change is a new row, so the full history is always visible
```

### Flow you described, mapped to real steps

1. **Customer browses stock** → `/shop` page pulls live `products` from your API (not hardcoded — real inventory, so it's accurate).
2. **Customer submits an order** (no payment, just a request) → creates an `orders` row + `order_items` rows, status = `pending`.
3. **Team gets notified two ways, as you asked:**
   - **Email** — auto-sent to sales@ with order details (reuse the same email pipeline as your contact form).
   - **WhatsApp** — this is the interesting part. A new order triggers a WhatsApp message to your team's number via the WhatsApp Business API (the same WATI/AiSensy integration from Phase 1), with **Approve / Reject buttons** (WhatsApp interactive message templates support this natively — no custom app needed on your team's phone).
4. **Approval updates the order** — when your team taps Approve/Reject on WhatsApp, the WhatsApp provider fires a webhook to your backend, which updates `orders.status` and inserts a new `order_timeline` row. The customer's status page reflects it instantly.
5. **Timeline stays editable** — your team can also update status manually from a lightweight **admin panel** (processing → dispatched → completed), each change logged with a note, so "modified with circumstances" is literally just adding a new timeline row with a reason.
6. **Customer-facing order tracking page** — `/orders/:orderId` shows the timeline visually (like a shipment tracker), so the customer doesn't need to call and ask "where's my order."

### What this needs that you don't have yet
- A real backend framework (Node/Express is fine — extends the `/server` folder from Phase 1) + a real database (Postgres recommended over MySQL for this scale, but either works)
- WhatsApp Business API with interactive/template messages (not just `wa.me` links — this is a step up from Phase 1's simple click-to-chat)
- A minimal internal admin panel (could be a simple password-protected React route, doesn't need to be fancy) for your team to manage stock and manually update orders
- Auth — even simple session-based auth is fine for the admin side; no customer login needed if you're OK with email/order-ID lookup for tracking

**Scope note:** this is a multi-week backend build, not a weekend addition. Worth treating as its own phase.

---

## 2. Process / workflow videos

Good idea — video genuinely helps for a service business where customers can't "see" what you deliver. Recommendations:

- **Don't self-host video files** — they'll wreck your Lighthouse score (huge file size = terrible LCP). Host on **YouTube (unlisted or public) or Vimeo**, embed via a lightweight facade.
- Use a **click-to-load facade** (thumbnail + play button that only loads the real embed on click) instead of an auto-embedded iframe — this is the standard fix for the "3rd-party embed tanks performance" problem. Libraries like `react-lite-youtube-embed` do this in a few KB instead of YouTube's ~500KB player script loading on every page view.
- **Where to put them:**
  - One on the homepage Hero or right after it — 60-90 sec "who we are / how we work" video performs best for conversion.
  - One per major service category if you have the content (e.g., a cloud migration walkthrough) — optional, phase 3.
  - Consider one for the **About → workflow** section replacing or supplementing the 4-step graphic we already built.

This is straightforward to add to the current repo without needing backend work — happy to build this into `AboutWorkflow` or `Hero` now if you want.

---

## 3. Careers section

This needs a light backend too (to post/manage job listings without editing code each time), but much simpler than the ordering system.

### Data model
```
job_postings
  id, title, department, location, employment_type,
  description, requirements, is_active, posted_at

job_applications
  id, job_posting_id, applicant_name, email, phone,
  resume_url, cover_note, submitted_at
```

### Pages
- `/careers` — list of active job postings (title, department, location, "Apply")
- `/careers/:id` — full job description + application form (name, email, phone, resume upload, short note)
- Resume uploads go to cloud storage (S3 or similar), application triggers an email to HR + optionally a WhatsApp notification like the order flow

### Admin side
- Same lightweight admin panel as orders — team can add/close job postings without a developer

This can share the **same admin panel and backend** you build for the ordering system — no need for two separate systems. Worth building both together once you commit to standing up a real backend.

---

## Suggested build order for Phase 2

1. **Process videos** — no backend needed, quick win, can do today
2. **Backend foundation** — real database + auth + admin panel shell (this unlocks everything else)
3. **Careers** — simplest of the three backend features, good first real feature on the new backend
4. **Inventory/ordering system** — most complex, builds on the backend foundation and WhatsApp Business API integration from careers/orders both

---

*Want me to start with the process video section in the current repo, or scaffold the backend foundation (database schema + admin panel shell + auth) as the next artifact?*
