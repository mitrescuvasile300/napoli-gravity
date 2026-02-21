"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  description?: string;
  options?: string;
  gramaj?: number;
}

export type OrderType = "delivery" | "pickup";

export interface PickupLocation {
  id: string;
  name: string;
  address: string;
  phone: string;
}

export const PICKUP_LOCATIONS: PickupLocation[] = [
  {
    id: "cluj",
    name: "Napoli Centrale Cluj",
    address: "Str. Dobrogeanu Gherea Nr. 17, Cluj-Napoca",
    phone: "+40 264 450 500",
  },
  {
    id: "floresti",
    name: "Napoli Centrale Florești",
    address: "Strada Florilor 325 N, Florești",
    phone: "0364 715 555",
  },
];

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  pickupLocation: PickupLocation;
  setPickupLocation: (location: PickupLocation) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [orderType, setOrderType] = useState<OrderType>("delivery");
  const [pickupLocation, setPickupLocation] = useState<PickupLocation>(PICKUP_LOCATIONS[0]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addItem = useCallback(
    (newItem: Omit<CartItem, "quantity"> & { quantity?: number }) => {
      setItems((currentItems) => {
        const existingItem = currentItems.find((item) => item.id === newItem.id);
        const quantity = newItem.quantity || 1;

        if (existingItem) {
          return currentItems.map((item) =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }

        return [...currentItems, { ...newItem, quantity }];
      });
      setIsCartOpen(true);
    },
    []
  );

  const removeItem = useCallback((id: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((currentItems) => currentItems.filter((item) => item.id !== id));
    } else {
      setItems((currentItems) =>
        currentItems.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        orderType,
        setOrderType,
        pickupLocation,
        setPickupLocation,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
