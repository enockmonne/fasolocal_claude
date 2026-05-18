import { Product } from '@/types/product';
import ProductCard from './ProductCard';
import { ProductGridSkeleton } from '@/components/ui/Skeleton';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

export default function ProductGrid({ products, isLoading }: ProductGridProps) {
  if (isLoading) return <ProductGridSkeleton />;

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-4xl mb-3">🔍</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Aucun produit trouvé</h3>
        <p className="text-sm text-gray-500">Essayez de modifier vos filtres ou votre recherche.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
