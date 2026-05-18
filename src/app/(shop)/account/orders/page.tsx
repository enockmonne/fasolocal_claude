import Breadcrumbs from '@/components/common/Breadcrumbs';

export default function OrdersPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumbs items={[
        { label: 'Mon Compte', href: '/account' },
        { label: 'Mes Commandes' },
      ]} />

      <h1 className="text-3xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'var(--font-display)' }}>
        Mes Commandes
      </h1>

      <div className="text-center py-16 bg-gray-50 rounded-xl">
        <div className="text-4xl mb-3">📦</div>
        <p className="text-gray-500 font-medium">Aucune commande pour le moment</p>
        <p className="text-sm text-gray-400 mt-1">Vos commandes apparaîtront ici une fois passées.</p>
      </div>
    </div>
  );
}
