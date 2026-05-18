import { User, LoginCredentials, RegisterData } from '@/types/user';

const API_BASE = '/api';

export const authService = {
  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!res.ok) throw new Error('Email ou mot de passe incorrect');
    return res.json();
  },

  async register(data: RegisterData): Promise<{ user: User; token: string }> {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Erreur lors de l'inscription");
    }
    return res.json();
  },

  async logout(): Promise<void> {
    await fetch(`${API_BASE}/auth/logout`, { method: 'POST' });
  },

  async getSession(): Promise<{ user: User } | null> {
    const res = await fetch(`${API_BASE}/auth/session`);
    if (!res.ok) return null;
    return res.json();
  },

  async forgotPassword(email: string): Promise<void> {
    const res = await fetch(`${API_BASE}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) throw new Error("Erreur lors de l'envoi du lien de réinitialisation");
  },
};
