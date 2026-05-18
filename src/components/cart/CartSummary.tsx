import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/utils/formatCurrency';
import { siteConfig } from '@/config/site';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function CartSummary() {
  const { cart } = useCart();

  return (
    <div className="bg-gray-50 rounded-xl p-6 space-y-4">
      <h3 className="text-lg font-bold text-gray-900">Résumé de la commande</h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Sous-total ({cart.itemCount} articles)</span>
          <span>{formatCurrency(cart.subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Livraison</span>
          <span>
            {cart.deliveryFee === 0 ? (
              <span className="text-green-600 font-medium">Gratuite</span>
            ) : (
              formatCurrency(cart.deliveryFee)
            )}
          </span>
        </div>
        {cart.subtotal > 0 && cart.subtotal < siteConfig.delivery.freeThreshold && (
          <p className="text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
            Plus que {formatCurrency(siteConfig.delivery.freeThreshold - cart.subtotal)} pour la livraison gratuite !
          </p>
        )}
      </div>

      <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
        <span className="text-base font-bold text-gray-900">Total</span>
        <span className="text-xl font-bold text-gray-900">{formatCurrency(cart.total)}</span>
      </div>

      <Link href="/checkout" className="block">
        <Button variant="primary" size="lg" fullWidth disabled={cart.itemCount === 0}>
          Passer la commande
        </Button>
      </Link>
    </div>
  );
}
