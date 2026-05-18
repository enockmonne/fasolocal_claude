'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface ShippingFormProps {
  onNext: () => void;
}

export default function ShippingForm({ onNext }: ShippingFormProps) {
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    street: '',
    quartier: '',
    city: 'Ouagadougou',
    instructions: '',
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: validate & save shipping data
    onNext();
  }

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Adresse de livraison</h2>

      <Input label="Nom complet" value={form.fullName} onChange={(e) => update('fullName', e.target.value)} required />
      <Input label="Téléphone" type="tel" placeholder="+226 XX XX XX XX" value={form.phone} onChange={(e) => update('phone', e.target.value)} required />
      <Input label="Adresse / Rue" value={form.street} onChange={(e) => update('street', e.target.value)} required />
      <div className="grid grid-cols-2 gap-4">
        <Input label="Quartier" value={form.quartier} onChange={(e) => update('quartier', e.target.value)} required />
        <Input label="Ville" value={form.city} onChange={(e) => update('city', e.target.value)} required />
      </div>
      <Input label="Instructions de livraison (optionnel)" value={form.instructions} onChange={(e) => update('instructions', e.target.value)} placeholder="Ex: Près du marché central, portail bleu" />

      <div className="pt-4">
        <Button type="submit" variant="primary" size="lg" fullWidth>
          Continuer vers le paiement
        </Button>
      </div>
    </form>
  );
}
