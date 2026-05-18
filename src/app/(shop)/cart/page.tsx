'use client';

import { useCart } from '@/hooks/useCart';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function CartPage() {
  const { cart, clearCart } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumbs items={[{ label: 'Panier' }]} />

      <h1 className="text-3xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'var(--font-display)' }}>
        Mon Panier
      </h1>

      {cart.items.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🛒</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Votre panier est vide</h2>
          <p className="text-gray-500 mb-6">Découvrez nos produits locaux du Burkina Faso</p>
          <Link href="/products">
            <Button variant="primary">Explorer la boutique</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">{cart.itemCount} article(s)</span>
                <button onClick={clearCart} className="text-sm text-red-500 hover:text-red-700">
                  Vider le panier
                </button>
              </div>
              {cart.items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Summary */}
          <div>
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  );
}
