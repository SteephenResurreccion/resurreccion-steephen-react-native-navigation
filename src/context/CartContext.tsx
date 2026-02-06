import React, { createContext, useContext, useMemo, useState } from "react";
import { CartItem, Product } from "../types";

type CartContextValue = {
  items: CartItem[];
  addToCart: (product: Product) => void;
  increaseQty: (productId: string) => void;
  decreaseQty: (productId: string) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number; // sum of quantities
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((x) => x.product.id === product.id);

      // If already in cart, just increment quantity.
      if (existing) {
        return prev.map((x) =>
          x.product.id === product.id ? { ...x, quantity: x.quantity + 1 } : x
        );
      }

      // Otherwise, add new item with quantity = 1
      return [...prev, { product, quantity: 1 }];
    });
  };

  const increaseQty = (productId: string) => {
    setItems((prev) =>
      prev.map((x) =>
        x.product.id === productId ? { ...x, quantity: x.quantity + 1 } : x
      )
    );
  };

  const decreaseQty = (productId: string) => {
    setItems((prev) =>
      prev
        .map((x) =>
          x.product.id === productId ? { ...x, quantity: x.quantity - 1 } : x
        )
        // Remove item if quantity hits 0
        .filter((x) => x.quantity > 0)
    );
  };

  const clearCart = () => setItems([]);

  const { totalPrice, totalItems } = useMemo(() => {
    const totals = items.reduce(
      (acc, item) => {
        acc.totalPrice += item.product.price * item.quantity;
        acc.totalItems += item.quantity;
        return acc;
      },
      { totalPrice: 0, totalItems: 0 }
    );

    return totals;
  }, [items]);

  const value: CartContextValue = {
    items,
    addToCart,
    increaseQty,
    decreaseQty,
    clearCart,
    totalPrice,
    totalItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
