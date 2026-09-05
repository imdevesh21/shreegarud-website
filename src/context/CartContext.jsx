import { createContext, useContext, useState, useCallback, useMemo } from "react";

const CartContext = createContext(null);

// Not e-commerce cart with prices/checkout — this is an "order request" draft.
// Customers pick quantities of in-stock items; submitting creates a pending
// order for the team to approve, not an immediate purchase.
export function CartProvider({ children }) {
  const [items, setItems] = useState({}); // { [productId]: { product, quantity, notes } }

  const setQuantity = useCallback((product, quantity) => {
    setItems((prev) => {
      const next = { ...prev };
      if (quantity <= 0) {
        delete next[product.id];
      } else {
        next[product.id] = {
          product,
          quantity,
          notes: prev[product.id]?.notes || "",
        };
      }
      return next;
    });
  }, []);

  const setNotes = useCallback((productId, notes) => {
    setItems((prev) => {
      if (!prev[productId]) return prev;
      return { ...prev, [productId]: { ...prev[productId], notes } };
    });
  }, []);

  const clearCart = useCallback(() => setItems({}), []);

  const itemList = useMemo(() => Object.values(items), [items]);
  const totalQuantity = useMemo(
    () => itemList.reduce((sum, i) => sum + i.quantity, 0),
    [itemList]
  );

  return (
    <CartContext.Provider
      value={{ items, itemList, totalQuantity, setQuantity, setNotes, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
