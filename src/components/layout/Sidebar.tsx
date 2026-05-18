'use client';

import { ProductCategory } from '@/types/product';

const categories: { slug: ProductCategory; label: string; emoji: string }[] = [
  { slug: 'agroalimentaire', label: 'Agroalimentaire', emoji: '🌾' },
  { slug: 'cosmetiques', label: 'Cosmétiques & Karité', emoji: '✨' },
  { slug: 'artisanat', label: 'Artisanat', emoji: '🏺' },
  { slug: 'textiles', label: 'Textiles & Faso Dan Fani', emoji: '🧵' },
  { slug: 'sante-bien-etre', label: 'Santé & Bien-être', emoji: '🌿' },
  { slug: 'boissons', label: 'Boissons Locales', emoji: '🥤' },
  { slug: 'cereales-farines', label: 'Céréales & Farines', emoji: '🌽' },
  { slug: 'epices-condiments', label: 'Épices & Condiments', emoji: '🫚' },
];

interface SidebarProps {
  selectedCategory?: ProductCategory;
  onCategoryChange: (category?: ProductCategory) => void;
}

export default function Sidebar({ selectedCategory, onCategoryChange }: SidebarProps) {
  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Catégories</h3>
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => onCategoryChange(undefined)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                !selectedCategory ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Tous les produits
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.slug}>
              <button
                onClick={() => onCategoryChange(cat.slug)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedCategory === cat.slug
                    ? 'bg-green-50 text-green-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="mr-2">{cat.emoji}</span>
                {cat.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
