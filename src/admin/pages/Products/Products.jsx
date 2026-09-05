import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { adminApi } from "../../api/adminApi";
import "./Products.css";

const emptyForm = { name: "", category: "", short_description: "", stock_quantity: 0, unit: "unit" };

export default function Products() {
  const { token, logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = () => {
    adminApi
      .getProductsAdmin(token)
      .then((data) => setProducts(data.products))
      .catch((err) => {
        if (err.isAuthError) return logout();
        setError(err.message);
      });
  };

  useEffect(load, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleStockChange = async (product, newStock) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, stock_quantity: newStock } : p))
    );
    try {
      await adminApi.updateProduct(token, product.id, { stock_quantity: newStock });
    } catch (err) {
      if (err.isAuthError) return logout();
      setError(err.message);
    }
  };

  const toggleActive = async (product) => {
    const nextActive = product.is_active ? 0 : 1;
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, is_active: nextActive } : p))
    );
    try {
      await adminApi.updateProduct(token, product.id, { is_active: nextActive });
    } catch (err) {
      if (err.isAuthError) return logout();
      setError(err.message);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await adminApi.createProduct(token, form);
      setForm(emptyForm);
      load();
    } catch (err) {
      if (err.isAuthError) return logout();
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1>Products & Stock</h1>
      <p className="products__subtitle">
        Stock quantities update live — this is what customers see on the shop page.
      </p>

      {error && <p className="products__error">{error}</p>}

      <form className="products__new-form" onSubmit={handleCreate}>
        <input
          placeholder="Product name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <input
          placeholder="Short description"
          value={form.short_description}
          onChange={(e) => setForm({ ...form, short_description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Stock qty"
          value={form.stock_quantity}
          onChange={(e) => setForm({ ...form, stock_quantity: Number(e.target.value) })}
        />
        <input
          placeholder="Unit"
          value={form.unit}
          onChange={(e) => setForm({ ...form, unit: e.target.value })}
        />
        <button type="submit" disabled={saving}>
          {saving ? "Adding…" : "Add product"}
        </button>
      </form>

      <table className="products__table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className={!product.is_active ? "is-inactive" : ""}>
              <td>
                <strong>{product.name}</strong>
                <p>{product.short_description}</p>
              </td>
              <td>{product.category}</td>
              <td>
                <input
                  type="number"
                  className={`products__stock-input ${product.stock_quantity < 5 ? "is-low" : ""}`}
                  value={product.stock_quantity}
                  onChange={(e) => handleStockChange(product, Number(e.target.value))}
                />
                <span className="products__unit">{product.unit}</span>
              </td>
              <td>
                <button className="products__toggle" onClick={() => toggleActive(product)}>
                  {product.is_active ? "Active" : "Hidden"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
