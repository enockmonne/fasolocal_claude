'use client';

import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/utils/formatCurrency';
import { siteConfig } from '@/config/site';

const FREE_THRESHOLD = siteConfig.delivery.freeThreshold; // 25 000 FCFA

export default function CartSummary() {
  const { cart } = useCart();
  const pct = Math.min(100, Math.round((cart.subtotal / FREE_THRESHOLD) * 100));
  const remaining = FREE_THRESHOLD - cart.subtotal;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
        <h3 className="text-base font-bold text-gray-900">Résumé de la commande</h3>
      </div>

      <div className="px-5 py-5 space-y-4">
        {/* Free shipping progress */}
        <div className="bg-green-50 rounded-xl p-3.5">
          {cart.subtotal >= FREE_THRESHOLD ? (
            <p className="text-sm text-green-700 font-semibold flex items-center gap-1.5">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              🎉 Livraison gratuite débloquée !
            </p>
          ) : (
            <>
              <p className="text-xs text-green-700 font-medium mb-2">
                Plus que <strong>{formatCurrency(remaining)}</strong> pour la livraison gratuite
              </p>
              <div className="w-full bg-green-100 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[10px] text-green-600">0 FCFA</span>
                <span className="text-[10px] text-green-600">{formatCurrency(FREE_THRESHOLD)}</span>
              </div>
            </>
          )}
        </div>

        {/* Line items */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Sous-total ({cart.itemCount} article{cart.itemCount !== 1 ? 's' : ''})</span>
            <span className="font-medium text-gray-900">{formatCurrency(cart.subtotal)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Livraison</span>
            <span>
              {cart.deliveryFee === 0 ? (
                <span className="text-green-600 font-semibold">Gratuite</span>
              ) : (
                <span className="font-medium text-gray-900">{formatCurrency(cart.deliveryFee)}</span>
              )}
            </span>
          </div>
        </div>

        {/* Total */}
        <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
          <span className="font-bold text-gray-900">Total</span>
          <span className="text-xl font-bold text-gray-900">{formatCurrency(cart.total)}</span>
        </div>

        {/* CTA */}
        <Link
          href="/checkout"
          className={`block w-full py-3.5 rounded-xl text-center font-bold text-sm transition-colors ${
            cart.itemCount === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none'
              : 'bg-green-700 hover:bg-green-800 text-white shadow-sm'
          }`}
        >
          Passer la commande →
        </Link>

        {/* Accepted payments */}
        <div className="flex items-center justify-center gap-2 pt-1">
          {[
            { label: 'Orange Money', dot: 'bg-orange-500' },
            { label: 'Moov', dot: 'bg-sky-500' },
            { label: 'Coris', dot: 'bg-emerald-500' },
          ].map((p) => (
            <span key={p.label} className="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
              <span className={`w-1.5 h-1.5 rounded-full ${p.dot}`} />
              {p.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
