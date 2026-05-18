'use client';

import { useState } from 'react';
import { PaymentMethod } from '@/types/order';
import Button from '@/components/ui/Button';

interface PaymentFormProps {
  onBack: () => void;
  onNext: () => void;
}

const paymentMethods: { value: PaymentMethod; label: string; icon: string }[] = [
  { value: 'orange-money', label: 'Orange Money', icon: '🟠' },
  { value: 'moov-money', label: 'Moov Money', icon: '🔵' },
  { value: 'coris-money', label: 'Coris Money', icon: '🟢' },
  { value: 'visa', label: 'Carte Visa', icon: '💳' },
  { value: 'mastercard', label: 'Carte Mastercard', icon: '💳' },
  { value: 'cash-on-delivery', label: 'Paiement à la livraison', icon: '💵' },
];

export default function PaymentForm({ onBack, onNext }: PaymentFormProps) {
  const [selected, setSelected] = useState<PaymentMethod>('orange-money');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: process payment
    onNext();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Mode de paiement</h2>

      <div className="space-y-2">
        {paymentMethods.map((method) => (
          <label
            key={method.value}
            className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
              selected === method.value
                ? 'border-green-600 bg-green-50'
                : 'border-gray-100 hover:border-gray-200'
            }`}
          >
            <input
              type="radio"
              name="payment"
              value={method.value}
              checked={selected === method.value}
              onChange={() => setSelected(method.value)}
              className="sr-only"
            />
            <span className="text-xl">{method.icon}</span>
            <span className="text-sm font-medium text-gray-900">{method.label}</span>
            {selected === method.value && (
              <span className="ml-auto text-green-600">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </span>
            )}
          </label>
        ))}
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="ghost" size="lg" onClick={onBack}>Retour</Button>
        <Button type="submit" variant="primary" size="lg" fullWidth>Confirmer la commande</Button>
      </div>
    </form>
  );
}
