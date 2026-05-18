'use client';

import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { Product } from '@/types/product';
import { productService } from '@/services/productService';
import Link from 'next/link';
import { formatCurrency } from '@/utils/formatCurrency';

export default function ProductSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setResults([]);
      return;
    }
    productService.searchProducts(debouncedQuery).then(setResults);
  }, [debouncedQuery]);

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
        onFocus={() => setIsOpen(true)}
        placeholder="Rechercher un produit..."
        className="w-full px-4 py-2.5 pl-10 rounded-full border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400"
      />
      <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-1 w-full bg-white border border-gray-100 rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto">
          {results.map((p) => (
            <Link
              key={p.id}
              href={`/products/${p.slug}`}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-lg shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                <p className="text-xs text-gray-500">{formatCurrency(p.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
