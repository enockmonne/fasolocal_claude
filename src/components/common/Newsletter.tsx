'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    // TODO: integrate with email service
    await new Promise((r) => setTimeout(r, 1000));
    setStatus('success');
    setEmail('');
  }

  return (
    <div className="text-center max-w-xl mx-auto">
      <h3 className="text-lg font-bold text-white mb-2">Restez Informé</h3>
      <p className="text-sm text-gray-400 mb-5">
        Recevez nos nouveautés, offres exclusives et les derniers produits locaux du Burkina.
      </p>
      {status === 'success' ? (
        <p className="text-green-400 font-medium">Merci ! Vous êtes inscrit(e). 🎉</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
            required
            className="flex-1 px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <Button type="submit" variant="secondary" isLoading={status === 'loading'}>
            S&apos;inscrire
          </Button>
        </form>
      )}
    </div>
  );
}
