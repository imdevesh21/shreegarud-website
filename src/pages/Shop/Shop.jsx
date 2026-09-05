import { useEffect, useState } from "react";
import { getProducts, submitOrder } from "../../api/shop";
import { useCart } from "../../context/CartContext";
import "./Shop.css";

function ProductCard({ product }) {
  const { items, setQuantity } = useCart();
  const currentQty = items[product.id]?.quantity || 0;
  const outOfStock = product.stock_quantity <= 0;

  return (
    <article className={`shop-card ${outOfStock ? "shop-card--out" : ""}`}>
      <div className="shop-card__top">
        <span className="shop-card__category">{product.category || "General"}</span>
        {product.stock_quantity > 0 && product.stock_quantity < 5 && (
          <span className="shop-card__low-stock">Only {product.stock_quantity} left</span>
        )}
        {outOfStock && <span className="shop-card__out-badge">Out of stock</span>}
      </div>
      <h3>{product.name}</h3>
      <p>{product.short_description}</p>

      {!outOfStock && (
        <div className="shop-card__stepper">
          <button
            type="button"
            onClick={() => setQuantity(product, Math.max(0, currentQty - 1))}
            disabled={currentQty === 0}
            aria-label={`Decrease quantity of ${product.name}`}
          >
            −
          </button>
          <span>{currentQty}</span>
          <button
            type="button"
            onClick={() =>
              setQuantity(product, Math.min(product.stock_quantity, currentQty + 1))
            }
            disabled={currentQty >= product.stock_quantity}
            aria-label={`Increase quantity of ${product.name}`}
          >
            +
          </button>
          <span className="shop-card__unit">{product.unit}</span>
        </div>
      )}
    </article>
  );
}

function CartDrawer({ open, onClose }) {
  const { itemList, totalQuantity, setQuantity, setNotes, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const [orderId, setOrderId] = useState(null);

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "A valid email is required.";
    }
    if (itemList.length === 0) next.items = "Add at least one item to your order.";
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("loading");
    try {
      const result = await submitOrder({
        customer_name: form.name,
        customer_email: form.email,
        customer_phone: form.phone,
        items: itemList.map((i) => ({
          product_id: i.product.id,
          quantity: i.quantity,
          notes: i.notes,
        })),
      });
      setOrderId(result.orderId);
      setStatus("success");
      clearCart();
    } catch (err) {
      setErrorMessage(err.message);
      setStatus("error");
    }
  };

  if (!open) return null;

  return (
    <div className="cart-drawer__overlay" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-drawer__header">
          <h2>Your order request</h2>
          <button className="cart-drawer__close" onClick={onClose} aria-label="Close cart">
            ×
          </button>
        </div>

        {status === "success" ? (
          <div className="cart-drawer__success">
            <p className="cart-drawer__success-title">Order request #{orderId} submitted</p>
            <p>
              Our team will review your request and reach out to confirm availability and
              next steps — usually within a few hours.
            </p>
            <button onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            {itemList.length === 0 ? (
              <p className="cart-drawer__empty">
                Your order request is empty — add items from the shop.
              </p>
            ) : (
              <ul className="cart-drawer__items">
                {itemList.map(({ product, quantity, notes }) => (
                  <li key={product.id}>
                    <div className="cart-drawer__item-top">
                      <strong>{product.name}</strong>
                      <button
                        className="cart-drawer__remove"
                        onClick={() => setQuantity(product, 0)}
                        aria-label={`Remove ${product.name}`}
                      >
                        Remove
                      </button>
                    </div>
                    <p className="cart-drawer__item-qty">
                      {quantity} {product.unit}
                    </p>
                    <input
                      type="text"
                      placeholder="Notes for this item (optional)"
                      value={notes}
                      onChange={(e) => setNotes(product.id, e.target.value)}
                    />
                  </li>
                ))}
              </ul>
            )}

            <form onSubmit={handleSubmit} className="cart-drawer__form">
              <label htmlFor="cart-name">Name</label>
              <input
                id="cart-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {errors.name && <span className="cart-drawer__error">{errors.name}</span>}

              <label htmlFor="cart-email">Email</label>
              <input
                id="cart-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && <span className="cart-drawer__error">{errors.email}</span>}

              <label htmlFor="cart-phone">Phone (optional)</label>
              <input
                id="cart-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />

              {errors.items && <span className="cart-drawer__error">{errors.items}</span>}
              {status === "error" && (
                <span className="cart-drawer__error">{errorMessage}</span>
              )}

              <button type="submit" disabled={status === "loading" || totalQuantity === 0}>
                {status === "loading" ? "Submitting…" : "Submit order request"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("all");
  const [cartOpen, setCartOpen] = useState(false);
  const { totalQuantity } = useCart();

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data.products))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const categories = ["all", ...new Set(products.map((p) => p.category).filter(Boolean))];
  const filtered =
    category === "all" ? products : products.filter((p) => p.category === category);

  return (
    <section className="shop">
      <div className="shop__inner">
        <div className="shop__header">
          <div>
            <h1>Shop</h1>
            <p>Browse what we currently have in stock and request a quote.</p>
          </div>
          <button className="shop__cart-btn" onClick={() => setCartOpen(true)}>
            View request {totalQuantity > 0 && <span>({totalQuantity})</span>}
          </button>
        </div>

        {categories.length > 2 && (
          <div className="shop__filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={category === cat ? "is-active" : ""}
                onClick={() => setCategory(cat)}
              >
                {cat === "all" ? "All" : cat}
              </button>
            ))}
          </div>
        )}

        {loading && <p>Loading products…</p>}
        {error && <p className="shop__error">{error}</p>}

        {!loading && !error && (
          <div className="shop__grid">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {filtered.length === 0 && <p>No products in this category right now.</p>}
          </div>
        )}
      </div>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </section>
  );
}
