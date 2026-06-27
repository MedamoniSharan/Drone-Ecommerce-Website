import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

export interface CartItem {
  lineId: string;
  productId: string;
  title: string;
  price: string;
  comparePrice?: string;
  image: string;
  model?: string;
  battery?: string;
  quantity: number;
}

interface AddToCartInput {
  productId: string;
  title: string;
  price: string;
  comparePrice?: string;
  image: string;
  model?: string;
  battery?: string;
  quantity?: number;
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (input: AddToCartInput) => void;
  removeItem: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function makeLineId(productId: string, model?: string, battery?: string) {
  return `${productId}::${model ?? ''}::${battery ?? ''}`;
}

export function parsePriceValue(price: string) {
  return parseFloat(price.replace(/[^\d.]/g, '')) || 0;
}

export function formatPriceValue(amount: number) {
  return `₹ ${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback(
    (input: AddToCartInput) => {
      const lineId = makeLineId(input.productId, input.model, input.battery);
      const qty = input.quantity ?? 1;

      setItems((prev) => {
        const existing = prev.find((item) => item.lineId === lineId);
        if (existing) {
          return prev.map((item) =>
            item.lineId === lineId ? { ...item, quantity: item.quantity + qty } : item,
          );
        }
        return [
          ...prev,
          {
            lineId,
            productId: input.productId,
            title: input.title,
            price: input.price,
            comparePrice: input.comparePrice,
            image: input.image,
            model: input.model,
            battery: input.battery,
            quantity: qty,
          },
        ];
      });
      setIsOpen(true);
    },
    [],
  );

  const removeItem = useCallback((lineId: string) => {
    setItems((prev) => prev.filter((item) => item.lineId !== lineId));
  }, []);

  const updateQuantity = useCallback((lineId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((item) => (item.lineId === lineId ? { ...item, quantity } : item)),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      itemCount,
      isOpen,
      openCart,
      closeCart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [
      items,
      itemCount,
      isOpen,
      openCart,
      closeCart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
