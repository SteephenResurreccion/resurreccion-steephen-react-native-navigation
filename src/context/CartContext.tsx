import React, { createContext, useContext, useMemo, useState } from "react";
import { CartItem, Product } from "../types";

type CartContextValue = {
  items: CartItem[];
  addToCart: (product: Product) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  clear: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setItems((prev) => {
      const found = prev.find((i) => i.product.id === product.id);
      if (found) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const increase = (id: string) =>
    setItems((p) => p.map((i) => (i.product.id === id ? { ...i, quantity: i.quantity + 1 } : i)));

  const decrease = (id: string) =>
    setItems((p) =>
      p
        .map((i) => (i.product.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );

  const clear = () => setItems([]);

  const { totalItems, totalPrice } = useMemo(() => {
    return items.reduce(
      (a, i) => {
        a.totalItems += i.quantity;
        a.totalPrice += i.product.price * i.quantity;
        return a;
      },
      { totalItems: 0, totalPrice: 0 }
    );
  }, [items]);

  return (
    <CartContext.Provider value={{ items, addToCart, increase, decrease, clear, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
