import CheckoutForm from '@/components/checkout/CheckoutForm';
import Breadcrumbs from '@/components/common/Breadcrumbs';

export default function CheckoutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumbs items={[
        { label: 'Panier', href: '/cart' },
        { label: 'Commander' },
      ]} />

      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center" style={{ fontFamily: 'var(--font-display)' }}>
        Passer la Commande
      </h1>

      <CheckoutForm />
    </div>
  );
}
