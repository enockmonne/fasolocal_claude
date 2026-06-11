'use client';

import { createContext, useContext, useReducer, useCallback, useEffect, useState, ReactNode } from 'react';
import { Cart, CartAction, CartItem } from '@/types/cart';
import { Product } from '@/types/product';
import { siteConfig } from '@/config/site';

interface CartContextType {
  cart: Cart;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'fasolocal-cart-v1';

function calculateCart(items: CartItem[]): Cart {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal >= siteConfig.delivery.freeThreshold ? 0 : siteConfig.delivery.defaultFee;
  return {
    items,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
    currency: 'XOF',
  };
}

function cartReducer(state: CartItem[], action: CartAction | { type: 'HYDRATE'; payload: CartItem[] }): CartItem[] {
  switch (action.type) {
    case 'HYDRATE':
      return (action as { type: 'HYDRATE'; payload: CartItem[] }).payload;
    case 'ADD_ITEM': {
      const existing = state.find((item) => item.product.id === (action as CartAction & { type: 'ADD_ITEM' }).payload.product.id);
      if (existing) {
        return state.map((item) =>
          item.product.id === (action as CartAction & { type: 'ADD_ITEM' }).payload.product.id
            ? { ...item, quantity: item.quantity + (action as CartAction & { type: 'ADD_ITEM' }).payload.quantity }
            : item
        );
      }
      return [
        ...state,
        {
          id: crypto.randomUUID(),
          product: (action as CartAction & { type: 'ADD_ITEM' }).payload.product,
          quantity: (action as CartAction & { type: 'ADD_ITEM' }).payload.quantity,
          addedAt: new Date().toISOString(),
        },
      ];
    }
    case 'REMOVE_ITEM':
      return state.filter((item) => item.product.id !== (action as CartAction & { type: 'REMOVE_ITEM' }).payload.productId);
    case 'UPDATE_QUANTITY': {
      const qty = (action as CartAction & { type: 'UPDATE_QUANTITY' }).payload.quantity;
      const pid = (action as CartAction & { type: 'UPDATE_QUANTITY' }).payload.productId;
      if (qty <= 0) return state.filter((item) => item.product.id !== pid);
      return state.map((item) => item.product.id === pid ? { ...item, quantity: qty } : item);
    }
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage once on mount (client-side only)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as CartItem[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          dispatch({ type: 'HYDRATE', payload: parsed });
        }
      }
    } catch {
      // localStorage unavailable or JSON malformed — start fresh
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage on every change (after initial hydration)
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage full or unavailable — fail silently
    }
  }, [items, hydrated]);

  const cart = calculateCart(items);

  const addItem = useCallback((product: Product, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
  }, []);

  const removeItem = useCallback((productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const isInCart = useCallback(
    (productId: string) => items.some((item) => item.product.id === productId),
    [items]
  );

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateQuantity, clearCart, isInCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCartContext must be used within CartProvider');
  return context;
}
