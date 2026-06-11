'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types/product';
import { formatCurrency, calcDiscount } from '@/utils/formatCurrency';
import { useCart } from '@/hooks/useCart';
import Badge from '@/components/ui/Badge';

interface ProductCardProps {
  product: Product;
}

function StarRating({ average, count }: { average: number; count: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={`w-3 h-3 ${i < Math.round(average) ? 'text-amber-400' : 'text-gray-200'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-xs text-gray-400">({count})</span>
    </div>
  );
}

export default function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const { addItem, isInCart } = useCart();
  const inCart = isInCart(product.id);
  const [justAdded, setJustAdded] = useState(false);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!inCart) {
      addItem(product, 1);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1500);
    }
  }

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative block rounded-xl border border-gray-100 bg-white overflow-hidden hover:shadow-xl hover:border-green-100 transition-all duration-300"
    >
      {/* Image container */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt || product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl bg-green-50">
            🛍️
          </div>
        )}

        {/* Badges — top left */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && <Badge variant="info" size="sm">Nouveau</Badge>}
          {hasDiscount && (
            <Badge variant="danger" size="sm">
              -{calcDiscount(product.price, product.compareAtPrice!)}%
            </Badge>
          )}
          {product.isFeatured && !product.isNew && !hasDiscount && (
            <Badge variant="warning" size="sm">Populaire</Badge>
          )}
        </div>

        {/* Wishlist — top right, appears on hover */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
          aria-label="Ajouter aux favoris"
          className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow opacity-0 group-hover:opacity-100 transition-all duration-200 text-gray-400 hover:text-red-500 hover:scale-110"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Out of stock overlay */}
        {!product.isAvailable && (
          <div className="absolute inset-0 bg-white/75 flex items-center justify-center">
            <span className="bg-white text-gray-600 text-sm font-semibold px-3 py-1 rounded-full shadow-sm">
              Rupture de stock
            </span>
          </div>
        )}

        {/* Add to cart — slides up from bottom on hover */}
        {product.isAvailable && (
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <motion.button
              onClick={handleAddToCart}
              whileTap={{ scale: 0.97 }}
              className={`w-full py-2.5 text-sm font-semibold transition-colors duration-200 relative overflow-hidden ${
                inCart || justAdded
                  ? 'bg-green-700 text-white'
                  : 'bg-gray-900/95 text-white hover:bg-green-700'
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {justAdded ? (
                  <motion.span
                    key="added"
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -16, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-center justify-center gap-1.5"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Ajouté !
                  </motion.span>
                ) : inCart ? (
                  <motion.span
                    key="incart"
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -16, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    ✓ Dans le panier
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -16, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    + Ajouter au panier
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="p-3">
        <p className="text-xs text-green-600 font-medium truncate mb-0.5">
          {product.producer?.name || product.origin}
        </p>
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug group-hover:text-green-700 transition-colors mb-2">
          {product.name}
        </h3>

        {product.ratings.count > 0 && (
          <div className="mb-2">
            <StarRating average={product.ratings.average} count={product.ratings.count} />
          </div>
        )}

        <div className="flex items-baseline gap-2">
          <span className="text-base font-bold text-gray-900">
            {formatCurrency(product.price)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-gray-400 line-through">
              {formatCurrency(product.compareAtPrice!)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
