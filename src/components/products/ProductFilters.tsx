'use client';

import { ProductFilters as Filters } from '@/types/product';

interface ProductFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Partial<Filters>) => void;
}

const priceRanges = [
  { label: 'Tous les prix', min: undefined, max: undefined },
  { label: 'Moins de 5 000 FCFA', min: 0, max: 5000 },
  { label: '5 000 - 15 000 FCFA', min: 5000, max: 15000 },
  { label: '15 000 - 50 000 FCFA', min: 15000, max: 50000 },
  { label: 'Plus de 50 000 FCFA', min: 50000, max: undefined },
];

const sortOptions = [
  { label: 'Les plus récents', value: 'newest' },
  { label: 'Prix croissant', value: 'price-asc' },
  { label: 'Prix décroissant', value: 'price-desc' },
  { label: 'Les mieux notés', value: 'rating' },
  { label: 'Populaires', value: 'popular' },
];

export default function ProductFilters({ filters, onFilterChange }: ProductFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Sort */}
      <select
        value={filters.sortBy || 'newest'}
        onChange={(e) => onFilterChange({ sortBy: e.target.value as Filters['sortBy'] })}
        className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-200"
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>

      {/* Price range */}
      <select
        value={`${filters.minPrice ?? ''}-${filters.maxPrice ?? ''}`}
        onChange={(e) => {
          const [min, max] = e.target.value.split('-');
          onFilterChange({
            minPrice: min ? Number(min) : undefined,
            maxPrice: max ? Number(max) : undefined,
          });
        }}
        className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-200"
      >
        {priceRanges.map((range, i) => (
          <option key={i} value={`${range.min ?? ''}-${range.max ?? ''}`}>{range.label}</option>
        ))}
      </select>
    </div>
  );
}
