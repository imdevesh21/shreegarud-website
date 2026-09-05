# Shree Garud IT Solutions — Website (React)

Working repo scaffold matching the redesign spec. Built with **Vite + React + React Router**, no UI framework dependency, plain CSS with a small design-token system.

## Folder structure

```
src/
  api/                 API client functions (fetch calls to backend)
    contact.js         POST /api/contact
    newsletter.js      POST /api/newsletter

  components/
    layout/            App-wide chrome
      Header.jsx        Nav + services mega-menu + Get a Quote CTA
      Footer.jsx         Full sitemap, social, address, newsletter slot

  data/                Single source of truth for content — edit here,
                        not inside components
    services.js         All 10 services: short + long descriptions
    company.js           Contact info, address, WhatsApp link builder
    testimonials.js
    team.js
    partners.js

  pages/               One folder per route, composes sections together
    Home/
    About/
    Services/
    ServiceSingle/       Dynamic /services/:slug page
    Contact/

  sections/            Reusable content modules (one folder each)
    Hero/
    ServicesPreview/     4-card short-description grid (homepage)
    ServiceDetail/       Long-description view (service detail page)
    Testimonials/
    PartnerScroller/     CSS-only infinite logo scroll
    TeamGrid/            Founder card visually distinguished
    AboutWorkflow/       4-step process explainer
    ContactForm/          Validation + honeypot + real submit handling
    Newsletter/           Used in both footer (compact) and homepage
    WhatsAppWidget/       Persistent floating button, all pages

  styles/
    global.css           Design tokens (colors, spacing, container width)

server/                 Minimal working Express API (contact + newsletter
                        endpoints) — swap the TODOs for real email/DB/ESP
                        integration before going live
```

## Why it's organized this way

- **`data/`** is the single source of truth for content, so things like the
  company address or WhatsApp number are set once and used everywhere —
  this directly fixes the old site's inconsistent-address problem.
- **`sections/`** are self-contained modules (component + its own CSS file)
  so any section can be reused across pages (e.g. `Newsletter` appears in
  both the footer and the homepage; `PartnerScroller` appears on both Home
  and About).
- **All "Get a Quote" / WhatsApp buttons** call the same `buildWhatsAppLink()`
  helper in `data/company.js`, so the pre-filled-message logic lives in one
  place, as requested.
- **No scroll-triggered animation library** — the only continuous animation
  is the CSS-only partner logo scroll, and it respects
  `prefers-reduced-motion`.

## Getting started

```bash
npm install
cp .env.example .env       # point VITE_API_BASE_URL at your backend
npm run dev                 # starts the Vite dev server

# in a second terminal, run the example backend:
cd server
npm install
npm run dev                 # starts on http://localhost:4000
```

## What still needs real content before launch

- Replace placeholder team photos in `public/team/`
- Replace placeholder partner logos in `public/partners/`
- Fill in the real Google Maps embed URL in `data/company.js`
- Wire the `/server` contact/newsletter endpoints to real email delivery (nodemailer/SES) and a real ESP (Mailchimp/Brevo)
- Set up the WhatsApp Business API bot (WATI/AiSensy recommended) so new orders can trigger an interactive Approve/Reject message — the `PATCH /api/orders/:id/status` endpoint is ready for a webhook to call
- Add real `<title>`/meta description per page and Schema.org structured data per the SEO checklist
- **Change the seeded admin password** (`admin@shreegarud.com` / `changeme123`) before deploying — see `server/db.js`
- Set a real `JWT_SECRET` environment variable in production (see `server/auth.js`)

## Admin dashboard

A working order-management dashboard lives at `/admin`, built on its own route tree (no public header/footer) with JWT-based auth.

```
src/admin/
  context/AuthContext.jsx     Token storage (sessionStorage) + login/logout
  api/adminApi.js              Authenticated fetch client for all admin calls
  components/
    RequireAuth.jsx            Route guard — redirects to /admin/login if not authenticated
    AdminLayout.jsx             Sidebar shell used by all authenticated admin pages
  pages/
    Login/                      Email + password login
    Dashboard/                  Stat cards: total orders, pending, low stock, active products
    Orders/                     Filterable order list
    OrderDetail/                Full order view: items, visual status timeline, approve/reject/advance actions with notes
    Products/                   Inline-editable stock quantities, add new products, hide/show
```

**Backend** (`server/`) now uses a real SQLite database (`better-sqlite3`) instead of in-memory arrays, with these tables: `admin_users`, `products`, `orders`, `order_items`, `order_timeline`. Every order status change — including the initial "submitted" event — writes a new `order_timeline` row, so the full history (with notes explaining *why* something changed) is always visible. This is also the exact endpoint (`PATCH /api/orders/:id/status`) a WhatsApp webhook would call once you wire up Approve/Reject buttons on WhatsApp — same code path whether the team approves from the dashboard or from WhatsApp.

**Try it locally:**
```bash
cd server && npm install && npm run dev   # seeds admin@shreegarud.com / changeme123 on first run
# in another terminal:
npm run dev                                # then visit /admin/login
```

### Next steps for further build-out

1. ~~**Public shop page**~~ — done. `/shop` lets customers browse live stock and submit an order request (`src/pages/Shop/`, cart state in `src/context/CartContext.jsx`).
2. **WhatsApp Business API integration** — connect WATI or AiSensy so `POST /api/orders` also fires an interactive WhatsApp message to your team with Approve/Reject buttons, and have their webhook call `PATCH /api/orders/:id/status`.
3. **Customer-facing order tracking page** — `GET /api/orders/:id/track?email=` already exists on the backend; build a public `/orders/:id` page that shows the same timeline UI to the customer (the order confirmation on `/shop` currently just shows the order number).
4. **Careers module** — same pattern as products/orders (a `job_postings` table + admin CRUD), can reuse the `AdminLayout` and `RequireAuth` already built.
5. **Real roles** — right now every admin user has full access. If you'll have both sales staff (order approval) and a manager (stock + admin users), add a `role` column to `admin_users` and check it in `requireAuth`.
6. **Deploy the database properly** — SQLite is great for getting started but doesn't handle concurrent writes well at scale. Move to Postgres when you have real traffic; the query shapes in `routes-orders.js`/`routes-products.js` port over almost directly.

## Shop page

`/shop` (`src/pages/Shop/Shop.jsx`) is the customer-facing counterpart to the admin's Products/Orders pages:

- Fetches live stock from `GET /api/products` — whatever the admin sets as active with stock > 0 shows up here automatically, no manual sync needed.
- Category filter pills (auto-generated from whatever categories exist in your product data).
- Quantity steppers capped at available stock — can't request more than you have.
- A slide-over "order request" drawer (`CartDrawer`, same file) collects quantities + per-item notes + customer contact info, then posts to `POST /api/orders` — the exact same endpoint and `orders`/`order_items`/`order_timeline` tables the admin dashboard already reads from.
- On submit, shows the order number back to the customer. There's no payment step — this is a quote/order **request**, matching the approval workflow already built (pending → approved/rejected → processing → dispatched → completed).

Cart state lives in `src/context/CartContext.jsx`, scoped to the public site only (wrapped around `PublicSite` in `App.jsx`, not the admin routes) — it's in-memory and resets on page refresh, which is fine for a request-a-quote flow with no payment involved.

