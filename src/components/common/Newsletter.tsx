'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    await new Promise((r) => setTimeout(r, 900));
    setStatus('success');
    setEmail('');
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
      {/* Copy */}
      <div className="md:max-w-xs">
        <h3 className="text-base font-bold text-white mb-1">
          🌿 Restez dans la boucle
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed">
          Nouveautés, offres exclusives et histoires de producteurs — directement dans votre boîte mail.
        </p>
      </div>

      {/* Form */}
      <div className="w-full md:w-auto">
        {status === 'success' ? (
          <div className="flex items-center gap-2 bg-green-900/50 border border-green-700 rounded-xl px-5 py-3">
            <svg className="w-5 h-5 text-green-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-sm font-semibold text-green-300">Vous êtes inscrit(e) — merci !</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              required
              className="w-56 sm:w-64 px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-semibold text-sm transition-colors disabled:opacity-60 shrink-0"
            >
              {status === 'loading' ? (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
              ) : "S'inscrire"}
            </button>
          </form>
        )}
        <p className="text-xs text-gray-500 mt-2">Pas de spam. Désabonnement en 1 clic.</p>
      </div>
    </div>
  );
}
