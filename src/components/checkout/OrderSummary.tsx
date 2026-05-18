'use client';

import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/utils/formatCurrency';
import Button from '@/components/ui/Button';
import Link from 'next/link';

interface OrderSummaryProps {
  onBack: () => void;
}

export default function OrderSummary({ onBack }: OrderSummaryProps) {
  const { cart, clearCart } = useCart();

  async function handleConfirm() {
    // TODO: submit order to API
    clearCart();
    // redirect to success page
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Vérifiez votre commande</h2>

      <div className="bg-white border border-gray-100 rounded-xl p-5 space-y-3">
        {cart.items.map((item) => (
          <div key={item.id} className="flex justify-between items-center text-sm">
            <div>
              <span className="font-medium text-gray-900">{item.product.name}</span>
              <span className="text-gray-400 ml-2">×{item.quantity}</span>
            </div>
            <span className="font-semibold">{formatCurrency(item.product.price * item.quantity)}</span>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 rounded-xl p-5 space-y-2 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Sous-total</span>
          <span>{formatCurrency(cart.subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Livraison</span>
          <span>{cart.deliveryFee === 0 ? 'Gratuite' : formatCurrency(cart.deliveryFee)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
          <span>Total</span>
          <span>{formatCurrency(cart.total)}</span>
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="button" variant="ghost" size="lg" onClick={onBack}>Retour</Button>
        <Button variant="primary" size="lg" fullWidth onClick={handleConfirm}>
          Confirmer et payer — {formatCurrency(cart.total)}
        </Button>
      </div>
    </div>
  );
}
