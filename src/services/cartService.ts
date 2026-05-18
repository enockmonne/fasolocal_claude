import { Cart } from '@/types/cart';

const CART_STORAGE_KEY = 'fasolocal_cart';

export const cartService = {
  saveCart(cart: Cart): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart.items));
    }
  },

  loadCart(): Cart['items'] | null {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return null;
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  },

  clearCart(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  },
};
