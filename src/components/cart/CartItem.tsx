'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { CartItem as CartItemType } from '@/types/cart';
import { formatCurrency } from '@/utils/formatCurrency';
import { useCart } from '@/hooks/useCart';

export default function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeItem } = useCart();
  const primaryImage = item.product.images.find((i) => i.isPrimary) || item.product.images[0];
  const lineTotal = item.product.price * item.quantity;

  return (
    <AnimatePresence>
      <motion.div
        layout
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.22 }}
        className="flex gap-4 py-4 border-b border-gray-100 last:border-0"
      >
        {/* Image */}
        <div className="relative w-20 h-20 bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-gray-100">
          {primaryImage ? (
            <Image src={primaryImage.url} alt={item.product.name} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl">🛍️</div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">
                {item.product.name}
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">{item.product.origin}</p>
              <p className="text-xs text-gray-500 mt-1">
                {formatCurrency(item.product.price)} / unité
              </p>
            </div>
            {/* Remove button */}
            <button
              onClick={() => removeItem(item.product.id)}
              aria-label="Supprimer"
              className="shrink-0 p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Bottom row: stepper + line total */}
          <div className="flex items-center justify-between mt-3">
            {/* Quantity stepper */}
            <div className="flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden">
              <button
                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
                aria-label="Diminuer"
                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-lg font-light"
              >
                −
              </button>
              <span className="w-8 text-center text-sm font-semibold text-gray-900">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                disabled={item.quantity >= item.product.stock}
                aria-label="Augmenter"
                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-lg font-light"
              >
                +
              </button>
            </div>

            {/* Line total */}
            <p className="text-base font-bold text-gray-900">
              {formatCurrency(lineTotal)}
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
