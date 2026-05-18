'use client';

import { useState } from 'react';
import ShippingForm from './ShippingForm';
import PaymentForm from './PaymentForm';
import OrderSummary from './OrderSummary';

type Step = 'shipping' | 'payment' | 'review';

export default function CheckoutForm() {
  const [step, setStep] = useState<Step>('shipping');

  const steps: { key: Step; label: string }[] = [
    { key: 'shipping', label: 'Livraison' },
    { key: 'payment', label: 'Paiement' },
    { key: 'review', label: 'Confirmation' },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      {/* Steps indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {steps.map((s, i) => (
          <div key={s.key} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              step === s.key ? 'bg-green-700 text-white' :
              steps.findIndex(x => x.key === step) > i ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'
            }`}>
              {i + 1}
            </div>
            <span className={`text-sm font-medium hidden sm:block ${step === s.key ? 'text-green-700' : 'text-gray-400'}`}>
              {s.label}
            </span>
            {i < steps.length - 1 && <div className="w-8 h-px bg-gray-200 mx-1" />}
          </div>
        ))}
      </div>

      {step === 'shipping' && <ShippingForm onNext={() => setStep('payment')} />}
      {step === 'payment' && <PaymentForm onBack={() => setStep('shipping')} onNext={() => setStep('review')} />}
      {step === 'review' && <OrderSummary onBack={() => setStep('payment')} />}
    </div>
  );
}
