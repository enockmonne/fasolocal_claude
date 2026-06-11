'use client';

import Link from 'next/link';
import Image from 'next/image';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/utils/formatCurrency';
import { siteConfig } from '@/config/site';

const FREE_THRESHOLD = siteConfig.delivery.freeThreshold;

export default function CheckoutPage() {
  const { cart } = useCart();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Slim checkout header */}
      <div className="bg-white border-b border-gray-100 py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">FL</span>
            </div>
            <span className="text-lg font-bold text-green-800">
              Faso<span className="text-amber-500">Local</span>
            </span>
          </Link>
          <Link href="/cart" className="text-sm text-gray-500 hover:text-green-700 flex items-center gap-1 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Retour au panier
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">

          {/* ── Left: multi-step form ── */}
          <div>
            <CheckoutForm />
          </div>

          {/* ── Right: order summary ── */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 bg-gray-50 border-b border-gray-100">
                <h2 className="text-sm font-bold text-gray-900">
                  Votre commande · {cart.itemCount} article{cart.itemCount !== 1 ? 's' : ''}
                </h2>
              </div>

              {/* Items */}
              <div className="divide-y divide-gray-50 px-5">
                {cart.items.length === 0 ? (
                  <p className="py-6 text-sm text-gray-400 text-center">Panier vide</p>
                ) : (
                  cart.items.map((item) => {
                    const img = item.product.images.find((i) => i.isPrimary) || item.product.images[0];
                    return (
                      <div key={item.id} className="flex gap-3 py-3">
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                          {img && <Image src={img.url} alt={item.product.name} fill className="object-cover" />}
                          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-green-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 line-clamp-2 leading-snug">{item.product.name}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{item.product.origin}</p>
                        </div>
                        <p className="text-sm font-semibold text-gray-900 shrink-0">
                          {formatCurrency(item.product.price * item.quantity)}
                        </p>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Totals */}
              <div className="px-5 py-4 border-t border-gray-100 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Sous-total</span>
                  <span className="font-medium">{formatCurrency(cart.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Livraison</span>
                  <span className={cart.deliveryFee === 0 ? 'text-green-600 font-semibold' : 'font-medium'}>
                    {cart.deliveryFee === 0 ? 'Gratuite' : formatCurrency(cart.deliveryFee)}
                  </span>
                </div>
                {cart.subtotal < FREE_THRESHOLD && (
                  <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2">
                    Plus que <strong>{formatCurrency(FREE_THRESHOLD - cart.subtotal)}</strong> pour la livraison gratuite
                  </p>
                )}
                <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span className="text-lg">{formatCurrency(cart.total)}</span>
                </div>
              </div>

              {/* Payment methods */}
              <div className="px-5 pb-4 flex flex-wrap gap-1.5 justify-center">
                {[
                  { label: 'Orange Money', dot: 'bg-orange-500' },
                  { label: 'Moov Money', dot: 'bg-sky-500' },
                  { label: 'Coris Money', dot: 'bg-emerald-500' },
                ].map((p) => (
                  <span key={p.label} className="flex items-center gap-1 text-[10px] text-gray-400 font-medium bg-gray-50 px-2 py-1 rounded-full border border-gray-100">
                    <span className={`w-1.5 h-1.5 rounded-full ${p.dot}`} />
                    {p.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Security badge */}
            <div className="flex items-center justify-center gap-2 mt-3 text-xs text-gray-400">
              <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Paiement 100% sécurisé
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
