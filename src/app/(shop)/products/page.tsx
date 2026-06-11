'use client';

import { Suspense, useMemo, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import ProductCard from '@/components/products/ProductCard';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import { ProductCategory } from '@/types/product';

const CATEGORIES: { slug: string; label: string; emoji: string }[] = [
  { slug: 'all', label: 'Tous les produits', emoji: '🛒' },
  { slug: 'agroalimentaire', label: 'Agroalimentaire', emoji: '🌾' },
  { slug: 'cosmetiques', label: 'Cosmétiques', emoji: '✨' },
  { slug: 'artisanat', label: 'Artisanat', emoji: '🏺' },
  { slug: 'textiles', label: 'Textiles', emoji: '🧵' },
  { slug: 'sante-bien-etre', label: 'Santé & Bien-être', emoji: '🌿' },
  { slug: 'boissons', label: 'Boissons', emoji: '🥤' },
  { slug: 'cereales-farines', label: 'Céréales & Farines', emoji: '🌽' },
  { slug: 'epices-condiments', label: 'Épices & Condiments', emoji: '🫚' },
];

const SORT_OPTIONS = [
  { value: 'popular', label: 'Populaires' },
  { value: 'newest', label: 'Nouveautés' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'rating', label: 'Mieux notés' },
];

const PRICE_RANGES = [
  { label: 'Tous les prix', min: undefined, max: undefined },
  { label: 'Moins de 2 000 FCFA', min: 0, max: 2000 },
  { label: '2 000 – 5 000 FCFA', min: 2000, max: 5000 },
  { label: '5 000 – 15 000 FCFA', min: 5000, max: 15000 },
  { label: 'Plus de 15 000 FCFA', min: 15000, max: undefined },
];

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeCategory = searchParams.get('category') || 'all';
  const activeSort = searchParams.get('sort') || 'popular';

  const [priceRange, setPriceRange] = useState(0); // index into PRICE_RANGES
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  function setParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all' || value === 'popular') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const filteredProducts = useMemo(() => {
    let list = [...MOCK_PRODUCTS];

    // Category
    if (activeCategory && activeCategory !== 'all') {
      list = list.filter((p) => p.category === (activeCategory as ProductCategory));
    }

    // Price range
    const range = PRICE_RANGES[priceRange];
    if (range.min !== undefined) list = list.filter((p) => p.price >= range.min!);
    if (range.max !== undefined) list = list.filter((p) => p.price <= range.max!);

    // Sort
    switch (activeSort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'rating':
        list.sort((a, b) => b.ratings.average - a.ratings.average);
        break;
      case 'popular':
      default:
        list.sort((a, b) => b.ratings.count - a.ratings.count);
        break;
    }

    return list;
  }, [activeCategory, activeSort, priceRange]);

  const activeCategoryLabel = CATEGORIES.find((c) => c.slug === activeCategory)?.label || 'Tous les produits';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <nav className="text-xs text-gray-500 mb-2">
            <span>Accueil</span>
            <span className="mx-2">›</span>
            <span className="text-gray-900 font-medium">Boutique</span>
            {activeCategory !== 'all' && (
              <>
                <span className="mx-2">›</span>
                <span className="text-gray-900 font-medium">{activeCategoryLabel}</span>
              </>
            )}
          </nav>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
            {activeCategoryLabel}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {filteredProducts.length} produit{filteredProducts.length !== 1 ? 's' : ''} disponible{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Category tabs — horizontal scroll */}
        <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setParam('category', cat.slug)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all shrink-0 ${
                activeCategory === cat.slug
                  ? 'bg-green-700 text-white shadow-sm'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-green-300 hover:text-green-700'
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        <div className="flex gap-6">
          {/* Sidebar — desktop */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="bg-white rounded-xl border border-gray-100 p-5 sticky top-24">
              <h3 className="font-semibold text-gray-900 text-sm mb-4">Filtres</h3>

              {/* Price filter */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Prix</p>
                <div className="space-y-2">
                  {PRICE_RANGES.map((range, i) => (
                    <label key={i} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="price"
                        checked={priceRange === i}
                        onChange={() => setPriceRange(i)}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className={`text-sm transition-colors ${priceRange === i ? 'text-green-700 font-semibold' : 'text-gray-600 group-hover:text-gray-900'}`}>
                        {range.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="mt-6 pt-5 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Disponibilité</p>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="text-green-600 rounded focus:ring-green-500" />
                  <span className="text-sm text-gray-600">En stock uniquement</span>
                </label>
              </div>

              {/* Reset */}
              {(priceRange > 0 || activeCategory !== 'all') && (
                <button
                  onClick={() => { setPriceRange(0); setParam('category', 'all'); }}
                  className="mt-5 w-full text-sm text-green-700 font-medium hover:text-green-800 text-left"
                >
                  ✕ Réinitialiser les filtres
                </button>
              )}
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Sort bar */}
            <div className="flex items-center justify-between gap-3 mb-5">
              {/* Mobile filter toggle */}
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-green-300"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" /></svg>
                Filtrer
              </button>

              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-gray-500 hidden sm:block">Trier par :</span>
                <select
                  value={activeSort}
                  onChange={(e) => setParam('sort', e.target.value)}
                  className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-200 cursor-pointer"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Product grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-100 p-16 text-center">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun produit trouvé</h3>
                <p className="text-sm text-gray-500 mb-5">Essayez une autre catégorie ou modifiez vos filtres.</p>
                <button
                  onClick={() => { setPriceRange(0); setParam('category', 'all'); }}
                  className="text-sm font-semibold text-green-700 hover:text-green-800"
                >
                  Voir tous les produits →
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-xl p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900">Filtres</h3>
              <button onClick={() => setMobileFiltersOpen(false)} className="p-1 text-gray-500 hover:text-gray-700">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Prix</p>
            <div className="space-y-3 mb-6">
              {PRICE_RANGES.map((range, i) => (
                <label key={i} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="price-mobile"
                    checked={priceRange === i}
                    onChange={() => setPriceRange(i)}
                    className="text-green-600"
                  />
                  <span className={`text-sm ${priceRange === i ? 'text-green-700 font-semibold' : 'text-gray-600'}`}>
                    {range.label}
                  </span>
                </label>
              ))}
            </div>

            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="w-full bg-green-700 text-white font-semibold py-3 rounded-xl hover:bg-green-800 transition-colors"
            >
              Voir {filteredProducts.length} produit{filteredProducts.length !== 1 ? 's' : ''}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-400 text-sm">Chargement des produits…</div>
      </div>
    }>
      <ProductsPageContent />
    </Suspense>
  );
}
