'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full group">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher miel, karité, Faso Dan Fani…"
        className="w-full h-11 pl-4 pr-14 rounded-lg border-2 border-gray-200 bg-white text-sm
                   focus:outline-none focus:border-green-500 focus:ring-0
                   placeholder:text-gray-400 transition-colors"
      />
      <button
        type="submit"
        aria-label="Rechercher"
        className="absolute right-0 top-0 bottom-0 px-4 bg-green-700 hover:bg-green-800
                   text-white rounded-r-lg transition-colors flex items-center justify-center"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </form>
  );
}
