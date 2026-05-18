import { Order, CheckoutData } from '@/types/order';

const API_BASE = '/api';

export const orderService = {
  async createOrder(data: CheckoutData): Promise<Order> {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Erreur lors de la création de la commande');
    return res.json();
  },

  async getOrders(): Promise<Order[]> {
    const res = await fetch(`${API_BASE}/orders`);
    if (!res.ok) throw new Error('Impossible de charger les commandes');
    return res.json();
  },

  async getOrder(id: string): Promise<Order> {
    const res = await fetch(`${API_BASE}/orders/${id}`);
    if (!res.ok) throw new Error('Commande introuvable');
    return res.json();
  },

  async cancelOrder(id: string): Promise<Order> {
    const res = await fetch(`${API_BASE}/orders/${id}/cancel`, { method: 'POST' });
    if (!res.ok) throw new Error('Impossible d\'annuler la commande');
    return res.json();
  },
};
